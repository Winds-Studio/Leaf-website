import { ImageResponse } from "@takumi-rs/image-response"
import { generate as DefaultImage } from "fumadocs-ui/og/takumi"
import { notFound } from "next/navigation"
import { appName } from "@/lib/shared"
import { getPageImage, source } from "@/lib/source"

export const revalidate = false

export async function GET(_req: Request, { params }: RouteContext<"/[lang]/og/docs/[...slug]">) {
  const { slug } = await params
  const page = source.getPage(slug.slice(0, -1))
  if (!page) notFound()

  return new ImageResponse(
    <DefaultImage title={page.data.title} description={page.data.description} site={appName} />,
    {
      format: "webp",
      height: 630,
      width: 1200,
    }
  )
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }))
}
