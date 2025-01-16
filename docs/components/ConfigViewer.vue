<script setup lang="ts">
import ConfigViewerNode from './ConfigViewerNode.vue'
import { Ref, ref } from 'vue'
import IconExpand from './icons/IconExpand.vue'
import IconCollapse from './icons/IconCollapse.vue'

const props = defineProps({
  data: Object,
  name: String,
})

const node: Ref<ConfigViewerNode> = ref()

function expandAll() {
  node.value.expandAll()
}

function collapseAll() {
  node.value.collapseAll()
}
</script>

<template>
  <div class="config-lang-yml vp-adaptive-theme">
    <span class="lang"
      >{{ name }}
      <div style="text-align: end; display: flex; flex-wrap: nowrap; gap: 8px; margin-left: 6px; margin-top: 6px;">
        <IconExpand role="button" aria-label="Expand all" @click="expandAll" style="width: 20px; height: 20px" />
        <IconCollapse role="button" aria-label="Collapse all" @click="collapseAll" style="width: 20px; height: 20px" />
      </div>
    </span>
    <pre
      class="shiki shiki-themes github-light github-dark vp-code"
    ><code class="config-code-block"><ConfigViewerNode
      ref="node" :data="data" :padding="false" parent="" /></code></pre>
  </div>
</template>

<style>
.config-code-block {
  display: block;
  padding: 0 24px;
  width: fit-content;
  min-width: 100%;
  line-height: var(--vp-code-line-height);
  font-size: var(--vp-code-font-size);
  color: var(--vp-code-block-color);
  transition: color 0.5s;

  font-weight: 400;
  background-color: transparent;

  /*rtl:ignore*/
  direction: ltr;
  /*rtl:ignore*/
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

.vp-doc .custom-block div[class*='config-lang-'] {
  margin: 8px 0;
  border-radius: 8px;
}

.vp-doc div[class*='config-lang-'] {
  position: relative;
  margin: 16px -24px;
  background-color: var(--vp-code-block-bg);
  overflow-x: auto;
  transition: background-color 0.5s;
}

@media (min-width: 640px) {
  .vp-doc div[class*='config-lang-'] {
    border-radius: 8px;
    margin: 16px 0;
  }
}

@media (max-width: 639px) {
  .vp-doc li div[class*='config-lang-'] {
    border-radius: 8px 0 0 8px;
  }
}

.vp-doc div[class*='config-lang-'] + div[class*='config-lang-'],
.vp-doc div[class$='-api'] + div[class*='config-lang-'],
.vp-doc
  div[class*='config-lang-']
  + div[class$='-api']
  > div[class*='config-lang-'] {
  margin-top: -8px;
}

.vp-doc [class*='config-lang-'] pre {
  /*rtl:ignore*/
  direction: ltr;
  /*rtl:ignore*/
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

.vp-doc [class*='config-lang-'] pre {
  position: relative;
  z-index: 1;
  margin: 0;
  padding: 20px 0;
  background: transparent;
  overflow-x: auto;
}

.vp-doc [class*='config-lang-'] .has-focused-lines .line:not(.has-focus) {
  filter: blur(0.095rem);
  opacity: 0.4;
  transition:
    filter 0.35s,
    opacity 0.35s;
}

.vp-doc [class*='config-lang-'] .has-focused-lines .line:not(.has-focus) {
  opacity: 0.7;
  transition:
    filter 0.35s,
    opacity 0.35s;
}

.vp-doc [class*='config-lang-'] > button.copy {
  /*rtl:ignore*/
  direction: ltr;
  position: absolute;
  top: 12px;
  /*rtl:ignore*/
  right: 12px;
  z-index: 3;
  border: 1px solid var(--vp-code-copy-code-border-color);
  border-radius: 4px;
  width: 40px;
  height: 40px;
  background-color: var(--vp-code-copy-code-bg);
  opacity: 0;
  cursor: pointer;
  background-image: var(--vp-icon-copy);
  background-position: 50%;
  background-size: 20px;
  background-repeat: no-repeat;
  transition:
    border-color 0.25s,
    background-color 0.25s,
    opacity 0.25s;
}

.vp-doc [class*='config-lang-']:hover > button.copy,
.vp-doc [class*='config-lang-'] > button.copy:focus {
  opacity: 1;
}

.vp-doc [class*='config-lang-'] > button.copy:hover,
.vp-doc [class*='config-lang-'] > button.copy.copied {
  border-color: var(--vp-code-copy-code-hover-border-color);
  background-color: var(--vp-code-copy-code-hover-bg);
}

.vp-doc [class*='config-lang-'] > button.copy.copied,
.vp-doc [class*='config-lang-'] > button.copy:hover.copied {
  /*rtl:ignore*/
  border-radius: 0 4px 4px 0;
  background-color: var(--vp-code-copy-code-hover-bg);
  background-image: var(--vp-icon-copied);
}

.vp-doc [class*='config-lang-'] > button.copy.copied::before,
.vp-doc [class*='config-lang-'] > button.copy:hover.copied::before {
  position: relative;
  top: -1px;
  /*rtl:ignore*/
  transform: translateX(calc(-100% - 1px));
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--vp-code-copy-code-hover-border-color);
  /*rtl:ignore*/
  border-right: 0;
  border-radius: 4px 0 0 4px;
  padding: 0 10px;
  width: fit-content;
  height: 40px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-code-copy-code-active-text);
  background-color: var(--vp-code-copy-code-hover-bg);
  white-space: nowrap;
  content: var(--vp-code-copy-copied-text-content);
}

.vp-doc [class*='config-lang-'] > span.lang {
  position: absolute;
  top: 2px;
  /*rtl:ignore*/
  right: 8px;
  z-index: 2;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-code-lang-color);
  transition:
    color 0.4s,
    opacity 0.4s;
}

.vp-doc [class*='config-lang-']:hover > button.copy + span.lang,
.vp-doc [class*='config-lang-'] > button.copy:focus + span.lang {
  opacity: 0;
}
</style>
