// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style/index.css";

import EntityPerformanceGraph from "./components/benchmark/EntityPerformanceGraph.vue";
import ChunkGenerationGraph from "./components/benchmark/ChunkGenerationGraph.vue";

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component("entity-performance-graph", EntityPerformanceGraph);
        app.component("chunk-generation-graph", ChunkGenerationGraph);
    }
} satisfies Theme;
