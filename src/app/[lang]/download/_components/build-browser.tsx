"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

import type { DownloadDict } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import type { BuildResponse } from "@/lib/leaf-api"
import { Spinner } from "@/components/spinner"
import { cn } from "@/lib/cn"
import { ApiSnippet } from "./api-snippet"
import { BuildTimeline } from "./build-timeline"
import { VersionPills } from "./filters"
import { HeroCard } from "./hero-card"

// 防止闪烁
const LOADING_DELAY_MS = 120

export function BuildBrowser({
  allBuilds,
  activeVersion,
  banner,
  dict,
  locale,
  totalBuildCount,
  version,
  versions,
}: {
  allBuilds: BuildResponse[]
  activeVersion: string
  banner?: React.ReactNode
  dict: DownloadDict
  locale: Locale
  totalBuildCount: number
  version: string
  versions: readonly string[]
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [pendingVersion, setPendingVersion] = useState<string | null>(null)
  const [showLoading, setShowLoading] = useState(false)

  const handleSelectVersion = (next: string) => {
    if (isPending || next === activeVersion) return
    setPendingVersion(next)
    startTransition(() => {
      router.push(`/${locale}/download/${next}`)
    })
  }

  const handlePrefetchVersion = (next: string) => {
    if (next === activeVersion) return
    router.prefetch(`/${locale}/download/${next}`)
  }

  useEffect(() => {
    if (!isPending) {
      setShowLoading(false)
      return
    }
    const timer = setTimeout(() => {
      setShowLoading(true)
    }, LOADING_DELAY_MS)
    return () => {
      clearTimeout(timer)
    }
  }, [isPending])

  const heroBuild = allBuilds[0] ?? null
  const heroFilename = heroBuild ? pickFilenameFromBuild(heroBuild) : undefined

  return (
    <>
      <div className="border-fd-border flex flex-wrap items-center border-t px-6 py-4 sm:px-8">
        <VersionPills
          activeVersion={pendingVersion ?? activeVersion}
          disabled={showLoading}
          onPrefetch={handlePrefetchVersion}
          onSelect={handleSelectVersion}
          versions={versions}
        />
      </div>

      {banner}

      <div className="relative" aria-busy={showLoading}>
        {showLoading && (
          <div className="absolute inset-0 z-10 flex items-start justify-center pt-24">
            <Spinner label={dict.loading} />
          </div>
        )}

        <div className={cn("transition-opacity", showLoading && "pointer-events-none opacity-40")}>
          <HeroCard allBuilds={allBuilds} dict={dict} locale={locale} />

          <BuildTimeline
            builds={allBuilds}
            dict={dict}
            locale={locale}
            totalBuildCount={totalBuildCount}
            version={version}
          />

          {heroBuild && heroFilename && (
            <ApiSnippet
              build={heroBuild.build}
              dict={dict}
              filename={heroFilename}
              version={version}
            />
          )}
        </div>
      </div>
    </>
  )
}

function pickFilenameFromBuild(build: BuildResponse): string | undefined {
  const dl = build.downloads?.application ?? Object.values(build.downloads ?? {})[0]
  return dl?.name
}
