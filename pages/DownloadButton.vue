<script setup lang="ts">

import {computed, onMounted, ref, watch} from "vue";
import DownloadIcon from "./DownloadIcon.vue";

const fileInfo = ref<{ name: string, url: string }>({name: null, url: null});
const props = defineProps<{
  branch: string
}>()
const loaded = ref(false);

const branch = computed(() => props.branch)

const fetchData = () => {
  loaded.value = false;
  fetch(`https://api.github.com/repos/Winds-Studio/Leaf/releases/tags/ver-${branch.value}`)
      .then(resp => resp.json())
      .then(data => {
        if (data.assets?.[0]) {
          fileInfo.value.name = data.assets[0].name
          fileInfo.value.url = data.assets[0].browser_download_url
        }
      })
      .finally(() => { loaded.value = true });
}

watch(branch, fetchData)
onMounted(fetchData)
</script>

<template>
  <div class="download-button-container" v-if="loaded && fileInfo.name && fileInfo.url">
    <a :href="fileInfo.url">
      <button>
        <DownloadIcon />
        <span class="texts">
          <span class="title">Download {{ fileInfo.name }}</span>
        </span>
      </button>
    </a>
  </div>
</template>

<style scoped lang="scss">

.download-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 2rem 0;

  a {
    all: unset;
  }

  button {
    color: white;
    background-color: var(--vp-c-brand-3);
    &:hover {
      background-color: var(--vp-c-brand-2);
    }
    &:active {
      background-color: var(--vp-c-brand-1);
    }
    transition: 150ms;
    display: flex;
    flex-direction: row;
    gap: .5rem;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 6px;


    .texts {
      display: flex;
      gap: 1rem;
      align-items: center;
      .title {
        color: var(--vp-c-white);
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
}

</style>