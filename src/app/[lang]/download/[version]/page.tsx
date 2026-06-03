import type { Metadata } from "next"
import { i18n, type Locale } from "@/lib/i18n"

import { getProject } from "@/lib/leaf-api"
import { DownloadPage } from "../_components/download-page"

type PageParams = {
  params: Promise<{ lang: Locale; version: string }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { version } = await params
  return { title: `Leaf ${version}` }
}

export async function generateStaticParams() {
  try {
    const project = await getProject()
    return i18n.languages.flatMap((lang) => project.versions.map((version) => ({ lang, version })))
  } catch {
    return []
  }
}

export const revalidate = 1800

export default async function Page({ params }: PageParams) {
  const { lang: locale, version } = await params

  return (
    <main className="px-4 py-10 sm:py-14">
      <DownloadPage locale={locale} requestedVersion={version} />
    </main>
  )
}
