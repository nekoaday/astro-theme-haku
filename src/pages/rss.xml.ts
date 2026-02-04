import { getCollection } from "astro:content";
import { base, themeConfig } from "@/config";
import { getArticleDescription } from "@/utils/description";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const articles = await getCollection("articles", ({ data }) =>
    import.meta.env.DEV || !data.draft,
  );

  const items = articles
    .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf())
    .map((article) => {
      const slug = article.data.abbrlink || article.id;
      const link = `${themeConfig.site.url}${base}/articles/${slug}/`;
      return `
      <item>
        <title>${escapeXml(article.data.title)}</title>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${article.data.published.toUTCString()}</pubDate>
        <description><![CDATA[${getArticleDescription(article, "feed")}]]></description>
      </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>${escapeXml(themeConfig.site.title)}</title>
      <link>${themeConfig.site.url}${base}/</link>
      <description>${escapeXml(themeConfig.site.description)}</description>
      <language>${themeConfig.global.lang}</language>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
