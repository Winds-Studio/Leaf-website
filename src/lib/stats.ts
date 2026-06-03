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
    throw new Error(`Fetch failed: ${url} (${res.status})`)
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

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch {
    return fallback
  }
}

export async function getStats(): Promise<Stats> {
  const [version, stars, servers] = await Promise.all([
    safe(fetchLatestVersion, FALLBACK.version),
    safe(fetchStars, Number.NaN),
    safe(fetchServerCount, Number.NaN),
  ])

  return {
    servers: Number.isFinite(servers) ? roundDown(servers) : FALLBACK.servers,
    stars: Number.isFinite(stars) ? roundDown(stars) : FALLBACK.stars,
    version,
  }
}
