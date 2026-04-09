<script setup lang="ts">
import { VPTeamMembers } from "vitepress/theme";
import { ref, computed } from "vue";

type LangString = "en" | "tr" | "de" | "pt" | "ru" | "zh";

const props = withDefaults(
  defineProps<{
    lang?: LangString;
  }>(),
  {
    lang: "en"
  }
);

interface Contributor {
  avatar: string;
  name: string;
  title?: string;
  links: Array<{ icon: string; link: string }>;
}

interface GitHubContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

type LocalizedText = Record<LangString, string>;
type Rewrite = Partial<Omit<Contributor, "links">> & {
  links?: Contributor["links"];
};
type ContributorCache = {
  timestamp: number;
  data: GitHubContributor[];
};

const CACHE_TTL_MS = 30 * 60 * 1000;
const CACHE_KEY_PREFIX = "leaf-website:contributors:";

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

const isGitHubContributor = (value: unknown): value is GitHubContributor => {
  if (!isRecord(value)) return false;

  return (
    typeof value.login === "string" &&
    typeof value.avatar_url === "string" &&
    typeof value.html_url === "string" &&
    typeof value.type === "string"
  );
};

const getUserContributors = (data: unknown): GitHubContributor[] => {
  if (!Array.isArray(data)) return [];
  return data.filter(isGitHubContributor).filter((m) => m.type === "User");
};

const isContributorCache = (value: unknown): value is ContributorCache => {
  if (!isRecord(value)) return false;

  return typeof value.timestamp === "number" && Array.isArray(value.data);
};

const getCacheKey = (repo: string) => `${CACHE_KEY_PREFIX}${repo}`;

const readCachedContributors = (repo: string): GitHubContributor[] | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(getCacheKey(repo));
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!isContributorCache(parsed)) return null;
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) {
      window.localStorage.removeItem(getCacheKey(repo));
      return null;
    }

    return getUserContributors(parsed.data);
  } catch {
    return null;
  }
};

const writeCachedContributors = (repo: string, data: GitHubContributor[]) => {
  if (typeof window === "undefined") return;

  try {
    const payload: ContributorCache = {
      timestamp: Date.now(),
      data
    };
    window.localStorage.setItem(getCacheKey(repo), JSON.stringify(payload));
  } catch {}
};

const localizedTitles = {
  creator: {
    en: "Creator of Leaf",
    tr: "Leaf'in Yaratıcısı",
    de: "Schöpfer von Leaf",
    pt: "Criador do Leaf",
    ru: "Создатель Leaf",
    zh: "Leaf 的创建者"
  },
  coreTeam: {
    en: "Core team",
    tr: "Ana ekip",
    de: "Kernteam",
    pt: "Equipe Principal",
    ru: "Основная команда",
    zh: "核心团队"
  },
  webDev: {
    en: "Designer & Web Dev",
    tr: "Tasarımcı & Web Geliştirici",
    de: "Designer & Webentwickler",
    pt: "Designer & Desenvolvedor Web",
    ru: "Дизайнер и Веб-разработчик",
    zh: "设计师兼网页开发"
  },
  special: {
    en: "Special Supporter",
    tr: "Özel Destekçi",
    de: "Besonderer Unterstützer",
    pt: "Apoiante Especial",
    ru: "Особый поддерживающий",
    zh: "特别支持者"
  }
} satisfies Record<string, LocalizedText>;

type TitleKey = keyof typeof localizedTitles;

const title = (key: TitleKey) => localizedTitles[key][props.lang];

const rewrites = computed<Record<string, Rewrite>>(() => ({
  "Dreeam-qwq": { title: title("creator") },
  HaHaWTH: { name: "Creeam (HaHaWTH)", title: title("coreTeam") },
  //"Taiyou06": { title: title("coreTeam") },
  hayanesuru: { title: title("coreTeam") },
  MartijnMuijsers: { title: title("coreTeam") },
  Pascalpex: { title: title("special") },
  envizar: {
    title: title("webDev"),
    links: [{ icon: "telegram", link: "https://t.me/envizar" }]
  }
}));

const repoMembers = ref<GitHubContributor[]>([]);
const websiteRepoMembers = ref<GitHubContributor[]>([]);

const transform = ({ login, avatar_url, html_url }: GitHubContributor, rewrite?: Rewrite): Contributor => {
  const base = {
    avatar: avatar_url,
    name: login,
    links: [{ icon: "github", link: html_url }]
  };

  return rewrite
    ? {
        ...base,
        ...rewrite,
        links: [...base.links, ...(rewrite.links || [])]
      }
    : base;
};

const allMembers = computed<Contributor[]>(() => {
  const rewriteMap = rewrites.value;
  const mainMembers = repoMembers.value.map((m) => transform(m, rewriteMap[m.login]));
  const mainNames = new Set(mainMembers.map((m) => m.name));

  const websiteMembers = websiteRepoMembers.value
    .filter((m) => !(m.login in rewriteMap))
    .map((m) => transform(m))
    .filter((m) => !mainNames.has(m.name));

  return [...mainMembers, ...websiteMembers];
});

const fetchRepoContributors = async (repo: string): Promise<GitHubContributor[]> => {
  const cached = readCachedContributors(repo);
  if (cached) return cached;

  try {
    const resp = await fetch(`https://api.github.com/repos/Winds-Studio/${repo}/contributors`);
    const data: unknown = await resp.json();

    if (!Array.isArray(data)) {
      console.warn(`Unexpected response from ${repo}: ${JSON.stringify(data)}`);
      return [];
    }

    const contributors = getUserContributors(data);
    writeCachedContributors(repo, contributors);
    return contributors;
  } catch (error) {
    console.warn(`Failed to fetch contributors from ${repo}:`, error);
    return [];
  }
};

void Promise.all([fetchRepoContributors("Leaf"), fetchRepoContributors("Leaf-website")]).then(([main, website]) => {
  repoMembers.value = main;
  websiteRepoMembers.value = website;
});
</script>

<template>
  <VPTeamMembers size="small" :members="allMembers" />
</template>
