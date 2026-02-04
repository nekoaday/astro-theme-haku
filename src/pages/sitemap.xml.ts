import { getCollection } from "astro:content";
import { base, themeConfig } from "@/config";
import { getAllTags, getArticlesByTag, getRegularArticles } from "@/utils/content";

const withBase = (path: string) => `${base}${path}`;
const joinUrl = (path: string) => `${themeConfig.site.url}${withBase(path)}`;

export async function GET() {
  const articles = await getCollection("articles", ({ data }) =>
    import.meta.env.DEV || !data.draft,
  );
  const tags = await getAllTags();
  const regularArticles = await getRegularArticles();

  const pageSize = themeConfig.content.pageSize;
  const totalPages = Math.max(1, Math.ceil(regularArticles.length / pageSize));

  const tagPages = [];
  for (const tag of tags) {
    const taggedArticles = await getArticlesByTag(tag);
    const tagTotalPages = Math.max(1, Math.ceil(taggedArticles.length / pageSize));
    for (let page = 1; page <= tagTotalPages; page += 1) {
      tagPages.push(
        joinUrl(page === 1 ? `/tags/${tag}/` : `/tags/${tag}/page/${page}/`),
      );
    }
  }

  const urls = [
    joinUrl("/"),
    joinUrl("/about/"),
    joinUrl("/tags/"),
    joinUrl("/search/"),
    joinUrl("/rss.xml"),
    ...Array.from({ length: totalPages }, (_, idx) =>
      joinUrl(idx === 0 ? "/" : `/page/${idx + 1}/`),
    ),
    ...tagPages,
    ...articles.map((article) => {
      const slug = article.data.abbrlink || article.id;
      return joinUrl(`/articles/${slug}/`);
    }),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
      <url>
        <loc>${url}</loc>
      </url>`,
      )
      .join("")}
  </urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
