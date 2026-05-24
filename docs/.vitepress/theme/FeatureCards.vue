<script setup>
import coverImg from '../../books/spring-ai-in-action/cover.jpg'

const books = [
  {
    title: 'Spring AI in Action',
    author: 'Craig Walls',
    cover: coverImg,
    link: '/books/'
  }
]

const notes = [
  { title: 'Java集合', link: '/knowledges/Java/Java集合' },
  { title: 'Java并发', link: '/knowledges/Java/Java并发' }
]
</script>

<template>
  <div class="feature-cards">
    <div class="feature-card">
      <div class="card-header">
        <h3>📚 读书记录</h3>
        <a href="/books/" class="view-all">查看全部 →</a>
      </div>
      <div class="book-scroll">
        <a v-for="book in books" :key="book.title" :href="book.link" class="book-item">
          <div class="book-cover">
            <img :src="book.cover" :alt="book.title" />
          </div>
          <div class="book-meta">
            <h4>{{ book.title }}</h4>
            <p>{{ book.author }}</p>
          </div>
        </a>
      </div>
    </div>

    <div class="feature-card">
      <div class="card-header">
        <h3>📝 知识笔记</h3>
        <a href="/knowledges/" class="view-all">查看全部 →</a>
      </div>
      <div class="note-scroll">
        <a v-for="note in notes" :key="note.link" :href="note.link" class="note-item">
          {{ note.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 768px) {
  .feature-cards {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
}

.view-all {
  font-size: 13px;
  color: var(--vp-c-brand);
  text-decoration: none;
}

.view-all:hover {
  text-decoration: underline;
}

.book-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 0 16px 16px;
  scrollbar-width: thin;
}

.book-scroll::-webkit-scrollbar {
  height: 4px;
}

.book-scroll::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 2px;
}

.book-item {
  flex: 0 0 120px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}

.book-item:hover {
  transform: translateY(-2px);
}

.book-cover {
  width: 120px;
  height: 160px;
  border-radius: 6px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-meta {
  padding: 8px 0 0;
}

.book-meta h4 {
  margin: 0;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-meta p {
  margin: 2px 0 0;
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.note-scroll {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 200px;
  overflow-y: auto;
  padding: 0 12px 12px;
  scrollbar-width: thin;
}

.note-scroll::-webkit-scrollbar {
  width: 4px;
}

.note-scroll::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 2px;
}

.note-item {
  display: block;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}

.note-item:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
}
</style>
