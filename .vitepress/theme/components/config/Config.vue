<script setup lang="ts">

import {serializeConfig} from "./config";
import ConfigNode from "./ConfigNode.vue";

const props = defineProps<{
  data: any
}>()

const config = serializeConfig(props.data)

</script>

<template>
  <div class="code-block">
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