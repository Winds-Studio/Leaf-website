import type { InferPageType } from "fumadocs-core/source"
import type { FileObject } from "next-validate-link"
import { printErrors, scanURLs, validateFiles } from "next-validate-link"

import { i18n } from "@/lib/i18n"
import { source } from "@/lib/source"

const getHeadings = async ({ data }: InferPageType<typeof source>): Promise<string[]> => {
  const { toc } = await data.load()
  return toc.map((item) => item.url.slice(1))
}

function getFiles() {
  const promises = source.getPages().map(
    async (page): Promise<FileObject> => ({
      content: await page.data.getText("raw"),
      data: page.data,
      path: page.absolutePath ?? "",
      url: page.url,
    })
  )
  return Promise.all(promises)
}

const checkLinks = async () => {
  const pages = source.getPages()
  const scanned = await scanURLs({
    populate: {
      "[lang]/docs/[[...slug]]": await Promise.all(
        pages.map(async (page) => ({
          hashes: await getHeadings(page),
          value: {
            lang: page.locale ?? i18n.defaultLanguage,
            slug: page.slugs,
          },
        }))
      ),
    },
    preset: "next",
  })
  const files = await getFiles()
  printErrors(
    await validateFiles(files, {
      checkRelativePaths: "as-url",
      markdown: {
        components: {
          Card: { attributes: ["href"] },
        },
      },
      scanned,
    }),
    true
  )
}

await checkLinks()
