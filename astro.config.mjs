// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

const fontStylesheet = 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=Noto+Serif+SC:wght@500;600&display=swap';

function lazyMarkdownImages() {
  /** @param {any} tree */
  return (tree) => {
    /** @param {any} node */
    const visit = (node) => {
      if (node?.type === 'element' && node.tagName === 'img') {
        node.properties ??= {};
        node.properties.loading = 'lazy';
        node.properties.decoding = 'async';
      }
      node?.children?.forEach(visit);
    };
    visit(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://kittsai.github.io',
  markdown: { rehypePlugins: [lazyMarkdownImages] },
  integrations: [
		starlight({
			title: 'Kittsai',
			description: 'Kittsai 关于 Java、数据库与中间件的结构化技术笔记。',
			favicon: '/favicon.svg',
			defaultLocale: 'zh-CN',
      locales: { root: { label: '简体中文', lang: 'zh-CN' } },
      social: { github: 'https://github.com/kittsai' },
      head: [
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' } },
        { tag: 'link', attrs: { rel: 'stylesheet', href: fontStylesheet } },
      ],
      customCss: ['./src/styles/custom.css'],
      components: {
        Header: './src/components/starlight/Header.astro',
        PageTitle: './src/components/starlight/PageTitle.astro',
        Footer: './src/components/starlight/Footer.astro',
      },
      sidebar: [
        {
          label: 'Java',
          items: [
            'knowledges/java/java-collections',
            'knowledges/java/java-concurrency',
            'knowledges/java/jvm',
            'knowledges/java/spring',
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
    }),
    sitemap(),
  ],
});
