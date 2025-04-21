<script setup lang="ts">
/* 
  ** DEPRECATED ** 
  This component has been superseded by the integrated DownloadPage component
  with multilingual support. This file is kept for reference only.
*/

const props = defineProps<{
  branch: string
}>()

const statusMap = {
  "eol": ["1.21.1", "1.20.4"],
  "dead": [
    "1.21.3", "1.20.6", "1.21", "1.20.2", "1.20.1", "1.20",
    "1.19.4", "1.19.3", "1.19.2", "1.19.1", "1.19",
    "1.18.2"
  ]
}

</script>

<template>
  <div class="warn">

    <div class="warn-card dead" v-if="statusMap.dead.includes(branch)">
      <div class="warn-icon">
        <Icon icon="lucide:alert-triangle" width="1.3rem" height="1.3rem" />
      </div>
      <div class="warn-content">
        This version of Leaf is <b>unsupported</b> and will not receive any bugfixes.
        <b>Use at your own risk!</b>
      </div>
    </div>

    <div class="warn-card eol" v-if="statusMap.eol.includes(branch)">
      <div class="warn-icon">
        <Icon icon="lucide:alert-circle" width="1.3rem" height="1.3rem" />
      </div>
      <div class="warn-content">
        This version of Leaf is <b>end-of-life</b> and will only receive critical bugfixes from upstream.
        Update to latest version and gain better performance!
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">

.warn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}

.warn-card {
  width: 100%;
  max-width: 560px;
  color: var(--vp-c-text-1);
  background: var(--bg);
  border-left: 4px solid var(--color);
  padding: 1rem 1.2rem;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  animation: slideIn 0.4s ease-out;
  
  .warn-icon {
    margin-top: 0.1rem;
    color: var(--color);
    flex-shrink: 0;
  }
  
  .warn-content {
    line-height: 1.5;
  }
}

.eol {
  --bg: var(--vp-c-warning-soft);
  --color: var(--vp-c-warning-1)
}

.dead {
  --bg: var(--vp-c-danger-soft);
  --color: var(--vp-c-danger-1)
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .warn-card {
    padding: 0.8rem 1rem;
    gap: 0.8rem;
    font-size: 0.95rem;
  }
}

</style>