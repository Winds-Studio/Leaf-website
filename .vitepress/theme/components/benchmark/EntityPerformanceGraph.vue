<script setup lang="ts">
import BenchmarkBarComparisonChart, { type ComparisonGroup } from "./BenchmarkBarComparisonChart.vue";
import BenchmarkImprovementCards, { type ImprovementCardItem } from "./BenchmarkImprovementCards.vue";

type Scenario = {
  name: string;
  paperMspt: number;
  leafMspt: number;
  leafAsyncMspt: number | null;
};

type Bar = {
  key: string;
  label: string;
  className: string;
  value: number;
  valueLabel: string;
};

const scenarios: Scenario[] = [
  {
    name: "Default Config",
    paperMspt: 3.7,
    leafMspt: 2.8,
    leafAsyncMspt: null
  },
  {
    name: "Increased Mob Caps",
    paperMspt: 8.1,
    leafMspt: 5.8,
    leafAsyncMspt: 4.5
  }
];

const environment = {
  leafCommit: "9db6bfb",
  paperCommit: "a838a88",
  seed: "2618050634530417871",
  coords: "183.5 67.00 -201.5",
  version: "1.21.4",
  cpu: "i7-10750H",
  jvm: "GraalVM 21",
  memory: "6GB"
} as const;

const environmentItems = [
  ["Version", environment.version],
  ["CPU", environment.cpu],
  ["JVM", environment.jvm],
  ["Memory", environment.memory],
  ["Leaf Commit", environment.leafCommit],
  ["Paper Commit", environment.paperCommit],
  ["Seed", environment.seed],
  ["Coords", environment.coords]
] as const;

const jvmFlags = `-Xms6144M -Xmx6144M --add-modules=jdk.incubator.vector -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20`;

const toFixed1 = (value: number) => value.toFixed(1);

const calcImprovement = (baseline: number, target: number) => toFixed1(((baseline - target) / baseline) * 100);

const chartData = scenarios.map((scenario) => {
  const bars: Bar[] = [
    {
      key: "paper",
      label: "Paper",
      className: "paper",
      value: scenario.paperMspt,
      valueLabel: `${toFixed1(scenario.paperMspt)} mspt`
    },
    {
      key: "leaf",
      label: "Leaf",
      className: "leaf",
      value: scenario.leafMspt,
      valueLabel: `${toFixed1(scenario.leafMspt)} mspt`
    },
    ...(scenario.leafAsyncMspt === null
      ? []
      : [
          {
            key: "leaf-async",
            label: "Leaf+Async",
            className: "leaf-async",
            value: scenario.leafAsyncMspt,
            valueLabel: `${toFixed1(scenario.leafAsyncMspt)} mspt`
          }
        ])
  ];

  return {
    ...scenario,
    bars,
    leafImprovement: calcImprovement(scenario.paperMspt, scenario.leafMspt),
    asyncImprovement:
      scenario.leafAsyncMspt === null ? null : calcImprovement(scenario.paperMspt, scenario.leafAsyncMspt)
  };
});

const chartGroups: ComparisonGroup[] = chartData.map(({ name, bars }) => ({
  name,
  bars
}));

const improvementCards: ImprovementCardItem[] = chartData.flatMap((scenario) => {
  const cards: ImprovementCardItem[] = [
    {
      title: scenario.name === "Default Config" ? "Default Configuration" : `Leaf with ${scenario.name}`,
      details: `Leaf (${toFixed1(scenario.leafMspt)} mspt) vs Paper (${toFixed1(scenario.paperMspt)} mspt)`,
      improvement: scenario.leafImprovement
    }
  ];

  if (scenario.leafAsyncMspt !== null && scenario.asyncImprovement !== null) {
    cards.push({
      title: `Leaf+Async with ${scenario.name}`,
      details: `Leaf+Async (${toFixed1(scenario.leafAsyncMspt)} mspt) vs Paper (${toFixed1(scenario.paperMspt)} mspt)`,
      improvement: scenario.asyncImprovement,
      highlight: true
    });
  }

  return cards;
});
</script>

<template>
  <div class="performance-graph">
    <div class="env-card">
      <h3>Test Environment</h3>
      <div class="env-grid">
        <div v-for="([label, value], index) in environmentItems" :key="index" class="env-item">
          <span class="label">{{ label }}:</span> {{ value }}
        </div>
      </div>

      <div class="jvm-flags">
        <h4>JVM Flags</h4>
        <div class="code-block jvm-flags-code">{{ jvmFlags }}</div>
      </div>
    </div>

    <h3>Performance Comparison (MSPT - lower is better)</h3>
    <div class="chart-container">
      <BenchmarkBarComparisonChart :groups="chartGroups" />
    </div>

    <h3>Performance Improvement</h3>
    <BenchmarkImprovementCards :cards="improvementCards" />
  </div>
</template>

<style scoped lang="scss">
%surface-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.performance-graph {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

h3,
h4 {
  margin-bottom: 16px;
}

.env-card {
  @extend %surface-card;
  padding: 20px;
  margin-bottom: 24px;
}

h3 {
  font-size: 1.3rem;
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

.jvm-flags {
  margin-top: 8px;
}

.jvm-flags-code {
  font-size: 0.8rem;
  line-height: 1.4;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.chart-container {
  @extend %surface-card;
  padding: 20px;
  margin-bottom: 24px;
  overflow: auto;
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

@media (max-width: 768px) {
  .env-grid {
    grid-template-columns: 1fr;
  }
}
</style>
