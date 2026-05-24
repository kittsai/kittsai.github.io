import DefaultTheme from 'vitepress/theme'
import FeatureCards from './FeatureCards.vue'
import KnowledgeGraph from './KnowledgeGraph.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('FeatureCards', FeatureCards)
    app.component('KnowledgeGraph', KnowledgeGraph)
  }
}
