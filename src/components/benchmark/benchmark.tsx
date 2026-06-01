import { Card, Cards } from "fumadocs-ui/components/card"
import { cn } from "@/lib/cn"

export type Bar = {
  key: string
  label: string
  className: string
  value: number
  valueLabel: string
}

export type ComparisonGroup = {
  name: string
  bars: Bar[]
}

export type ImprovementCardItem = {
  title: string
  details: string
  improvement: string
  highlight?: boolean
}

export function BenchmarkBarComparisonChart({ groups }: { groups: ComparisonGroup[] }) {
  const maxValue = Math.max(...groups.flatMap((g) => g.bars.map((b) => b.value)))

  return (
    <div className="flex w-full flex-col gap-6">
      {groups.map((group, i) => (
        <div key={group.name || `benchmark-group-${i}`} className="flex flex-col gap-2">
          {group.name && <div className="text-sm font-semibold">{group.name}</div>}
          <div className={cn("border-muted flex flex-col gap-2", group.name && "border-l pl-4")}>
            {group.bars.map((bar) => {
              const width = Math.max((bar.value / maxValue) * 100, 1)
              let bgColor = "bg-primary"
              if (bar.key === "paper") bgColor = "bg-neutral-300 dark:bg-neutral-700"
              if (bar.key === "leaf") bgColor = "bg-green-500/80"
              if (bar.key === "leaf-async") bgColor = "bg-blue-500/80"

              return (
                <div key={bar.key} className="flex items-center gap-2 text-sm sm:gap-4">
                  <div className="text-muted-foreground w-16 shrink-0 text-xs font-medium sm:w-20 sm:text-sm">
                    {bar.label}
                  </div>
                  <div className="flex flex-1 items-center">
                    <div
                      className={cn("h-6 min-w-1 rounded-r-md", bgColor)}
                      style={{ width: `${width}%` }}
                    />
                    <span className="text-muted-foreground ml-2 font-mono text-xs whitespace-nowrap">
                      {bar.valueLabel}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export function BenchmarkImprovementCards({
  cards,
  singleColumn,
}: {
  cards: ImprovementCardItem[]
  singleColumn?: boolean
}) {
  return (
    <Cards className={cn(singleColumn && "sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1")}>
      {cards.map((card) => (
        <Card
          key={card.title}
          title={card.title}
          description={card.details}
          className={cn(card.highlight && "border-primary", singleColumn && "max-w-md")}
        >
          <div className="mt-2 text-2xl font-bold text-green-500">+{card.improvement}%</div>
        </Card>
      ))}
    </Cards>
  )
}

export function TestEnvironmentCard({
  items,
  jvmFlags,
  extraConfig,
  i18n,
}: {
  items: ReadonlyArray<readonly [string, string]>
  jvmFlags: string
  extraConfig?: { title: string; code: string }
  i18n: { jvmFlags: string }
}) {
  return (
    <div className="bg-card my-6 overflow-hidden rounded-xl border shadow-sm">
      <div className="p-6">
        <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
          {items.map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col text-sm sm:flex-row sm:items-baseline sm:gap-2"
            >
              <span className="text-foreground font-semibold">{label}:</span>
              <span className="text-muted-foreground">{value}</span>
            </div>
          ))}
        </div>
        {extraConfig && (
          <div className="mb-6">
            <h4 className="mb-2 text-sm font-medium">{extraConfig.title}</h4>
            <div className="bg-secondary text-secondary-foreground overflow-x-auto rounded-lg p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
              {extraConfig.code}
            </div>
          </div>
        )}
        <div>
          <h4 className="mb-2 text-sm font-medium">{i18n.jvmFlags}</h4>
          <div className="bg-secondary text-secondary-foreground overflow-x-auto rounded-lg p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
            {jvmFlags}
          </div>
        </div>
      </div>
    </div>
  )
}
