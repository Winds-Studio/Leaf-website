import type { Locale } from "@/lib/i18n"
import { getDictionary } from "@/lib/dictionaries"
import { i18n } from "@/lib/i18n"
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
  const dist = await getDictionary(lang)

  return (
    <main>
      <Hero dist={{ hero: dist.home.hero, locale: lang, placeholder: dist.home.placeholder }} />
      <Features dist={dist.home.features} />
      <ConfigSnippet dist={dist.home.config} locale={lang} />
      <Faq dist={dist.home.faq} />
      <Cta dist={dist.home.cta} locale={lang} />
      <Footer dist={dist.home.footer} locale={lang} />
    </main>
  )
}
