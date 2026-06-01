import { createTokenizer } from "@orama/tokenizers/mandarin"
import { createFromSource } from "fumadocs-core/search/server"
import type { Locale } from "@/lib/i18n"
import { source } from "@/lib/source"

type OramaLocaleMap = Record<Locale, Parameters<typeof createFromSource>[1]>

const searchLocaleMap: OramaLocaleMap = {
  de: { language: "german" },
  en: { language: "english" },
  zh: {
    components: { tokenizer: createTokenizer() },
    search: { threshold: 0, tolerance: 0 },
  },
}

export const { GET } = createFromSource(source, {
  async buildIndex(page) {
    const { structuredData } = await page.data.load()
    return {
      description: page.data.description,
      id: page.url,
      structuredData,
      tag: page.slugs[0],
      title: page.data.title,
      url: page.url,
    }
  },
  localeMap: searchLocaleMap,
})
