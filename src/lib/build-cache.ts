/**
 * Cron 后台缓存
 */

import type { BuildResponse } from "./leaf-api"
import { getBuild, getProject, getVersion } from "./leaf-api"
import { getKV, type KVNamespace } from "./runtime-kv"

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
export const allBuildsKey = (version: string): string => `leaf:cache:builds-all:${version}`

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

export async function readCachedAllBuilds(version: string): Promise<BuildResponse[] | null> {
  const kv = getKV()
  if (!kv) return null
  const raw = await kv.get(allBuildsKey(version))
  if (!raw) return null
  try {
    return JSON.parse(raw) as BuildResponse[]
  } catch {
    return null
  }
}

export async function refreshBuildCache(kv: KVNamespace): Promise<void> {
  const project = await getProject()
  const versions = project.versions

  const nextVersionsRaw = JSON.stringify(versions)
  const prevVersionsRaw = await kv.get(VERSIONS_KEY)
  if (prevVersionsRaw !== nextVersionsRaw) {
    await kv.put(VERSIONS_KEY, nextVersionsRaw)
  }

  await Promise.allSettled(versions.map((version) => refreshVersion(kv, version)))
}

async function refreshVersion(kv: KVNamespace, version: string): Promise<void> {
  const manifest = await getVersion(version)
  const total = manifest.builds.length
  const numbersDesc = [...manifest.builds].toSorted((a, b) => b - a)
  const maxBuild = numbersDesc[0] ?? -1

  // 检测变更
  const prevRecentRaw = await kv.get(buildsKey(version))
  if (prevRecentRaw) {
    try {
      const prev = JSON.parse(prevRecentRaw) as BuildIndex
      if ((prev.builds[0]?.build ?? -1) === maxBuild && prev.total === total) return
    } catch {
      // 继续重建
    }
  }

  // 增量
  const stored = (await readStoredAllBuilds(kv, version)) ?? []
  const known = new Map(stored.map((b) => [b.build, b]))
  const missing = numbersDesc.filter((n) => !known.has(n))

  const fetched = await Promise.all(missing.map((n) => getBuild(version, n)))
  for (const b of fetched) known.set(b.build, b)

  const all = numbersDesc
    .map((n) => known.get(n))
    .filter((b): b is BuildResponse => b !== undefined)

  await kv.put(allBuildsKey(version), JSON.stringify(all))
  const index: BuildIndex = { builds: all.slice(0, RECENT_LIMIT), total }
  await kv.put(buildsKey(version), JSON.stringify(index))
}

async function readStoredAllBuilds(
  kv: KVNamespace,
  version: string
): Promise<BuildResponse[] | null> {
  const raw = await kv.get(allBuildsKey(version))
  if (!raw) return null
  try {
    return JSON.parse(raw) as BuildResponse[]
  } catch {
    return null
  }
}
