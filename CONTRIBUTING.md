# Contributing to Leaf Docs

Thank you for helping improve the Leaf documentation!

## Table of Contents

- [Getting Started](#getting-started)
- [Config Section Guidelines](#config-section-guidelines)
  - [Syncing Changes](#syncing-changes)
  - [Updating to a New Minecraft Version](#updating-to-a-new-minecraft-version)
  - [Adding a New Language](#adding-a-new-language)
- [Chinese Writing Standards](#chinese-writing-standards)
- [Pull Request Guidelines](#pull-request-guidelines)

## Getting Started

**Prerequisites:** [Bun](https://bun.sh/) 1.0+

```bash
bun install
bun run dev
```

## Config Section Guidelines

Most config option descriptions are identical across Minecraft versions and
language versions. A description only changes when the underlying implementation
changes. A diff tool will quickly show what actually differs between versions.

These conventions keep descriptions accurate and complete, minimize redundant
edits across versions and locales, and reduce ongoing maintenance cost.

### Syncing Changes

When a config option is added or its description changes, sync the update to
all other language versions. Minor grammar fixes are the exception — use your
judgement; no need to sync those.

### Updating to a New Minecraft Version

Copy the docs from the previous version. Add descriptions for new config
options, make any changes required by implementation differences, and leave all
other descriptions unchanged.

### Adding a New Language

If you submit a new language without translating the config section, **do not**
copy-paste the English content as a placeholder. Instead, link those config
pages to their English equivalents so readers get accurate information until a
translation is ready.

## Chinese Writing Standards

> **Note:** This section is a work in progress.

- `If true` / `If < 0` — translate as **"如果设为 `true`"** / **"如果设为 `< 0`"**,
  not word-for-word.
- A single config / setting / option — always use **配置项**.

## Pull Request Guidelines

- Keep PRs focused on a single change or topic.
- When syncing language versions, include all affected locales in the same PR.
