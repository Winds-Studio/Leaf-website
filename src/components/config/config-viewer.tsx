"use client"

import * as Collapsible from "@radix-ui/react-collapsible"
import { Tabs, Tab } from "fumadocs-ui/components/tabs"
import { ChevronRight, UnfoldVertical, FoldVertical } from "lucide-react"
import * as React from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { cn } from "@/lib/cn"

export type ConfigValueType = string | number | boolean | Array<string | number | boolean>

export interface ConfigValueNodeProps {
  default: ConfigValueType
  noDesc?: true
}

export interface ConfigSectionNodeProps {
  [key: string]: ConfigSectionNodeProps | ConfigValueNodeProps | undefined
}

export type ConfigRoot = {
  [key: string]: ConfigSectionNodeProps | ConfigValueNodeProps
}

export type ConfigMessages<T> = {
  [K in keyof T as K extends string
    ? T[K] extends { readonly noDesc: true }
      ? never
      : K
    : never]-?: T[K] extends { default: ConfigValueType }
    ? { desc: string }
    : T[K] extends object
      ? { __desc__?: string } & ConfigMessages<T[K]>
      : never
}

type ConfigMessagesLoose = Record<string, unknown>

function getPathValue(
  messages: ConfigMessagesLoose | undefined,
  path: string[],
  key: string
): string | undefined {
  if (!messages) return undefined
  let node: unknown = messages
  for (const k of path) {
    if (node === null || typeof node !== "object") return undefined
    node = (node as Record<string, unknown>)[k]
  }
  if (node !== null && typeof node === "object" && key in node) {
    return (node as Record<string, string>)[key]
  }
  return undefined
}

export class ConfigElement {
  public name: string
  constructor(name: string) {
    this.name = name
  }
}

export class ConfigValue extends ConfigElement {
  public defaultValue: ConfigValueType
  public description?: string

  constructor(name: string, defaultValue: ConfigValueType, description?: string) {
    super(name)
    this.defaultValue = defaultValue
    this.description = description
  }
}

export class ConfigSection extends ConfigElement {
  public nodes: ConfigElement[] = []
  public description?: string

  constructor(name: string, nodes: ConfigElement[] = [], description?: string) {
    super(name)
    this.nodes = nodes
    this.description = description
  }
}

function isConfigValueNode(node: unknown): node is ConfigValueNodeProps {
  return !!node && typeof node === "object" && "default" in node
}

function parseNode(
  name: string,
  data: ConfigSectionNodeProps | ConfigValueNodeProps,
  messages: ConfigMessagesLoose | undefined,
  path: string[]
): ConfigElement {
  const currentPath = [...path, name]

  if (isConfigValueNode(data)) {
    return new ConfigValue(name, data.default, getPathValue(messages, currentPath, "desc"))
  }

  const children: ConfigElement[] = []

  for (const key in data) {
    const child = data[key]
    if (child && typeof child === "object") {
      children.push(parseNode(key, child, messages, currentPath))
    }
  }

  return new ConfigSection(name, children, getPathValue(messages, currentPath, "__desc__"))
}

export function serializeConfig(json: ConfigRoot, messages?: ConfigMessagesLoose): ConfigElement[] {
  return Object.keys(json).flatMap((k) => {
    const node = json[k]
    return node ? [parseNode(k, node, messages, [])] : []
  })
}

const ExpandCtx = React.createContext({ triggerCollapse: 0, triggerExpand: 0 })

function useExpandCollapse(setOpen: React.Dispatch<React.SetStateAction<boolean>>) {
  const { triggerExpand, triggerCollapse } = React.useContext(ExpandCtx)
  React.useEffect(() => {
    if (triggerExpand > 0) setOpen(true)
  }, [triggerExpand, setOpen])
  React.useEffect(() => {
    if (triggerCollapse > 0) setOpen(false)
  }, [triggerCollapse, setOpen])
}

const collapsibleContentCls =
  "data-[state=closed]:animate-fd-collapsible-up data-[state=open]:animate-fd-collapsible-down overflow-hidden"

function DescBlock({ content }: { content: string }) {
  return (
    <div className="my-1.5 max-w-2xl">
      <div
        className={cn(
          "prose prose-sm dark:prose-invert",
          "bg-fd-background/80 border-fd-primary rounded-md border-l-4 px-3 py-1 shadow-sm",
          "[&_p:first-child]:mt-0 [&_p:first-child]:mb-0"
        )}
      >
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
      </div>
    </div>
  )
}

