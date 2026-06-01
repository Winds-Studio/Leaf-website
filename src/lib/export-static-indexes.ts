import { source } from "@/lib/source"

export async function exportSearchIndexes() {
  const pages = source.getPages()
  return Promise.all(
    pages.map(async (page) => ({
      description: page.data.description,
      id: page.url,
      structured: await page.data.structuredData(),
      title: page.data.title,
      url: page.url,
    }))
  )
}
