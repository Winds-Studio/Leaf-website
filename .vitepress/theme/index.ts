// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import { useData, useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style/index.css";
import { h, watch } from "vue";

// Import the Vue components
import EntityPerformanceGraph from "./components/benchmark/EntityPerformanceGraph.vue";
import ChunkGenerationGraph from "./components/benchmark/ChunkGenerationGraph.vue";

// Custom language switcher that preserves current path
const LanguageSwitcher = {
  setup() {
    const { site, localeIndex, theme, page } = useData();
    const route = useRoute();

    // Function to get equivalent URL in target locale
    function getLocalizedPath(locale: string) {
      // Get the current path
      const currentPath = route.path;
      const locales = Object.keys(site.value.locales || {});

      // Default site locale (English) usually doesn't have a prefix
      const defaultLocale = "root";

      let path = currentPath;

      // If the current locale is the default (root)
      if (String(localeIndex.value) === "0") {
        if (locale === defaultLocale) {
          return path;
        }
        // When switching from default to another locale, add locale prefix
        return `/${locale}${path}`;
      }

      // For other locales, find the current locale prefix and replace with target locale
      for (const loc of locales) {
        if (loc !== "root" && currentPath.startsWith(`/${loc}/`)) {
          // Remove current locale prefix
          path = currentPath.replace(`/${loc}/`, "/");
          break;
        }
      }

      // Add new locale prefix or keep default locale without prefix
      return locale === defaultLocale ? path : `/${locale}${path}`;
    }

    // Replace VitePress's default language switcher with our custom one
    watch(
      () => theme.value.nav,
      (nav) => {
        if (nav) {
          const switcherIndex = nav.findIndex((item) =>
            item.items?.some((subItem) => subItem.isTranslation)
          );
          if (switcherIndex !== -1) {
            const switcher = nav[switcherIndex];
            if (switcher.items) {
              // Modify language switcher links to preserve current path
              for (const item of switcher.items) {
                if (item.isTranslation && item.link) {
                  const locale = item.link.slice(1) || "root"; // Extract locale from link
                  item.link = getLocalizedPath(locale);
                }
              }
            }
          }
        }
      },
      { immediate: true, deep: true }
    );

    return {};
  },
};

export default {
  extends: DefaultTheme,
  Layout() {
    // Inject our custom language switcher component into the layout
    return h(DefaultTheme.Layout, null, {
      // Only need to add LanguageSwitcher to activate its setup function
      "nav-bar-content-before": () => h(LanguageSwitcher),
    });
  },
  enhanceApp({ app }) {
    // Register custom language switcher component
    app.component("LanguageSwitcher", LanguageSwitcher);

    // Register the Vue components
    app.component("entity-performance-graph", EntityPerformanceGraph);
    app.component("chunk-generation-graph", ChunkGenerationGraph);
  },
} satisfies Theme;
