<script setup lang="ts">
import { VPTeamMembers } from 'vitepress/theme';
import { ref } from "vue";

const props = defineProps({
  lang: {
    default: 'en',
    type: String
  }
})
interface LangString {
  en: string
  ru: string
  zh: string
  de: string
}

const members = ref([]);
const loaded = ref(false);

const titleCreator = (<LangString>{ en: "Creator of Leaf", ru: "Создатель Leaf", zh: "Leaf 的创建者", de: "Schöpfer von Leaf" })[props.lang];
const titleCoreTeam = (<LangString>{ en: "Core team", ru: "Основная команда", zh: "核心团队", de: "Kernteam" })[props.lang];
const titleWebDev = (<LangString>{ en: "Designer & Web Dev", ru: "Дизайнер и Веб-разработчик", zh: "设计师兼网页开发", de: "Designer & Webentwickler" })[props.lang];

const rewrites = {
  "Dreeam-qwq": { title: titleCreator },
  "HaHaWTH": { name: "Creeam (HaHaWTH)", title: titleCoreTeam },
  "Taiyou06": { title: titleCoreTeam },
  "envizar": {
    title: titleWebDev,
    links: [{ icon: "telegram", link: 'https://t.me/envizar' }]
  }
};

const transform = ({ login, avatar_url, html_url }: any) => {
  const base = {
    avatar: avatar_url,
    name: login,
    links: [
        { icon: 'github', link: html_url }
    ]
  };
  const rewrite = rewrites[login];
  return rewrite ? {
    ...base, ...rewrite,
    links: [
        ...base.links,
      ...(rewrite.links || [])
    ]
  } : base;
};

fetch("https://api.github.com/repos/Winds-Studio/Leaf/contributors")
    .then(resp => resp.json())
    .then(data => members.value = data.map(transform))
    .finally(() => loaded.value = true);
</script>

<template>
  <VPTeamMembers size="small" :members="members" />
</template>