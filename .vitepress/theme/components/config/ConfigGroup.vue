<script setup lang="ts">
import { ref, toRefs } from "vue";
import ConfigViewer from "./ConfigViewer.vue";

let props = defineProps<{
  data: { [ver: string]: any };
}>();

const { data } = toRefs(props);

const selectedVer = ref(Object.keys(props.data)[0]);
</script>

<template>
  <div class="switch">
    <button
      v-for="configVer in Object.keys(data)"
      @click="selectedVer = configVer"
      :class="{ selected: selectedVer == configVer }"
    >
      {{ configVer }}
    </button>
  </div>

  <ConfigViewer :data="data[selectedVer]" :version="selectedVer" />
</template>
