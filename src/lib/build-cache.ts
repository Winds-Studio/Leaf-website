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

/**
 * CF 单次 cron 调用的子请求消费
 */
const MAX_SUBREQUESTS = 45

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

  // 装不下后续 cron tick 里继续补
  await versions.reduce(
    (prev, version) =>
      prev.then((budget) => (budget <= 0 ? budget : refreshVersion(kv, version, budget))),
    Promise.resolve(MAX_SUBREQUESTS - 1)
  )
}

/**
 * 在预算内增量刷新单个版本
 */
async function refreshVersion(kv: KVNamespace, version: string, budget: number): Promise<number> {
  if (budget <= 0) return budget
  const manifest = await getVersion(version)
  let left = budget - 1

  const total = manifest.builds.length
  const numbersDesc = [...manifest.builds].toSorted((a, b) => b - a)

  const stored = (await readStoredAllBuilds(kv, version)) ?? []
  const known = new Map(stored.map((b) => [b.build, b]))
  const missing = numbersDesc.filter((n) => !known.has(n))

  // 已完整且无新构建，收工！
  if (missing.length === 0 && known.size === total) return left

  // 本次预算内能抓多少抓多少
  const toFetch = missing.slice(0, left)
  if (toFetch.length === 0) return left // 没预算了 555，跑路辽

  const fetched = await Promise.all(toFetch.map((n) => getBuild(version, n)))
  left -= toFetch.length
  for (const b of fetched) known.set(b.build, b)

  const all = numbersDesc
    .map((n) => known.get(n))
    .filter((b): b is BuildResponse => b !== undefined)

  await kv.put(allBuildsKey(version), JSON.stringify(all))
  const index: BuildIndex = { builds: all.slice(0, RECENT_LIMIT), total }
  await kv.put(buildsKey(version), JSON.stringify(index))
  return left
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
