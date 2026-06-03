/**
 * Cron 后台缓存
 */

import type { BuildResponse, ProjectResponse, VersionResponse } from "./leaf-api"
import { getKV, type KVNamespace } from "./runtime-kv"

const BASE_URL = "https://api.leafmc.one/v2"
const HEADERS = { "User-Agent": "Leaf-Website" }

/**
 * 展示多少个
 */
const RECENT_LIMIT = 12

export type BuildIndex = {
  builds: BuildResponse[]
  total: number
}

export const VERSIONS_KEY = "leaf:cache:versions"
export const buildsKey = (version: string): string => `leaf:cache:builds:${version}`

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store", headers: HEADERS })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return (await res.json()) as T
}

export async function readCachedVersions(): Promise<string[] | null> {
  const kv = getKV()
  if (!kv) return null
  const raw = await kv.get(VERSIONS_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as string[]
  } catch {
    return null
  }
}

export async function readCachedBuilds(version: string): Promise<BuildIndex | null> {
  const kv = getKV()
  if (!kv) return null
  const raw = await kv.get(buildsKey(version))
  if (!raw) return null
  try {
    return JSON.parse(raw) as BuildIndex
  } catch {
    return null
  }
}

export async function refreshBuildCache(kv: KVNamespace): Promise<void> {
  const project = await fetchJson<ProjectResponse>(`${BASE_URL}/projects/leaf`)
  const versions = project.versions

  const nextVersionsRaw = JSON.stringify(versions)
  const prevVersionsRaw = await kv.get(VERSIONS_KEY)
  if (prevVersionsRaw !== nextVersionsRaw) {
    await kv.put(VERSIONS_KEY, nextVersionsRaw)
  }

  await Promise.allSettled(versions.map((version) => refreshVersion(kv, version)))
}

async function refreshVersion(kv: KVNamespace, version: string): Promise<void> {
  const manifest = await fetchJson<VersionResponse>(`${BASE_URL}/projects/leaf/versions/${version}`)
  const total = manifest.builds.length
  const recentNumbers = [...manifest.builds].toSorted((a, b) => b - a).slice(0, RECENT_LIMIT)
  const maxBuild = recentNumbers[0] ?? -1

  // 增量
  const prevRaw = await kv.get(buildsKey(version))
  if (prevRaw) {
    try {
      const prev = JSON.parse(prevRaw) as BuildIndex
      const prevMax = prev.builds[0]?.build ?? -1
      if (prevMax === maxBuild && prev.total === total) return
    } catch {
      // 继续重建
    }
  }

  const builds = await Promise.all(
    recentNumbers.map((n) =>
      fetchJson<BuildResponse>(`${BASE_URL}/projects/leaf/versions/${version}/builds/${n}`)
    )
  )

  const index: BuildIndex = { builds, total }
  await kv.put(buildsKey(version), JSON.stringify(index))
}
