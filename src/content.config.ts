import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const knowledges = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/knowledges' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    description: z.string().optional(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    category: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { knowledges, books };
