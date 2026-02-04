# Tasks

> 记录当前明确可执行的任务。

## 阶段一：核心功能（已完成）
- [x] 项目初始化：使用 Astro CLI 创建项目并建立基础目录结构。
- [x] 基础布局：创建 BaseLayout.astro，包含 HTML 框架与 <slot />。
- [x] 内容集合：配置 articles schema（title, pubDate, description, author, image）。
- [x] 首页：按发布日期降序列出文章标题、摘要、发布日期。
- [x] 文章详情页：/blog/[slug] 渲染单篇 Markdown。
- [x] 基础样式：全局 CSS 或 <style> 提供可读性默认样式。
- [x] 404 页面：自定义 Not Found 页面。

## 阶段二：功能增强（已完成）
- [x] 头部导航（站点标题/Logo、导航链接）。
- [x] 页脚（版权信息、社交链接）。
- [x] 标签支持（frontmatter tags）。
- [x] 标签列表页（/tags）。
- [x] 单个标签页（/tags/[tag]）。
- [x] 分页（首页与标签页）。
- [x] 动态页面标题与 meta description。
- [x] Open Graph & Twitter Cards。
- [x] 代码高亮（Shiki/Prism）。
- [x] 移动端响应式设计。
- [x] 关于页面（/about）。

## 阶段三：高级功能与优化（已完成）
- [x] 暗黑模式（手动/系统）。
- [x] 站内搜索（Pagefind/Fuse/第三方）。
- [x] 返回顶部按钮。
- [x] 图像优化（astro:assets）。
- [x] 字体加载优化。
- [x] RSS 订阅。
- [x] sitemap.xml 生成。
- [x] 评论系统集成。
- [x] 社交分享按钮。
- [x] 分析工具集成。

## 阶段四：开发者体验与文档（已完成）
- [x] 主题配置中心（src/config.ts）。
- [x] README 与快速开始。
- [x] 配置文档。
- [x] 部署指南（Vercel/Netlify/GitHub Pages）。
- [x] 组件化与可扩展性。
- [x] 可访问性优化（a11y）。
