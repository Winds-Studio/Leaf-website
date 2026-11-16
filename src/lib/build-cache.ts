/**
 * Cron 后台缓存
 */

import type { BuildResponse, VersionInfo } from "./leaf-api"
import { getBuilds, getVersions } from "./leaf-api"
import { getKV, type KVNamespace } from "./runtime-kv"

/**
 * 展示多少个
 */
const RECENT_LIMIT = 12

export type BuildIndex = {
  builds: BuildResponse[]
  total: number
  stableTotal: number
}

export function toBuildIndex(all: readonly BuildResponse[]): BuildIndex {
  return {
    builds: all.slice(0, RECENT_LIMIT),
    total: all.length,
    stableTotal: all.filter((b) => b.channel === "default").length,
  }
}

export const VERSIONS_KEY = "leaf:cache:v3:versions"
export const buildsKey = (version: string): string => `leaf:cache:v3:builds:${version}`
export const allBuildsKey = (version: string): string => `leaf:cache:v3:builds-all:${version}`

export async function readCachedVersions(): Promise<VersionInfo[] | null> {
  const kv = getKV()
  if (!kv) return null
  const raw = await kv.get(VERSIONS_KEY)
  if (!raw) return null
  try {
    const versions = JSON.parse(raw) as unknown[]
    // 旧格式（只有版本名），不中
    return typeof versions[0] === "object" ? (versions as VersionInfo[]) : null
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
    const index = JSON.parse(raw) as Partial<BuildIndex>
    // 旧格式（无 stableTotal），不中。等 cron 重写
    return Array.isArray(index.builds) && typeof index.stableTotal === "number"
      ? (index as BuildIndex)
      : null
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
  const versions = await getVersions()

  const nextVersionsRaw = JSON.stringify(versions)
  const prevVersionsRaw = await kv.get(VERSIONS_KEY)
  if (prevVersionsRaw !== nextVersionsRaw) {
    await kv.put(VERSIONS_KEY, nextVersionsRaw)
  }

  // 每个版本一个请求即可拿到全部构建；整体覆盖，晋升为稳定版的构建也能及时更新
  for (const { id: version } of versions) {
    const all = await getBuilds(version)
    await kv.put(allBuildsKey(version), JSON.stringify(all))
    await kv.put(buildsKey(version), JSON.stringify(toBuildIndex(all)))
  }
}
