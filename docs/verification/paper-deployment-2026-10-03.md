# GitHub Pages 正式上线 · 2026-10-03

用户已明确要求把设计定稿直接部署到现有网址，占位内容继续保留。

- 正式网址：https://yunmin311.github.io/zh/；英文：https://yunmin311.github.io/en/。
- 首次上线提交：`852f81d5e09d2e0e4995aefa537f14848725128e`。
- 发布任务：https://github.com/yunmin311/yunmin311.github.io/actions/runs/37127741560；build / deploy 均 success。
- README 已更新线上入口、已定稿状态及更新方法；main 推送自动发布，也支持 workflow_dispatch。
- 当前仍保留全部标明的演示内容、历史状态和待补项，没有用虚构内容替代个人作品。

## 线上验证

直接针对 HTTPS 正式站复跑 `scripts/qa/paper-site.mjs`：20 项通过；中英、桌面/平板/手机、13 个内容路由、卡片/阅读/音乐/云层/粒子、资源故障回退均通过，无脚本异常或缺失资源。证据：`paper-online-2026-10-03.json`。

直接针对 HTTPS 正式站复跑 `scripts/qa/paper-media.mjs`：中文、英文均通过；打开页面与展开播放器没有音频请求；拦截 .bin/.wav 后模型仍显示；播放/定位/暂停/续播保持一个音频实例。证据：`paper-online-media-2026-10-03.json`。

部署为静态文件，没有服务器应用、账户或私有共享响应缓存。构建工具依赖的两项上游缓存告警仍独立留档，没有执行大版本降级；今后引入服务器或认证前重新审查。
