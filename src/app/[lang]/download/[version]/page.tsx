import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n"

import { DownloadPage } from "../_components/download-page"

type PageParams = {
  params: Promise<{ lang: Locale; version: string }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { version } = await params
  return { title: `Leaf ${version}` }
}

export const dynamic = "force-dynamic"

export default async function Page({ params }: PageParams) {
  const { lang: locale, version } = await params

  return (
    <main className="px-4 py-10 sm:py-14">
      <DownloadPage locale={locale} requestedVersion={version} />
    </main>
  )
}
