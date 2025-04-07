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