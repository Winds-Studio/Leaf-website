import { createMdxPlugin } from "fumadocs-mdx/bun"
import { postInstall } from "fumadocs-mdx/next"

await Bun.plugin(createMdxPlugin())
await postInstall({
  configPath: "source.config.ts",
})
