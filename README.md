# Astro HAKU

一个强调排版与阅读体验的 Astro 博客主题，包含标签、搜索、暗黑模式、RSS、分页等功能。

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
