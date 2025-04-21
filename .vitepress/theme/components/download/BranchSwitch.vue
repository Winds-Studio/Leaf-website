<script setup lang="ts">
/* 
  ** DEPRECATED ** 
  This component has been superseded by the integrated DownloadPage component
  with multilingual support. This file is kept for reference only.
*/
import {ref} from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  branches: Array<string>
  initSelected: string | undefined
}>()

const selected = ref(props.initSelected)

const emit = defineEmits(['updateSelected']);

const updateSelected = (branch: string) => {
  selected.value = branch;
  emit('updateSelected', branch);
};
</script>

<template>
  <div class="branch-switch-container">
    <div class="switch-label">
      <Icon icon="lucide:versions" width="1.1rem" height="1.1rem" /> 
      Minecraft Version:
    </div>
    <div class="switch">
      <button
          v-for="branch in branches"
          :key="branch"
          :class="['branch-button', {'selected': selected === branch}]"
          @click="updateSelected(branch)"
      >{{ branch }}</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.branch-switch-container {
  margin: 1.5rem 0 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.switch-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  
  svg {
    color: var(--vp-c-brand-1);
  }
}

.switch {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: flex-start;
  align-items: center;
  
  @media (max-width: 640px) {
    justify-content: center;
  }
}

.branch-button {
  padding: 0.6rem 0.9rem;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0));
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background-color: var(--vp-c-bg-mute);
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    
    &::before {
      opacity: 1;
    }
  }
  
  &.selected {
    background-color: var(--vp-c-brand-1);
    color: white;
    border-color: var(--vp-c-brand-1);
    transform: translateY(-2px);
    box-shadow: 0 3px 10px rgba(var(--vp-c-brand-rgb), 0.3);
    
    &:hover {
      background-color: var(--vp-c-brand-2);
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
}
</style>