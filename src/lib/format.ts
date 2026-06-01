import type { Locale } from "@/lib/i18n"

const intlLocale: Record<Locale, string> = {
  de: "de-DE",
  en: "en-US",
  zh: "zh-CN",
}

/**
 * 列表内联用的短日期，如 "Mar 9" / "3 月 9 日" / "9. März"
 */
export function formatDateShort(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    day: "numeric",
    month: "short",
  }).format(new Date(iso))
}

/**
 * 用于规范场景（发布日期、复制粘贴）的 ISO 日期，不受 locale 影响
 */
export function formatDateIso(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10)
}

/**
 * Hero 卡片用的本地化完整日期（含年份）
 */
export function formatDateLong(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso))
}

/**
 * 具名占位符插值：fmtStr("{n} 个构建", { n: 5 }) → "5 个构建"
 */
export function fmtStr(template: string, args: Record<string, string | number>): string {
  return template.replaceAll(/\{(\w+)\}/g, (_, key) => String(args[key] ?? ""))
}

/**
 * 截断 SHA256，保留首尾：abcdef…123456
 */
export function shortenSha(sha: string): string {
  if (!sha) return ""
  if (sha.length <= 14) return sha
  return `${sha.slice(0, 6)}…${sha.slice(-6)}`
}
