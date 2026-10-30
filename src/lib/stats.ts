import { getKV, type KVNamespace } from "./runtime-kv"

// 数据源类型
type GitHubRepo = {
  stargazers_count: number
}

type GitHubRelease = {
  tag_name: string
}

type BStatsDataPoint = [timestamp: number, value: number]

export type Stats = {
  version: string
  servers: string
  stars: string
}

const FALLBACK: Stats = {
  servers: "unknown",
  stars: "unknown",
  version: "unknown",
}

const GITHUB_REPO = "Winds-Studio/Leaf"
const BSTATS_PLUGIN_ID = 19_539
const BSTATS_SERVERS_CHART = "servers"

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "leaf-website",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init)
  if (!res.ok) {
    const body = (await res.text().catch(() => "")).slice(0, 200)
    const remaining = res.headers.get("x-ratelimit-remaining")
    const auth = process.env.GITHUB_TOKEN ? "token" : "no-token"
    throw new Error(
      `Fetch failed: ${url} (${res.status}) [${auth}, ratelimit-remaining=${remaining}] ${body}`
    )
  }
  return (await res.json()) as Promise<T>
}

async function fetchStars(): Promise<number> {
  const data = await fetchJson<GitHubRepo>(`https://api.github.com/repos/${GITHUB_REPO}`, {
    headers: authHeaders(),
  })
  return data.stargazers_count
}

async function fetchLatestVersion(): Promise<string> {
  const data = await fetchJson<GitHubRelease>(
    `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
    { headers: authHeaders() }
  )
  return data.tag_name.replace(/^ver-/, "")
}

async function fetchServerCount(): Promise<number> {
  const data = await fetchJson<BStatsDataPoint[]>(
    `https://bstats.org/api/v1/plugins/${BSTATS_PLUGIN_ID}/charts/${BSTATS_SERVERS_CHART}/data?maxElements=1`
  )
  const latest = data.at(-1)
  if (!latest) throw new Error("bStats returned empty data")
  return latest[1]
}

function roundDown(n: number): string {
  if (n >= 1000) return `${Math.floor(n / 100) * 100}+`
  if (n >= 100) return `${Math.floor(n / 10) * 10}+`
  return `${n}+`
}

async function safe<T>(name: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    console.error(`[stats] ${name} failed:`, error)
    return fallback
  }
}

const STATS_KEY = "leaf:cache:stats"
const STATS_TTL_SECONDS = 604_800 // 7d 兜底，cron 每小时刷新；抓取失败时保留旧值

export async function getStats(): Promise<Stats> {
  const cached = await readCachedStats()
  if (cached) return cached

  const stats = await computeStats(null)
  const kv = getKV()
  if (kv && isUsable(stats)) {
    try {
      await kv.put(STATS_KEY, JSON.stringify(stats), { expirationTtl: STATS_TTL_SECONDS })
    } catch {
      // 缓存写失败不影响响应
    }
  }
  return stats
}

function isUsable(stats: Stats): boolean {
  return stats.version !== "unknown" && stats.stars !== "unknown"
}

// 单项抓取失败时沿用上一次的缓存值，避免显示 unknown
async function computeStats(prev: Stats | null): Promise<Stats> {
  const old = prev ?? FALLBACK
  const [version, stars, servers] = await Promise.all([
    safe("version", fetchLatestVersion, old.version),
    safe("stars", fetchStars, Number.NaN),
    safe("servers", fetchServerCount, Number.NaN),
  ])

  return {
    servers: Number.isFinite(servers) ? roundDown(servers) : old.servers,
    stars: Number.isFinite(stars) ? roundDown(stars) : old.stars,
    version,
  }
}

export async function readCachedStats(): Promise<Stats | null> {
  const kv = getKV()
  if (!kv) return null
  const raw = await kv.get(STATS_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Stats
  } catch {
    return null
  }
}

export async function refreshStatsCache(kv: KVNamespace): Promise<void> {
  const prevRaw = await kv.get(STATS_KEY)
  let prev: Stats | null = null
  try {
    prev = prevRaw ? (JSON.parse(prevRaw) as Stats) : null
  } catch {
    prev = null
  }
  const stats = await computeStats(prev)
  if (isUsable(stats)) {
    const nextRaw = JSON.stringify(stats)
    if (prevRaw !== nextRaw) {
      await kv.put(STATS_KEY, nextRaw, { expirationTtl: STATS_TTL_SECONDS })
    }
  }
}
