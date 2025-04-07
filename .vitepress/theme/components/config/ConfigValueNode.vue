<script setup lang="ts">

import {ConfigValue } from "./config";
import {inject, Ref, ref, watch} from "vue";
import Markdown from "../Markdown.vue";

const props = defineProps<{
  node: ConfigValue
}>()

const opened = ref(false)

const inlineValue = props.node.default.split("\n")[0]
const otherValue = props.node.default.split("\n").slice(1)

const stateEmitter = inject<Ref<'expand' | 'collapse' | ''>>('stateEmitter')
watch(stateEmitter, val => {
  if (val == 'expand') opened.value = true
  if (val == 'collapse') opened.value = false
})

const collapse = inject<Ref<Number>>('collapse')
watch(collapse, val => {
  if (val == 1) opened.value = false
})
</script>

<template>
  <div class="valueNode">

    <button @click="opened = !opened" class="nameAndValue">
      <span class="nodeName">{{ node.name }}<span class="colon">:</span></span>
      <span class="nodeInlineValue" :class='{string: isNaN(parseFloat(inlineValue)) }'>{{ inlineValue }}</span>
      <span class="openedIndicator" v-if="node.description" :class="{ opened }">▶</span>
    </button>
    <div style="margin-left: 1rem;" class="nodeOtherValue">{{ otherValue.join("\n") }}</div>

    <Markdown v-if="opened && node.description" class="description" :content="node.description" />
  </div>
</template>

<style scoped lang="scss">

.valueNode {
  display: flex;
  flex-direction: column;
}

.nameAndValue {
  font-family: inherit;
  font-size: inherit;
  display: flex;
  gap: 6px;

  .nodeName {
    white-space: nowrap;
    color: var(--vp-c-brand-1);
    .colon {
      color: var(--vp-c-text-3);
    }
  }

  .nodeInlineValue {
    white-space: nowrap;
    color: var(--vp-c-indigo-1);
    &.string {
      color: var(--vp-c-green-1);
    }
  }
}

.nodeOtherValue {
  color: var(--vp-c-green-1);
  white-space: preserve-breaks;
}

.openedIndicator {
  font-size: 12px;
  transition: 100ms ease-in-out;
  &.opened {
    transform: rotate(90deg);
  }
  margin-left: .25rem;
  color: var(--vp-c-text-3);
}

.description {
  background-color: var(--vp-c-bg-elv);
  font-family: var(--vp-font-family-base), serif;
  color: var(--vp-c-text-1);
  padding: .5rem .75rem;
  margin: .25rem 0;
  border-left: 4px solid var(--vp-c-brand-3);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  * {
    margin: 0;
    line-height: 26px;
  }
}

</style>