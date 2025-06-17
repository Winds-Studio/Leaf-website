<script setup lang="ts">
import { ConfigElement, ConfigSection, ConfigValue } from "./config";
import ConfigValueNode from "./ConfigValueNode.vue";
import ConfigSectionNode from "./ConfigSectionNode.vue";

const props = defineProps<{
  node: ConfigElement;
}>();
</script>

<template>
  <ConfigValueNode :node v-if="node instanceof ConfigValue" />
  <ConfigSectionNode :node v-else-if="node instanceof ConfigSection" />
</template>
