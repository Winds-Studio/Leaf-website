"use client"

import type { DownloadDict } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import type { BuildResponse } from "@/lib/leaf-api"
import { ApiSnippet } from "./api-snippet"
import { BuildTimeline } from "./build-timeline"
import { VersionPills } from "./filters"
import { HeroCard } from "./hero-card"

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
  const heroBuild = allBuilds[0] ?? null
  const heroFilename = heroBuild ? pickFilenameFromBuild(heroBuild) : undefined

  return (
    <>
      <div className="border-fd-border flex flex-wrap items-center border-t px-6 py-4 sm:px-8">
        <VersionPills activeVersion={activeVersion} locale={locale} versions={versions} />
      </div>

      {banner}

      <HeroCard allBuilds={allBuilds} dict={dict} locale={locale} />

      <BuildTimeline
        builds={allBuilds}
        dict={dict}
        locale={locale}
        totalBuildCount={totalBuildCount}
        version={version}
      />

      {heroBuild && heroFilename && (
        <ApiSnippet build={heroBuild.build} dict={dict} filename={heroFilename} version={version} />
      )}
    </>
  )
}

function pickFilenameFromBuild(build: BuildResponse): string | undefined {
  const dl = build.downloads?.application ?? Object.values(build.downloads ?? {})[0]
  return dl?.name
}
