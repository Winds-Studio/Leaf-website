<script setup lang="ts">

import {ApiBuild, getBuildLink} from "../downloadApi";
import {useTranslation} from "../useTranslation";

const props = defineProps<{
  build: ApiBuild
  version: string
}>()

const { t } = useTranslation()

</script>

<template>
  <div class="container">

    <div class="logo">
      {{ build.build }}
    </div>

    <a class="download-button brand-button" :href="getBuildLink(version, build)">{{t('actions.download')}} Leaf {{version}}</a>

  </div>
</template>

<style scoped lang="scss">

.container {
  width: 100%;
  height: 16rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  background-color: var(--vp-c-bg-alt);
  border-radius: var(--vp-border-radius);

  .logo {
    display: flex;
    border-radius: 50%;
    width: 8rem;
    height: 8rem;
    outline: 2px solid var(--vp-c-brand-3);
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 42px;
    //overflow: hidden;
    color: var(--vp-c-brand-1);
    text-shadow: 2px 2px 0 black;
    transition: var(--vp-anim-dur) ease-in-out;
    background: linear-gradient(30deg, var(--vp-c-brand-soft), transparent);
    &:hover {
      outline-offset: 4px;
      outline: 3px solid var(--vp-c-brand-1);
    }
    &:active {
      outline-offset: 0;
      transform: scale(0.98);
    }

    &::before {
      content: "";
      position: absolute;
      background: url("/logo.svg") no-repeat center;
      background-size: 6rem;
      opacity: 0.2;
      filter: blur(2px);
      height: 8rem;
      width: 8rem;
    }

  }

  .download-button {
    padding: 0.5rem 1rem;
    border-radius: 100px;
    color: var(--vp-c-text-1);
    text-decoration: none;
  }

}

</style>