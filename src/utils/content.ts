import type { CollectionEntry } from "astro:content"
import { getCollection, render } from "astro:content"
import { memoize } from "@/utils/cache"
import { lang } from "@/config"

export type Article = CollectionEntry<'articles'> & {
  remarkPluginFrontmatter: {
    minutes: number
  }
}

const metaCache = new Map<string, { minutes: number }>()

/**
 * Add metadata including reading time to a article
 *
 * @param article The article to enhance with metadata
 * @returns Enhanced article with reading time information
 */
async function addMetaToArticle(article: CollectionEntry<'articles'>): Promise<Article> {
  const cacheKey = `${article.id}-${ lang || 'universal'}`

  if (metaCache.has(cacheKey)) {
    return {
      ...article,
      remarkPluginFrontmatter: metaCache.get(cacheKey)!,
    }
  }

  const { remarkPluginFrontmatter } = await render(article)
  metaCache.set(cacheKey, remarkPluginFrontmatter as { minutes: number })

  return {
    ...article,
    remarkPluginFrontmatter: metaCache.get(cacheKey)!,
  }
}

async function _checkArticleSlugDuplication(articles: CollectionEntry<'articles'>[]): Promise<string[]> {
  const slugMap = new Map<string, Set<string>>()
  const duplicates: string[] = []

  articles.forEach((article) => {
    const slug = article.data.abbrlink || article.id

    if (!slugMap.has(lang)) {
      slugMap.set(lang, new Set())
    }

    const slugSet = slugMap.get(lang)!
    if (!slugSet.has(slug)) {
      slugSet.add(slug)
      return
    }

    if (!lang) {
      duplicates.push(`Duplicate slug "${slug}" found in universal article (applies to all languages)`)
    }
    else {
      duplicates.push(`Duplicate slug "${slug}" found in "${lang}" language article`)
    }
  })

  return duplicates
}

export const checkArticleSlugDuplication = memoize(_checkArticleSlugDuplication)

/**
 * Get all articles (including pinned ones, excluding drafts in production)
 *
 * @param lang The language code to filter by, defaults to site's default language
 * @returns articles filtered by language, enhanced with metadata, sorted by date
 */
async function _getArticles(language?: string) {
  const currentLang = language

  const filteredarticles = await getCollection(
    'articles',
    ({ data }: CollectionEntry<'articles'>) => {
      // Show drafts in dev mode only
      const shouldInclude = import.meta.env.DEV || !data.draft
      return shouldInclude && (lang === currentLang || lang === '')
    },
  )

  const enhancedarticles = await Promise.all(filteredarticles.map(addMetaToArticle))

  return enhancedarticles.sort((a: Article, b: Article) =>
    b.data.published.valueOf() - a.data.published.valueOf(),
  )
}

export const getArticles = memoize(_getArticles)

/**
 * Get all non-pinned articles
 *
 * @param lang The language code to filter by, defaults to site's default language
 * @returns Regular articles (non-pinned), filtered by language
 */
async function _getRegularArticles(lang?: string) {
  const articles = await getArticles(lang)
  return articles.filter(article => !article.data.pin)
}

export const getRegularArticles = memoize(_getRegularArticles)

/**
 * Get pinned articles sorted by pin priority
 *
 * @param lang The language code to filter by, defaults to site's default language
 * @returns Pinned articles sorted by pin value in descending order
 */
async function _getPinnedArticles(lang?: string) {
  const articles = await getArticles(lang)
  return articles
    .filter(article => article.data.pin && article.data.pin > 0)
    .sort((a, b) => (b.data.pin ?? 0) - (a.data.pin ?? 0))
}

export const getPinnedArticles = memoize(_getPinnedArticles)

/**
 * Group articles by year and sort within each year
 *
 * @param lang The language code to filter by, defaults to site's default language
 * @returns Map of articles grouped by year (descending), sorted by date within each year
 */
async function _getArticlesByYear(lang?: string): Promise<Map<number, Article[]>> {
  const articles = await getRegularArticles(lang)
  const yearMap = new Map<number, Article[]>()

  articles.forEach((article: Article) => {
    const year = article.data.published.getFullYear()
    if (!yearMap.has(year)) {
      yearMap.set(year, [])
    }
    yearMap.get(year)!.push(article)
  })

  // Sort articles within each year by date
  yearMap.forEach((yearArticles) => {
    yearArticles.sort((a, b) => {
      const aDate = a.data.published
      const bDate = b.data.published
      return bDate.getMonth() - aDate.getMonth() || bDate.getDate() - aDate.getDate()
    })
  })

  return new Map([...yearMap.entries()].sort((a, b) => b[0] - a[0]))
}

export const getArticlesByYear = memoize(_getArticlesByYear)

/**
 * Group articles by their tags
 *
 * @param lang The language code to filter by, defaults to site's default language
 * @returns Map where keys are tag names and values are arrays of articles with that tag
 */
async function _getArticlesGroupByTags(lang?: string) {
  const articles = await getArticles(lang)
  const tagMap = new Map<string, Article[]>()

  articles.forEach((article: Article) => {
    article.data.tags?.forEach((tag: string) => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, [])
      }
      tagMap.get(tag)!.push(article)
    })
  })

  return tagMap
}

export const getArticlesGroupByTags = memoize(_getArticlesGroupByTags)

/**
 * Get all tags sorted by article count
 *
 * @param lang The language code to filter by, defaults to site's default language
 * @returns Array of tags sorted by popularity (most articles first)
 */
async function _getAllTags(lang?: string) {
  const tagMap = await getArticlesGroupByTags(lang)
  const tagsWithCount = Array.from(tagMap.entries())

  tagsWithCount.sort((a, b) => b[1].length - a[1].length)
  return tagsWithCount.map(([tag]) => tag)
}

export const getAllTags = memoize(_getAllTags)

/**
 * Get all articles that contain a specific tag
 *
 * @param tag The tag name to filter articles by
 * @param lang The language code to filter by, defaults to site's default language
 * @returns Array of articles that contain the specified tag
 */
async function _getArticlesByTag(tag: string, lang?: string) {
  const tagMap = await getArticlesGroupByTags(lang)
  return tagMap.get(tag) ?? []
}

export const getArticlesByTag = memoize(_getArticlesByTag)