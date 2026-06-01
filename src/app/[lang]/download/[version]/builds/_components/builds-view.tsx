"use client"

import { Download } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import type { DownloadDict } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n"
import type { BuildResponse } from "@/lib/leaf-api"
import { cn } from "@/lib/cn"
import { formatDateShort, fmtStr } from "@/lib/format"
import { getDownloadUrl } from "@/lib/leaf-api"
import { trackDownload } from "@/lib/umami"
import { ChannelToggle } from "../../../_components/filters"
import { channelToApi, type Channel } from "../../../_components/types"

const PAGE_SIZE = 25

type BuildsViewProps = {
  allBuilds: BuildResponse[]
  defaultPage: number
  dict: DownloadDict
  locale: Locale
  version: string
}

export function BuildsView({ allBuilds, defaultPage, dict, locale, version }: BuildsViewProps) {
  const [channel, setChannel] = useState<Channel>("all")
  const [page, setPage] = useState(defaultPage)

  const hiddenChannels = useMemo<Channel[]>(() => {
    const hidden: Channel[] = []
    if (!allBuilds.some((b) => b.channel === "default")) hidden.push("stable")
    if (!allBuilds.some((b) => b.channel === "experimental")) hidden.push("experimental")
    return hidden
  }, [allBuilds])

  const apiChannel = channelToApi(channel)
  const filtered = apiChannel ? allBuilds.filter((b) => b.channel === apiChannel) : allBuilds
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageBuilds = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const noBuildsMessage =
    channel === "all"
      ? dict.stateNoBuildsBody
      : fmtStr(dict.stateNoChannelBuilds, {
          channel: channel === "stable" ? dict.channelStable : dict.channelExperimental,
        })

  const handleChannelChange = (next: Channel) => {
    setChannel(next)
    setPage(1)
  }

  const handlePageChange = (next: number) => {
    setPage(next)
    globalThis.scrollTo({ behavior: "smooth", top: 0 })
  }

  useEffect(() => {
    const url = new URL(globalThis.location.href)
    if (safePage > 1) url.searchParams.set("page", String(safePage))
    else url.searchParams.delete("page")
    globalThis.history.replaceState(null, "", url.toString())
  }, [safePage])

  return (
    <>
      <div className="border-fd-border flex flex-wrap items-center justify-between gap-4 border-t px-6 py-4 sm:px-8">
        <span className="text-fd-muted-foreground text-sm">
          {fmtStr(dict.buildCount, { n: total })}
        </span>
        <ChannelToggle
          channel={channel}
          dict={dict}
          hiddenChannels={hiddenChannels}
          onChange={handleChannelChange}
        />
      </div>

      <div className="border-fd-border flex items-center justify-between border-t px-6 py-3 sm:px-8">
        <span className="text-fd-muted-foreground text-xs">
          {fmtStr(dict.pagination, { page: safePage, total: totalPages })}
        </span>
      </div>

      <BuildsTable
        builds={pageBuilds}
        dict={dict}
        locale={locale}
        noBuildsMessage={noBuildsMessage}
        version={version}
      />

      {totalPages > 1 && (
        <Pagination page={safePage} totalPages={totalPages} onChange={handlePageChange} />
      )}
    </>
  )
}

