<script setup lang="ts">
import BenchmarkBarComparisonChart, { type ComparisonGroup } from "./BenchmarkBarComparisonChart.vue";
import BenchmarkImprovementCards, { type ImprovementCardItem } from "./BenchmarkImprovementCards.vue";

type GenerationScenario = {
  name: string;
  paperSeconds: number;
  leafSeconds: number;
};

const environment = {
  seed: "4791817952625876078",
  size: "2048 block radius, circular, using Chunky",
  cpu: "i7-10750H",
  jvm: "GraalVM 21",
  memory: "8GB",
  leafCommit: "9db6bfb",
  paperCommit: "a838a88",
  moonriseConfig: "chunk-system:\n  gen-parallelism: 'true'\n  io-threads: 12\n  worker-threads: 12"
};

const environmentItems = [
  ["Size", environment.size],
  ["CPU", environment.cpu],
  ["JVM", environment.jvm],
  ["Memory", environment.memory],
  ["Seed", environment.seed],
  ["Leaf Commit", environment.leafCommit],
  ["Paper Commit", environment.paperCommit]
] as const;

const generationData: GenerationScenario[] = [
  {
    name: "World Generation",
    paperSeconds: 517,
    leafSeconds: 473
  }
];

const jvmFlags = `-Xms8192M -Xmx8192M --add-modules=jdk.incubator.vector -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20`;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

const toFixed1 = (value: number) => value.toFixed(1);
const calcImprovement = (baseline: number, target: number) => toFixed1(((baseline - target) / baseline) * 100);

const chartGroups: ComparisonGroup[] = generationData.map((scenario) => ({
  name: scenario.name,
  bars: [
    {
      key: "paper",
      label: "Paper",
      className: "paper",
      value: scenario.paperSeconds,
      valueLabel: formatTime(scenario.paperSeconds)
    },
    {
      key: "leaf",
      label: "Leaf",
      className: "leaf",
      value: scenario.leafSeconds,
      valueLabel: formatTime(scenario.leafSeconds)
    }
  ]
}));

const improvementCards: ImprovementCardItem[] = generationData.map((scenario) => ({
  title: "Chunk Generation Time Reduction",
  details: `Leaf (${formatTime(scenario.leafSeconds)}) vs Paper (${formatTime(scenario.paperSeconds)})`,
  improvement: calcImprovement(scenario.paperSeconds, scenario.leafSeconds),
  highlight: true
}));
</script>

<template>
  <div class="chunk-generation-graph">
    <div class="env-card">
      <h3>Test Environment</h3>
      <div class="env-grid">
        <div v-for="([label, value], index) in environmentItems" :key="index" class="env-item">
          <span class="label">{{ label }}:</span> {{ value }}
        </div>
      </div>

      <div class="moonrise-config">
        <h4>Moonrise Configuration</h4>
        <div class="code-block moonrise-config-code">{{ environment.moonriseConfig }}</div>
      </div>

      <div class="jvm-flags">
        <h4>JVM Flags</h4>
        <div class="code-block jvm-flags-code">{{ jvmFlags }}</div>
      </div>
    </div>

    <h3>Chunk Generation Time Comparison (lower is better)</h3>
    <div class="chart-container">
      <BenchmarkBarComparisonChart
        :groups="chartGroups"
        :max-bar-height="200"
        :chart-bars-height="260"
        :bar-wrapper-height="220"
        :bar-width="80"
        :bar-gap="80"
      />
    </div>

    <h3>Performance Improvement</h3>
    <BenchmarkImprovementCards
      :cards="improvementCards"
      :single-column="true"
      :max-card-width="400"
      percentage-font-size="2.5rem"
    />
  </div>
</template>

<style scoped lang="scss">
%surface-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.chunk-generation-graph {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.env-card {
  @extend %surface-card;
  padding: 20px;
  margin-bottom: 24px;
}

h3 {
  font-size: 1.3rem;
  margin-bottom: 16px;
  font-weight: 600;
}

h4 {
  font-size: 1.1rem;
  margin-bottom: 12px;
  font-weight: 500;
}

.env-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.env-item {
  font-size: 0.9rem;
}

.label {
  font-weight: 600;
  margin-right: 6px;
}

.moonrise-config,
.jvm-flags {
  margin-top: 16px;
}

.moonrise-config-code,
.jvm-flags-code {
  font-size: 0.8rem;
  line-height: 1.4;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.code-block {
  background-color: var(--vp-c-bg-alt);
  padding: 12px;
  border-radius: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
  line-height: 1.5;
  overflow-x: auto;
  margin: 10px 0;
}

.chart-container {
  @extend %surface-card;
  padding: 20px;
  margin-bottom: 24px;
  overflow: auto;
}

@media (max-width: 768px) {
  .env-grid {
    grid-template-columns: 1fr;
  }
}
</style>
