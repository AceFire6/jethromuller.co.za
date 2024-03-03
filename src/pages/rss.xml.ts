import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

import rss from '@astrojs/rss';

import { SITE_DESCRIPTION, SITE_TITLE } from '../config';

export async function GET(context: APIContext): Promise<Response> {
    const blog = await getCollection('blog');

    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site as URL,
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.publishedDate,
            description: post.data.description,
            link: `/blog/${post.slug}/`,
        })),
    });
}