function BuildsTable({
  builds,
  dict,
  locale,
  noBuildsMessage,
  version,
}: {
  builds: BuildResponse[]
  dict: DownloadDict
  locale: Locale
  noBuildsMessage: string
  version: string
}) {
  if (builds.length === 0) {
    return (
      <div className="border-fd-border text-fd-muted-foreground border-t px-6 py-12 text-center text-sm sm:px-8">
        {noBuildsMessage}
      </div>
    )
  }

  return (
    <div className="border-fd-border border-t">
      <table aria-label={`Builds for Leaf ${version}`} className="w-full text-sm">
        <tbody>
          {builds.map((b) => (
            <BuildsTableRow build={b} dict={dict} key={b.build} locale={locale} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function BuildsTableRow({
  build,
  dict,
  locale,
}: {
  build: BuildResponse
  dict: DownloadDict
  locale: Locale
}) {
  const isStable = build.channel === "default"
  const dl = build.downloads?.application ?? Object.values(build.downloads ?? {})[0]
  const url = dl ? getDownloadUrl(build.version, build.build, dl.name) : undefined
  const firstChange = build.changes?.[0]
  const extra = (build.changes?.length ?? 1) - 1

  return (
    <tr className="border-fd-border hover:bg-fd-muted/40 border-b last:border-b-0">
      <td className="text-fd-foreground px-6 py-3 align-middle font-medium sm:px-8">
        #{build.build}
      </td>
      <td className="px-3 py-3 align-middle">
        <span
          className={cn(
            "inline-flex rounded px-1.5 py-0 text-[10px] leading-5 font-medium",
            isStable
              ? "bg-fd-accent text-fd-accent-foreground"
              : "border-fd-border bg-fd-muted text-fd-muted-foreground border"
          )}
        >
          {isStable ? dict.pillStable : dict.pillExperimental}
        </span>
      </td>
      <td className="text-fd-muted-foreground px-3 py-3 align-middle text-xs whitespace-nowrap">
        {formatDateShort(build.time, locale)}
      </td>
      <td className="text-fd-muted-foreground px-3 py-3 align-middle">
        <div className="flex min-w-0 items-center gap-2">
          <span className="line-clamp-1 min-w-0">
            {firstChange?.summary ?? "—"}
            {extra > 0 && <span className="opacity-60"> (+{extra})</span>}
          </span>
          {firstChange?.commit && (
            <a
              className="border-fd-border bg-fd-background hover:text-fd-foreground shrink-0 rounded border px-1 py-px font-mono text-[10px] leading-none transition-colors"
              href={`https://github.com/Winds-Studio/Leaf/commit/${firstChange.commit}`}
              rel="noreferrer noopener"
              target="_blank"
            >
              {firstChange.commit.slice(0, 7)}
            </a>
          )}
        </div>
      </td>
      <td className="px-6 py-3 text-right align-middle sm:px-8">
        {url && (
          <a
            aria-label={`${dict.ctaDownload} #${build.build}`}
            className="border-fd-border text-fd-foreground hover:bg-fd-accent inline-flex items-center justify-center rounded-md border px-2 py-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-fd-ring)] focus-visible:outline-none"
            download={dl?.name}
            href={url}
            onClick={() => {
              trackDownload(build.version, build.build, dl?.name ?? "")
            }}
          >
            <Download aria-hidden size={13} strokeWidth={1.75} />
          </a>
        )}
      </td>
    </tr>
  )
}

function Pagination({
  onChange,
  page,
  totalPages,
}: {
  onChange: (page: number) => void
  page: number
  totalPages: number
}) {
  const window_ = computePageWindow(page, totalPages)

  return (
    <nav
      aria-label="Pagination"
      className="border-fd-border flex items-center justify-between border-t px-6 py-4 sm:px-8"
    >
      <button
        aria-label="Previous page"
        className="text-fd-muted-foreground hover:text-fd-foreground text-xs transition-colors disabled:pointer-events-none disabled:opacity-40"
        disabled={page <= 1}
        onClick={() => {
          onChange(page - 1)
        }}
        type="button"
      >
        ←
      </button>
      <ol className="flex items-center gap-0.5">
        {window_.map((n, i) =>
          n === null ? (
            <li
              aria-hidden
              className="text-fd-muted-foreground/50 px-2 text-xs"
              key={`gap-before-${window_[i + 1] ?? "end"}`}
            >
              …
            </li>
          ) : (
            <li key={n}>
              <button
                aria-current={n === page ? "page" : undefined}
                className={cn(
                  "inline-flex min-w-[28px] items-center justify-center rounded-md px-2 py-1 text-xs transition-colors",
                  n === page
                    ? "bg-fd-primary text-fd-primary-foreground font-medium"
                    : "text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground"
                )}
                onClick={() => {
                  onChange(n)
                }}
                type="button"
              >
                {n}
              </button>
            </li>
          )
        )}
      </ol>
      <button
        aria-label="Next page"
        className="text-fd-muted-foreground hover:text-fd-foreground text-xs transition-colors disabled:pointer-events-none disabled:opacity-40"
        disabled={page >= totalPages}
        onClick={() => {
          onChange(page + 1)
        }}
        type="button"
      >
        →
      </button>
    </nav>
  )
}

function computePageWindow(page: number, total: number): Array<number | null> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const out: Array<number | null> = [1]
  const start = Math.max(2, page - 1)
  const end = Math.min(total - 1, page + 1)
  if (start > 2) out.push(null)
  for (let i = start; i <= end; i += 1) out.push(i)
  if (end < total - 1) out.push(null)
  out.push(total)
  return out
}
