import type { Locale } from "@/lib/i18n"

const intlLocale: Record<Locale, string> = {
  de: "de-DE",
  en: "en-US",
  zh: "zh-CN",
}

const SHORT_OPTS = { day: "numeric", month: "short" } as const satisfies Intl.DateTimeFormatOptions
const LONG_OPTS = { day: "numeric", month: "long", year: "numeric" } as const satisfies Intl.DateTimeFormatOptions

function fmt(iso: string, locale: Locale, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(intlLocale[locale], options).format(new Date(iso))
}

/**
 * 列表内联用的短日期，固定 UTC 时区保证 SSR 水合一致。
 * @example "Mar 9" / "3 月 9 日" / "9. März"
 */
export function formatDateShort(iso: string, locale: Locale): string {
  return fmt(iso, locale, { ...SHORT_OPTS, timeZone: "UTC" })
}

/**
 * 短日期，使用浏览器本地时区，仅供客户端水合后调用。
 * @see {@link LocalDateShort} 用于避免水合不匹配的封装组件
 */
export function formatDateShortLocal(iso: string, locale: Locale): string {
  return fmt(iso, locale, SHORT_OPTS)
}

/**
 * Hero 卡片用的完整本地化日期，固定 UTC 时区保证 SSR 水合一致。
 * @example "June 1, 2026" / "2026年6月1日" / "1. Juni 2026"
 */
export function formatDateLong(iso: string, locale: Locale): string {
  return fmt(iso, locale, { ...LONG_OPTS, timeZone: "UTC" })
}

/**
 * 完整日期，使用浏览器本地时区，仅供客户端水合后调用。
 * @see {@link LocalDateLong} 用于避免水合不匹配的封装组件
 */
export function formatDateLongLocal(iso: string, locale: Locale): string {
  return fmt(iso, locale, LONG_OPTS)
}

/**
 * 规范化 ISO 日期字符串，不受 locale 和时区影响。
 * @returns `"YYYY-MM-DD"` 格式
 */
export function formatDateIso(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10)
}

/**
 * 具名占位符插值。
 * @example fmtStr("{n} 个构建", { n: 5 }) // → "5 个构建"
 */
export function fmtStr(template: string, args: Record<string, string | number>): string {
  return template.replaceAll(/\{(\w+)}/g, (_, key) => String(args[key] ?? ""))
}

/**
 * 截断 SHA256 摘要，保留首尾各 6 位。
 * @example "abcdef…123456"
 */
export function shortenSha(sha: string): string {
  if (!sha || sha.length <= 14) return sha
  return `${sha.slice(0, 6)}…${sha.slice(-6)}`
}
