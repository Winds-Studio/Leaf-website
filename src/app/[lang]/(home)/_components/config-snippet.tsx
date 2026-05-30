import { LucideChevronsRight, Check } from "lucide-react"
import type { LanguageCopy } from "@/lib/dictionaries"
import Btn from "@/components/button"
import Icon from "@/components/icon"

type Dist = LanguageCopy["home"]["config"]
type ValueType = "bool" | "number" | "string"

type Line =
  | { id: string; kind: "comment"; text: string }
  | { id: string; kind: "section"; text: string }
  | { id: string; kind: "key"; indent: number; key: string; value?: string; valueType?: ValueType }
  | { id: string; kind: "blank" }

const buildSample = (dist: Dist): Line[] => [
  { id: "header", kind: "comment", text: dist.snippet.header },
  { id: "sec-async", kind: "section", text: "ASYNC" },
  { id: "async", indent: 0, key: "async", kind: "key" },
  { id: "async-entity-tracker", indent: 2, key: "async-entity-tracker", kind: "key" },
  {
    id: "async-entity-tracker.enabled",
    indent: 4,
    key: "enabled",
    kind: "key",
    value: "true",
    valueType: "bool",
  },
  { id: "blank-2", kind: "blank" },

  { id: "sec-perf", kind: "section", text: "PERF" },
  { id: "performance", indent: 0, key: "performance", kind: "key" },
  { id: "performance.dab", indent: 2, key: "dab", kind: "key" },
  {
    id: "performance.dab.start-distance",
    indent: 4,
    key: "start-distance",
    kind: "key",
    value: "8",
    valueType: "number",
  },
  { id: "blank-3", kind: "blank" },

  { id: "sec-misc", kind: "section", text: "MISC" },
  { id: "misc", indent: 0, key: "misc", kind: "key" },
  { id: "misc.secure-seed", indent: 2, key: "secure-seed", kind: "key" },
  {
    id: "misc.secure-seed.enabled",
    indent: 4,
    key: "enabled",
    kind: "key",
    value: "true",
    valueType: "bool",
  },
  { id: "blank-4", kind: "blank" },

  { id: "footer", kind: "comment", text: dist.snippet.footer },
]

const Value = ({ value, type }: { value: string; type?: ValueType }) => {
  const color =
    type === "bool"
      ? "text-(--code-bool,#d19a66)"
      : type === "number"
        ? "text-(--code-number,#d19a66)"
        : type === "string"
          ? "text-(--code-string,#98c379)"
          : "text-(--code-plain,#abb2bf)"
  return <span className={color}>{value}</span>
}

const CodeBlock = ({ dist }: { dist: Dist }) => (
  <code className="block">
    {buildSample(dist).map((line) => {
      if (line.kind === "blank")
        return (
          <span key={line.id} className="block h-[1.7em]">
            {"\u00A0"}
          </span>
        )

      if (line.kind === "comment")
        return (
          <span key={line.id} className="block text-(--code-comment,#7f848e) italic">
            {line.text}
          </span>
        )

      if (line.kind === "section")
        return (
          <span key={line.id} className="block font-medium text-(--code-section,#c678dd)">
            {`### ${line.text} ###`}
          </span>
        )

      return (
        <span key={line.id} className="block">
          {"\u00A0".repeat(line.indent)}
          <span className="text-(--code-key,#e06c75)">{line.key}</span>
          <span className="text-(--code-punct,#56b6c2)">:</span>
          {line.value !== undefined && (
            <>
              {" "}
              <Value value={line.value} type={line.valueType} />
            </>
          )}
        </span>
      )
    })}
  </code>
)

const ConfigSnippet = ({ dist, locale }: { dist: Dist; locale: string }) => (
  <section className="border-fd-border border-t py-24 max-md:py-16">
    <div className="mx-auto max-w-(--fd-layout-width) px-8 max-md:px-5">
      <div className="grid items-stretch gap-8 md:grid-cols-2">
        <div>
          <span className="lang-zh:normal-case lang-zh:tracking-normal lang-zh:text-[13px] mb-5 text-xs font-medium tracking-[0.08em] text-(--fg-muted) uppercase">
            {dist.eyebrow}
          </span>
          <h2 className="text-fd-secondary-foreground lang-en:leading-[1.2] lang-en:tracking-[-0.018] lang-de:leading-[1.2] lang-de:tracking-[-0.018] lang-zh:leading-[1.4] mt-3 mb-4 text-[clamp(28px,3vw,34px)] font-semibold">
            {dist.title}
          </h2>
          <p className="mb-5 max-w-120 text-[15.5px] text-(--fg-muted)">{dist.sub}</p>
          <div className="mb-5 flex flex-col gap-3">
            {dist.bullets.map((b: string) => (
              <div
                key={`bullet-${b}`}
                className="text-fd-secondary-foreground flex items-start gap-2.5 text-sm"
              >
                <span className="text-fd-primary dark:text-fd-accent-foreground mt-0.75 shrink-0">
                  <Check />
                </span>
                <span>{b}</span>
              </div>
            ))}
          </div>
          <Btn variant="secondary" href={`/${locale}/docs/config/leaf-global`}>
            {dist.cta} <LucideChevronsRight />
          </Btn>
        </div>
        <div className="overflow-hidden rounded-[14px] border border-(--border) bg-(--code-bg) font-mono text-[13px]">
          <div className="flex items-center justify-between border-b border-(--border) bg-(--bg-elev) px-4 py-2.5">
            <span className="text-fd-muted-foreground inline-flex items-center gap-1.5 font-mono text-sm">
              <Icon.SimpleLeaf className="size-3.5" />
              {dist.filename}
            </span>
          </div>
          <pre className="m-0 overflow-x-auto px-6 py-5 leading-[1.7]">
            <CodeBlock dist={dist} />
          </pre>
        </div>
      </div>
    </div>
  </section>
)

export default ConfigSnippet
