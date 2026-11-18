import { afterEach, describe, expect, test } from "bun:test"

import type { BuildResponse } from "./leaf-api"
import type { KVNamespace } from "./runtime-kv"
import {
  allBuildsKey,
  buildsKey,
  refreshBuildCache,
  toBuildIndex,
  VERSIONS_KEY,
} from "./build-cache"

const realFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = realFetch
})

function build(id: number, channel: BuildResponse["channel"]): BuildResponse {
  return { version: "1.21.11", build: id, time: "2026-11-16T00:00:00Z", channel }
}

function memoryKV() {
  const store = new Map<string, string>()
  const writes: string[] = []
  const kv: KVNamespace = {
    get: async (key) => store.get(key) ?? null,
    put: async (key, value) => {
      writes.push(key)
      store.set(key, value)
    },
    delete: async (key) => {
      store.delete(key)
    },
    list: async () => ({ keys: [], list_complete: true }),
  }
  return { kv, store, writes }
}

describe("toBuildIndex", () => {
  test("keeps the 12 newest builds and counts stable ones over all builds", () => {
    const all = Array.from({ length: 15 }, (_, i) =>
      build(15 - i, i % 3 === 0 ? "default" : "experimental")
    )
    const index = toBuildIndex(all)
    expect(index.builds).toHaveLength(12)
    expect(index.builds[0]?.build).toBe(15)
    expect(index.total).toBe(15)
    expect(index.stableTotal).toBe(5)
  })
})

describe("refreshBuildCache", () => {
  test("writes missing cache entries and skips unchanged ones", async () => {
    let channel = "ALPHA"
    globalThis.fetch = (async (url: string) => {
      if (url.endsWith("/projects/leaf/versions")) {
        return Response.json({
          versions: [{ version: { id: "1.21.11", support: { status: "SUPPORTED" } } }],
        })
      }
      return Response.json([
        {
          id: 2,
          time: "2026-11-16T00:00:00Z",
          channel: "STABLE",
          commits: [],
          downloads: {},
        },
        {
          id: 1,
          time: "2026-11-15T00:00:00Z",
          channel,
          commits: [],
          downloads: {},
        },
      ])
    }) as unknown as typeof fetch

    const { kv, store, writes } = memoryKV()
    await refreshBuildCache(kv)

    expect(JSON.parse(store.get(VERSIONS_KEY) ?? "null")).toEqual([
      { id: "1.21.11", support: "SUPPORTED" },
    ])
    expect(JSON.parse(store.get(allBuildsKey("1.21.11")) ?? "null")).toHaveLength(2)
    expect(JSON.parse(store.get(buildsKey("1.21.11")) ?? "null")).toMatchObject({
      total: 2,
      stableTotal: 1,
    })

    writes.length = 0
    await refreshBuildCache(kv)
    expect(writes).toEqual([])

    channel = "STABLE"
    await refreshBuildCache(kv)
    expect(writes).toEqual([allBuildsKey("1.21.11"), buildsKey("1.21.11")])
  })
})
