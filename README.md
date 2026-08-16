# Kittsai Personal Site

Kittsai 的个人网站，用来持续整理技术笔记，并记录工程实践与长期思考。

网站目前围绕两个主要内容入口组织：

- **笔记**：结构化技术内容，覆盖 Java、数据库与中间件等主题。
- **博客**：需要完整上下文的实践记录、技术取舍与个人思考。

首页负责个人介绍与最新内容聚合，笔记详情提供侧边目录、页内导航和搜索能力。

## 技术栈

- [Astro 5](https://astro.build/) 与 TypeScript
- [Starlight](https://starlight.astro.build/) 技术文档框架
- Astro Content Collections
- Markdown 内容管理
- Pagefind 静态全文搜索
- RSS 与 Sitemap
- OpenAI Sites 静态托管适配

## 页面结构

| 路径 | 内容 |
| --- | --- |
| `/` | 首页、个人介绍与最新笔记 |
| `/#latest-notes` | 首页最新笔记区域 |
| `/writing` | 博客列表 |
| `/writing/[slug]` | 博客详情 |
| `/knowledges/**` | 技术笔记详情 |

## 内容组织

```text
src/content/
├── docs/knowledges/   # Starlight 技术笔记
└── writing/           # 博客文章
```

技术笔记按照领域继续分为：

```text
knowledges/
├── java/
├── database/
└── middleware/
```

已退出网站导航的读书与项目内容，以及不再用于生产页面的原始视觉资源，统一保存在 `content-archive/`，不会进入网站构建产物。

## Markdown 规范

页面标题由 frontmatter 的 `title` 生成，正文不要再次使用一级标题。

```md
---
title: 页面标题
description: 页面摘要
---

## 主章节

### 子章节

#### 具体条目
```

引用语法只用于需要强调的结论或说明，普通内容优先使用段落与列表。

博客文章还需要以下字段：

```yaml
publishedAt: 2026-08-14
tags: [Astro, Knowledge Management, Writing]
category: Building
featured: true
draft: false
```

## 本地开发

要求 Node.js `>=22.12.0`。

```sh
npm install
npx astro dev --background
```

开发服务默认运行在 `http://localhost:4321/`。

后台服务管理：

```sh
npx astro dev status
npx astro dev logs
npx astro dev stop
```

## 构建与预览

生成静态网站：

```sh
npm run build
```

预览构建结果：

```sh
npm run preview
```

生成 OpenAI Sites 使用的静态 Worker 构建：

```sh
npm run build:sites
```

构建产物输出到 `dist/`。

## 主要目录

```text
src/
├── components/       # 网站与 Starlight 自定义组件
├── config/           # 站点导航和个人信息
├── content/          # Markdown 内容
├── layouts/          # 页面与文章布局
├── pages/            # Astro 路由
└── styles/           # 全局设计变量与排版样式

public/images/        # 文章配图和站点视觉资源
scripts/              # 构建辅助脚本
```

全局导航与个人资料集中维护在 `src/config/site.ts`，站点设计变量位于 `src/styles/tokens.css`。

## 内容原则

- 笔记为再次查询而写，强调结构、准确性与持续更新。
- 博客为完整表达而写，保留问题背景、判断过程与技术取舍。
- 技术服务于内容，避免为了展示效果增加不必要的复杂度。
- 持续修正旧内容，而不只是不断新增页面。
