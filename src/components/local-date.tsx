"use client"

import { useEffect, useState } from "react"
import type { Locale } from "@/lib/i18n"
import {
  formatDateLong,
  formatDateLongLocal,
  formatDateShort,
  formatDateShortLocal,
} from "@/lib/format"

type Props = { iso: string; locale: Locale }

/**
 * 创建一个日期显示组件：SSR 阶段使用 `init`（UTC 固定时区）保证水合一致，
 * 水合完成后切换为 `update`（浏览器本地时区）。
 */
function makeLocalDate(
  init: (iso: string, locale: Locale) => string,
  update: (iso: string, locale: Locale) => string,
) {
  return function LocalDate({ iso, locale }: Props) {
    const [text, setText] = useState(() => init(iso, locale))
    useEffect(() => {
      setText(update(iso, locale))
    }, [iso, locale])
    return text
  }
}

/** 短日期，水合后换算为本地时区。@example "Mar 9" / "3 月 9 日" */
export const LocalDateShort = makeLocalDate(formatDateShort, formatDateShortLocal)

/** 完整日期，水合后换算为本地时区。@example "June 1, 2026" / "2026年6月1日" */
export const LocalDateLong = makeLocalDate(formatDateLong, formatDateLongLocal)
