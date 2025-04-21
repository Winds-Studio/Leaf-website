<script setup lang="ts">
/* 
  ** DEPRECATED ** 
  This component has been superseded by the integrated DownloadPage component
  with multilingual support. This file is kept for reference only.
*/
import {computed, onMounted, ref, watch} from "vue";
import BuildCard from "./BuildCard.vue";
import { Icon } from "@iconify/vue";

interface WorkflowRun {
  id: string;
  created_at?: string;
  head_branch?: string;
  html_url?: string;
  head_commit?: {
    message: string;
    id: string;
  }
}

const runs = ref<WorkflowRun[]>([]);
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
        runs.value = data['workflow_runs'].filter((item: any) => item['event'] === 'push');
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
  <div class="empty-state" v-else-if="loaded">
    <Icon icon="lucide:history" width="2rem" height="2rem" />
    <span>Build history not found.</span>
    <a :href="`https://github.com/Winds-Studio/Leaf/tree/ver/${branch}`" target="_blank" class="github-link">
      <Icon icon="lucide:github" width="0.9rem" height="0.9rem" />
      View this branch on GitHub
    </a>
  </div>
  <div class="loading-state" v-else>
    <div class="spinner"></div>
    <span>Loading build history...</span>
  </div>
</template>

<style scoped lang="scss">

.actions_container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeIn 0.5s ease;
}

.empty-state, .loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3rem 0;
  padding: 2rem;
  gap: 1rem;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  
  span {
    color: var(--vp-c-text-2);
    font-size: 1.05rem;
  }
  
  svg {
    color: var(--vp-c-text-3);
  }
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--vp-c-bg-alt);
    transform: translateY(-2px);
  }
}

.spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid rgba(var(--vp-c-brand-rgb), 0.2);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>
