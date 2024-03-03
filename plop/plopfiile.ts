import type { NodePlopAPI } from 'plop';

export default async function (plop: NodePlopAPI): Promise<void> {
    await plop.load('./blog-post/blog-post-generator.ts', {}, true);
}
