/**
 * Leaf download API (Fill v3, https://dl.leafmc.one). Responses are mapped to the site's own build
 * shape below, so components don't depend on the API format.
 */

export type BuildChange = {
  commit: string
  summary: string
  message: string
}

export type BuildDownload = {
  name: string
  sha256: string
  url: string
}

export type BuildResponse = {
  version: string
  build: number
  time: string
  channel: "default" | "experimental"
  changes?: BuildChange[]
  downloads?: Record<string, BuildDownload>
}

export type SupportStatus = "SUPPORTED" | "DEPRECATED" | "UNSUPPORTED"

export type VersionInfo = {
  id: string
  /**
   * 版本支持状态
   */
  support: SupportStatus
  /**
   * 支持结束日期（可选）
   */
  supportEnd?: string
}

type V3Versions = {
  versions: { version: { id: string; support: { status: SupportStatus; end?: string } } }[]
}

type V3Build = {
  id: number
  time: string
  channel: "ALPHA" | "BETA" | "STABLE" | "RECOMMENDED"
  commits: { sha: string; time: string; message: string }[]
  downloads: Record<
    string,
    { name: string; checksums: { sha256: string }; size: number; url: string }
  >
}

const BASE_URL = "https://dl.leafmc.one/v3"
// fill v3's requirement
const HEADERS = { "User-Agent": "Leaf-website (https://www.leafmc.one)" }
const MAX_ATTEMPTS = 3

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })

async function fetchWithRetry<T>(
  url: string,
  init?: RequestInit,
  maxAttempts = MAX_ATTEMPTS
): Promise<T> {
  const mergedHeaders = new Headers(HEADERS)
  if (init?.headers) {
    const initHeaders = new Headers(init.headers)
    initHeaders.forEach((value, key) => {
      mergedHeaders.set(key, value)
    })
  }

  const requestInit: RequestInit = init
    ? { ...init, headers: mergedHeaders }
    : { headers: mergedHeaders }

  const attemptFetch = async (attempt: number): Promise<T> => {
    try {
      const res = await fetch(url, requestInit)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return (await res.json()) as T
    } catch (error) {
      if (attempt >= maxAttempts) throw error
      await sleep(1000 * 2 ** attempt)
      return attemptFetch(attempt + 1)
    }
  }

  return attemptFetch(1)
}

/**
 * 下载按钮对应的 JAR
 */
export function pickPrimaryDownload(build: BuildResponse): BuildDownload | null {
  if (!build.downloads) return null
  return build.downloads["server:default"] ?? Object.values(build.downloads)[0] ?? null
}

function toBuild(version: string, b: V3Build): BuildResponse {
  return {
    version,
    build: b.id,
    time: b.time,
    channel: b.channel === "STABLE" || b.channel === "RECOMMENDED" ? "default" : "experimental",
    changes: b.commits.map((c) => ({
      commit: c.sha,
      summary: c.message.split("\n", 1)[0] ?? "",
      message: c.message,
    })),
    downloads: Object.fromEntries(
      Object.entries(b.downloads).map(([key, d]) => [
        key,
        { name: d.name, sha256: d.checksums.sha256, url: d.url },
      ])
    ),
  }
}

/**
 * All versions with support status, across all version families.
 */
export async function getVersions(maxAttempts = MAX_ATTEMPTS): Promise<VersionInfo[]> {
  const res = await fetchWithRetry<V3Versions>(
    `${BASE_URL}/projects/leaf/versions`,
    { cache: "no-store" },
    maxAttempts
  )
  return res.versions.map(({ version: v }) => ({
    id: v.id,
    support: v.support.status,
    ...(v.support.end ? { supportEnd: v.support.end } : {}),
  }))
}

/**
 * All builds of a version, newest first.
 */
export async function getBuilds(version: string): Promise<BuildResponse[]> {
  const builds = await fetchWithRetry<V3Build[]>(
    `${BASE_URL}/projects/leaf/versions/${encodeURIComponent(version)}/builds`,
    { cache: "no-store" }
  )
  return builds.map((b) => toBuild(version, b))
}
