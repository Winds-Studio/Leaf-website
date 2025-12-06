<script setup lang="ts">
import { ConfigSection } from "./config";
import ConfigNode from "./ConfigNode.vue";
import Markdown from "../Markdown.vue";
import { inject, Ref, ref, watch } from "vue";

const props = defineProps<{
  node: ConfigSection;
}>();

const opened = ref(false);

const stateEmitter = inject<Ref<"expand" | "collapse" | "">>("stateEmitter");
if (stateEmitter) {
  watch(stateEmitter, (val) => {
    if (val == "expand") opened.value = true;
    if (val == "collapse") opened.value = false;
  });
}
</script>

<template>
  <div>
    <button v-if="node.description" @click="opened = !opened" class="nameAndDescription">
      <span class="nodeName">{{ node.name }}<span class="colon">:</span></span>
      <span class="openedIndicator" :class="{ opened }">▶</span>
    </button>
    <span v-else class="nodeName">{{ node.name }}<span class="colon">:</span></span>

    <Markdown v-if="opened && node.description" class="description" :content="node.description" />

    <div v-for="childNode in node.nodes" style="margin-left: 1rem">
      <ConfigNode :node="childNode" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.nameAndDescription {
  font-family: inherit;
  font-size: inherit;
  display: flex;
  gap: 6px;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.nodeName {
  white-space: nowrap;
  color: var(--vp-c-text-2);
  .colon {
    color: var(--vp-c-text-3);
  }
}

.openedIndicator {
  font-size: 12px;
  transition: 100ms ease-in-out;
  &.opened {
    transform: rotate(90deg);
  }
  margin-left: 0.25rem;
  color: var(--vp-c-text-3);
}

.description {
  background-color: var(--vp-c-bg-elv);
  font-family: var(--vp-font-family-base), serif;
  color: var(--vp-c-text-1);
  padding: 0.5rem 0.75rem;
  margin: 0.25rem 0;
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
