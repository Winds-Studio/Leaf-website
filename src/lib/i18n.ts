import { defineI18n } from "fumadocs-core/i18n"

// oxlint-disable-next-line sort-keys - 语言顺序不能变，因为前端按照顺序展示
export const localeMap = {
  en: "english",
  zh: "chinese",
  de: "german",
} as const

export type Locale = keyof typeof localeMap

export const i18n = defineI18n<Locale>({
  defaultLanguage: "en",
  fallbackLanguage: "en",
  languages: Object.keys(localeMap) as Locale[],
  parser: "dir",
})
