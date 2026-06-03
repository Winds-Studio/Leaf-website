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

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // oxlint-disable-next-line typescript/no-unnecessary-condition - 本地就是没有这个变量
    if (!cacheReady && env?.VINEXT_CACHE) {
      // 大 TTL 用来削减冗余读取
      setCacheHandler(new KVCacheHandler(env.VINEXT_CACHE, { tagCacheTtlMs: 21_600_000 }))
      cacheReady = true
    }

    // oxlint-disable-next-line typescript/no-unnecessary-condition
    if (env?.VINEXT_CACHE) setKV(env.VINEXT_CACHE)

    const url = new URL(request.url)

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
    // oxlint-disable-next-line typescript/no-unnecessary-condition
    if (!env?.VINEXT_CACHE) return
    await refreshBuildCache(env.VINEXT_CACHE)
  },
}
