"use client"

import { useEffect, useRef } from "react"

const GRID =
  "bg-size-[32px_32px] bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)]"

// Grid behind the hero; lines near the cursor light up.
export function HeroGrid() {
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glow.current
    const section = el?.parentElement
    if (!el || !section) return
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const r = section.getBoundingClientRect()
      el.style.setProperty("--x", `${e.clientX - r.left}px`)
      el.style.setProperty("--y", `${e.clientY - r.top}px`)
      el.style.opacity = "1"
    }
    const leave = () => {
      el.style.opacity = "0"
    }
    section.addEventListener("pointermove", move)
    section.addEventListener("pointerleave", leave)
    return () => {
      section.removeEventListener("pointermove", move)
      section.removeEventListener("pointerleave", leave)
    }
  }, [])

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 [--line:var(--border)] [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_70%)] ${GRID}`}
      />
      <div
        ref={glow}
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [--line:color-mix(in_oklab,var(--leaf)_55%,transparent)] [mask-image:radial-gradient(180px_circle_at_var(--x)_var(--y),black,transparent)] ${GRID}`}
      />
    </>
  )
}
