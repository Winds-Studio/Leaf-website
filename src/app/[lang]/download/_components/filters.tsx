import type { DownloadDict } from "@/lib/dictionaries"
import { cn } from "@/lib/cn"
import { sortVersionsDesc } from "@/lib/semver"

import type { Channel } from "./types"

type VersionPillsProps = {
  activeVersion: string
  disabled?: boolean
  onPrefetch?: (version: string) => void
  onSelect: (version: string) => void
  versions: readonly string[]
}

export function VersionPills({
  activeVersion,
  disabled,
  onPrefetch,
  onSelect,
  versions,
}: VersionPillsProps) {
  const sorted = sortVersionsDesc(versions)

  return (
    <div className="flex flex-wrap gap-1.5">
      {sorted.map((v) => {
        const isActive = v === activeVersion
        return (
          <button
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1 text-xs leading-6 font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed",
              isActive
                ? "bg-fd-primary text-fd-primary-foreground"
                : "border-fd-border text-fd-foreground hover:bg-fd-accent border",
              disabled && !isActive && "opacity-60"
            )}
            disabled={disabled}
            key={v}
            onClick={() => {
              onSelect(v)
            }}
            onFocus={() => onPrefetch?.(v)}
            onMouseEnter={() => onPrefetch?.(v)}
            type="button"
          >
            {v}
          </button>
        )
      })}
    </div>
  )
}

type ChannelToggleProps = {
  channel: Channel
  dict: DownloadDict
  hiddenChannels?: readonly Channel[]
  onChange: (channel: Channel) => void
}

export function ChannelToggle({ channel, dict, hiddenChannels, onChange }: ChannelToggleProps) {
  const hidden = hiddenChannels ?? []

  const buttons: Array<{ label: string; value: Channel }> = [
    { label: dict.channelAll, value: "all" },
    { label: dict.channelStable, value: "stable" },
    { label: dict.channelExperimental, value: "experimental" },
  ]

  const visible = buttons.filter((b) => !hidden.includes(b.value))
  if (visible.length <= 1) return null

  return (
    <div className="border-fd-border bg-fd-muted inline-flex items-center gap-0.5 rounded-md border p-0.5">
      {visible.map(({ value, label }) => (
        <button
          aria-pressed={channel === value}
          className={cn(
            "rounded-[5px] px-3 py-1 text-xs leading-6 transition-colors",
            channel === value
              ? "border-fd-border bg-fd-background text-fd-foreground border font-medium"
              : "text-fd-muted-foreground hover:text-fd-foreground"
          )}
          key={value}
          onClick={() => {
            onChange(value)
          }}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
