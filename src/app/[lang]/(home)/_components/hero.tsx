import { ArrowRightIcon, DownloadIcon } from "lucide-react"
import React from "react"
import type { LanguageCopy } from "@/lib/dictionaries"
import Btn from "@/components/button"
import Icon from "@/components/icon"
import { HeroGrid } from "./hero-grid"

type HeroDist = {
  hero: LanguageCopy["home"]["hero"]
  locale: string
}

interface PillProps {
  children: React.ReactNode
  className?: string
}
function Pill({ children, className = "" }: PillProps) {
  return (
    <span
      className={`bg-fd-accent text-fd-accent-foreground lang-zh:text-[13px] inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-medium ${className}`}
    >
      {children}
    </span>
  )
}

const Hero = ({ dist }: { dist: HeroDist }) => (
  // 3.5rem = home header height
  <section className="relative flex min-h-[max(600px,calc(100svh-3.5rem))] flex-col pt-[min(3rem,5svh)] pb-[min(2.5rem,4svh)]">
    <HeroGrid />
    <div className="relative mx-auto flex w-full max-w-(--fd-layout-width) flex-1 flex-col px-8 max-md:px-5">
      <div className="my-auto">
        <Pill className="mb-8">
          <Icon.Leaf className="size-4" />
          {dist.hero.pill}
        </Pill>
        <h1 className="lang-en:leading-[1.05] lang-en:tracking-[-0.035em] lang-en:font-medium lang-de:leading-[1.05] lang-de:tracking-[-0.035em] lang-de:font-medium lang-zh:leading-[1.25] lang-zh:tracking-normal lang-zh:break-keep m-0 max-w-[18ch] text-[clamp(44px,min(7.2vw,11svh),96px)] font-semibold text-balance">
          {dist.hero.titleA}
          <span className="lang-en:italic lang-en:font-medium lang-de:italic lang-de:font-medium text-fd-primary">
            {dist.hero.titleB}
          </span>
          {dist.hero.titleC}
        </h1>
        <div className="mt-10 flex flex-col items-start gap-8">
          <p className="text-fd-muted-foreground lang-zh:text-base lang-zh:leading-[1.75] lang-en:leading-[1.6] lang-de:leading-[1.6] max-w-130 text-[17px] text-pretty">
            {dist.hero.subtitle}
          </p>
          <div className="grid w-full gap-3 sm:w-auto sm:auto-cols-fr sm:grid-flow-col [&>a]:justify-center">
            <Btn variant="primary" size="lg" href={`/${dist.locale}/download`}>
              <DownloadIcon className="size-4" />
              {dist.hero.ctaDownload}
            </Btn>
            <Btn variant="secondary" size="lg" href={`/${dist.locale}/docs/getting-started`}>
              {dist.hero.ctaPrimary}
              <ArrowRightIcon className="size-4" />
            </Btn>
            <Btn variant="secondary" size="lg" href="https://github.com/Winds-Studio/Leaf">
              <Icon.Github /> {dist.hero.ctaSecondary}
            </Btn>
          </div>
        </div>
      </div>
      <dl className="border-fd-border mt-[min(3rem,5svh)] grid grid-cols-3 rounded-xl border">
        {dist.hero.meta.map((item) => (
          <div
            key={item.label}
            className="border-fd-border flex flex-col-reverse justify-end gap-2 px-3 py-[min(1.5rem,3svh)] not-first:border-l md:px-6"
          >
            <dt className="font-mono text-xs text-(--fg-muted)">{item.label}</dt>
            <dd className="text-fd-secondary-foreground truncate font-mono text-[clamp(24px,min(4.4vw,7svh),60px)] leading-none font-medium tracking-tight tabular-nums">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
)

export default Hero
