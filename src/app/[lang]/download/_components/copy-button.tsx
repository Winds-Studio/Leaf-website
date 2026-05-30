"use client"

import { Check, Copy } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/cn"

type CopyButtonProps = {
  className?: string
  copiedLabel: string
  label: string
  size?: number
  value: string
}

export function CopyButton({ className, copiedLabel, label, size = 14, value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setCopied(false)
      }, 1500)
    } catch {
      // 剪贴板权限可能被拒（非安全上下文等），静默失败即可
    }
  }, [value])

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    []
  )

  const ariaLabel = copied ? copiedLabel : label

  return (
    <button
      aria-label={ariaLabel}
      className={cn(
        "text-fd-muted-foreground hover:text-fd-foreground inline-flex items-center justify-center rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-fd-ring)] focus-visible:outline-none",
        className
      )}
      onClick={() => void onCopy()}
      title={ariaLabel}
      type="button"
    >
      {copied ? <Check size={size} strokeWidth={2} /> : <Copy size={size} strokeWidth={1.75} />}
    </button>
  )
}
