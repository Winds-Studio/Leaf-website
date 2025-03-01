<script setup>
import {ref} from "vue";
import BuildCard from "./BuildCard.vue";

const result = ref([]);
const loaded = ref(false);

fetch('https://api.github.com/repos/Winds-Studio/Leaf/actions/runs?event=push')
  .then(resp => resp.json())
  .then(data => {
    result.value = data['workflow_runs'].filter(item => item['event'] === 'push');
  })
  .finally(() => { loaded.value = true });
</script>

<template>
  <div class="actions_container" v-if="loaded && result.length">
    <BuildCard v-for="item in result" :key="item.id" :data="item" />
  </div>
  <div v-else>
    {{ loaded ? 'No results found.' : 'Loading...' }}
  </div>
</template>

<style scoped>

.actions_container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

</style>
