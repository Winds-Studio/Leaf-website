import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import type { Locale } from "@/lib/i18n"
import { Spinner } from "@/components/spinner"
import { readCachedAllBuilds } from "@/lib/build-cache"
import { getDictionary, type DownloadDict } from "@/lib/dictionaries"
import { getBuild, getVersion, type BuildResponse } from "@/lib/leaf-api"

import { BuildsView } from "./_components/builds-view"

type PageParams = {
  params: Promise<{ lang: Locale; version: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang: locale, version } = await params
  const dict_root = await getDictionary(locale)
  const dict = dict_root.download
  return {
    description: dict.intro,
    title: `${dict.timelineHeading} · ${version}`,
  }
}

// 页面需要动态性
export const dynamic = "force-dynamic"

export default async function Page({ params, searchParams }: PageParams) {
  const [{ lang: locale, version }, sp] = await Promise.all([params, searchParams])
  const dict_root = await getDictionary(locale)
  const dict = dict_root.download
  const defaultPage = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1)

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

        <Suspense
          fallback={
            <div className="border-fd-border flex min-h-[40vh] items-center justify-center border-t">
              <Spinner label={dict.loading} />
            </div>
          }
        >
          <BuildsData defaultPage={defaultPage} dict={dict} locale={locale} version={version} />
        </Suspense>
      </div>
    </main>
  )
}

// 版本列表用 no-store 拉取（不写 KV）。
async function BuildsData({
  defaultPage,
  dict,
  locale,
  version,
}: {
  defaultPage: number
  dict: DownloadDict
  locale: Locale
  version: string
}) {
  let allBuilds: BuildResponse[]
  try {
    allBuilds = await resolveAllBuilds(version)
  } catch {
    notFound()
  }

  return (
    <BuildsView
      allBuilds={allBuilds}
      defaultPage={defaultPage}
      dict={dict}
      locale={locale}
      version={version}
    />
  )
}

async function resolveAllBuilds(version: string): Promise<BuildResponse[]> {
  const cached = await readCachedAllBuilds(version)
  if (cached) return cached

  // 回退
  const manifest = await getVersion(version, { cache: "no-store" })
  const allBuildNumbers = [...manifest.builds].toSorted((a, b) => b - a)
  const results = await Promise.allSettled(allBuildNumbers.map((n) => getBuild(version, n)))
  return results
    .filter((r): r is PromiseFulfilledResult<BuildResponse> => r.status === "fulfilled")
    .map((r) => r.value)
}
