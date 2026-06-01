import { Terminal } from "lucide-react"
import Link from "next/link"

import type { DownloadDict } from "@/lib/dictionaries"
import { getDownloadUrl } from "@/lib/leaf-api"

import { CopyButton } from "./copy-button"

type ApiSnippetProps = {
  build: number
  dict: DownloadDict
  filename: string
  version: string
}

export function ApiSnippet({ build, dict, filename, version }: ApiSnippetProps) {
  const downloadUrl = getDownloadUrl(version, build, filename)
  const snippet = `curl -O ${downloadUrl}`

  return (
    <section className="border-fd-border bg-fd-card border-t px-6 py-5 sm:px-8 sm:py-6">
      <div className="mb-2 flex items-center gap-2">
        <Terminal aria-hidden className="text-fd-primary" size={14} strokeWidth={1.75} />
        <h2 className="text-fd-foreground text-xs font-medium">{dict.apiTitle}</h2>
      </div>

      <p className="text-fd-muted-foreground mb-3 text-xs leading-relaxed">
        {dict.apiDescription}{" "}
        <Link
          className="text-fd-foreground decoration-fd-border hover:decoration-fd-foreground underline underline-offset-2 transition-colors"
          href="https://docs.papermc.io/misc/downloads-service"
        >
          {dict.apiReferenceLink}
        </Link>
        .
      </p>

      <div className="border-fd-border bg-fd-background flex items-center gap-2 overflow-hidden rounded-md border px-3 py-2 font-mono text-xs">
        <span aria-hidden className="text-fd-muted-foreground/70">
          $
        </span>
        <code className="text-fd-foreground min-w-0 flex-1 truncate">{snippet}</code>
        <CopyButton
          className="ml-auto shrink-0"
          copiedLabel={dict.copied}
          label={dict.copy}
          value={snippet}
        />
      </div>
    </section>
  )
}
