import tailwindcss from "@tailwindcss/vite"
import { cloudflare } from "@cloudflare/vite-plugin"
import mdx from "fumadocs-mdx/vite"
import vinext from "vinext"
import { defineConfig } from "vite"

export default defineConfig({
  optimizeDeps: {
    exclude: ["lucide-react"],
    include: [
      "react",
      "react-dom",
      "react-markdown",
      "next/image.js",
      "next/link.js",
      "tailwind-merge",
      "@radix-ui/react-collapsible",
      "rehype-raw",
      "@radix-ui/react-collapsible",
    ],
  },
  plugins: [
    tailwindcss(),
    mdx(),
    vinext(),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
  publicDir: "public",
  resolve: {
    tsconfigPaths: true,
  },
})
