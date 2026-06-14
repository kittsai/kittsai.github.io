<script setup>
import coverImg from '../../books/spring-ai-in-action/cover.jpg'

const noteCategories = [
  {
    name: 'Java',
    icon: '☕',
    articles: [
      { title: 'Java集合', link: '/knowledges/Java/Java集合' },
      { title: 'Java并发', link: '/knowledges/Java/Java并发' },
      { title: 'JVM', link: '/knowledges/Java/JVM' },
      { title: 'Spring', link: '/knowledges/Java/Spring' },
    ]
  },
  {
    name: '中间件',
    icon: '🔧',
    articles: [
      { title: 'MySQL', link: '/knowledges/中间件/MySQL' },
      { title: 'Redis', link: '/knowledges/中间件/Redis' },
    ]
  }
]

const books = [
  {
    title: 'Spring AI in Action',
    author: 'Craig Walls',
    cover: coverImg,
    link: '/books/'
  }
]

const totalArticles = noteCategories.reduce((sum, cat) => sum + cat.articles.length, 0)
const totalCategories = noteCategories.length
const totalBooks = books.length
</script>

<template>
  <div class="home-page">
    <!-- Stats Bar -->
    <div class="stats-bar">
      <div class="stat-item">
        <div class="stat-number">{{ totalArticles }}</div>
        <div class="stat-label">篇文章</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ totalCategories }}</div>
        <div class="stat-label">个分类</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ totalBooks }}</div>
        <div class="stat-label">本书</div>
      </div>
    </div>

    <div class="content-section">
      <!-- Notes Section -->
      <div class="section">
        <div class="section-header">
          <h3>📝 知识笔记</h3>
          <a href="/knowledges/" class="view-all">查看全部 →</a>
        </div>
        <div class="notes-grid">
          <div v-for="category in noteCategories" :key="category.name" class="category-card">
            <div class="category-header">
              <span class="category-icon">{{ category.icon }}</span>
              <span class="category-name">{{ category.name }}</span>
              <span class="article-count">{{ category.articles.length }} 篇</span>
            </div>
            <div class="article-list">
              <a
                v-for="article in category.articles"
                :key="article.link"
                :href="article.link"
                class="article-link"
              >
                {{ article.title }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Books Section -->
      <div class="section">
        <div class="section-header">
          <h3>📚 读书记录</h3>
          <a href="/books/" class="view-all">查看全部 →</a>
        </div>
        <div class="books-row">
          <a
            v-for="book in books"
            :key="book.title"
            :href="book.link"
            class="book-card"
          >
            <div class="book-cover">
              <img :src="book.cover" :alt="book.title" />
            </div>
            <div class="book-info">
              <div class="book-title">{{ book.title }}</div>
              <div class="book-author">{{ book.author }}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Stats Bar */
.stats-bar {
  display: flex;
  justify-content: center;
  gap: 48px;
  padding: 24px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
}

.stat-label {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-top: 2px;
}

/* Content Section */
.content-section {
  padding: 32px 0;
}

.section {
  margin-bottom: 36px;
}

.section:last-child {
  margin-bottom: 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-header h3 {
  margin: 0;
  font-size: 18px;
}

.view-all {
  font-size: 13px;
  color: #667eea;
  text-decoration: none;
}

.view-all:hover {
  text-decoration: underline;
}

/* Notes Grid */
.notes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 768px) {
  .notes-grid {
    grid-template-columns: 1fr;
  }
}

.category-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  transition: box-shadow 0.2s;
}

.category-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.category-icon {
  font-size: 20px;
}

.category-name {
  font-size: 15px;
  font-weight: 600;
}

.article-count {
  margin-left: auto;
  font-size: 11px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 2px 8px;
  border-radius: 4px;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.article-link {
  font-size: 13px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 4px;
  display: block;
  transition: background 0.2s, color 0.2s;
}

.article-link:hover {
  background: var(--vp-c-bg-soft);
  color: #667eea;
}

/* Books Row */
.books-row {
  display: flex;
  gap: 20px;
}

@media (max-width: 768px) {
  .books-row {
    overflow-x: auto;
    padding-bottom: 8px;
    scrollbar-width: thin;
  }
}

.book-card {
  width: 160px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.book-cover {
  height: 200px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-info {
  padding: 12px;
}

.book-title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 2px;
}

.book-author {
  font-size: 11px;
  color: var(--vp-c-text-3);
}
</style>
