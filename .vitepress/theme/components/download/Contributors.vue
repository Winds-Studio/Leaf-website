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
  de: string
  pt: string
  ru: string
  zh: string
}

const members = ref([]);
const loaded = ref(false);

const titleCreator = (<LangString>{
  en: "Creator of Leaf",
  de: "Schöpfer von Leaf",
  pt: "Criador do Leaf",
  ru: "Создатель Leaf",
  zh: "Leaf 的创建者"
})[props.lang];
const titleCoreTeam = (<LangString>{
  en: "Core team",
  de: "Kernteam",
  pt: "Equipe Principal",
  ru: "Основная команда",
  zh: "核心团队"
})[props.lang];
const titleWebDev = (<LangString>{
  en: "Designer & Web Dev",
  de: "Designer & Webentwickler",
  pt: "Designer & Desenvolvedor Web",
  ru: "Дизайнер и Веб-разработчик",
  zh: "设计师兼网页开发"
})[props.lang];

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