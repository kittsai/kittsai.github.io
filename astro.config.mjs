// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Kit Docs',
      customCss: './src/styles/custom.css',
      themeConfig: {
        prismaThemes: {
          light: 'github-light',
          dark: 'github-dark',
        },
      },
      sidebar: [
        {
          label: '知识笔记',
          items: [
            {
              label: 'Java',
              items: [
                'knowledges/java/spring',
                'knowledges/java/java-concurrency',
                'knowledges/java/java-collections',
                'knowledges/java/jvm',
              ],
            },
            {
              label: '中间件',
              items: [
                'knowledges/middleware/mysql',
                'knowledges/middleware/redis',
              ],
            },
          ],
        },
        {
          label: '读书记录',
          items: [
            {
              label: 'Spring AI in Action',
              items: [
                'books/spring-ai-in-action/ch1',
                'books/spring-ai-in-action/ch2',
                'books/spring-ai-in-action/ch3',
                'books/spring-ai-in-action/ch4',
              ],
            },
          ],
        },
      ],
    }),
  ],
});
