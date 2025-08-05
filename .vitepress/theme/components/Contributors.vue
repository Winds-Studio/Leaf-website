<script setup lang="ts">
import { VPTeamMembers } from 'vitepress/theme';
import { ref, computed } from "vue";


const props = defineProps({
  lang: {
    default: 'en',
    type: String
  }
})
interface LangString {
  en: string
  tr: string
  de: string
  pt: string
  ru: string
  zh: string
}

interface Contributor {
  avatar: string
  name: string
  title?: string
  links: Array<{icon: string, link: string}>
}

const members = ref<Contributor[]>([]);
const websiteMembers = ref<(Contributor | null)[]>([]);
const loaded = ref(false);
const websiteLoaded = ref(false);

const titleCreator = (<LangString>{
  en: "Creator of Leaf",
  tr: "Leaf'in Yaratıcısı",
  de: "Schöpfer von Leaf",
  pt: "Criador do Leaf",
  ru: "Создатель Leaf",
  zh: "Leaf 的创建者"
})[props.lang];
const titleCoreTeam = (<LangString>{
  en: "Core team",
  tr: "Ana ekip",
  de: "Kernteam",
  pt: "Equipe Principal",
  ru: "Основная команда",
  zh: "核心团队"
})[props.lang];
const titleWebDev = (<LangString>{
  en: "Designer & Web Dev",
  tr: "Tasarımcı & Web Geliştirici",
  de: "Designer & Webentwickler",
  pt: "Designer & Desenvolvedor Web",
  ru: "Дизайнер и Веб-разработчик",
  zh: "设计师兼网页开发"
})[props.lang];

const rewrites = {
  "Dreeam-qwq": { title: titleCreator },
  "HaHaWTH": { name: "Creeam (HaHaWTH)", title: titleCoreTeam },
  "Taiyou06": { title: titleCoreTeam },
  "hayanesuru": { title: titleCoreTeam },
  "MartijnMuijsers": { title: titleCoreTeam },
  //TODO: "Pascalpex: special supporter"
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

const transformWebsite = ({ login, avatar_url, html_url }: any) => {
  if (login in rewrites) {
    return null;  // Skip this contributor if already in main list with custom title
  }
  
  const base = {
    avatar: avatar_url,
    name: login,
    links: [
        { icon: 'github', link: html_url }
    ]
  };
  return base;
};

// Combine both contributor lists, filtering out nulls and duplicates
const allMembers = computed(() => {
  if (!loaded.value || !websiteLoaded.value) return members.value;
  
  const mainContributors = new Set(members.value.map(m => m.name));
  const filteredWebsiteMembers = websiteMembers.value.filter(m => m !== null && !mainContributors.has(m.name));
  
  return [...members.value, ...filteredWebsiteMembers];
});

// Fetch main repo contributors
fetch("https://api.github.com/repos/Winds-Studio/Leaf/contributors")
  .then(resp => resp.json())
  .then(data => {
    // TODO: find a solution to avoid rate limit
    if (Array.isArray(data)) {
      members.value = data.map(transform)
    } else {
      console.warn(`Unexpected response: ${JSON.stringify(data)}`);
      members.value = [];
    }
  })
  .finally(() => loaded.value = true);

// Fetch website repo contributors
fetch("https://api.github.com/repos/Winds-Studio/Leaf-website/contributors")
  .then(resp => resp.json())
  .then(data => {
    // TODO: find a solution to avoid rate limit
    if (Array.isArray(data)) {
      websiteMembers.value = data.map(transform)
    } else {
      console.warn(`Unexpected response: ${JSON.stringify(data)}`);
      websiteMembers.value = [];
    }
  })
  .finally(() => websiteLoaded.value = true);
</script>

<template>
  <VPTeamMembers size="small" :members="allMembers" />
</template>