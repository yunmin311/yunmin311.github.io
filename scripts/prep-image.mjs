// 图片入库脚本:把原图(手机照片、大图)压成适合进仓库的体积
// 用法见 docs/图片入库工序.md,一句话版:
//   node scripts/prep-image.mjs 原图路径 [输出路径]
// 规则:最长边缩到 2400px(不放大)、转成质量 80 的 JPG;输出默认在原图旁边加「-web」后缀。
// 支持 jpg/png/webp/tiff;HEIC 不支持(先用 Windows「照片」另存为 JPG,见工序文档)。
// ⚠️ 隐私红线:本脚本靠 sharp 默认不保留元数据来抹掉 EXIF(含 GPS 定位),
//    故意不调 .withMetadata()——谁都别加,否则拍摄坐标会随公开仓库泄露。
import sharp from 'sharp';
import { stat } from 'node:fs/promises';
import path from 'node:path';

const MAX_EDGE = 2400;
const QUALITY = 80;

const [, , input, output] = process.argv;
if (!input) {
  console.log('用法:node scripts/prep-image.mjs 原图路径 [输出路径]');
  process.exit(1);
}

const outPath =
  output ??
  path.join(
    path.dirname(input),
    `${path.basename(input, path.extname(input))}-web.jpg`,
  );

try {
  const before = (await stat(input)).size;
  await sharp(input)
    .rotate() // 按照片自带的方向信息摆正(手机竖拍常见)
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(outPath);
  const after = (await stat(outPath)).size;
  const mb = (n) => (n / 1024 / 1024).toFixed(2) + ' MB';
  console.log(`完成:${outPath}`);
  console.log(`体积:${mb(before)} → ${mb(after)}`);
} catch (err) {
  console.error('失败:', err.message);
  console.error('提示:HEIC(iPhone 默认格式)不支持,先用 Windows「照片」打开另存为 JPG 再来。');
  process.exit(1);
}
