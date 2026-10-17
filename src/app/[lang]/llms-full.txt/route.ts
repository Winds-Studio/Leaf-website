import { getLLMText, source } from "@/lib/source"

export const revalidate = false

export async function GET(_req: Request, { params }: RouteContext<"/[lang]/llms-full.txt">) {
  const { lang } = await params
  const scan = source.getPages(lang).map((page) => getLLMText(page))
  const scanned = await Promise.all(scan)

  return new Response(scanned.join("\n\n"))
}
