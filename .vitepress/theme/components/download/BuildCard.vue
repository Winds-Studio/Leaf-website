<script setup lang="ts">
import {computed, ref} from "vue";

const expanded = ref(false)

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
  <div class="action_container">
    <ul>

      <li>
        <span>Date:</span>
        <span>{{ new Date(data.created_at).toLocaleDateString() }}</span>
      </li>

      <li>
        <span>Commit:</span>
        <a v-if="data.head_commit" :href="`https://github.com/Winds-Studio/Leaf/commit/${data.head_commit.id}`" target="_blank">
          {{ data.head_commit.id.slice(0, 7) }}
        </a>
      </li>

      <li>
        <span>Action:</span>
        <a :href="data.html_url" target="_blank">{{ data.id }}</a>
      </li>

    </ul>

    <pre class="changes" :class="{ expanded }">{{ commitMessage }}</pre>
    <button v-if="data.head_commit?.message?.includes('\n')" @click="expanded = !expanded">
      {{ expanded ? 'Read Less' : 'Read More' }}
    </button>

  </div>
</template>

<style scoped lang="scss">

.action_container {
  background-color: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  padding: 20px;
  border-radius: 8px;
}

.changes {
  margin-bottom: 0;
  padding: 10px 20px;
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt);
  white-space: pre-wrap;
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

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem 1rem;
  flex-wrap: wrap;

  li {
    margin-top: 0;
    display: inline-flex;
    gap: 4px;
    > *:nth-child(1) {
      color: var(--vp-c-text-2);
    }
    a {
      text-decoration-color: var(--vp-c-brand-3);
    }
  }
}

</style>