import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://jethromuller.co.za',
    vite: {
        ssr: {
            external: ['svgo'],
        },
    },
    integrations: [
        mdx(),
        sitemap(),
        image({
            serviceEntryPoint: '@astrojs/image/sharp',
        }),
        tailwind(),
    ],
});
