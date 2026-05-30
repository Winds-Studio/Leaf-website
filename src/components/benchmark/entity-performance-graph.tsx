"use client"

import { useI18n } from "fumadocs-ui/contexts/i18n"
import type { Bar, ComparisonGroup, ImprovementCardItem } from "./benchmark"
import {
  BenchmarkBarComparisonChart,
  BenchmarkImprovementCards,
  TestEnvironmentCard,
} from "./benchmark"

type Scenario = {
  key: "default" | "mobcaps"
  paperMspt: number
  leafMspt: number
  leafAsyncMspt: number | null
}

const scenarios: Scenario[] = [
  {
    key: "default",
    leafAsyncMspt: null,
    leafMspt: 2.8,
    paperMspt: 3.7,
  },
  {
    key: "mobcaps",
    leafAsyncMspt: 4.5,
    leafMspt: 5.8,
    paperMspt: 8.1,
  },
]

const translations = {
  de: {
    coords: "Koordinaten (Coords)",
    cpu: "CPU",
    defaultConfigTitle: "Standardkonfiguration",
    jvm: "JVM",
    jvmFlags: "JVM-Startparameter",
    leaf: "Leaf",
    leafAsync: "Leaf + Async",
    leafAsyncWith: "Leaf + Async mit {name}",
    leafCommit: "Leaf Commit",
    leafWith: "Leaf mit {name}",
    lowerIsBetter: "(MSPT - niedriger ist besser)",
    memory: "Arbeitsspeicher",
    paper: "Paper",
    paperCommit: "Paper Commit",
    perfComparison: "Leistungsvergleich",
    perfImprovement: "Leistungsverbesserung",
    scenarios: {
      default: "Standardkonfiguration",
      mobcaps: "Erhöhte Mob-Limits (Mob Caps)",
    },
    seed: "Startwert (Seed)",
    testEnv: "Testumgebung",
    version: "Version",
    vsPaper: "vs. Paper",
  },
  en: {
    coords: "Coords",
    cpu: "CPU",
    defaultConfigTitle: "Default Configuration",
    jvm: "JVM",
    jvmFlags: "JVM Flags",
    leaf: "Leaf",
    leafAsync: "Leaf + Async",
    leafAsyncWith: "Leaf + Async with {name}",
    leafCommit: "Leaf Commit",
    leafWith: "Leaf with {name}",
    lowerIsBetter: "(MSPT - lower is better)",
    memory: "Memory",
    paper: "Paper",
    paperCommit: "Paper Commit",
    perfComparison: "Performance Comparison",
    perfImprovement: "Performance Improvement",
    scenarios: {
      default: "Default Config",
      mobcaps: "Increased Mob Caps",
    },
    seed: "Seed",
    testEnv: "Test Environment",
    version: "Version",
    vsPaper: "vs Paper",
  },
  zh: {
    coords: "坐标 (Coords)",
    cpu: "CPU",
    defaultConfigTitle: "默认配置",
    jvm: "JVM",
    jvmFlags: "JVM 启动参数",
    leaf: "Leaf",
    leafAsync: "Leaf + Async",
    leafAsyncWith: "Leaf + Async ({name})",
    leafCommit: "Leaf Commit",
    leafWith: "Leaf ({name})",
    lowerIsBetter: "(MSPT - 越低越好)",
    memory: "内存",
    paper: "Paper",
    paperCommit: "Paper Commit",
    perfComparison: "性能对比",
    perfImprovement: "性能提升",
    scenarios: {
      default: "默认配置",
      mobcaps: "增加生物生成上限",
    },
    seed: "种子 (Seed)",
    testEnv: "测试环境",
    version: "版本",
    vsPaper: "较 Paper 相比",
  },
}

const environment = {
  coords: "183.5 67.00 -201.5",
  cpu: "i7-10750H",
  jvm: "GraalVM 21",
  leafCommit: "9db6bfb",
  memory: "6GB",
  paperCommit: "a838a88",
  seed: "2618050634530417871",
  version: "1.21.4",
} as const

