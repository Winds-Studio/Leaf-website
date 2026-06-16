import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n"
import { getDictionary } from "@/lib/dictionaries"
import { i18n } from "@/lib/i18n"

import { DownloadPage } from "./_components/download-page"

type PageParams = {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const description = dict.download.intro

  const languages = Object.fromEntries(i18n.languages.map((l) => [l, `/${l}/download`]))

  return {
    alternates: {
      canonical: `/${lang}/download`,
      languages: { ...languages, "x-default": "/en/download" },
    },
    description,
    openGraph: {
      description,
      title: dict.download.title,
      type: "website",
    },
    title: dict.download.title,
    twitter: {
      card: "summary",
    },
  }
}

export const dynamic = "force-dynamic"

export default async function Page({ params }: PageParams) {
  const { lang: locale } = await params

  return (
    <main className="px-4 py-10 sm:py-14">
      <DownloadPage locale={locale} requestedVersion={null} />
    </main>
  )
}
