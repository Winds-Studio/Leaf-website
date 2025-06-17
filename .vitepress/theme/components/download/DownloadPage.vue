<script setup lang="ts">

import {getLatestStable, getVersions} from "./downloadApi";
import {onMounted, ref} from "vue";
import DownloadVersion from "./components/DownloadVersion.vue";
import {useTranslation} from "./useTranslation";
import UiMessage from "../UiMessage.vue";
import VersionDropdown from "./components/VersionDropdown.vue";
import VersionInfoCard from "./components/VersionInfoCard.vue";
import {Icon} from "@iconify/vue";

const { t } = useTranslation()

const versions = ref<string[] | null>(null)
const selectedVersion = ref<string | null>(null)

onMounted(async () => {
  versions.value = await getVersions()
  selectedVersion.value = getLatestStable(versions.value)
})

</script>

<template>

  <a href="download-old" class="switch-link">
    <Icon icon="lucide:log-in" />
    <span>{{ t('old-download-page') }}</span>
  </a>

  <div class="download-page" v-if="versions">
    <VersionDropdown v-model:selected-version="selectedVersion" :versions />
    <VersionInfoCard :version="selectedVersion" />
    <DownloadVersion :version="selectedVersion" />
  </div>

  <template v-else>
    <UiMessage type="loading" :message="t('loading.versions')" />
  </template>

</template>

<style scoped lang="scss">

.switch-link {
  font-size: 14px;
  border: 1px solid var(--vp-c-divider);
  width: max-content;
  padding: 0.5rem 1rem;
  border-radius: var(--vp-border-radius);
  transition: var(--vp-anim-dur) ease-in-out background-color;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--vp-c-text-2) !important;
  margin-bottom: 2rem;
  &:hover {
    background-color: var(--vp-c-bg-elv);
  }
}

.download-page {
  animation: fadein 500ms ease forwards;
}

@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
  }
}

</style>