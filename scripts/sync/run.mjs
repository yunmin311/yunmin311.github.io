// Obsidian → 网站 同步胶水脚本(实现计划:docs/specs/2026-07-20-obsidian-sync-implementation-plan.md)
// 由私有笔记库的同步动作调用,本地演练也用它。四道关卡任何一道不过:整个失败、什么都不写。
//
// 用法(正式,由 workflow 调):
//   node scripts/sync/run.mjs --vault <笔记库路径> --publish <发布文件夹名> --exporter <obsidian-export 可执行文件>
// 用法(演练踩关卡,跳过守门与导出、直接喂一个导出产物目录):
//   node scripts/sync/run.mjs --from-export <目录>
//
// ⚠️ 隐私红线(spec 第六节):
//   1. 守门:vault 根必须有 .export-ignore(内容:`/*` + `!/发布文件夹名`)。
//      它是双链降级的开关——没有它,链到发布文件夹外私密笔记的双链会带着库内路径出门。
//      不对就当场停,这一步不许删、不许绕。
//   2. 图片唯一的进站路是 scripts/prep-image.mjs(抹 EXIF/GPS),不开原图直拷旁路。
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const PREP_IMAGE = path.join(SITE_ROOT, 'scripts', 'prep-image.mjs');
const CONTENT_ROOT = path.join(SITE_ROOT, 'src', 'content');
const ASSETS_DIR_NAME = '_sync-assets'; // 下划线开头:Astro 不把它当集合内容
const BOARDS = ['reflections', 'learning', 'code']; // 三个文字板块,目录名 = 集合名
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);

// 各板块的必填字段(基线三件套之外,来自各板块 spec);验票在这儿,Astro 构建时 schema 再验一遍
const REQUIRED = {
  common: ['title', 'date', 'summary'],
  reflections: ['project', 'kind'],
  learning: ['line'],
  code: ['repo', 'kind'],
};
const KIND_VALUES = { reflections: ['记录', '复盘'], code: ['正式', '练习'] };

// ---------- 参数 ----------
const args = {};
for (let i = 2; i < process.argv.length; i += 2) {
  args[process.argv[i].replace(/^--/, '')] = process.argv[i + 1];
}

const problems = []; // 收集所有问题一次报完,不挤牙膏
const fail = (msg) => problems.push(msg);
const bail = () => {
  console.error(`\n❌ 同步中止,${problems.length} 个问题(网站仓库分毫未动):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
};

// ---------- 第 0 关:守门 + 导出(--from-export 演练模式跳过) ----------
let exportDir;
if (args['from-export']) {
  exportDir = path.resolve(args['from-export']);
  console.log(`(演练模式:跳过守门与导出,直接读 ${exportDir})`);
} else {
  const vault = args.vault && path.resolve(args.vault);
  const publish = args.publish;
  const exporter = args.exporter && path.resolve(args.exporter);
  if (!vault || !publish || !exporter) {
    console.error('用法:node scripts/sync/run.mjs --vault <路径> --publish <发布文件夹名> --exporter <可执行文件>');
    process.exit(1);
  }
  // 守门:.export-ignore 是隐私墙,内容必须一字不差
  const guardFile = path.join(vault, '.export-ignore');
  const wanted = ['/*', `!/${publish}`];
  if (!fs.existsSync(guardFile)) {
    fail(`守门:vault 根找不到 .export-ignore——它是双链降级的隐私墙,必须有。应含两行:${wanted.join(' 和 ')}`);
  } else {
    const lines = fs.readFileSync(guardFile, 'utf8').split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
    if (lines.length !== 2 || lines[0] !== wanted[0] || lines[1] !== wanted[1]) {
      fail(`守门:.export-ignore 内容不对。需要两行:${wanted.join(' 和 ')};实际:${lines.join(' 和 ') || '(空)'}`);
    }
  }
  if (!fs.existsSync(path.join(vault, publish))) fail(`守门:vault 里找不到发布文件夹「${publish}」`);
  if (problems.length) bail();

  exportDir = fs.mkdtempSync(path.join(os.tmpdir(), 'obsidian-sync-'));
  execFileSync(exporter, ['--start-at', path.join(vault, publish), vault, exportDir], { stdio: 'inherit' });
}

// ---------- 盘点导出产物 ----------
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
  );
const files = walk(exportDir).map((abs) => ({
  abs,
  rel: path.relative(exportDir, abs).split(path.sep).join('/'), // 导出树内相对路径,统一 /
}));
const notes = files.filter((f) => f.rel.endsWith('.md'));
const assets = files.filter((f) => !f.rel.endsWith('.md'));

// ---------- 第 1 关:验票 + 落位路径合法性 ----------
const parseFrontmatter = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return { data, raw: m[0], body: raw.slice(m[0].length) };
};

for (const note of notes) {
  const [board, lang] = note.rel.split('/');
  if (!BOARDS.includes(board) || !['zh', 'en'].includes(lang) || note.rel.split('/').length !== 3) {
    fail(`落位:「${note.rel}」不在 板块/(zh|en)/ 的位置上(板块限 ${BOARDS.join('/')}),不知道该放哪`);
    continue;
  }
  note.raw = fs.readFileSync(note.abs, 'utf8');
  const fm = parseFrontmatter(note.raw);
  if (!fm) {
    fail(`验票:「${note.rel}」没有 frontmatter(文件头的 --- 区块)`);
    continue;
  }
  note.fm = fm;
  note.board = board;
  for (const key of [...REQUIRED.common, ...REQUIRED[board]]) {
    if (!fm.data[key]) fail(`验票:「${note.rel}」缺必填字段 ${key}`);
  }
  if (fm.data.date && Number.isNaN(Date.parse(fm.data.date))) fail(`验票:「${note.rel}」的 date 不是有效日期:${fm.data.date}`);
  if (KIND_VALUES[board] && fm.data.kind && !KIND_VALUES[board].includes(fm.data.kind)) {
    fail(`验票:「${note.rel}」的 kind 只能是 ${KIND_VALUES[board].join(' 或 ')},实际:${fm.data.kind}`);
  }
  if (board === 'code' && fm.data.repo && !/^https?:\/\//.test(fm.data.repo)) {
    fail(`验票:「${note.rel}」的 repo 不是网址:${fm.data.repo}`);
  }
}

// ---------- 第 2 关:扫 [[ 残留 ----------
// 代码块/行内代码里的 [[ 是内容不是链接(讲 Obsidian 语法时会写到),剥掉再扫,只查正文
for (const note of notes) {
  if (!note.raw) continue;
  const scannable = note.raw
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]*`/g, '');
  if (scannable.includes('[[')) {
    fail(`残留:「${note.rel}」正文里还有 [[ ——双链没被翻干净,不该发生,查明白再同步`);
  }
}

