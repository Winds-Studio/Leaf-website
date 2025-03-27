<script setup lang="ts">

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
      This version of Leaf is <b>unsupported</b> and will not receive any bugfixes.
      <b>Use at your own risk!</b>
    </div>

    <div class="warn-card eol" v-if="statusMap.eol.includes(branch)">
      This version of Leaf is <b>end-of-life</b> and will only receive critical bugfixes from upstream.
      Update to latest version and gain better performance!
    </div>

  </div>
</template>

<style scoped lang="scss">

.warn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.warn-card {
  max-width: 25rem;
  color: var(--vp-c-text-1);
  background: var(--bg);
  border: 1px solid var(--color);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin-top: 2rem;
}

.eol {
  --bg: var(--vp-c-warning-soft);
  --color: var(--vp-c-warning-1)
}

.dead {
  --bg: var(--vp-c-danger-soft);
  --color: var(--vp-c-danger-1)
}

</style>