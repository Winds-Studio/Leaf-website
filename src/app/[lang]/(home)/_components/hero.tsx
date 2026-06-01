import { icons } from "lucide-react"
import React from "react"
import type { LanguageCopy } from "@/lib/dictionaries"
import Btn from "@/components/button"
import Icon from "@/components/icon"
import { PlaceholderBlock } from "./placeholder"

type HeroDist = {
  hero: LanguageCopy["home"]["hero"]
  locale: string
  placeholder: LanguageCopy["home"]["placeholder"]
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
  <section className="min-h-[clamp(560px,calc(100svh-4rem),760px)] py-16 lg:py-20 xl:py-24">
    <div className="mx-auto max-w-(--fd-layout-width) px-8 max-md:px-5">
      <div className="grid items-stretch gap-8 md:grid-cols-2">
        <div className="max-w-140">
          <Pill className="mb-6">
            <Icon.Leaf className="size-4" />
            {dist.hero.pill}
          </Pill>
          <h1 className="lang-en:leading-[1.15] lang-en:tracking-[-0.022em] lang-en:font-medium lang-de:leading-[1.15] lang-de:tracking-[-0.022em] lang-de:font-medium lang-zh:leading-[1.35] lang-zh:tracking-normal m-0 max-w-140 text-[clamp(40px,4.6vw,60px)] font-semibold">
            {dist.hero.titleA}
            <span className="lang-en:italic lang-en:font-medium lang-de:italic lang-de:font-medium text-fd-primary">
              {dist.hero.titleB}
            </span>
            {dist.hero.titleC}
          </h1>
          <p className="text-fd-muted-foreground lang-zh:text-base lang-zh:leading-[1.75] lang-en:leading-[1.6] lang-de:leading-[1.6] mt-6 max-w-130">
            {dist.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn variant="primary" size="lg" href={`/${dist.locale}/docs/getting-started`}>
              {dist.hero.ctaPrimary}
              <icons.ArrowRight className="size-4" />
            </Btn>
            <Btn variant="secondary" size="lg" href="https://github.com/Winds-Studio/Leaf">
              <Icon.Github /> {dist.hero.ctaSecondary}
            </Btn>
          </div>
          <div className="text-fd-muted-foreground mt-8 flex flex-wrap gap-8 text-[13px]">
            {dist.hero.meta.map((item) => (
              <div key={item.value}>
                <strong className="text-fd-secondary-foreground font-medium tabular-nums">
                  {item.value}
                </strong>
                &nbsp;·&nbsp;{item.label}
              </div>
            ))}
          </div>
        </div>
        <PlaceholderBlock dist={dist.placeholder} />
      </div>
    </div>
  </section>
)

export default Hero
