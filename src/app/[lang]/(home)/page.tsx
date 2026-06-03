import type { Locale } from "@/lib/i18n"
import { applyHomeStats, getDictionary } from "@/lib/dictionaries"
import { i18n } from "@/lib/i18n"
import { getStats } from "@/lib/stats"
import ConfigSnippet from "./_components/config-snippet"
import Cta from "./_components/cta"
import Faq from "./_components/faq"
import Features from "./_components/features"
import Footer from "./_components/footer"
import Hero from "./_components/hero"

export const revalidate = 3600

export function generateStaticParams() {
  return i18n.languages.map((locale) => ({ locale }))
}

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const [dist, stats] = await Promise.all([getDictionary(lang), getStats()])
  const home = applyHomeStats(dist.home, stats)

  return (
    <main>
      <Hero dist={{ hero: home.hero, locale: lang, placeholder: home.placeholder }} />
      <Features dist={home.features} />
      <ConfigSnippet dist={home.config} locale={lang} />
      <Faq dist={home.faq} />
      <Cta dist={home.cta} locale={lang} />
      <Footer dist={home.footer} locale={lang} />
    </main>
  )
}
