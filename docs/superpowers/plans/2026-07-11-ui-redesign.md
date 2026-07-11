# UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Kit Docs UI with dual theme support, minimalist Hero, optimized sidebar, and improved content typography using Starlight CSS variable overrides.

**Architecture:** Override Starlight's default theme through CSS custom properties in a new `src/styles/custom.css` file, configure theme settings in `astro.config.mjs`, and rewrite the homepage `index.mdx` for a minimalist Hero layout.

**Tech Stack:** Astro 5, Starlight 0.30, CSS custom properties

## Global Constraints

- Node.js >= 22.12.0
- Astro Starlight 0.30.x
- Must maintain full Starlight compatibility for future upgrades
- Light mode as default theme

---

## File Structure

| File | Purpose |
|------|---------|
| `src/styles/custom.css` | CSS variable overrides for themes, sidebar, content, components |
| `astro.config.mjs` | Add `customCss` reference, theme toggle config |
| `src/content/docs/index.mdx` | Minimalist Hero homepage layout |

---

### Task 1: Create Custom CSS File with Theme Variables

**Files:**
- Create: `src/styles/custom.css`

**Interfaces:**
- Consumes: Starlight CSS variable system
- Produces: CSS custom properties that override Starlight defaults

- [ ] **Step 1: Create the styles directory**

```bash
mkdir -p src/styles
```

- [ ] **Step 2: Create custom.css with light theme variables**

```css
/* src/styles/custom.css */

/* ============================================
   Light Theme (Default)
   ============================================ */
:root {
  /* Background colors */
  --sl-color-bg: #ffffff;
  --sl-color-bg-sidebar: #f8fafc;
  --sl-color-bg-nav: #ffffff;
  --sl-color-bg-inline-code: #f1f5f9;

  /* Text colors */
  --sl-color-text: #0f172a;
  --sl-color-text-secondary: #64748b;

  /* Accent colors */
  --sl-color-accent: #3b82f6;
  --sl-color-accent-high: #2563eb;
  --sl-color-accent-low: #eff6ff;

  /* Border colors */
  --sl-color-border: #e2e8f0;
  --sl-color-border-sidebar: #e2e8f0;

  /* Badge colors */
  --sl-color-badge-default-bg: #f1f5f9;
  --sl-color-badge-default-text: #64748b;
  --sl-color-badge-note-bg: #eff6ff;
  --sl-color-badge-note-text: #3b82f6;
  --sl-color-badge-tip-bg: #f0fdf4;
  --sl-color-badge-tip-text: #22c55e;
  --sl-color-badge-warning-bg: #fffbeb;
  --sl-color-badge-warning-text: #f59e0b;
  --sl-color-badge-danger-bg: #fef2f2;
  --sl-color-badge-danger-text: #ef4444;

  /* Sidebar */
  --sl-sidebar-width: 240px;
}
```

- [ ] **Step 3: Add dark theme variables**

Append to `src/styles/custom.css`:

```css
/* ============================================
   Dark Theme
   ============================================ */
html[data-theme='dark'] {
  /* Background colors */
  --sl-color-bg: #0f172a;
  --sl-color-bg-sidebar: #1e293b;
  --sl-color-bg-nav: #0f172a;
  --sl-color-bg-inline-code: #1e293b;

  /* Text colors */
  --sl-color-text: #f8fafc;
  --sl-color-text-secondary: #94a3b8;

  /* Accent colors */
  --sl-color-accent: #60a5fa;
  --sl-color-accent-high: #93bbfd;
  --sl-color-accent-low: #1e3a5f;

  /* Border colors */
  --sl-color-border: #334155;
  --sl-color-border-sidebar: #334155;

  /* Badge colors */
  --sl-color-badge-default-bg: #1e293b;
  --sl-color-badge-default-text: #94a3b8;
  --sl-color-badge-note-bg: #1e3a5f;
  --sl-color-badge-note-text: #60a5fa;
  --sl-color-badge-tip-bg: #14532d;
  --sl-color-badge-tip-text: #4ade80;
  --sl-color-badge-warning-bg: #451a03;
  --sl-color-badge-warning-text: #fbbf24;
  --sl-color-badge-danger-bg: #450a0a;
  --sl-color-badge-danger-text: #f87171;
}
```

- [ ] **Step 4: Add sidebar styling**

Append to `src/styles/custom.css`:

