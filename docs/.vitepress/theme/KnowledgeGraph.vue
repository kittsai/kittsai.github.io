<script setup>
import { ref, nextTick } from 'vue'
import { Markmap } from 'markmap-view'
import { Transformer } from 'markmap-lib'

const svgRef = ref(null)
const expanded = ref(false)

function toggle() {
  expanded.value = !expanded.value
  if (expanded.value) {
    nextTick(() => renderGraph())
  }
}

function renderGraph() {
  const content = document.querySelector('.vp-doc')
  if (!content || !svgRef.value) return

  const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6')
  if (headings.length === 0) return

  let md = ''
  headings.forEach(h => {
    const level = parseInt(h.tagName[1])
    md += `${'#'.repeat(level)} ${h.textContent}\n`
  })

  const transformer = new Transformer()
  const { root } = transformer.transform(md)

  const el = svgRef.value
  el.textContent = ''
  el.setAttribute('width', '100%')
  el.setAttribute('height', '400px')

  Markmap.create(el, null, root)
}
</script>

<template>
  <div class="knowledge-graph">
    <button class="graph-toggle" @click="toggle">
      {{ expanded ? '收起知识图谱' : '查看知识图谱' }}
    </button>
    <div v-show="expanded" class="graph-container">
      <svg ref="svgRef"></svg>
    </div>
  </div>
</template>

<style scoped>
.knowledge-graph {
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.graph-toggle {
  width: 100%;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: var(--vp-c-brand);
  text-align: left;
  font-weight: 500;
}

.graph-toggle:hover {
  background: var(--vp-c-bg-elv);
}

.graph-container {
  padding: 16px;
  overflow: auto;
}

.graph-container svg {
  display: block;
}
</style>
