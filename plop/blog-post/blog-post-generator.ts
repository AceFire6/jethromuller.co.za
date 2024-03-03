import type { NodePlopAPI } from 'plop';

export default function registerBlogGenerator(plop: NodePlopAPI): void {
    plop.setHelper('date', () => {
        // get just the date bit
        return new Date().toISOString().slice(0, 10);
    });

    plop.setPartial('blogContentDir', 'src/content/blog/');

    plop.setGenerator('add-new-blog', {
        description: 'Generate a new blog post',
        prompts: [
            {
                name: 'blogTitle',
                type: 'input',
                message: 'What is the title of the blog post?',
            },
        ],
        actions: [
            {
                type: 'add',
                templateFile: './template/blog_post.md.hbs',
                path: '{{> blogContentDir }}/{{ snakeCase blogTitle }}/{{ kebabCase blogTitle }}.md',
            },
        ],
    });
}
