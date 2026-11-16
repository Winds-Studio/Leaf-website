import { afterEach, describe, expect, test } from "bun:test"

import { getBuilds, getVersions, pickPrimaryDownload, type BuildResponse } from "./leaf-api"

const realFetch = globalThis.fetch

function stubFetch(body: unknown) {
  globalThis.fetch = (async () => Response.json(body)) as unknown as typeof fetch
}

afterEach(() => {
  globalThis.fetch = realFetch
})

const jar = {
  name: "leaf-1.21.11-180.jar",
  checksums: { sha256: "f00" },
  size: 1,
  url: "https://dl-data.leafmc.one/leaf/1.21.11/180/leaf-1.21.11-180.jar",
}

const v3Build = {
  id: 180,
  time: "2026-11-16T08:33:06.481Z",
  channel: "STABLE",
  commits: [
    { sha: "abc", time: "2026-11-16T00:00:00Z", message: "Fix thing\n\nlong body" },
    { sha: "def", time: "2026-11-15T00:00:00Z", message: "Other" },
  ],
  downloads: { "server:default": jar },
}

describe("getBuilds", () => {
  test("maps a v3 build to the site shape", async () => {
    stubFetch([v3Build])
    const [build] = await getBuilds("1.21.11")
    expect(build).toEqual({
      version: "1.21.11",
      build: 180,
      time: "2026-11-16T08:33:06.481Z",
      channel: "default",
      changes: [
        { commit: "abc", summary: "Fix thing", message: "Fix thing\n\nlong body" },
        { commit: "def", summary: "Other", message: "Other" },
      ],
      downloads: {
        "server:default": { name: jar.name, sha256: "f00", url: jar.url },
      },
    })
  })

  test("treats ALPHA and BETA as experimental", async () => {
    stubFetch([
      { ...v3Build, id: 1, channel: "ALPHA" },
      { ...v3Build, id: 2, channel: "BETA" },
    ])
    const builds = await getBuilds("1.21.11")
    expect(builds.map((b) => b.channel)).toEqual(["experimental", "experimental"])
  })

  test("treats RECOMMENDED as stable", async () => {
    stubFetch([{ ...v3Build, channel: "RECOMMENDED" }])
    const [build] = await getBuilds("1.21.11")
    expect(build?.channel).toBe("default")
  })
})

describe("getVersions", () => {
  test("keeps the support status and end date", async () => {
    stubFetch({
      versions: [
        { version: { id: "1.21.8", support: { status: "UNSUPPORTED", end: "2026-01-01" } } },
        { version: { id: "26.3", support: { status: "SUPPORTED" } } },
      ],
    })
    expect(await getVersions()).toEqual([
      { id: "1.21.8", support: "UNSUPPORTED", supportEnd: "2026-01-01" },
      { id: "26.3", support: "SUPPORTED" },
    ])
  })
})

describe("pickPrimaryDownload", () => {
  const build = (downloads: BuildResponse["downloads"]): BuildResponse => ({
    version: "1.21.11",
    build: 1,
    time: "2026-11-16T00:00:00Z",
    channel: "default",
    downloads,
  })

  test("prefers server:default", () => {
    const other = { name: "other.jar", sha256: "00", url: "https://x/other.jar" }
    const primary = { name: "primary.jar", sha256: "11", url: "https://x/primary.jar" }
    expect(pickPrimaryDownload(build({ other, "server:default": primary }))).toBe(primary)
  })

  test("falls back to the first download", () => {
    const only = { name: "only.jar", sha256: "22", url: "https://x/only.jar" }
    expect(pickPrimaryDownload(build({ only }))).toBe(only)
  })

  test("returns null without downloads", () => {
    expect(pickPrimaryDownload(build(undefined))).toBeNull()
    expect(pickPrimaryDownload(build({}))).toBeNull()
  })
})
