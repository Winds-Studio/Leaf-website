import type { NextConfig } from "next"
import { createMDX } from "fumadocs-mdx/next"

const withMDX = createMDX()

const config: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // Keep metadata in <head>: ISR serves one HTML per route, so crawlers get it too.
  htmlLimitedBots: /.*/,
  reactStrictMode: true,
  rewrites() {
    return [
      {
        destination: "/:lang/llms.mdx/docs/:path*",
        source: "/:lang/docs/:path*.md",
      },
    ]
  },
}

export default withMDX(config)
