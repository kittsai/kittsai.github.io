---
layout: doc
title: 读书记录
---

# 📚 读书记录

<div class="bookshelf">
  <div class="book-card">
    <div class="book-cover">
      <img src="./spring-ai-in-action/cover.jpg" alt="Spring AI in Action" />
    </div>
    <div class="book-info">
      <h3 class="book-title">Spring AI in Action</h3>
      <p class="book-author">Craig Walls</p>
      <div class="book-chapters collapsed">
        <a href="/books/spring-ai-in-action/Spring_AI_in_Action_第1章_中文翻译" class="chapter-link">第1章 - Spring AI 简介</a>
        <a href="/books/spring-ai-in-action/Spring_AI_in_Action_第2章_中文翻译" class="chapter-link">第2章 - 开始使用 Spring AI</a>
        <a href="/books/spring-ai-in-action/Spring_AI_in_Action_第3章_中文翻译" class="chapter-link">第3章 - AI 模型集成</a>
        <a href="/books/spring-ai-in-action/Spring_AI_in_Action_第4章_中文翻译" class="chapter-link">第4章 - 高级特性</a>
      </div>
      <button class="toggle-btn" onclick="this.previousElementSibling.classList.toggle('collapsed'); this.textContent = this.textContent === '展开全部' ? '收起' : '展开全部'">展开全部</button>
    </div>
  </div>
</div>

<style>
.bookshelf {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 24px;
}
.book-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.3s, transform 0.3s;
  background: var(--vp-c-bg);
  text-decoration: none;
  color: inherit;
  display: block;
}
.book-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}
.book-cover {
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}
.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.book-info {
  padding: 16px;
}
.book-title {
  margin: 0 0 4px;
  font-size: 18px;
}
.book-author {
  margin: 0 0 12px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}
.book-chapters {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 500px;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.book-chapters.collapsed {
  max-height: 70px;
}
.chapter-link {
  font-size: 13px;
  color: var(--vp-c-brand);
  text-decoration: none;
}
.chapter-link:hover {
  text-decoration: underline;
}
.toggle-btn {
  background: none;
  border: none;
  color: var(--vp-c-text-3);
  font-size: 12px;
  cursor: pointer;
  padding: 4px 0;
  margin-top: 4px;
}
.toggle-btn:hover {
  color: var(--vp-c-brand);
}
</style>
