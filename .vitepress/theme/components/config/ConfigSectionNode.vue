<script setup lang="ts">

import {ConfigSection} from "./config";
import ConfigNode from "./ConfigNode.vue";

const props = defineProps<{
  node: ConfigSection
}>()

</script>

<template>
  <div>
    <span class="nodeName">{{ node.name }}<span class="colon">:</span></span>
    <div v-for="childNode in node.nodes" style="margin-left: 1rem;">
      <ConfigNode :node="childNode" />
    </div>
  </div>
</template>

<style scoped lang="scss">

.nodeName {
  white-space: nowrap;
  color: var(--vp-c-text-2);
  .colon {
    color: var(--vp-c-text-3);
  }
}

</style>