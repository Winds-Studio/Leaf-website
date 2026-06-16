import type { Metadata } from "next"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page"
import { createRelativeLink } from "fumadocs-ui/mdx"
import { notFound } from "next/navigation"
import { getMDXComponents } from "@/components/mdx"
import { i18n } from "@/lib/i18n"
import { gitConfig } from "@/lib/shared"
import { getPageImage, getPageMarkdownUrl, source } from "@/lib/source"

export default async function Page(props: PageProps<"/[lang]/docs/[[...slug]]">) {
  const params = await props.params
  const page = source.getPage(params.slug, params.lang)
  if (!page) notFound()

  const { body: Content, toc } = await page.data.load()
  const markdownUrl = getPageMarkdownUrl(page).url

  return (
    <DocsPage
      toc={toc}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <Content
          components={getMDXComponents({
            // This allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export const revalidate = false

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(
  props: PageProps<"/[lang]/docs/[[...slug]]">
): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug, params.lang)
  if (!page) notFound()

  const slugPath = params.slug?.join("/") ?? ""
  const languages = Object.fromEntries(
    i18n.languages
      .filter((l) => source.getPage(params.slug, l))
      .map((l) => [l, `/${l}/docs/${slugPath}`])
  )

  return {
    alternates: {
      canonical: `/${params.lang}/docs/${slugPath}`,
      languages: languages.en ? { ...languages, "x-default": languages.en } : languages,
    },
    description: page.data.description,
    icons: {
      icon: "/favicon.svg",
    },
    openGraph: {
      description: page.data.description,
      images: getPageImage(page).url,
      title: page.data.title,
      type: "article",
    },
    title: page.data.title,
    twitter: {
      card: "summary_large_image",
    },
  }
}
