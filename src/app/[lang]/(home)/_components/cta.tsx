import { DownloadIcon } from "lucide-react"
import type { LanguageCopy } from "@/lib/dictionaries"
import Btn from "@/components/button"

const Cta = ({ dist, locale }: { dist: LanguageCopy["home"]["cta"]; locale: string }) => (
  <section className="border-fd-border border-t py-24 max-md:py-16">
    <div className="mx-auto max-w-(--fd-layout-width) px-8 max-md:px-5">
      <div className="relative flex items-center justify-between gap-8 overflow-hidden rounded-[14px] border border-(--border) bg-(--bg-elev) px-12 py-16 max-md:flex-col max-md:items-start max-md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,color-mix(in_oklab,var(--accent-bg)_80%,transparent),transparent_60%)]" />
        <div className="relative">
          <h2 className="lang-en:leading-[1.2] lang-en:tracking-[-0.018em] lang-de:leading-[1.2] lang-de:tracking-[-0.018em] lang-zh:leading-[1.4] text-fd-secondary-foreground mb-2 text-[clamp(26px,2.6vw,32px)] font-semibold">
            {dist.title}
          </h2>
          <p className="max-w-120 text-[15px] text-(--fg-muted)">{dist.sub}</p>
        </div>
        <div className="relative flex shrink-0 gap-3 max-md:flex-wrap">
          <Btn variant="primary" size="lg" href={`/${locale}/download`}>
            <DownloadIcon /> {dist.primary}
          </Btn>
          <Btn variant="secondary" size="lg" href={`/${locale}/docs/getting-started`}>
            {dist.secondary}
          </Btn>
        </div>
      </div>
    </div>
  </section>
)

export default Cta
