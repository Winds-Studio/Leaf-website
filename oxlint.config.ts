import core from "adamantite/lint"
import nextjs from "adamantite/lint/nextjs"
import node from "adamantite/lint/node"
import reactPreset from "adamantite/lint/react"
import { defineConfig } from "oxlint"

const { "jsx-a11y/no-ambiguous-text": _unusedRule, ...reactRules } = reactPreset.rules ?? {}

const react = {
  ...reactPreset,
  rules: reactRules,
}

export default defineConfig({
  extends: [core, react, nextjs, node],
  options: {
    typeAware: true,
    typeCheck: true,
  },
})
