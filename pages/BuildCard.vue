<script setup lang="ts">
import {computed, ref} from "vue";
import {useData} from "vitepress";

const expanded = ref(false)
const isDark = useData().isDark

const props = defineProps<{
  data: {
    created_at?: string,
    head_branch?: string,
    html_url?: string
    id?: string
    head_commit?: {
      message: string
      id: string
    }
  }
}>()

const commitMessage = computed(() => {
  if (expanded.value) {
    return props.data.head_commit?.message
  } else {
    return props.data.head_commit?.message?.split('\n')[0] + (props.data.head_commit?.message?.includes('\n') ? '\n...' : '')
  }
})
</script>

<template>
  <div class="action_container" >
    Date: {{ new Date(data.created_at).toLocaleDateString() }}
    &bull;
    Branch: <a :href="`https://github.com/Winds-Studio/Leaf/tree/${data.head_branch}`">{{ data.head_branch }}</a>
    &bull;
    Commit: <a v-if="data.head_commit" :href="`https://github.com/Winds-Studio/Leaf/commit/${data.head_commit.id}`">{{ data.head_commit.id.slice(0, 7) }}</a>
    &bull;
    Action: <a :href="data.html_url">{{ data.id }}</a>

    <pre class="changes" :class="{ expanded }">{{ commitMessage }}</pre>
    <button v-if="data.head_commit?.message?.includes('\n')" @click="expanded = !expanded" :class="{ dark: isDark }">
      {{ expanded ? 'Read Less' : 'Read More' }}
    </button>
  </div>
</template>

<style scoped lang="scss">

.action_container {
  background-color: rgba(0, 0, 0, 0.04);
  padding: 20px;
  border-radius: 8px;
}

.dark .action_container {
  background-color: rgba(0, 0, 0, 0.12);
}

.changes {
  margin-bottom: 0;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.04);
  white-space: pre-wrap;
}

.dark .changes {
  background-color: rgba(0, 0, 0, 0.12);
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: var(--vp-c-brand-3);
  color: var(--vp-c-white);
  cursor: pointer;
  &:hover {
    background-color: var(--vp-c-brand-2);
  }
}

</style>