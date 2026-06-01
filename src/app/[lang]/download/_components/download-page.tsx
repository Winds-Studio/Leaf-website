import { AlertTriangle, ExternalLink, FlaskConical } from "lucide-react"
import { notFound } from "next/navigation"

import type { LanguageCopy } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import Btn from "@/components/button"
import { getDictionary } from "@/lib/dictionaries"
import { formatDateIso, fmtStr } from "@/lib/format"
import { getBuild, getProject, getVersion, type BuildResponse } from "@/lib/leaf-api"
import { getLatestVersion, isKnownVersion } from "@/lib/semver"

import React from "react"
import { BuildBrowser } from "./build-browser"

const GITHUB_RELEASES = "https://github.com/Winds-Studio/Leaf/releases"
const BUILDS_TO_FETCH = 12

type DownloadPageProps = {
  locale: Locale
  /**
   * When null, resolve to the latest version from the API.
   */
  requestedVersion: string | null
}

export async function DownloadPage({ locale, requestedVersion }: DownloadPageProps) {
  const dictRoot = await getDictionary(locale)
  const dict = dictRoot.download

  let project
  try {
    project = await getProject()
  } catch {
    return <ApiDownFallback dict={dict} />
  }

  if (project.versions.length === 0) {
    return (
      <Page dict={dict}>
        <EmptyState dict={dict} />
      </Page>
    )
  }

  const version = requestedVersion ?? getLatestVersion(project.versions)
  if (requestedVersion && !isKnownVersion(project.versions, requestedVersion)) {
    notFound()
  }

  let versionManifest
  try {
    versionManifest = await getVersion(version)
  } catch {
    return <ApiDownFallback dict={dict} />
  }

  const recentBuildNumbers = [...versionManifest.builds]
    .toSorted((a, b) => b - a)
    .slice(0, BUILDS_TO_FETCH)

  const buildResults = await Promise.allSettled(recentBuildNumbers.map((n) => getBuild(version, n)))

  const allBuilds: BuildResponse[] = buildResults
    .filter((r): r is PromiseFulfilledResult<BuildResponse> => r.status === "fulfilled")
    .map((r) => r.value)

  const isUnmaintained = inferUnmaintained(allBuilds)
  const hasStableBuilds = allBuilds.some((b) => b.channel === "default")
  const isExperimentalOnly = allBuilds.length > 0 && !hasStableBuilds

  const warningItems: WarningItem[] = []
  if (isUnmaintained && allBuilds[0]) {
    warningItems.push({
      body: fmtStr(dict.bannerUnmaintained, { date: formatDateIso(allBuilds[0].time) }),
      icon: "unmaintained",
      title: dict.pillUnmaintained,
    })
  }
  if (isExperimentalOnly) {
    warningItems.push({
      body: dict.stateNoStableBody,
      icon: "experimental",
      title: dict.stateNoStableTitle,
    })
  }

  const banner =
    warningItems.length > 0 ? (
      <WarningBanner disclaimer={dict.disclaimer} items={warningItems} />
    ) : null

  return (
    <Page dict={dict}>
      <BuildBrowser
        allBuilds={allBuilds}
        activeVersion={version}
        banner={banner}
        dict={dict}
        locale={locale}
        totalBuildCount={versionManifest.builds.length}
        version={version}
        versions={project.versions}
      />
    </Page>
  )
}

function Page({ children, dict }: { children: React.ReactNode; dict: LanguageCopy["download"] }) {
  return (
    <div className="mx-auto w-full max-w-(--fd-layout-width)">
      <article>
        <header className="px-6 pt-4 pb-8 sm:px-8 sm:pt-6 sm:pb-10">
          <p className="text-fd-muted-foreground text-xs font-medium tracking-wide uppercase">
            {dict.eyebrow}
          </p>
          <h1 className="text-fd-foreground mt-1.5 text-3xl leading-tight font-medium sm:text-[32px]">
            {dict.title}
          </h1>
          <p className="text-fd-muted-foreground mt-2 max-w-lg text-sm leading-relaxed">
            {dict.intro}
          </p>
        </header>
        {children}
      </article>
    </div>
  )
}

function ApiDownFallback({ dict }: { dict: LanguageCopy["download"] }) {
  return (
    <Page dict={dict}>
      <section className="border-fd-border bg-fd-muted border-t px-6 py-10 text-center sm:px-8">
        <AlertTriangle
          aria-hidden
          className="text-fd-muted-foreground mx-auto"
          size={22}
          strokeWidth={1.5}
        />
        <h2 className="text-fd-foreground mt-3 text-lg font-medium">{dict.stateApiDownTitle}</h2>
        <p className="text-fd-muted-foreground mt-1.5 text-sm leading-relaxed">
          {dict.stateApiDownBody}
        </p>
        <div className="mt-5 inline-flex">
          <Btn as="a" href={GITHUB_RELEASES} variant="primary">
            <ExternalLink size={14} strokeWidth={1.75} />
            {dict.stateGithubFallback}
          </Btn>
        </div>
      </section>
    </Page>
  )
}

function EmptyState({ dict }: { dict: LanguageCopy["download"] }) {
  return (
    <section className="border-fd-border bg-fd-muted border-t px-6 py-10 text-center sm:px-8">
      <h2 className="text-fd-foreground text-lg font-medium">{dict.stateNoBuildsTitle}</h2>
      <p className="text-fd-muted-foreground mt-1.5 text-sm">{dict.stateNoBuildsBody}</p>
    </section>
  )
}

type WarningItem = {
  body: string
  icon: "unmaintained" | "experimental"
  title: string
}

function WarningBanner({ disclaimer, items }: { disclaimer: string; items: WarningItem[] }) {
  return (
    <div
      className="border-t border-amber-200 bg-amber-50 px-6 py-3 text-xs leading-relaxed sm:px-8 dark:border-amber-800/40 dark:bg-amber-950/25"
      role="status"
    >
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div className="flex items-start gap-2" key={item.icon}>
            {item.icon === "unmaintained" ? (
              <AlertTriangle
                aria-hidden
                className="mt-0.5 shrink-0 text-amber-500 dark:text-amber-400"
                size={13}
                strokeWidth={1.75}
              />
            ) : (
              <FlaskConical
                aria-hidden
                className="mt-0.5 shrink-0 text-amber-500 dark:text-amber-400"
                size={13}
                strokeWidth={1.75}
              />
            )}
            <span className="text-amber-800 dark:text-amber-300">
              <span className="font-semibold text-amber-900 dark:text-amber-100">{item.title}</span>
              <span className="mx-1.5 opacity-40" aria-hidden>
                ·
              </span>
              {item.body}
            </span>
          </div>
        ))}
        <p className="border-t border-amber-200/70 pt-1.5 text-amber-700/70 dark:border-amber-800/30 dark:text-amber-400/60">
          {disclaimer}
        </p>
      </div>
    </div>
  )
}

// 超过此天数无新构建 → 判定为停更
const UNMAINTAINED_DAYS = 30

function inferUnmaintained(builds: readonly BuildResponse[]): boolean {
  if (builds.length === 0) return false
  const latest = sortBuildsByTimeDesc(builds)[0]
  if (!latest) return false
  const ageMs = Date.now() - new Date(latest.time).getTime()
  return ageMs > UNMAINTAINED_DAYS * 24 * 60 * 60 * 1000
}

function sortBuildsByTimeDesc(builds: readonly BuildResponse[]): BuildResponse[] {
  return [...builds].toSorted((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
}
