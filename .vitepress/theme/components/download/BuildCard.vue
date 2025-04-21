<script setup lang="ts">
/* 
  ** DEPRECATED ** 
  This component has been superseded by the integrated DownloadPage component
  with multilingual support. This file is kept for reference only.
*/
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
    <div class="build-info">
      <ul>
        <li>
          <span>Date:</span>
          <span>{{ data.created_at ? new Date(data.created_at).toLocaleDateString() : 'Unknown' }}</span>
        </li>

        <li>
          <span>Commit:</span>
          <a v-if="data.head_commit" :href="`https://github.com/Winds-Studio/Leaf/commit/${data.head_commit.id}`" target="_blank">
            {{ data.head_commit.id.slice(0, 7) }}
          </a>
          <span v-else>Unknown</span>
        </li>

        <li>
          <span>Action:</span>
          <a :href="data.html_url" target="_blank">{{ data.id || 'Unknown' }}</a>
        </li>
      </ul>
    </div>

    <div class="commit-message">
      <pre class="changes" :class="{ expanded }">{{ commitMessage }}</pre>
      <button v-if="data.head_commit?.message?.includes('\n')" @click="expanded = !expanded" class="toggle-button">
        <Icon icon="lucide:chevron-down" v-if="!expanded" width="0.9rem" height="0.9rem" />
        <Icon icon="lucide:chevron-up" v-else width="0.9rem" height="0.9rem" />
        {{ expanded ? 'Show less' : 'Show more' }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">

.action_container {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
}

.build-info {
  margin-bottom: 1rem;
}

.commit-message {
  position: relative;
}

.changes {
  margin: 0;
  padding: 1rem 1.2rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg-alt);
  white-space: pre-wrap;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  overflow: hidden;
  max-height: 100px;
  transition: max-height 0.4s ease;
  
  &.expanded {
    max-height: 500px;
  }
}

.toggle-button {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.8rem;
  padding: 0.5rem 0.8rem;
  border: none;
  border-radius: 6px;
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--vp-c-bg-alt);
  }
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem 1.5rem;
  flex-wrap: wrap;

  li {
    margin-top: 0;
    display: inline-flex;
    gap: 0.4rem;
    align-items: center;
    
    > *:nth-child(1) {
      color: var(--vp-c-text-2);
      font-weight: 500;
    }
    
    a {
      color: var(--vp-c-brand-1);
      text-decoration: none;
      transition: color 0.2s ease;
      
      &:hover {
        color: var(--vp-c-brand-2);
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 600px) {
  .action_container {
    padding: 1rem;
  }
  
  ul {
    gap: 0.4rem 1rem;
    font-size: 0.9rem;
  }
  
  .changes {
    padding: 0.8rem 1rem;
    font-size: 0.85rem;
  }
}

</style>