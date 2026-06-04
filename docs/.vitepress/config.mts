import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(defineConfig({
  base: "/",
  title: "kit-docs",
  description: "你的技术文档站",
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  themeConfig: {
    outline: {
      level: [1, 6],
      label: '本页目录'
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "读书记录", link: "/books/" },
      { text: "知识笔记", link: "/knowledges/" },
    ],
    sidebar: {
      "/books/": [
        {
          text: "Spring AI in Action",
          collapsed: false,
          items: [
            {
              text: "第1章 - Spring AI 简介",
              link: "/books/spring-ai-in-action/Spring_AI_in_Action_第1章_中文翻译",
            },
            {
              text: "第2章 - 开始使用 Spring AI",
              link: "/books/spring-ai-in-action/Spring_AI_in_Action_第2章_中文翻译",
            },
            {
              text: "第3章 - AI 模型集成",
              link: "/books/spring-ai-in-action/Spring_AI_in_Action_第3章_中文翻译",
            },
            {
              text: "第4章 - 高级特性",
              link: "/books/spring-ai-in-action/Spring_AI_in_Action_第4章_中文翻译",
            },
          ],
        },
      ],
      "/knowledges/": [
        {
          text: "Java",
          collapsed: false,
          items: [
            {
              text: "Java集合",
              link: "/knowledges/Java/Java集合",
            },
            {
              text: "Java并发",
              link: "/knowledges/Java/Java并发",
            },
            {
              text: "JVM",
              link: "/knowledges/Java/JVM",
            },
            {
              text: "Spring",
              link: "/knowledges/Java/Spring",
            },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/kittsai/kittsai.github.io" }],
  },
}));
