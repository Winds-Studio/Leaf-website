<script setup lang="ts">
import { serializeConfig } from "./config";
import ConfigNode from "./ConfigNode.vue";
import { computed, toRefs, provide, ref } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  data: any;
  version: string;
}>();

const config = computed(() => serializeConfig(props.data));
const { version } = toRefs(props);

const stateEmitter = ref<"expand" | "collapse" | "">("");
provide("stateEmitter", stateEmitter);
const emit = (state: "expand" | "collapse") => {
  stateEmitter.value = state;
  setTimeout(() => (stateEmitter.value = ""), 0);
};
</script>

<template>
  <div class="code-block" :key="version">
    <div class="buttons">
      <button @click="emit('expand')">
        <Icon icon="lucide:unfold-vertical" />
        <span>Expand all</span>
      </button>
      <button @click="emit('collapse')">
        <Icon icon="lucide:fold-vertical" />
        <span>Collapse all</span>
      </button>
    </div>

    <ConfigNode :node="childNode" v-for="childNode in config" />
  </div>
</template>

<style scoped lang="scss">
.code-block {
  font-family: var(--vp-font-family-mono), monospace;
  background-color: var(--vp-c-bg-alt);
  padding: 1rem 1rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 50rem;
  overflow-x: scroll;
}

.buttons {
  display: flex;
  gap: 0.5rem;

  button {
    display: flex;
    font-size: inherit;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
    padding: 0.15rem 0.75rem;
    border: 1px solid var(--vp-c-divider);
    background-color: var(--vp-c-bg-elv);
    border-radius: 0.25rem;

    &:hover {
      filter: brightness(1.2);
    }

    &:active {
      filter: brightness(1.5);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
      color: inherit;
    }

    span {
      padding-top: 0.15rem;
    }
  }
}
</style>
