<script setup lang="ts">

import {ref} from "vue";

const props = defineProps<{
  branches: Array<string>
  initSelected: string
}>()

const selected = ref(props.initSelected)

const emit = defineEmits(['updateSelected']);

const updateSelected = (branch: string) => {
  selected.value = branch;
  emit('updateSelected', branch);
};
</script>

<template>
  <div class="switch">
    <button
        v-for="branch in branches"
        :class="{selected: selected === branch}"
        @click="updateSelected(branch)"
    >{{ branch }}</button>
  </div>
</template>

<style scoped lang="scss">

.switch {

  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  button {
    background: var(--vp-c-bg-elv);
    width: 5rem;
    border-radius: 4px;
    font-size: 14px;
    font-family: "JetBrains Mono", monospace;
    padding: 0.25rem 0.5rem;
    transition: 150ms all;
    border: 1px solid transparent;
    &:hover {
      border: 1px solid var(--vp-c-divider);
    }
  }
  .selected {
    border: 1px solid var(--vp-c-brand-3) !important;
  }
}

</style>