import { Download } from "lucide-react"
import Link from "next/link"

import type { DownloadDict } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/cn"
import { fmtStr } from "@/lib/format"
import { LocalDateShort } from "@/components/local-date"
import { getDownloadUrl, type BuildResponse } from "@/lib/leaf-api"

const LEAF_COMMIT = (sha: string) => `https://github.com/Winds-Studio/Leaf/commit/${sha}`

type BuildTimelineProps = {
  builds: readonly BuildResponse[]
  dict: DownloadDict
  locale: Locale
  totalBuildCount: number
  version: string
}

export function BuildTimeline({
  builds,
  dict,
  locale,
  totalBuildCount,
  version,
}: BuildTimelineProps) {
  if (builds.length === 0) return null

  return (
    <section className="px-6 py-7 sm:px-8 sm:py-8" id="builds">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-fd-foreground text-sm font-medium">{dict.timelineHeading}</h2>
        <span className="text-fd-muted-foreground text-xs">
          {fmtStr(dict.timelineSummary, { count: builds.length, version })}
        </span>
      </div>

      <ol className="border-fd-border flex flex-col gap-4 border-l pl-5" role="list">
        {builds.map((build) => (
          <BuildRow build={build} dict={dict} key={build.build} locale={locale} />
        ))}
      </ol>

      <div className="border-fd-border mt-5 flex items-center justify-between border-t pt-4">
        <Link
          className="text-fd-muted-foreground hover:text-fd-foreground text-xs transition-colors"
          href={`/${locale}/download/${version}/builds`}
        >
          {fmtStr(dict.timelineViewAll, { count: totalBuildCount, version })} →
        </Link>
      </div>
    </section>
  )
}

function BuildRow({
  build,
  dict,
  locale,
}: {
  build: BuildResponse
  dict: DownloadDict
  locale: Locale
}) {
  const isStable = build.channel === "default"
  const firstChange = build.changes?.[0]
  const extraChanges = (build.changes?.length ?? 1) - 1
  const download = pickPrimaryDownload(build)
  const downloadUrl = download
    ? getDownloadUrl(build.version, build.build, download.name)
    : undefined

  return (
    <li
      className={cn("relative flex items-start gap-3", !isStable && "opacity-85")}
      id={`build-${build.build}`}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-[7px] -left-[23px] size-1.5 rounded-full",
          isStable ? "bg-[var(--color-fd-ring)]" : "bg-fd-muted-foreground/40"
        )}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-fd-foreground text-sm font-medium">#{build.build}</span>
          <span
            className={cn(
              "rounded px-1.5 py-0 text-[10px] leading-5 font-medium",
              isStable
                ? "bg-fd-accent text-fd-accent-foreground"
                : "border-fd-border bg-fd-muted text-fd-muted-foreground border"
            )}
          >
            {isStable ? dict.pillStable : dict.pillExperimental}
          </span>
          <span className="text-fd-muted-foreground/80 text-xs">
            <LocalDateShort iso={build.time} locale={locale} />
          </span>
        </div>
        {firstChange?.summary && (
          <div className="mt-1 flex items-start gap-2">
            <p className="text-fd-muted-foreground text-xs leading-relaxed">
              {firstChange.summary}
              {extraChanges > 0 && <span className="opacity-60"> (+{extraChanges})</span>}
            </p>
            {firstChange.commit && (
              <a
                className="border-fd-border bg-fd-background text-fd-muted-foreground hover:text-fd-foreground mt-0.5 shrink-0 rounded border px-1 py-px font-mono text-[10px] leading-none transition-colors"
                href={LEAF_COMMIT(firstChange.commit)}
                rel="noreferrer noopener"
                target="_blank"
              >
                {firstChange.commit.slice(0, 7)}
              </a>
            )}
          </div>
        )}
      </div>
      {downloadUrl && (
        <a
          aria-label={`${dict.ctaDownload} #${build.build}`}
          className="border-fd-border text-fd-foreground hover:bg-fd-accent flex shrink-0 items-center justify-center rounded-md border px-2 py-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-fd-ring)] focus-visible:outline-none"
          download={download?.name}
          href={downloadUrl}
        >
          <Download aria-hidden size={13} strokeWidth={1.75} />
        </a>
      )}
    </li>
  )
}

function pickPrimaryDownload(build: BuildResponse) {
  if (!build.downloads) return null
  return build.downloads.application ?? Object.values(build.downloads)[0] ?? null
}
