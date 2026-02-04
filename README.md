# Astro HAKU

一个强调排版与阅读体验的 Astro 博客主题，融合科技感视觉语言，包含标签、搜索、暗黑模式、RSS、分页等功能。

## 设计语言（Tech-forward）

- **玻璃质感与空间层次**：通过半透明表层、柔和阴影与卡片化组织，营造现代界面层次与深度。
- **高对比与高可读性**：主文本与辅助信息采用明确的对比关系，保证阅读舒适度与信息层级清晰。
- **渐变与光晕点缀**：背景使用低强度渐变与光晕作为科技氛围的视觉暗示，但保持克制。
- **动效与交互反馈**：卡片与导航具备轻微位移与高光反馈，增强界面“可触感”。

## 特性

- 文章列表与详情页
- 标签索引与标签归档页
- 分页与置顶文章
- 搜索（Pagefind）
- 代码高亮（Shiki）与 Markdown 扩展
- 暗黑模式与返回顶部按钮
- RSS + Sitemap
- 社交分享与可选评论（Giscus）
- 可配置的站点信息与主题配色

## 快速开始

```bash
pnpm install
pnpm dev
```

构建并生成搜索索引：

```bash
pnpm build
```

## 目录结构

- `src/pages`：页面路由
- `src/components`：可复用组件
- `src/layouts`：布局与 Head
- `src/content`：文章与页面内容
- `src/config.ts`：主题配置

## 配置说明

在 `src/config.ts` 中可配置：

- 站点标题、描述、作者、域名
- 主题颜色、默认模式
- 分页大小
- 社交链接
- 分析脚本（Plausible/Umami/GA4）
- Giscus 评论参数

## 部署

- **Vercel / Netlify**：直接构建 `pnpm build`，产物在 `dist/`。
- **GitHub Pages**：配置 Astro 的 `site` 与 `base`，并发布 `dist/` 目录。

## License

MIT
