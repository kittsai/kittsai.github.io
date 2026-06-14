# kit-docs

基于 [VitePress](https://vitepress.dev/) 的个人技术文档站，记录读书笔记与技术知识梳理。

## 技术栈

- [VitePress](https://vitepress.dev/) - Vue 驱动的静态网站生成器
- [markmap](https://markmap.js.org/) - 知识图谱（思维导图）
- [GitHub Actions](https://docs.github.com/en/actions) - 自动部署到 GitHub Pages

## 环境要求

- [Node.js](https://nodejs.org/) >= 18

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev
```

启动后访问 `http://localhost:5173` 预览站点。

## 其他命令

```bash
# 构建静态站点
npm run docs:build

# 本地预览构建产物
npm run docs:preview
```

## 项目结构

```
kit-docs/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts              # VitePress 配置
│   │   └── theme/
│   │       ├── index.ts            # 主题入口
│   │       ├── FeatureCards.vue     # 首页卡片组件
│   │       └── KnowledgeGraph.vue   # 知识图谱组件
│   ├── books/                       # 读书记录
│   │   └── spring-ai-in-action/     # 《Spring AI in Action》中文翻译
│   ├── knowledges/                  # 知识笔记
│   │   └── Java/                    # Java 系列
│   └── index.md                     # 首页
├── .github/workflows/deploy.yml     # GitHub Pages 部署
└── package.json
```

## 内容

- 📖 [Spring AI in Action](./docs/books/) - 中文翻译（第1-4章）
- 📝 [Java 集合](./docs/knowledges/Java/Java集合) - Collection、Map 详解 + FAQ

## 在线访问

https://kittsai.github.io/
