// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Kit Docs',
      customCss: ['./src/styles/custom.css'],
      components: {
        ThemeSelect: './src/components/ThemeSelect.astro',
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
              label: '数据库',
              items: [
                'knowledges/database/mysql',
                'knowledges/database/redis',
              ],
            },
            {
              label: '中间件',
              items: [
                'knowledges/middleware/elastic-search',
              ],
            },
          ],
        },
      ],
    }),
  ],
});
