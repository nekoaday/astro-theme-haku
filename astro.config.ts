// @ts-check
import { defineConfig } from 'astro/config'
import { base, themeConfig } from './src/config'

const { url: site } = themeConfig.site

// https://astro.build/config
export default defineConfig({
    site,
    base,
});
