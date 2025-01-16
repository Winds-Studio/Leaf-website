import { defineConfig } from "vite";

import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from "@nolebase/vitepress-plugin-git-changelog/vite";
import UnoCSS from "unocss/vite";
export default defineConfig(async () => {
  return {
    assetsInclude: ["**/*.mov"],
    optimizeDeps: {
      exclude: [
        "vitepress",
        "@nolebase/vitepress-plugin-enhanced-readabilities",
      ],
    },
    plugins: [
      GitChangelog({
        repoURL: () => "https://github.com/Winds-Studio/Leaf-website",
      }),
      GitChangelogMarkdownSection({ sections: { disableContributors: true } }),
      UnoCSS(),
    ],
    ssr: {
      noExternal: [
        "@nolebase/ui",
        "@nolebase/vitepress-plugin-enhanced-readabilities",
        "@nolebase/vitepress-plugin-highlight-targeted-heading",
        "@nolebase/vitepress-plugin-inline-link-preview",
        "@iminu/vitepress-plugin-auto-sidebar",
      ],
    },
  };
});
