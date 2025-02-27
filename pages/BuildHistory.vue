<script setup>
import {ref} from "vue";
import {useData} from "vitepress";

const result = ref([]);
const loaded = ref(false);
const isDark = useData().isDark;
const expanded = ref({});

fetch('https://api.github.com/repos/Winds-Studio/Leaf/actions/runs?event=push')
  .then(resp => resp.json())
  .then(data => {
    result.value = data['workflow_runs'].filter(item => item['event'] === 'push');
  })
  .finally(() => { loaded.value = true });

const toggleExpand = (id) => {
  expanded.value[id] = !expanded.value[id];
};
</script>

<template>
  <div :class="{ dark: isDark }">
    <div class="actions_container" v-if="loaded && result.length">
      <div class="action_container" v-for="item in result" :key="item.id">
        Date: {{ new Date(item['created_at']).toLocaleDateString() }}
        &bull;
        Branch: <a :href="'https://github.com/Winds-Studio/Leaf/tree/' + item['head_branch']">{{ item['head_branch'] }}</a>
        &bull;
        Commit: <a v-if="item['head_commit']" :href="'https://github.com/Winds-Studio/Leaf/commit/' + item['head_commit']?.id">{{ item['head_commit']?.id?.slice(0, 7) }}</a>
        &bull;
        Action: <a :href="item['html_url']">{{ item['id'] }}</a>
        
        <pre class="changes" :class="{ expanded: expanded[item.id] }">{{ expanded[item.id] ? item['head_commit']?.message : item['head_commit']?.message?.split('\n')[0] + (item['head_commit']?.message?.includes('\n') ? '\n...' : '') }}</pre>
        <button v-if="item['head_commit']?.message?.includes('\n')" @click="toggleExpand(item.id)" :class="{ dark: isDark }">
          {{ expanded[item.id] ? 'Read Less' : 'Read More' }}
        </button>
      </div>
    </div>

    <div v-else>
      {{ loaded ? 'No results found.' : 'Loading...' }}
    </div>
  </div>
</template>

<style scoped>
.actions_container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

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
  background-color: #0073e6;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #005bb5;
}

.dark button {
  background-color: #93acbe;
  color: white;
}

.dark button:hover {
  background-color: #83a1b5;
}
</style>
