# Kittsai

Kittsai 的个人网站，用来长期记录技术知识、工程实践和个人思考。

## 技术栈

- [Hugo](https://gohugo.io/)
- [PaperMod](https://github.com/adityatelange/hugo-PaperMod)
- Markdown
- 少量自定义 CSS

项目使用 PaperMod 官方安装文档中的“下载并解压”方式。`themes/PaperMod/` 保持官方源码原样，项目定制放在根目录的 `layouts/` 和 `assets/` 中。

## 内容结构

```text
content/
├── writing/       # 文章
└── knowledges/    # 技术笔记

static/            # 图片、图标等静态资源
themes/PaperMod/   # 未修改的官方主题
```

文章使用 `publishedAt`、`tags`、`category` 和 `draft` 等 Frontmatter。技术笔记按照 Java、数据库和中间件分组。

## 本地开发

需要 Hugo Extended 0.146 或更高版本。

```sh
hugo server --buildDrafts
```

开发服务默认位于 <http://localhost:1313/>。

## 构建

```sh
hugo --minify
```

构建产物位于 Hugo 默认的 `public/`。
