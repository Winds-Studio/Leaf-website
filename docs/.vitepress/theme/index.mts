// https://vitepress.dev/guide/custom-theme
import { onMounted, watch, nextTick } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import "@nolebase/vitepress-plugin-enhanced-mark/client/style.css";
import { useRoute } from "vitepress";
import vitepressNprogress from "vitepress-plugin-nprogress";
import "vitepress-plugin-nprogress/lib/css/index.css";
import "@nolebase/vitepress-plugin-enhanced-mark/client/style.css";
import MyLayout from "./components/MyLayout.vue";
import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css";
import type { Options } from "@nolebase/vitepress-plugin-enhanced-readabilities/client";
import { InjectionKey } from "@nolebase/vitepress-plugin-enhanced-readabilities/client";
import { NolebaseInlineLinkPreviewPlugin } from "@nolebase/vitepress-plugin-inline-link-preview/client";
import "@nolebase/vitepress-plugin-inline-link-preview/client/style.css";

import "@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css";

import { NolebaseGitChangelogPlugin } from "@nolebase/vitepress-plugin-git-changelog/client";
import "virtual:uno.css";

import "@nolebase/vitepress-plugin-git-changelog/client/style.css";

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.provide(InjectionKey, {
      layoutSwitch: {
        defaultMode: 1,
      },

      spotlight: {
        defaultToggle: true,
      },
    } as Options);
    vitepressNprogress(ctx);
    ctx.app.use(NolebaseInlineLinkPreviewPlugin);
    ctx.app.use(NolebaseGitChangelogPlugin);
  },
  Layout: MyLayout,
} satisfies Theme;
