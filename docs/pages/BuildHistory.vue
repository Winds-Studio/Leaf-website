<script setup>
import {ref} from "vue";
import {useData} from "vitepress";

const result = ref(null);
const loaded = ref(false);
const isDark = useData().isDark;

fetch('https://api.github.com/repos/Winds-Studio/Leaf/actions/runs?event=push')
    .then(resp => resp.json())
    .then(data => result.value = data['workflow_runs'].filter(item => item['event'] === 'push'))
    .finally(() => {loaded.value = true});

</script>

<template>

  <div :class="{ dark: isDark }">
  <div class="actions_container" v-if="loaded">
    <div class="action_container" v-for="item in result">
      Date: {{new Date(item['created_at']).toLocaleDateString() }}
      &bull;
      Branch: <a :href="'https://github.com/Winds-Studio/Leaf/tree/' + item['head_branch']">{{ item['head_branch'] }}</a>
      &bull;
      Commit: <a :href="'https://github.com/Winds-Studio/Leaf/commit/' + item['head_commit']['id']">{{ item['head_commit']['id'].slice(0, 7) }}</a>
      &bull;
      Action: <a :href="item['html_url']">{{ item['id'] }}</a>
      <pre class="changes">{{ item['head_commit']['message'] }}</pre>

    </div>
  </div>

    <div v-else>
      Loading...
    </div>
  </div>

</template>

<style scoped>
.dark {}

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
  outline: 0px rgba(255, 255, 255, 0) solid;
  transition: all 150ms ease-out;
}

.dark .action_container:hover {
  outline: 1px rgba(255, 255, 255, 0.2) solid;
}

.changes {
  overflow: scroll;
  margin-bottom: 0;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.04);
}

.dark .changes {
  background-color: rgba(0, 0, 0, 0.12);
}
</style>