import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n"
import { getDictionary } from "@/lib/dictionaries"

import { DownloadPage } from "./_components/download-page"

type PageParams = {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return { title: dict.download.title }
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
