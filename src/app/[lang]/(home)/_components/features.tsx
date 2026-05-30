import type { LanguageCopy } from "@/lib/dictionaries"
import Icon from "@/components/icon"
import SectionHead from "./section-head"

const Features = ({ dist }: { dist: LanguageCopy["home"]["features"] }) => (
  <section className="border-fd-border border-t py-24 max-md:py-16">
    <div className="mx-auto max-w-(--fd-layout-width) px-8 max-md:px-5">
      <SectionHead {...dist.featuresHead} />
      <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
        {dist.features.map((f) => (
          <div
            key={`${f.title}-${f.body}`}
            className="rounded-xl border border-(--border) bg-(--bg-elev) p-6"
          >
            <div className="bg-fd-accent text-fd-accent-foreground mb-4 inline-flex h-9 w-9 items-center justify-center rounded-md">
              <Icon.SimpleLeaf strokeWidth={1.7} className="size-6" />
            </div>
            <h3 className="text-fd-secondary-foreground lang-zh:leading-normal lang-en:tracking-[-0.012em] lang-de:tracking-[-0.012em] mb-2 text-[17px] font-semibold">
              {f.title}
            </h3>
            <p className="text-sm text-(--fg-muted)">{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Features
