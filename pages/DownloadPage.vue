<script setup lang="ts">
import {ref} from "vue";
import BranchSwitch from "./BranchSwitch.vue";
import BuildHistory from "./BuildHistory.vue";
import DownloadButton from "./DownloadButton.vue";
import BranchWarn from "./BranchWarn.vue";

const branches = ref<Array<string>>([]);
const selected = ref<string>();

function parseBranches(ghApiBranches: Array<GhApiBranch>) {
  for (const ghApiBranch of ghApiBranches) {
    const name: string = ghApiBranch.name
    if (!name.startsWith("ver/")) continue
    branches.value.push(name.slice(4))
  }
  branches.value = branches.value.reverse()
  selected.value = branches.value[0]
}

fetch('https://api.github.com/repos/Winds-Studio/Leaf/branches')
    .then(resp => resp.json())
    .then(parseBranches)

const updateSelected = (newSelected: string) => selected.value = newSelected
</script>

<template>
  <BranchSwitch :branches="branches" v-if="branches.length > 0" :init-selected="selected" @update-selected="updateSelected" />
  <template v-if="selected">
    <BranchWarn :branch="selected" />
    <DownloadButton :branch="selected" />
    <BuildHistory :branch="selected" />
  </template>
</template>

<style scoped lang="scss">

</style>