```css
/* ============================================
   Sidebar Styling
   ============================================ */

/* Group titles */
.sl-sidebar .sidebar-title,
.sl-sidebar nav > ul > li > strong,
.sidebar-item-group-title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--sl-color-text-secondary);
  padding: 8px 16px;
  margin-top: 16px;
}

/* Menu items */
.sl-sidebar .sidebar-item a,
.sidebar-item a {
  font-size: 14px;
  font-weight: 400;
  padding: 6px 16px;
  border-radius: 6px;
  transition: background-color 0.15s ease;
}

/* Hover state */
.sl-sidebar .sidebar-item a:hover,
.sidebar-item a:hover {
  background-color: #f1f5f9;
}

html[data-theme='dark'] .sl-sidebar .sidebar-item a:hover,
html[data-theme='dark'] .sidebar-item a:hover {
  background-color: #1e293b;
}

/* Active item */
.sl-sidebar .sidebar-item a[aria-current='page'],
.sidebar-item a[aria-current='page'] {
  font-weight: 500;
  color: var(--sl-color-accent);
  background-color: var(--sl-color-accent-low);
  border-left: 2px solid var(--sl-color-accent);
}

/* Secondary menu indentation */
.sl-sidebar .sidebar-item-group .sidebar-item a {
  padding-left: 32px;
}
```

- [ ] **Step 5: Add content area styling**

Append to `src/styles/custom.css`:

```css
/* ============================================
   Content Area Typography
   ============================================ */

/* Main content container */
.main-content,
slot[name='hero'] ~ .copy,
.starlight-content {
  max-width: 800px;
}

/* Headings */
h1 {
  font-size: 32px;
  font-weight: 700;
  border-bottom: 1px solid var(--sl-color-border);
  padding-bottom: 16px;
  margin-bottom: 24px;
}

h2 {
  font-size: 24px;
  font-weight: 600;
  margin-top: 48px;
  margin-bottom: 16px;
}

h3 {
  font-size: 20px;
  font-weight: 600;
  margin-top: 32px;
  margin-bottom: 12px;
}

/* Body text */
p {
  line-height: 1.75;
  margin-bottom: 24px;
}

/* Code blocks */
pre {
  border-radius: 8px;
  background-color: #f1f5f9;
}

html[data-theme='dark'] pre {
  background-color: #1e293b;
}

code {
  border-radius: 4px;
  background-color: var(--sl-color-bg-inline-code);
}

/* Blockquotes */
blockquote {
  border-left: 3px solid var(--sl-color-accent);
  background-color: var(--sl-color-accent-low);
  padding: 16px 24px;
  border-radius: 0 8px 8px 0;
  margin: 24px 0;
}

/* Tables */
table {
  border-collapse: collapse;
  width: 100%;
  margin: 24px 0;
}

th, td {
  padding: 12px 16px;
  border: 1px solid var(--sl-color-border);
  text-align: left;
}

tr:nth-child(even) {
  background-color: var(--sl-color-bg-sidebar);
}

tr:hover {
  background-color: var(--sl-color-accent-low);
}

/* Images */
img {
  border-radius: 8px;
  max-width: 100%;
}
```

- [ ] **Step 6: Add component styling**

Append to `src/styles/custom.css`:

```css
/* ============================================
   Component Styling
   ============================================ */

/* Cards */
.card, .sl-card {
  border-radius: 12px;
  border: 1px solid var(--sl-color-border);
  padding: 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover, .sl-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

html[data-theme='dark'] .card:hover,
html[data-theme='dark'] .sl-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Badges */
.badge {
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
}

/* Buttons */
.button {
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.15s ease, transform 0.15s ease;
}

.button:hover {
  transform: translateY(-1px);
}

.button.primary {
  background-color: var(--sl-color-accent);
  color: white;
}

.button.primary:hover {
  background-color: var(--sl-color-accent-high);
}

.button.minimal {
  background-color: transparent;
  border: 1px solid var(--sl-color-border);
  color: var(--sl-color-text);
}

.button.minimal:hover {
  background-color: var(--sl-color-bg-sidebar);
}
```

- [ ] **Step 7: Verify file is syntactically correct**

Run: `cat src/styles/custom.css | head -20`
Expected: File content displays without errors

- [ ] **Step 8: Commit**

```bash
git add src/styles/custom.css
git commit -m "feat: add custom CSS with theme variables, sidebar, content, and component styling"
```

---

### Task 2: Configure Astro to Use Custom CSS

**Files:**
- Modify: `astro.config.mjs`

