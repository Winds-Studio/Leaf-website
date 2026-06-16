import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/shared"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      disallow: [
        // 禁止抓取 builds 列表页（爬虫扫描会放大 KV 写入）
        "/*/download/*/builds",
      ],
      userAgent: "*",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
