import { resolve } from "node:path"
import { cloudflare } from "@cloudflare/vite-plugin"
import tailwindcss from "@tailwindcss/vite"
import mdx from "fumadocs-mdx/vite"
import vinext from "vinext"
import { defineConfig } from "vite"

const __dirname = import.meta.dirname

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
        childEnvironments: ["ssr"],
        name: "rsc",
      },
    }),
  ],
  publicDir: "public",
  resolve: {
    alias: [
      {
        find: "react-dom/server.edge",
        replacement: resolve(__dirname, "node_modules/react-dom/server.edge.js"),
      },
    ],
    tsconfigPaths: true,
  },
})
