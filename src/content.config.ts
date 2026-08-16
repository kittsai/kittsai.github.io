import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  writing: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
    schema: z.object({
      title: z.string(), description: z.string(), publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(), tags: z.array(z.string()).default([]),
      category: z.string(), featured: z.boolean().default(false), draft: z.boolean().default(false),
    }),
  }),
};
