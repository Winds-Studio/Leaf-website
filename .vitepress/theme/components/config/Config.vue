<script setup lang="ts">

import {serializeConfig} from "./config";
import ConfigNode from "./ConfigNode.vue";
import {computed, toRefs} from "vue";

const props = defineProps<{
  data: any,
  version: string
}>()

const config = computed(() => serializeConfig(props.data))
const { version } = toRefs(props)
</script>

<template>
  <div class="code-block" :key="version">
    <ConfigNode :node="childNode" v-for="childNode in config" />
  </div>
</template>

<style scoped lang="scss">

.code-block {
  font-family: var(--vp-font-family-mono), monospace;
  background-color: var(--vp-c-bg-alt);
  padding: 1rem 1rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  //width: fit-content;
  overflow-x: scroll;
}

</style>