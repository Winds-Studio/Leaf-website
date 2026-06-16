"use client"

import { ExternalLink, Fingerprint, FileDown, ListTree } from "lucide-react"

import type { DownloadDict } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import type { BuildResponse } from "@/lib/leaf-api"
import Btn from "@/components/button"
import { LocalDateLong } from "@/components/local-date"
import { fmtStr, shortenSha } from "@/lib/format"
import { getDownloadUrl } from "@/lib/leaf-api"
import { trackDownload } from "@/lib/umami"

import { CopyButton } from "./copy-button"

const GITHUB_RELEASES = "https://github.com/Winds-Studio/Leaf/releases"

type HeroCardProps = {
  allBuilds: BuildResponse[]
  dict: DownloadDict
  locale: Locale
}

export function HeroCard({ allBuilds, dict, locale }: HeroCardProps) {
  const build = allBuilds[0] ?? null
  if (!build) return <HeroEmpty dict={dict} />
  return <HeroBody build={build} dict={dict} locale={locale} />
}

type HeroBodyProps = {
  build: BuildResponse
  dict: DownloadDict
  locale: Locale
}

function HeroBody({ build, dict, locale }: HeroBodyProps) {
  const download = pickPrimaryDownload(build)
  const downloadUrl = download
    ? getDownloadUrl(build.version, build.build, download.name)
    : undefined

  const isStable = build.channel === "default"
  const pillKind = isStable ? "default" : "experimental"
  const pillLabel = isStable ? dict.pillLatestStable : dict.pillLatestExperimental
  return (
    <section
      aria-labelledby="hero-version"
      className="border-fd-border bg-fd-muted border-y px-6 py-7 sm:px-8 sm:py-8"
    >
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <span className={cnPill(pillKind)}>
            {pillKind === "experimental" ? (
              <span aria-hidden className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-400 opacity-75 dark:bg-violet-500" />
                <span className="relative inline-flex size-1.5 rounded-full bg-violet-500 dark:bg-violet-400" />
              </span>
            ) : (
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
              />
            )}
            {pillLabel}
          </span>

          <h2
            className="text-fd-foreground mt-3 text-2xl leading-tight font-medium sm:text-[26px]"
            id="hero-version"
          >
            <span>Leaf {build.version}</span>
            <span className="text-fd-muted-foreground"> · </span>
            <span className="text-fd-muted-foreground font-normal">
              {fmtStr(dict.heroBuild, { n: build.build })}
            </span>
          </h2>

          <p className="text-fd-muted-foreground mt-1.5 text-sm leading-relaxed">
            {dict.heroReleasedOn.split("{date}")[0]}
            <LocalDateLong iso={build.time} locale={locale} />
            {dict.heroReleasedOn.split("{date}")[1]}
            <span className="text-fd-border mx-1.5" aria-hidden>
              ·
            </span>
            {javaRequirement(build.version)}
          </p>

          {download && (
            <Sha256Row
              copiedLabel={dict.copied}
              copyLabel={dict.copy}
              label={dict.sha256Label}
              sha={download.sha256}
            />
          )}
        </div>

        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:items-start">
          {downloadUrl ? (
            <Btn
              as="a"
              download={download?.name}
              href={downloadUrl}
              onClick={() => {
                trackDownload(build.version, build.build, download?.name ?? "")
              }}
              size="lg"
              variant="primary"
            >
              <FileDown size={16} strokeWidth={1.75} />
              {dict.ctaDownload}
            </Btn>
          ) : (
            <Btn as="a" href={GITHUB_RELEASES} size="lg" variant="primary">
              <ExternalLink size={16} strokeWidth={1.75} />
              {dict.stateGithubFallback}
            </Btn>
          )}
        </div>
      </div>
    </section>
  )
}

function Sha256Row({
  copiedLabel,
  copyLabel,
  label,
  sha,
}: {
  copiedLabel: string
  copyLabel: string
  label: string
  sha: string
}) {
  return (
    <div className="border-fd-border bg-fd-background text-fd-muted-foreground mt-4 flex w-fit max-w-md items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-[11px] leading-relaxed">
      <Fingerprint aria-hidden className="shrink-0" size={13} strokeWidth={1.75} />
      <span className="truncate">
        <span className="text-fd-foreground/60">{label}:</span> {shortenSha(sha)}
      </span>
      <CopyButton
        className="ml-auto shrink-0"
        copiedLabel={copiedLabel}
        label={copyLabel}
        value={sha}
      />
    </div>
  )
}

function HeroEmpty({ dict }: { dict: DownloadDict }) {
  return (
    <section
      aria-labelledby="hero-empty"
      className="border-fd-border bg-fd-muted border-y px-6 py-10 text-center sm:px-8"
    >
      <ListTree
        aria-hidden
        className="text-fd-muted-foreground mx-auto"
        size={20}
        strokeWidth={1.5}
      />
      <h2 className="text-fd-foreground mt-3 text-lg font-medium" id="hero-empty">
        {dict.stateNoBuildsTitle}
      </h2>
      <p className="text-fd-muted-foreground mt-1.5 text-sm">{dict.stateNoBuildsBody}</p>
    </section>
  )
}

function cnPill(kind: "default" | "experimental"): string {
  if (kind === "experimental") {
    return "inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-xs font-medium leading-6 text-violet-800 dark:border-violet-800/50 dark:bg-violet-950/40 dark:text-violet-200"
  }
  return "inline-flex items-center gap-1.5 rounded-full bg-fd-accent px-2.5 py-0.5 text-xs font-medium leading-6 text-fd-accent-foreground"
}

function pickPrimaryDownload(build: BuildResponse) {
  if (!build.downloads) return null
  return build.downloads.application ?? Object.values(build.downloads)[0] ?? null
}

function javaRequirement(mcVersion: string): string {
  const [majorStr = "0", minorStr = "0", patchStr = "0"] = mcVersion.split(".");
  const major = Number.parseInt(majorStr, 10);
  const minor = Number.parseInt(minorStr, 10);
  const patch = Number.parseInt(patchStr, 10);
  if (major >= 26) return "Java 25+";
  if (minor > 20 || (minor === 20 && patch >= 5)) return "Java 21+"
  if (minor >= 18) return "Java 17+"
  if (minor >= 17) return "Java 16+"
  return "Java 8+"
}
