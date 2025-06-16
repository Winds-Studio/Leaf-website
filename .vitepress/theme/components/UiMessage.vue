<script setup lang="ts">

import {Icon} from "@iconify/vue";

const props = defineProps<{
  type: 'info' | 'error' | 'loading'
  message: string | null
}>()

const icons = {
  'info': 'lucide:info',
  'error': 'lucide:triangle-alert',
  'loading': 'lucide:loader'
}

</script>

<template>
  <div class="message-container" :class="'type-' + type">
    <Icon :icon="icons[type]" :class="{'rotating': type == 'loading'}" class="message-icon" />
    <span>{{ message }}</span>
  </div>
</template>

<style scoped lang="scss">

.message-container {
  display: flex;
  width: 100%;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  height: 16rem;
  background-color: var(--vp-c-bg-alt);
  border-radius: 0.75rem;
  animation: fadein 0.5s ease forwards;

  .message-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .rotating {
    animation: rotate 2s linear infinite;
  }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.type-error {
  color: var(--vp-c-danger-1);
  font-weight: 500;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>