import { defineCollection, reference, z, type InferEntrySchema } from 'astro:content';

export type BlogSchema = InferEntrySchema<'blog'>;

const blogCollection = defineCollection({
    type: 'content',
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            publishedDate: z.coerce.date(),
            updatedDate: z.string().optional(),
            heroImage: image().optional(),
            listImage: image().optional(),
            badge: z.string().optional(),
            tags: z
                .array(z.string())
                .refine((items) => new Set(items).size === items.length, {
                    message: 'tags must be unique',
                })
                .optional(),
            relatedPosts: z.array(reference('blog')).optional(),
        }),
});

export const collections = {
    blog: blogCollection,
};
