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

  const names = new Set();
  return [...members.value, ...websiteMembers.value]
    .filter(m => m && !names.has(m.name) && names.add(m.name));
});
  
// Helper to fetch contributors from a repo
async function fetchContributors(repo, targetRef, loadedFlag) {
  try {
    const resp = await fetch(`https://api.github.com/repos/${repo}/contributors`);
    const data = await resp.json();
    if (Array.isArray(data)) {
      targetRef.value = data.filter(m => m.type == "User").map(transform);
    } else {
      console.warn(`Unexpected response from ${repo}:`, data);
      targetRef.value = [];
    }
  } catch (err) {
    console.error(`Error fetching contributors from ${repo}:`, err);
    targetRef.value = [];
  } finally {
    loadedFlag.value = true;
  }
}

// Fetch both repos in parallel
Promise.all([
  fetchContributors("Winds-Studio/Leaf", members, loaded),
  fetchContributors("Winds-Studio/Leaf-website", websiteMembers, websiteLoaded)
]);
</script>

<template>
  <VPTeamMembers size="small" :members="allMembers" />
</template>