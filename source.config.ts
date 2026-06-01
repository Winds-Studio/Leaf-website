import { metaSchema, pageSchema } from "fumadocs-core/source/schema"
import { defineConfig, defineDocs } from "fumadocs-mdx/config"

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    async: true,
    postprocess: {
      includeProcessedMarkdown: true,
    },
    schema: pageSchema,
  },
  meta: {
    schema: metaSchema,
  },
})

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
})
