"use client"

import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import type { LanguageCopy } from "@/lib/dictionaries"
import SectionHead from "./section-head"

const Faq = ({ dist }: { dist: LanguageCopy["home"]["faq"] }) => {
  const [openIdx, setOpenIdx] = useState<number>(0)

  const renderItem = (item: LanguageCopy["home"]["faq"]["faq"][number], i: number) => {
    const open = openIdx === i
    return (
      <div
        key={item.q}
        className={`overflow-hidden rounded-xl border transition-colors duration-200 ${
          open ? "bg-fd-muted/40 border-(--border)" : "hover:bg-fd-muted/20 border-transparent"
        }`}
      >
        <button
          onClick={() => {
            setOpenIdx(open ? -1 : i)
          }}
          aria-expanded={open}
          className="text-fd-secondary-foreground flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium transition-colors hover:text-[var(--leaf)] dark:hover:text-[var(--accent-fg)]"
        >
          <span>{item.q}</span>
          <span
            className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
              open
                ? "bg-fd-primary/10 text-fd-primary dark:bg-fd-accent/20 dark:text-fd-accent-foreground"
                : "text-(--fg-muted)"
            }`}
          >
            <ChevronDownIcon
              className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </span>
        </button>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p className="px-5 pb-5 text-sm leading-relaxed text-(--fg-muted)">{item.a}</p>
          </div>
        </div>
      </div>
    )
  }

  const left = dist.faq.filter((_, i) => i % 2 === 0)
  const right = dist.faq.filter((_, i) => i % 2 === 1)

  return (
    <section className="border-fd-border border-t py-24 max-md:py-16">
      <div className="mx-auto max-w-(--fd-layout-width) px-8 max-md:px-5">
        <SectionHead {...dist.head} />

        <div className="mx-auto mt-12 flex max-w-280 items-start gap-3 max-md:flex-col">
          <div className="flex flex-1 flex-col gap-3">
            {left.map((item) => renderItem(item, dist.faq.indexOf(item)))}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            {right.map((item) => renderItem(item, dist.faq.indexOf(item)))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
