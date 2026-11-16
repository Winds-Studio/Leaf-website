import { AlertTriangle, ExternalLink, FlaskConical } from "lucide-react"
import { notFound } from "next/navigation"

import type { LanguageCopy } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import Btn from "@/components/button"
import { readCachedBuilds, resolveVersions, toBuildIndex, type BuildIndex } from "@/lib/build-cache"
import { getDictionary } from "@/lib/dictionaries"
import { formatDateIso, fmtStr } from "@/lib/format"
import { getBuilds, type VersionInfo } from "@/lib/leaf-api"
import { getLatestVersion, isKnownVersion } from "@/lib/semver"

import React from "react"
import { BuildBrowser } from "./build-browser"

const GITHUB_RELEASES = "https://github.com/Winds-Studio/Leaf/releases"

type DownloadPageProps = {
  locale: Locale
  /**
   * When null, resolve to the latest version from the API.
   */
  requestedVersion: string | null
}

async function resolveBuilds(version: string): Promise<BuildIndex> {
  const cached = await readCachedBuilds(version)
  if (cached) return cached
  return toBuildIndex(await getBuilds(version))
}

export async function DownloadPage({ locale, requestedVersion }: DownloadPageProps) {
  const dictRoot = await getDictionary(locale)
  const dict = dictRoot.download

  let versionInfos: VersionInfo[]
  try {
    versionInfos = await resolveVersions()
  } catch {
    return <ApiDownFallback dict={dict} />
  }

  const versions = versionInfos.map((v) => v.id)
  if (versions.length === 0) {
    return (
      <Page dict={dict}>
        <EmptyState dict={dict} />
      </Page>
    )
  }

  const version = requestedVersion ?? getLatestVersion(versions)
  if (requestedVersion && !isKnownVersion(versions, requestedVersion)) {
    notFound()
  }

  let index: BuildIndex
  try {
    index = await resolveBuilds(version)
  } catch {
    return <ApiDownFallback dict={dict} />
  }

  const info = versionInfos.find((v) => v.id === version)

  // 弃用 / 停止支持与“只有实验性构建”同时出现时，只显示前者这一行
  const support = info?.support ?? "SUPPORTED"
  const isExperimentalOnly = index.total > 0 && index.stableTotal === 0

  let warning: WarningItem | null = null
  if (support !== "SUPPORTED") {
    const deprecated = support === "DEPRECATED"
    let body = deprecated ? dict.supportDeprecatedBody : dict.supportUnsupportedBody
    if (isExperimentalOnly) body += ` ${dict.supportNoStable}`
    if (!deprecated && index.builds[0]) {
      body += ` · ${fmtStr(dict.lastBuilt, { date: formatDateIso(index.builds[0].time) })}`
    }
    if (info?.supportEnd) {
      body += ` ${fmtStr(dict.supportEnd, { date: formatDateIso(info.supportEnd) })}`
    }
    warning = {
      body,
      icon: "unmaintained",
      title: deprecated ? dict.supportDeprecatedTitle : dict.supportUnsupportedTitle,
    }
  } else if (isExperimentalOnly) {
    warning = {
      body: dict.bannerExperimental,
      icon: "experimental",
      title: dict.channelExperimental,
    }
  }

  const banner = warning ? (
    <WarningBanner
      disclaimer={
        warning.icon === "experimental" || support === "UNSUPPORTED" ? dict.disclaimer : undefined
      }
      item={warning}
    />
  ) : null

  return (
    <Page dict={dict}>
      <BuildBrowser
        allBuilds={index.builds}
        activeVersion={version}
        banner={banner}
        dict={dict}
        key={version}
        locale={locale}
        totalBuildCount={index.total}
        version={version}
        versions={versions}
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

function WarningBanner({ disclaimer, item }: { disclaimer?: string; item: WarningItem }) {
  const Icon = item.icon === "unmaintained" ? AlertTriangle : FlaskConical
  return (
    <div
      className="border-t border-amber-200 bg-amber-50 px-6 py-3 text-xs leading-relaxed sm:px-8 dark:border-amber-800/40 dark:bg-amber-950/25"
      role="status"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <Icon
            aria-hidden
            className="mt-0.5 shrink-0 text-amber-500 dark:text-amber-400"
            size={13}
            strokeWidth={1.75}
          />
          <span className="text-amber-800 dark:text-amber-300">
            <span className="font-semibold text-amber-900 dark:text-amber-100">{item.title}</span>
            <span className="mx-1.5 opacity-40" aria-hidden>
              ·
            </span>
            {item.body}
          </span>
        </div>
        {disclaimer && (
          <p className="border-t border-amber-200/70 pt-1.5 text-amber-700/70 dark:border-amber-800/30 dark:text-amber-400/60">
            {disclaimer}
          </p>
        )}
      </div>
    </div>
  )
}
