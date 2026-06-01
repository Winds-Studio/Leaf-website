"use client"

import { useI18n } from "fumadocs-ui/contexts/i18n"
import type { ComparisonGroup, ImprovementCardItem } from "./benchmark"
import {
  BenchmarkBarComparisonChart,
  BenchmarkImprovementCards,
  TestEnvironmentCard,
} from "./benchmark"

const translations = {
  de: {
    cpu: "CPU",
    jvm: "JVM",
    jvmFlags: "JVM-Startparameter",
    leaf: "Leaf",
    leafCommit: "Leaf Commit",
    lowerIsBetter: "(niedriger ist besser)",
    memory: "Arbeitsspeicher",
    moonriseConfig: "Moonrise Konfiguration",
    paper: "Paper",
    paperCommit: "Paper Commit",
    perfComparison: "Zeitvergleich der Chunk-Generierung",
    perfImprovement: "Leistungsverbesserung",
    seed: "Startwert (Seed)",
    size: "Größe",
    testEnv: "Testumgebung",
    timeReduction: "Reduzierung der Chunk-Generierungszeit",
    vsPaper: "vs. Paper",
    worldGeneration: "Weltgenerierung",
  },
  en: {
    cpu: "CPU",
    jvm: "JVM",
    jvmFlags: "JVM Flags",
    leaf: "Leaf",
    leafCommit: "Leaf Commit",
    lowerIsBetter: "(lower is better)",
    memory: "Memory",
    moonriseConfig: "Moonrise Configuration",
    paper: "Paper",
    paperCommit: "Paper Commit",
    perfComparison: "Chunk Generation Time Comparison",
    perfImprovement: "Performance Improvement",
    seed: "Seed",
    size: "Size",
    testEnv: "Test Environment",
    timeReduction: "Chunk Generation Time Reduction",
    vsPaper: "vs Paper",
    worldGeneration: "World Generation",
  },
  zh: {
    cpu: "CPU",
    jvm: "JVM",
    jvmFlags: "JVM 启动参数",
    leaf: "Leaf",
    leafCommit: "Leaf Commit",
    lowerIsBetter: "(越低越好)",
    memory: "内存",
    moonriseConfig: "Moonrise 配置",
    paper: "Paper",
    paperCommit: "Paper Commit",
    perfComparison: "区块生成时间对比",
    perfImprovement: "性能提升",
    seed: "种子 (Seed)",
    size: "大小 (Size)",
    testEnv: "测试环境",
    timeReduction: "区块生成时间减少",
    vsPaper: "较 Paper 相比",
    worldGeneration: "世界生成 (World Gen)",
  },
}

type GenerationScenario = {
  nameKey: "worldGeneration"
  paperSeconds: number
  leafSeconds: number
}

const generationData: GenerationScenario[] = [
  {
    leafSeconds: 473,
    nameKey: "worldGeneration",
    paperSeconds: 517,
  },
]

const environment = {
  cpu: "i7-10750H",
  jvm: "GraalVM 21",
  leafCommit: "9db6bfb",
  memory: "8GB",
  moonriseConfig:
    "chunk-system:\n  gen-parallelism: 'true'\n  io-threads: 12\n  worker-threads: 12",
  paperCommit: "a838a88",
  seed: "4791817952625876078",
  size: "2048 block radius, circular, using Chunky",
} as const

const jvmFlags = `-Xms8192M -Xmx8192M --add-modules=jdk.incubator.vector -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20`

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

const toFixed1 = (value: number) => value.toFixed(1)
const calcImprovement = (baseline: number, target: number) =>
  toFixed1(((baseline - target) / baseline) * 100)

function useChunkData() {
  const { locale } = useI18n()
  const t = translations[locale as keyof typeof translations]

  const environmentItems = [
    [t.size, environment.size],
    [t.cpu, environment.cpu],
    [t.jvm, environment.jvm],
    [t.memory, environment.memory],
    [t.seed, environment.seed],
    [t.leafCommit, environment.leafCommit],
    [t.paperCommit, environment.paperCommit],
  ] as const

  const chartGroups: ComparisonGroup[] = generationData.map((scenario) => ({
    bars: [
      {
        className: "paper",
        key: "paper",
        label: t.paper,
        value: scenario.paperSeconds,
        valueLabel: formatTime(scenario.paperSeconds),
      },
      {
        className: "leaf",
        key: "leaf",
        label: t.leaf,
        value: scenario.leafSeconds,
        valueLabel: formatTime(scenario.leafSeconds),
      },
    ],
    name: t[scenario.nameKey],
  }))

  const improvementCards: ImprovementCardItem[] = generationData.map((scenario) => ({
    details: `${t.leaf} (${formatTime(scenario.leafSeconds)}) ${t.vsPaper} (${formatTime(
      scenario.paperSeconds
    )})`,
    highlight: true,
    improvement: calcImprovement(scenario.paperSeconds, scenario.leafSeconds),
    title: t.timeReduction,
  }))

  return { chartGroups, environmentItems, improvementCards, t }
}

export const ChunkTestEnvironment = () => {
  const { t, environmentItems } = useChunkData()
  return (
    <TestEnvironmentCard
      items={environmentItems}
      jvmFlags={jvmFlags}
      extraConfig={{
        code: environment.moonriseConfig,
        title: t.moonriseConfig,
      }}
      i18n={{ jvmFlags: t.jvmFlags }}
    />
  )
}

export const ChunkComparisonChart = () => {
  const { chartGroups } = useChunkData()
  return (
    <div className="bg-card my-6 overflow-x-auto rounded-xl border p-6 shadow-sm">
      <BenchmarkBarComparisonChart groups={chartGroups} />
    </div>
  )
}

export const ChunkImprovementCards = () => {
  const { improvementCards } = useChunkData()
  return (
    <div className="my-6">
      <BenchmarkImprovementCards cards={improvementCards} singleColumn />
    </div>
  )
}
