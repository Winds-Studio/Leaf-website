<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { ApiBuild, getBuilds } from "../downloadApi";
import BuildCard from "./BuildCard.vue";
import UiMessage from "../../UiMessage.vue";
import { useTranslation } from "../useTranslation";
import { Icon } from "@iconify/vue";
import LatestBuild from "./LatestBuild.vue";

const SHOW_BUILD_LIMIT = 8;

const props = defineProps<{
  version: string;
}>();

const builds = ref<ApiBuild[] | null>(null);
const showAll = ref(false);
const { t } = useTranslation();

const loadBuilds = async () => {
  builds.value = null;
  builds.value = await getBuilds(props.version);
};

onMounted(loadBuilds);
watch(() => props.version, loadBuilds);

const shownBuilds = computed(() => {
  if (showAll.value) {
    return builds.value;
  } else {
    return builds.value.slice(0, SHOW_BUILD_LIMIT);
  }
});
</script>

<template>
  <div class="builds-list" v-if="builds">
    <LatestBuild :build="builds[0]" :version v-if="builds[0]" />
    <UiMessage type="error" :message="t('error.builds')" v-else />

    <BuildCard :build :version v-for="build in shownBuilds" />
    <button @click="showAll = !showAll" class="show-all" v-if="builds.length > SHOW_BUILD_LIMIT">
      <Icon :icon="'lucide:' + (showAll ? 'arrow-up-from-line' : 'arrow-down-from-line')" />
      {{ showAll ? t("actions.showLess") : t("actions.showMore") }}
    </button>
  </div>
  <template v-else>
    <UiMessage type="loading" :message="t('loading.builds')" />
  </template>
</template>

<style scoped lang="scss">
.builds-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.show-all {
  font-size: 14px;
  border: 1px solid var(--vp-c-divider);
  width: max-content;
  padding: 0.5rem 1rem;
  border-radius: var(--vp-border-radius);
  transition: var(--vp-anim-dur) ease-in-out background-color;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
  &:hover {
    background-color: var(--vp-c-bg-elv);
  }
}
</style>
