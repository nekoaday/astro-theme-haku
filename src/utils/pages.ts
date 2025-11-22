import { base } from "@/config";

/**
 * Checks whether the canonicalized path matches a specific page type.
 * @param path Original URL path
 * @param prefix A prefix for the page type, such as 'articles'. Defaults to an empty string, used to match home pages.
 * @returns {boolean} Returns true if the paths match
 */
function isPageType(path: string, prefix: string = ""): boolean {
  const pathWithoutBase =
    base && path.startsWith(base) ? path.slice(base.length) : path;

  const normalizedPath = pathWithoutBase.replace(/^\/|\/$/g, "");

  if (prefix === "") {
    return normalizedPath === "";
  } else {
    return normalizedPath.startsWith(prefix);
  }
}

// --- Helper function for determining the specific page type ---

export function isHomePage(path: string) {
  return isPageType(path); // prefix defaults to ''
}

export function isArticlePage(path: string) {
  return isPageType(path, "articles");
}

export function isTagPage(path: string) {
  return isPageType(path, "tags");
}

export function isAboutPage(path: string) {
  return isPageType(path, "about");
}

/**
 * Obtain the context information of the page (such as the page type).
 * @param path Original URL path
 * @returns Object containing boolean values for the page type
 */
export function getPageInfo(path: string) {
  const isHome = isHomePage(path);
  const isArticle = isArticlePage(path);
  const isTag = isTagPage(path);
  const isAbout = isAboutPage(path);

  return {
    isHome,
    isArticle,
    isTag,
    isAbout,
  };
}
