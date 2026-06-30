import { defineCollection, z } from 'astro:content';

const knowledges = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(),
    description: z.string().optional(),
  }),
});

const books = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { knowledges, books };
