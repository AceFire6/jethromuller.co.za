// @ts-check
import { defineConfig } from 'astro/config';
import rehypeClassNames from 'rehype-class-names';
import remarkGithubBetaBlockquoteAdmonitions from 'remark-github-beta-blockquote-admonitions';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

/** @type {import('remark-github-beta-blockquote-admonitions').Config} */
const remarkGithubBetaBlockquoteConfig = {
    classNameMaps: {
        block: (title) => {
            const allClasses = 'card card-body not-prose';

            let colourLevel = 'info';
            switch (title) {
                case 'NOTE':
                    colourLevel = 'bg-info text-info-content';
                    break;
                case 'WARNING':
                    colourLevel = 'bg-warning text-warning-content';
                    break;
                case 'ERROR':
                    colourLevel = 'bg-error text-error-content';
                    break;
            }

            return `${allClasses} ${colourLevel}`;
        },
        title: (title) => {
            return 'card-title text-2xl';
        },
    },
    titleFilter: (_title) => {
        return true;
    },
    titleTextMap: (title) => {
        const trimmedTitle = title.replaceAll('[!', '').replaceAll(']', '');
        const [checked, ...display] = trimmedTitle.split(' ');

        return {
            checkedTitle: checked,
            displayTitle:
                display.length > 0
                    ? display.join(' ')
                    : `${checked.at(0).toUpperCase()}${checked.slice(1).toLowerCase()}`,
        };
    },
};

// https://astro.build/config
export default defineConfig({
    site: 'https://jethromuller.co.za',
    integrations: [mdx(), sitemap(), tailwind()],
    markdown: {
        remarkPlugins: [[remarkGithubBetaBlockquoteAdmonitions, remarkGithubBetaBlockquoteConfig]],
        rehypePlugins: [
            [
                rehypeClassNames,
                {
                    a: 'link',
                },
            ],
        ],
    },
});