const jvmFlags = `-Xms6144M -Xmx6144M --add-modules=jdk.incubator.vector -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20`

const toFixed1 = (value: number) => value.toFixed(1)

const calcImprovement = (baseline: number, target: number) =>
  toFixed1(((baseline - target) / baseline) * 100)

function useEntityData() {
  const { locale } = useI18n()
  const t = translations[locale as keyof typeof translations]

  const environmentItems = [
    [t.version, environment.version],
    [t.cpu, environment.cpu],
    [t.jvm, environment.jvm],
    [t.memory, environment.memory],
    [t.leafCommit, environment.leafCommit],
    [t.paperCommit, environment.paperCommit],
    [t.seed, environment.seed],
    [t.coords, environment.coords],
  ] as const

  const chartData = scenarios.map((scenario) => {
    const bars: Bar[] = [
      {
        className: "paper",
        key: "paper",
        label: t.paper,
        value: scenario.paperMspt,
        valueLabel: `${toFixed1(scenario.paperMspt)} mspt`,
      },
      {
        className: "leaf",
        key: "leaf",
        label: t.leaf,
        value: scenario.leafMspt,
        valueLabel: `${toFixed1(scenario.leafMspt)} mspt`,
      },
      ...(scenario.leafAsyncMspt === null
        ? []
        : [
            {
              className: "leaf-async",
              key: "leaf-async",
              label: t.leafAsync,
              value: scenario.leafAsyncMspt,
              valueLabel: `${toFixed1(scenario.leafAsyncMspt)} mspt`,
            },
          ]),
    ]

    bars.sort((a, b) => a.value - b.value)

    return Object.assign(scenario, {
      asyncImprovement:
        scenario.leafAsyncMspt === null
          ? null
          : calcImprovement(scenario.paperMspt, scenario.leafAsyncMspt),
      bars,
      leafImprovement: calcImprovement(scenario.paperMspt, scenario.leafMspt),
    })
  })

  const chartGroups: ComparisonGroup[] = chartData.map(({ key, bars }) => ({
    bars,
    name: t.scenarios[key],
  }))

  const improvementCards: ImprovementCardItem[] = chartData.flatMap((scenario) => {
    const scenarioName = t.scenarios[scenario.key]
    const title =
      scenario.key === "default" ? t.defaultConfigTitle : t.leafWith.replace("{name}", scenarioName)

    const cards: ImprovementCardItem[] = [
      {
        details: `${t.leaf} (${toFixed1(scenario.leafMspt)} mspt) ${t.vsPaper} (${toFixed1(
          scenario.paperMspt
        )} mspt)`,
        improvement: scenario.leafImprovement,
        title,
      },
    ]

    if (scenario.leafAsyncMspt !== null && scenario.asyncImprovement !== null) {
      cards.push({
        details: `${t.leafAsync} (${toFixed1(scenario.leafAsyncMspt)} mspt) ${t.vsPaper} (${toFixed1(
          scenario.paperMspt
        )} mspt)`,
        highlight: true,
        improvement: scenario.asyncImprovement,
        title: t.leafAsyncWith.replace("{name}", scenarioName),
      })
    }

    return cards
  })

  return { chartGroups, environmentItems, improvementCards, t }
}

export const EntityTestEnvironment = () => {
  const { t, environmentItems } = useEntityData()
  return (
    <TestEnvironmentCard
      items={environmentItems}
      jvmFlags={jvmFlags}
      i18n={{ jvmFlags: t.jvmFlags }}
    />
  )
}

export const EntityComparisonChart = () => {
  const { chartGroups } = useEntityData()
  return (
    <div className="bg-card my-6 overflow-x-auto rounded-xl border p-6 shadow-sm">
      <BenchmarkBarComparisonChart groups={chartGroups} />
    </div>
  )
}

export const EntityImprovementCards = () => {
  const { improvementCards } = useEntityData()
  return (
    <div className="my-6">
      <BenchmarkImprovementCards cards={improvementCards} />
    </div>
  )
}
