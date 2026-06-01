import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getDictionary } from "@/lib/dictionaries"
import { i18n, type Locale } from "@/lib/i18n"
import { getBuild, getProject, getVersion, type BuildResponse } from "@/lib/leaf-api"

import { BuildsView } from "./_components/builds-view"

type PageParams = {
  params: Promise<{ lang: Locale; version: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  try {
    const project = await getProject()
    return i18n.languages.flatMap((lang) => project.versions.map((version) => ({ lang, version })))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang: locale, version } = await params
  const dict_root = await getDictionary(locale)
  const dict = dict_root.download
  return {
    description: dict.intro,
    title: `${dict.timelineHeading} · Leaf ${version}`,
  }
}

export const revalidate = 60

export default async function Page({ params, searchParams }: PageParams) {
  const [{ lang: locale, version }, sp] = await Promise.all([params, searchParams])
  const dict_root = await getDictionary(locale)
  const dict = dict_root.download
  const defaultPage = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1)

  let manifest
  try {
    manifest = await getVersion(version)
  } catch {
    notFound()
  }

  const allBuildNumbers = [...manifest.builds].toSorted((a, b) => b - a)
  const results = await Promise.allSettled(allBuildNumbers.map((n) => getBuild(version, n)))
  const allBuilds: BuildResponse[] = results
    .filter((r): r is PromiseFulfilledResult<BuildResponse> => r.status === "fulfilled")
    .map((r) => r.value)

  return (
    <main className="px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-5xl">
        <header className="px-6 pt-4 pb-8 sm:px-8 sm:pt-6 sm:pb-10">
          <Link
            className="text-fd-muted-foreground hover:text-fd-foreground inline-flex items-center gap-1.5 text-xs transition-colors"
            href={`/${locale}/download/${version}`}
          >
            <ArrowLeft aria-hidden size={12} strokeWidth={1.75} />
            Leaf {version}
          </Link>
          <p className="text-fd-muted-foreground mt-3 text-xs font-medium tracking-wide uppercase">
            {dict.timelineHeading}
          </p>
          <h1 className="text-fd-foreground mt-1.5 text-3xl leading-tight font-medium sm:text-[32px]">
            Leaf {version}
          </h1>
        </header>

        <BuildsView
          allBuilds={allBuilds}
          defaultPage={defaultPage}
          dict={dict}
          locale={locale}
          version={version}
        />
      </div>
    </main>
  )
}
