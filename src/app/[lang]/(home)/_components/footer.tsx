import Link from "next/link"
import type { LanguageCopy } from "@/lib/dictionaries"
import Icon from "@/components/icon"

const Footer = ({ dist, locale }: { dist: LanguageCopy["home"]["footer"]; locale: string }) => (
  <footer className="border-t border-(--border) py-12 pt-12 text-[13.5px] text-(--fg-muted)">
    <div className="mx-auto max-w-300 px-8 max-md:px-5">
      <div className="mb-10 grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 max-md:grid-cols-1 max-md:gap-8">
        <div>
          <div className="text-fd-secondary-foreground mb-3 flex items-center gap-2 font-semibold">
            <Icon.Leaf className="size-4.5" />
            <span>Leaf</span>
          </div>
          <p className="max-w-70 text-[13px] text-(--fg-muted)">{dist.tag}</p>
        </div>
        {dist.cols.map((col) => (
          <div key={col.h}>
            <h4 className="lang-zh:normal-case lang-zh:tracking-normal lang-zh:text-[13.5px] mb-3 text-[12.5px] font-medium tracking-[0.06em] text-(--fg-soft) uppercase">
              {col.h}
            </h4>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {col.items.map((it) => (
                <li key={it.title}>
                  <Link
                    href={it.href.startsWith("/") ? `/${locale}${it.href}` : it.href}
                    className="hover:text-fd-secondary-foreground transition-colors"
                  >
                    {it.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex justify-between border-t border-(--border) pt-5 text-[12.5px] text-(--fg-soft) max-md:flex-col max-md:gap-2">
        <span>{dist.copyright}</span>
        <span>{dist.copyrightNote}</span>
      </div>
    </div>
  </footer>
)

export default Footer
