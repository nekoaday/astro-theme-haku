type Exclude<T, U> = T extends U ? never : T

export interface ThemeConfig {
    site: {
        title: string
        subtitle: string
        description: string
        author: string
        base: string
        url: string
        favicon: string
    }
    global: {
        lang: string
        toc: boolean
    }
}

export default ThemeConfig
