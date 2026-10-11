import { KVCacheHandler } from "vinext/cloudflare"
import handler from "vinext/server/app-router-entry"
import {
  handleImageOptimization,
  DEFAULT_DEVICE_SIZES,
  DEFAULT_IMAGE_SIZES,
} from "vinext/server/image-optimization"
import { setCacheHandler } from "vinext/shims/cache"

import { refreshBuildCache } from "@/lib/build-cache"
import { setKV } from "@/lib/runtime-kv"
import { refreshStatsCache } from "@/lib/stats"

interface KVNamespace {
  get(key: string, options?: { type?: string }): Promise<string | null>
  get(key: string, options: { type: "arrayBuffer" }): Promise<ArrayBuffer | null>
  put(
    key: string,
    value: string | ArrayBuffer | ReadableStream,
    options?: { expirationTtl?: number; metadata?: Record<string, unknown> }
  ): Promise<void>
  delete(key: string): Promise<void>
  list(options?: { prefix?: string; limit?: number; cursor?: string }): Promise<{
    keys: Array<{ name: string; metadata?: Record<string, unknown> }>
    list_complete: boolean
    cursor?: string
  }>
}

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> }
  VINEXT_CACHE: KVNamespace
  GITHUB_TOKEN?: string
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>
      }
    }
  }
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void
  passThroughOnException(): void
}

interface ScheduledController {
  scheduledTime: number
  cron: string
}

let cacheReady = false

function injectGitHubToken(env: Env): void {
  if (env.GITHUB_TOKEN) {
    process.env.GITHUB_TOKEN = env.GITHUB_TOKEN
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    injectGitHubToken(env)

    // 本地就是没有这个变量
    if (!cacheReady && env?.VINEXT_CACHE) {
      // 大 TTL 用来削减冗余读取
      setCacheHandler(new KVCacheHandler(env.VINEXT_CACHE, { tagCacheTtlMs: 21_600_000 }))
      cacheReady = true
    }

    if (env?.VINEXT_CACHE) setKV(env.VINEXT_CACHE)

    const url = new URL(request.url)

    // /favicon.ico 默认请求，否则落到 /[lang] 返回 500
    if (url.pathname === "/favicon.ico") {
      return env.ASSETS.fetch(new Request(new URL("/logo.png", request.url)))
    }

    // CF 图片优化
    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES]
      return handleImageOptimization(
        request,
        {
          fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
          transformImage: async (body, { width, format, quality }) => {
            const result = await env.IMAGES.input(body)
              .transform(width > 0 ? { width } : {})
              .output({ format, quality })
            return result.response()
          },
        },
        allowedWidths
      )
    }

    return handler.fetch(request, env, ctx)
  },

  async scheduled(
    _controller: ScheduledController,
    env: Env,
    _ctx: ExecutionContext
  ): Promise<void> {
    if (!env?.VINEXT_CACHE) return
    injectGitHubToken(env)
    await Promise.all([refreshBuildCache(env.VINEXT_CACHE), refreshStatsCache(env.VINEXT_CACHE)])
  },
}
