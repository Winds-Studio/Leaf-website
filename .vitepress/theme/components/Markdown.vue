<script setup>
import MarkdownIt from 'markdown-it';
import { computed } from 'vue';

const props = defineProps({
  content: String
});

const md = new MarkdownIt({ html: true });
const renderedContent = computed(() => md.render(props.content));
</script>

<template>
  <div v-html="renderedContent"></div>
</template>