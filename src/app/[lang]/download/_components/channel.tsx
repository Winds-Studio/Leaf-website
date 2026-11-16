import type { BuildResponse } from "@/lib/leaf-api"
import { cn } from "@/lib/cn"

/**
 * 网站内的渠道分类。配色：
 * 稳定：绿色（--channel-stable）圆点，徽章与列表标签用主题 accent
 * 实验性：violet 圆点与徽章，列表标签为灰色
 */
export type ChannelKind = "stable" | "experimental"

export const channelOf = (build: BuildResponse): ChannelKind =>
  build.channel === "default" ? "stable" : "experimental"

/**
 * 渠道选择器和精选卡片徽章里的圆点
 */
export function ChannelDot({ kind, ping }: { kind: ChannelKind; ping?: boolean }) {
  if (kind === "stable") {
    return <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-(--channel-stable)" />
  }
  if (!ping) {
    return (
      <span
        aria-hidden
        className="size-1.5 shrink-0 rounded-full bg-violet-500 dark:bg-violet-400"
      />
    )
  }
  return (
    <span aria-hidden className="relative flex size-1.5 shrink-0">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-400 opacity-75 dark:bg-violet-500" />
      <span className="relative inline-flex size-1.5 rounded-full bg-violet-500 dark:bg-violet-400" />
    </span>
  )
}

/**
 * 构建列表里的渠道标签
 */
export function ChannelTag({ kind, label }: { kind: ChannelKind; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded px-1.5 py-0 text-[10px] leading-5 font-medium whitespace-nowrap",
        kind === "stable"
          ? "bg-fd-accent text-fd-accent-foreground"
          : "border-fd-border bg-fd-muted text-fd-muted-foreground border"
      )}
    >
      {label}
    </span>
  )
}

/**
 * 精选卡片上的“最新 xx 构建”徽章
 */
export function channelPillClass(kind: ChannelKind): string {
  if (kind === "experimental") {
    return "inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-xs font-medium leading-6 text-violet-800 dark:border-violet-800/50 dark:bg-violet-950/40 dark:text-violet-200"
  }
  return "inline-flex items-center gap-1.5 rounded-full bg-fd-accent px-2.5 py-0.5 text-xs font-medium leading-6 text-fd-accent-foreground"
}
