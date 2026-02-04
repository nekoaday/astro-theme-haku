import { base } from "@/config";

export function getTagPath(t: string):string {
    const p = `/tags/${t}/`

    return base ? `${base}${p}` : p
}

export function getArticlePath(slug: string): string {
    const p = `/articles/${slug}/`

    return base ? `${base}${p}` : p
}

export function getPagePath(page: number, basePath: string = '/'): string {
    const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`
    const p = page <= 1 ? normalizedBase : `${normalizedBase}page/${page}/`

    return base ? `${base}${p}` : p
}