function ValueNode({ node }: { node: ConfigValue }) {
  const [open, setOpen] = React.useState(false)
  useExpandCollapse(setOpen)

  let inline: string
  let rest: string[]

  if (typeof node.defaultValue === "string") {
    const lines = node.defaultValue.split("\n")
    inline = lines[0] ?? ""
    rest = lines.slice(1)
  } else if (Array.isArray(node.defaultValue)) {
    inline = String(node.defaultValue[0] ?? "")
    rest = node.defaultValue.slice(1).map(String)
  } else {
    inline = String(node.defaultValue)
    rest = []
  }

  const isLiteral =
    (!Number.isNaN(Number.parseFloat(inline)) && !Number.isNaN(Number(inline))) ||
    inline === "true" ||
    inline === "false"

  const hasDesc = !!node.description

  return (
    <Collapsible.Root open={open} onOpenChange={hasDesc ? setOpen : undefined}>
      <Collapsible.Trigger
        disabled={!hasDesc}
        className={cn(
          "group flex items-baseline gap-1.5 self-start rounded-sm bg-transparent p-0 text-left font-[inherit] break-all whitespace-normal text-inherit outline-none",
          "focus-visible:ring-fd-primary focus-visible:ring-2",
          hasDesc ? "cursor-pointer hover:opacity-80" : "cursor-default"
        )}
      >
        <span className="text-fd-primary flex shrink-0 items-center font-medium">
          {node.name}
          <span className="text-fd-muted-foreground ml-0.5">:</span>
        </span>
        <span
          className={cn(
            "leading-relaxed",
            isLiteral ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400"
          )}
        >
          {inline}
        </span>
        {hasDesc && (
          <ChevronRight className="text-fd-muted-foreground h-3.5 w-3.5 shrink-0 self-center transition-transform duration-150 group-data-[state=open]:rotate-90" />
        )}
      </Collapsible.Trigger>

      {rest.length > 0 && (
        <div className="mt-0.5 max-w-3xl whitespace-pre-wrap text-green-600 dark:text-green-400">
          {rest.join("\n")}
        </div>
      )}

      {node.description && (
        <Collapsible.Content className={collapsibleContentCls}>
          <DescBlock content={node.description} />
        </Collapsible.Content>
      )}
    </Collapsible.Root>
  )
}

function SectionNode({ node }: { node: ConfigSection }) {
  const [open, setOpen] = React.useState(false)
  useExpandCollapse(setOpen)

  const hasDesc = !!node.description

  return (
    <Collapsible.Root open={open} onOpenChange={hasDesc ? setOpen : undefined}>
      <div className="flex flex-col">
        {hasDesc ? (
          <Collapsible.Trigger
            className={cn(
              "group flex items-center gap-1.5 self-start rounded-sm bg-transparent p-0 text-left font-[inherit] text-inherit outline-none",
              "focus-visible:ring-fd-primary focus-visible:ring-2",
              "cursor-pointer hover:opacity-80"
            )}
          >
            <span className="text-fd-foreground flex shrink-0 items-center font-medium">
              {node.name}
              <span className="text-fd-muted-foreground ml-0.5">:</span>
            </span>
            <ChevronRight className="text-fd-muted-foreground h-3.5 w-3.5 shrink-0 transition-transform duration-150 group-data-[state=open]:rotate-90" />
          </Collapsible.Trigger>
        ) : (
          <span className="text-fd-foreground flex shrink-0 items-center self-start font-medium">
            {node.name}
            <span className="text-fd-muted-foreground ml-0.5">:</span>
          </span>
        )}

        {node.description && (
          <Collapsible.Content className={collapsibleContentCls}>
            <DescBlock content={node.description} />
          </Collapsible.Content>
        )}

        <div className="border-fd-border mt-1 ml-3 flex flex-col gap-1 border-l pl-2">
          {node.nodes.map((child) => (
            <AnyNode key={child.name} node={child} />
          ))}
        </div>
      </div>
    </Collapsible.Root>
  )
}

function AnyNode({ node }: { node: ConfigElement }) {
  if (node instanceof ConfigValue) return <ValueNode node={node} />
  if (node instanceof ConfigSection) return <SectionNode node={node} />
  return null
}

function ToolbarButton({
  onClick,
  icon: Icon,
  label,
}: {
  onClick: () => void
  icon: React.ElementType
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-fd-background border-fd-border hover:bg-fd-accent hover:text-fd-accent-foreground",
        "text-fd-muted-foreground focus-visible:ring-fd-primary",
        "flex items-center gap-1.5 rounded-md border px-2.5 py-1 shadow-sm transition-colors outline-none focus-visible:ring-2"
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="pt-0.5 font-sans text-sm font-medium">{label}</span>
    </button>
  )
}

export function ConfigViewer<T extends ConfigRoot>({
  data,
  messages,
  version,
}: {
  data: ConfigRoot
  messages?: ConfigMessages<T>
  version: string
}) {
  const [triggerExpand, setTriggerExpand] = React.useState(0)
  const [triggerCollapse, setTriggerCollapse] = React.useState(0)

  const config = React.useMemo(
    () => serializeConfig(data, messages as ConfigMessagesLoose),
    [data, messages]
  )

  return (
    <ExpandCtx.Provider value={{ triggerCollapse, triggerExpand }}>
      <div
        key={version}
        className="bg-fd-secondary/40 my-3 flex max-w-full flex-col gap-3 overflow-x-auto rounded-lg p-3 font-mono text-sm leading-tight sm:p-4"
      >
        <div className="flex gap-2">
          <ToolbarButton
            onClick={() => {
              setTriggerExpand((v) => v + 1)
            }}
            icon={UnfoldVertical}
            label="Expand all"
          />
          <ToolbarButton
            onClick={() => {
              setTriggerCollapse((v) => v + 1)
            }}
            icon={FoldVertical}
            label="Collapse all"
          />
        </div>

        <div className="mt-1 flex flex-col gap-1">
          {config.map((node) => (
            <AnyNode key={node.name} node={node} />
          ))}
        </div>
      </div>
    </ExpandCtx.Provider>
  )
}

export function ConfigSwitch<T extends Record<string, ConfigRoot>>({
  data,
  messages,
}: {
  data: T
  messages?: { [K in keyof T]?: ConfigMessages<T[K]> }
}) {
  const versions = Object.keys(data)
  if (versions.length === 0) return null

  return (
    <Tabs items={versions} className="my-8">
      {versions.map((ver) => (
        <Tab key={ver} value={ver}>
          <ConfigViewer data={data[ver] ?? {}} messages={messages?.[ver]} version={ver} />
        </Tab>
      ))}
    </Tabs>
  )
}