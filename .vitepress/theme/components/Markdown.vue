<script setup lang="ts">
import MarkdownIt from "markdown-it";
import { computed } from "vue";

const props = defineProps<{
  content: string;
  unwrap?: boolean;
}>();

const md = new MarkdownIt({ html: true });
if (props.unwrap) {
  md.renderer.rules.paragraph_open = () => "";
  md.renderer.rules.paragraph_close = () => "";
}

const renderedContent = computed(() => md.render(props.content));
</script>

<template>
  <div v-html="renderedContent"></div>
</template>
