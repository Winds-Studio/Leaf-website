<script setup lang="ts">

import {getVerStatus} from "../versionStatus";
import {useTranslation} from "../useTranslation";
import {Icon} from "@iconify/vue";
import Markdown from "../../Markdown.vue";

const props = defineProps<{
  version: string
}>()
const { t } = useTranslation()

</script>

<template>

  <div :class="['dl-version-tag', getVerStatus(version).cssClass]">
    <Icon :icon="getVerStatus(version).icon" />
    <Markdown class="md-description" :content="t('versionStatus.' + getVerStatus(version).name)" :unwrap="true" />
  </div>

</template>

<style scoped lang="scss">

@use "../statusColors";

.dl-version-tag {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: var(--vp-border-radius);
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--status-color-soft);
  color: var(--status-color-1);
  transition: 100ms ease-in-out border;
  &:hover {
    border: 1px solid var(--status-color-1);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    color: var(--status-color-1);
  }

  .md-description {
    p {
      padding: 0 !important;
      margin: 0 !important;
      display: none;
    }
  }
}

</style>