// ---------- 第 3 关:图片关卡(红线:逐张过 prep-image.mjs) ----------
const prepped = new Map(); // 导出树内原相对路径 → 处理后的临时文件(统一 .jpg)
const preppedDir = fs.mkdtempSync(path.join(os.tmpdir(), 'obsidian-sync-img-'));
for (const asset of assets) {
  const ext = path.extname(asset.rel).toLowerCase();
  if (ext === '.heic' || ext === '.heif') {
    fail(`图片:「${asset.rel}」是 HEIC(iPhone 默认格式),处理不了。照 docs/图片入库工序.md 先转成 JPG`);
    continue;
  }
  if (!IMAGE_EXTS.has(ext)) {
    fail(`图片:「${asset.rel}」不是支持的图片格式(${[...IMAGE_EXTS].join(' ')}),附件目前只收图片`);
    continue;
  }
  const outRel = asset.rel.replace(/\.[^.]+$/, '.jpg');
  const outAbs = path.join(preppedDir, ...outRel.split('/'));
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  try {
    execFileSync(process.execPath, [PREP_IMAGE, asset.abs, outAbs], { cwd: SITE_ROOT, stdio: 'pipe' });
  } catch (err) {
    fail(`图片:「${asset.rel}」过 prep-image.mjs 失败:${err.stderr?.toString().trim() || err.message}`);
    continue;
  }
  prepped.set(asset.rel, { outAbs, outRel });
}

// ---------- 改写正文里的图片引用(指向 _sync-assets 里的 .jpg) ----------
for (const note of notes) {
  if (!note.fm) continue;
  const noteDir = path.posix.dirname(note.rel); // 如 reflections/zh
  note.newBody = note.fm.body.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (whole, alt, target) => {
    if (/^[a-z]+:/i.test(target)) return whole; // 外部网址不动
    const decoded = decodeURI(target).split('\\').join('/');
    const assetRel = path.posix.normalize(path.posix.join(noteDir, decoded));
    const hit = prepped.get(assetRel);
    if (!hit) {
      fail(`引用:「${note.rel}」引用的图片「${decoded}」在导出产物里找不到`);
      return whole;
    }
    hit.used = true;
    // 落位后:md 在 src/content/板块/语言/,图在 src/content/_sync-assets/原相对路径.jpg
    return `![${alt}](${path.posix.relative(noteDir, `${ASSETS_DIR_NAME}/${hit.outRel}`)})`;
  });
}

if (problems.length) bail();

// ---------- 落位:全量镜像(发布文件夹是唯一事实源,先清后写) ----------
for (const dir of [...BOARDS, ASSETS_DIR_NAME]) {
  fs.rmSync(path.join(CONTENT_ROOT, dir), { recursive: true, force: true });
}
for (const note of notes) {
  const dest = path.join(CONTENT_ROOT, ...note.rel.split('/'));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, note.fm.raw + note.newBody);
}
for (const { outAbs, outRel } of prepped.values()) {
  const dest = path.join(CONTENT_ROOT, ASSETS_DIR_NAME, ...outRel.split('/'));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(outAbs, dest);
}

console.log(`\n✅ 同步落位完成(全量镜像):`);
for (const board of BOARDS) {
  const n = notes.filter((x) => x.board === board);
  console.log(`  ${board}:${n.length} 篇${n.length ? ' — ' + n.map((x) => x.rel.split('/').slice(1).join('/')).join('、') : ''}`);
}
console.log(`  图片:${prepped.size} 张(全部已过 prep-image.mjs,统一 .jpg)`);
