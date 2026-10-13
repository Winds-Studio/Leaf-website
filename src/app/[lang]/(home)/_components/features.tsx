import type { LanguageCopy } from "@/lib/dictionaries"
import Icon from "@/components/icon"
import SectionHead from "./section-head"

// Bento: first card spans, the rest stack.
const span = (i: number) => (i === 0 ? "md:col-span-4 md:row-span-2 md:p-10" : "md:col-span-2")

const Features = ({ dist }: { dist: LanguageCopy["home"]["features"] }) => (
  <section className="border-fd-border border-t py-24 max-md:py-16">
    <div className="mx-auto max-w-(--fd-layout-width) px-8 max-md:px-5">
      <SectionHead index="01" {...dist.featuresHead} />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
        {dist.features.map((f, i) => (
          <div
            key={`${f.title}-${f.body}`}
            className={`group relative flex min-h-56 flex-col justify-between gap-10 overflow-hidden rounded-xl border border-(--border) bg-(--bg-elev) p-6 ${span(i)}`}
          >
            {i === 0 && (
              <Icon.SimpleLeaf
                strokeWidth={0.6}
                className="text-fd-primary pointer-events-none absolute -right-10 -bottom-10 size-80 opacity-[0.07] transition-transform duration-700 group-hover:-rotate-6 dark:opacity-[0.12]"
              />
            )}
            <span
              className={`font-mono leading-none font-medium text-(--fg-soft) tabular-nums ${
                i === 0 ? "text-[clamp(72px,9vw,128px)]" : "text-5xl"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="relative">
              <h3
                className={`text-fd-secondary-foreground lang-zh:leading-normal lang-en:tracking-[-0.012em] lang-de:tracking-[-0.012em] mb-2 font-semibold ${
                  i === 0 ? "text-[clamp(22px,2.4vw,30px)]" : "text-[17px]"
                }`}
              >
                {f.title}
              </h3>
              <p className={`text-(--fg-muted) ${i === 0 ? "max-w-110 text-base" : "text-sm"}`}>
                {f.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Features
