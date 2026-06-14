import DefaultTheme from 'vitepress/theme'
import HomePage from './HomePage.vue'
import KnowledgeGraph from './KnowledgeGraph.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('KnowledgeGraph', KnowledgeGraph)
  }
}
