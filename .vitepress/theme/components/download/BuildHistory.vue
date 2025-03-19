<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import BuildCard from "./BuildCard.vue";

const runs = ref([]);
const props = defineProps<{
  branch: string
}>()
const loaded = ref(false);

const branch = computed(() => props.branch)

const fetchData = () => {
  loaded.value = false;
  fetch(`https://api.github.com/repos/Winds-Studio/Leaf/actions/runs?event=push&branch=ver/${branch.value}`)
      .then(resp => resp.json())
      .then(data => {
        runs.value = data['workflow_runs'].filter(item => item['event'] === 'push');
      })
      .finally(() => { loaded.value = true });
}

watch(branch, fetchData)
onMounted(fetchData)
</script>

<template>
  <div class="actions_container" v-if="loaded && runs.length">
    <BuildCard v-for="item in runs" :key="item.id" :data="item" />
  </div>
  <div class="error-text" v-else>
    <span>{{ loaded ? 'Build history not found.' : 'Loading...' }}</span>
    <a :href="`https://github.com/Winds-Studio/Leaf/tree/ver/${branch}`" target="_blank">View this branch on GitHub</a>
  </div>
</template>

<style scoped>

.actions_container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.error-text {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
}

</style>