**Interfaces:**
- Consumes: `src/styles/custom.css` from Task 1
- Produces: Starlight configuration with custom CSS and theme settings

- [ ] **Step 1: Read current astro.config.mjs**

```bash
cat astro.config.mjs
```

- [ ] **Step 2: Add customCss and theme configuration**

Edit `astro.config.mjs`:

```javascript
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
```

- [ ] **Step 3: Verify config syntax**

Run: `node -c astro.config.mjs`
Expected: No syntax errors

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: configure Starlight to use custom CSS and theme settings"
```

---

### Task 3: Rewrite Homepage with Minimalist Hero

**Files:**
- Modify: `src/content/docs/index.mdx`

**Interfaces:**
- Consumes: Starlight Hero component, Card component
- Produces: Minimalist homepage with centered Hero and simple navigation

- [ ] **Step 1: Read current index.mdx**

```bash
cat src/content/docs/index.mdx
```

- [ ] **Step 2: Rewrite with minimalist Hero**

Replace entire content of `src/content/docs/index.mdx`:

```mdx
---
title: Kit Docs
description: 个人知识库与读书笔记
template: splash
hero:
  tagline: Java、中间件、AI 等技术知识整理与读书笔记
  actions:
    - text: 开始阅读
      link: /knowledges/java/spring
      icon: right-arrow
    - text: GitHub
      link: https://github.com/kittsai/kittsai.github.io
      icon: external
      variant: minimal
---

import { Card, CardGrid } from '@astrojs/starlight/components';

## 知识笔记

<CardGrid>
  <Card title="Java" icon="seti:java">
    - [Spring](/knowledges/java/spring) - 框架核心：IOC、AOP、Bean 生命周期
    - [Java并发](/knowledges/java/java-concurrency) - 线程、锁、并发工具
    - [Java集合](/knowledges/java/java-collections) - Collection 与 Map
    - [JVM](/knowledges/java/jvm) - 内存模型、垃圾回收
  </Card>
  <Card title="中间件" icon="puzzle">
    - [MySQL](/knowledges/middleware/mysql) - 索引、事务、锁、MVCC
    - [Redis](/knowledges/middleware/redis) - 数据结构、持久化、集群
  </Card>
</CardGrid>

## 读书记录

<CardGrid>
  <Card title="Spring AI in Action" icon="open-book">
    - [第1章](/books/spring-ai-in-action/ch1) - Spring AI 入门
    - [第2章](/books/spring-ai-in-action/ch2) - 评估生成的响应
    - [第3章](/books/spring-ai-in-action/ch3) - 向生成提交提示
    - [第4章](/books/spring-ai-in-action/ch4) - 与文档对话
  </Card>
</CardGrid>
```

- [ ] **Step 3: Verify MDX syntax**

Run: `npx astro check`
Expected: No errors (or only warnings unrelated to index.mdx)

- [ ] **Step 4: Commit**

```bash
git add src/content/docs/index.mdx
git commit -m "feat: rewrite homepage with minimalist Hero layout"
```

---

### Task 4: Build and Verify

**Files:**
- No new files (verification only)

**Interfaces:**
- Consumes: All files from Tasks 1-3
- Produces: Verified build with new styling

- [ ] **Step 1: Start dev server in background**

```bash
astro dev --background
```

- [ ] **Step 2: Check dev server is running**

```bash
astro dev status
```
Expected: Server is running

- [ ] **Step 3: Test homepage loads**

Run: `curl -s http://localhost:4321/ | head -50`
Expected: HTML response with Hero section

- [ ] **Step 4: Test a content page**

Run: `curl -s http://localhost:4321/knowledges/java/spring/ | head -50`
Expected: HTML response with content

- [ ] **Step 5: Stop dev server**

```bash
astro dev stop
```

- [ ] **Step 6: Run production build**

Run: `npm run build`
Expected: Build completes successfully

- [ ] **Step 7: Verify build output**

Run: `ls -la dist/`
Expected: dist directory with HTML files

---

## Self-Review Checklist

- [x] **Spec coverage:** All 5 goals covered - dual theme (Task 1), Hero (Task 3), sidebar (Task 1), content typography (Task 1), Starlight compatibility (Task 2)
- [x] **Placeholder scan:** No TBD/TODO found. All steps have complete code.
- [x] **Type consistency:** CSS variable names consistent across light/dark themes. File paths consistent.
- [x] **Scope check:** Single implementation plan, appropriate for this focused UI redesign.
