# 个人网站 — 作品集 + 博客

Astro 静态站。设计师的个人网站:作品集为主、博客为辅,**中英双语**,免费托管公开访问(GitHub Pages)。
设计方案见 `docs/specs/2026-07-16-personal-website-design.md`。

**这份文件同时是交接说明书**:用户会换电脑、换 Claude 账号,任何新对话读完这份文件就该知道怎么接手。
(`CLAUDE.md` 的全部内容是一行 `@AGENTS.md` 导入指令——Claude Code 启动时只自动读
CLAUDE.md,靠这一行把本文件自动带进每个新对话的上下文。**不要改动 CLAUDE.md**,
改了规则就会静默失联。)

---

## 用户是谁(必读)

- **设计师,不是工程师**:产品和视觉判断很强,技术词汇为零。
  一切技术内容必须翻译成人话,不许堆术语。
- **可视化产物必须给本地文件的绝对路径**——用户打不开 artifact / claude.ai 链接。
- 永不向用户要 API key 或 PAT。

## 花名册与文件所有权

| 对话 | 职责 | 地盘 |
|------|------|------|
| **网站对话** | 代码、内容、环境、文档;**唯一的 git 提交者** | `design/` 和 `reference/` 以外的一切 |
| **设计辅助对话** | 视觉方向与设计稿(本地 HTML);**git 一概不碰** | `design/`(尚未建,首次产出时自建) |
| **辅助对话** | 纯顾问,产出是话不是文件 | 不写任何项目文件,不跑 git |

拍板的人永远是用户。

## 规则冲突怎么办

**规则冲突时停下来问用户,不要自己重新解释作用域。
用户可以推翻任何规则,但推翻要用户亲口说,不能由你替他推断出来。**

## git 规矩(从 Creative OS 的教训里抄来的,别重新踩坑)

1. **只有网站对话跑 git 写命令**;设计辅助对话和辅助对话连只读命令都用不着
2. `git add` 永远用**显式路径**,禁止 `git add -A` / `git add .`
3. 身份只配在**本仓库本地**(`user.name` Ymcc / `user.email` 208762643+yunmin311@users.noreply.github.com),
   **永不 `git --global`**——这是工作电脑,全局身份必须保持空
4. **推送只在用户明确要求时做**
5. 子 agent 绝对不许跑任何 git 命令,提交永远由父对话做

## 与 D:\project(Creative OS)的关系

- **完全隔离**:两个项目、两个 git 仓库、互不引用。本项目的任何对话**绝不写 D:\project 里的任何东西**
- `reference/creative-os-design/` 是 Creative OS 设计稿在 2026-07-16 的**只读快照**
  (含设计对话当时未提交的改动)。规矩是**"只复制不引用"——抄想法,不 import 文件**。
  **谁都不许写它,包括往里补文件**——要更新参考,是"再拷一份新快照"这个动作,由用户发起

## 换电脑 / 换 Claude 账号(硬性需求)

- 一切内容都是普通文件、全部进 git、推到 GitHub 云端(远程仓库尚未建,首次推送前需用户确认)
- **换电脑** = 装 Node.js 和 git → 取回仓库 → `npm install` → 继续干。人话步骤见 `docs/搬家清单.md`
- **换 Claude 账号无影响**:项目不依赖任何 Claude 账号的东西
- 不许引入"只存在于这台电脑"的依赖(本地密钥、全局配置、绝对路径写死等)

## 设计约束

- 视觉沿用 Creative OS 设计语言(卡纸质感、craft.do 的克制感),**暂定,后期可能整体改向**——改不改由用户拍板
- **字体授权**:任何字体文件进入网站发布目录即构成再分发,必须随附**许可正文本身**(版权声明不够)。
  照 `reference/creative-os-design/_源文件/assets/LICENSES/` 的做法。
  个人网站属于 web font delivery,LXGW 附加许可明文覆盖这个场景(比桌面打包宽松),
  但 RFN 规则照旧:自己 subset 过的字体不得用保留名。逐个核对许可文件,不要类推
- **快照里的 woff2 不能直接拿来用**:它们是按 Creative OS 页面文字裁剪的子集,
  网站文字不同会大面积缺字。要用就得用 `_源文件/gen_fonts.py` 按本站文字重裁,
  或从原始完整字体重新出子集(重裁即成为 Modified Version,RFN 随之激活)
- 内容即文件:作品和文章是 markdown 文档,双语内容两个语言版本都要有

## 命令

```bash
npm run dev      # 本地预览(见下方 background 用法)
npm run build    # 构建整站,提交前必须过
npm run preview  # 预览构建产物
```

启动开发服务器用后台模式:`astro dev --background`,
配套 `astro dev stop` / `astro dev status` / `astro dev logs`。

## Astro 文档(动手前先查对应指南)

- [路由与页面](https://docs.astro.build/en/guides/routing/)
- [Astro 组件](https://docs.astro.build/en/basics/astro-components/)
- [内容集合(作品/文章的存放方式)](https://docs.astro.build/en/guides/content-collections/)
- [样式](https://docs.astro.build/en/guides/styling/)
- [多语言 i18n](https://docs.astro.build/en/guides/internationalization/)

## 第一纪律

**要证据不要断言。** 回答任何"现状"问题前,先用只读命令看一手的东西(文件本身、git log),
不要凭印象推断。
