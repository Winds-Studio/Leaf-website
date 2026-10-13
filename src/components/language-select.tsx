"use client"

import type { ComponentProps } from "react"
import { useI18n } from "fumadocs-ui/contexts/i18n"
import { LanguageSelect } from "fumadocs-ui/layouts/shared/slots/language-select"

// fumadocs labels this trigger "Choose a language", which axe flags for omitting the visible text
export function LanguageSelectNamed(props: ComponentProps<typeof LanguageSelect>) {
  const { locale, locales } = useI18n()
  return <LanguageSelect {...props} aria-label={locales?.find((l) => l.locale === locale)?.name} />
}
