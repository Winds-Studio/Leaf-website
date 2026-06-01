"use client"

import {
  SparklesIcon,
  BotIcon,
  HourglassIcon,
  HelpCircleIcon,
  ClockIcon,
  CpuIcon,
  ReplaceIcon,
} from "lucide-react"
import { useState } from "react"
import type { LanguageCopy } from "@/lib/dictionaries"

type Dist = LanguageCopy["home"]["placeholder"]

export function PlaceholderBlock({ dist }: { dist: Dist }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <button
      type="button"
      onClick={() => {
        setRevealed(true)
      }}
      disabled={revealed}
      aria-label={revealed ? dist.ariaHidden : dist.ariaReveal}
      className={`border-fd-border group relative flex h-full w-full flex-col overflow-hidden rounded-[14px] border text-left transition-all ${
        revealed
          ? "cursor-default"
          : "cursor-pointer [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%),linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
      }`}
    >
      <div
        className={`flex flex-1 flex-col transition-all duration-700 ${
          revealed ? "blur-0 opacity-100 saturate-100" : "opacity-40 blur-sm saturate-0"
        }`}
      >
        <div className="border-fd-border bg-fd-muted flex shrink-0 items-center justify-between border-b px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <div className="size-2.5 rounded-full bg-[#F0997B]" />
              <div className="size-2.5 rounded-full bg-[#FAC775]" />
              <div className="size-2.5 rounded-full bg-[#97C459]" />
            </div>
            <span className="text-fd-muted-foreground ml-2 font-mono text-xs">placeholder.tsx</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] text-amber-800 dark:bg-amber-950 dark:text-amber-200">
            <SparklesIcon className="size-3.5" />
            <span>{dist.aiLabel}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-10">
          <div className="flex items-center gap-2">
            <div className="flex size-14 -rotate-6 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950">
              <BotIcon className="size-7 text-purple-700 dark:text-purple-300" />
            </div>
            <div className="flex size-14 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-950">
              <HourglassIcon className="size-7 text-amber-700 dark:text-amber-300" />
            </div>
            <div className="flex size-14 rotate-6 items-center justify-center rounded-2xl bg-pink-100 dark:bg-pink-950">
              <HelpCircleIcon className="size-7 text-pink-700 dark:text-pink-300" />
            </div>
          </div>

          <div className="max-w-lg text-center">
            <h3 className="mb-3 text-lg font-medium">{dist.title}</h3>
            <p className="text-fd-muted-foreground text-sm leading-relaxed">{dist.body}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <span className="border-fd-border bg-fd-muted text-fd-muted-foreground inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px]">
              <ClockIcon className="size-3" /> {dist.badge1}
            </span>
            <span className="border-fd-border bg-fd-muted text-fd-muted-foreground inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px]">
              <CpuIcon className="size-3" /> {dist.badge2}
            </span>
            <span className="border-fd-border bg-fd-muted text-fd-muted-foreground inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px]">
              <ReplaceIcon className="size-3" /> {dist.badge3}
            </span>
          </div>
        </div>

        <div className="border-fd-border bg-fd-muted text-fd-muted-foreground flex shrink-0 items-center justify-between border-t px-5 py-2.5 text-[11px]">
          {/* oxlint 把 // 开头的字符串内容误判为注释，这里手动放行 */}
          {/* oxlint-disable-next-line react/jsx-no-comment-textnodes */}
          <span className="font-mono">{dist.todo}</span>
          <span>{dist.footer}</span>
        </div>
      </div>

      {!revealed && (
        <div className="pointer-events-none absolute right-4 bottom-4 z-10 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-40">
          <SparklesIcon className="text-fd-muted-foreground size-3" />
          <span className="text-fd-muted-foreground text-[10px]">{dist.overlayHint}</span>
        </div>
      )}
    </button>
  )
}
