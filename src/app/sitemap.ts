import type { MetadataRoute } from "next"
import { i18n } from "@/lib/i18n"
import { siteUrl } from "@/lib/shared"
import { source } from "@/lib/source"

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of i18n.languages) {
    entries.push({
      changeFrequency: "weekly",
      priority: 1.0,
      url: `${siteUrl}/${lang}`,
    })
  }

  for (const lang of i18n.languages) {
    entries.push({
      changeFrequency: "daily",
      priority: 0.8,
      url: `${siteUrl}/${lang}/download`,
    })
  }

  for (const page of source.getPages()) {
    const slugPath = page.slugs.length > 0 ? `/${page.slugs.join("/")}` : ""
    entries.push({
      changeFrequency: "weekly",
      priority: 0.7,
      url: `${siteUrl}/${page.locale}/docs${slugPath}`,
    })
  }

  return entries
}
