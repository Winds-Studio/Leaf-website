import type { Locale } from "@/lib/i18n"
import { getStats } from "@/lib/stats"

export type LanguageCopy = {
  download: {
    eyebrow: string
    title: string
    intro: string

    channelStable: string
    channelExperimental: string
    channelAll: string
    viewAllVersions: string

    pillLatestStable: string
    pillLatestExperimental: string
    pillStable: string
    pillExperimental: string
    pillUnmaintained: string

    heroBuild: string
    heroReleasedOn: string
    ctaDownload: string
    ctaChangelog: string
    sha256Label: string
    copy: string
    copied: string

    timelineHeading: string
    timelineSummary: string
    timelineViewAll: string

    apiTitle: string
    apiDescription: string
    apiReferenceLink: string

    stateNoStableTitle: string
    stateNoStableBody: string
    stateNoBuildsTitle: string
    stateNoBuildsBody: string
    stateNoChannelBuilds: string
    stateApiDownTitle: string
    stateApiDownBody: string
    stateGithubFallback: string
    bannerUnmaintained: string
    disclaimer: string

    buildCount: string
    pagination: string
  }
  home: {
    hero: {
      pill: string
      titleA: string
      titleB: string
      titleC: string
      subtitle: string
      ctaPrimary: string
      ctaSecondary: string
      meta: ReadonlyArray<{ value: string; label: string }>
    }
    cta: {
      title: string
      sub: string
      primary: string
      secondary: string
    }
    features: {
      featuresHead: {
        eyebrow: string
        title: string
        sub: string
      }
      features: ReadonlyArray<{ title: string; body: string }>
    }
    config: {
      cta: string
      bullets: readonly string[]
      title: string
      eyebrow: string
      sub: string
      filename: string
      snippet: {
        header: string
        footer: string
      }
    }
    footer: {
      tag: string
      cols: Array<{
        h: string
        items: Array<{
          title: string
          href: string
        }>
      }>
      copyright: string
      copyrightNote: string
    }
    faq: {
      head: {
        eyebrow: string
        title: string
        sub: string
      }
      faq: ReadonlyArray<{
        q: string
        a: string
      }>
    }
    placeholder: {
      aiLabel: string
      ariaHidden: string
      ariaReveal: string
      badge1: string
      badge2: string
      badge3: string
      body: string
      footer: string
      overlayHint: string
      overlayTitle: string
      title: string
      todo: string
    }
  }
}

export type DownloadDict = LanguageCopy["download"]

export async function getDictionary(locale: Locale): Promise<LanguageCopy> {
  const stats = await getStats()

  const dictionaries: Record<Locale, LanguageCopy> = {
    de: {
      download: {
        apiDescription: "Builds direkt über die v2 API abrufen. Vollständige Dokumentation unter",
        apiReferenceLink: "API-Referenz",
        apiTitle: "Für Skripte & CI",
        bannerUnmaintained: "Erhält keine Updates mehr · Letzter Build {date}",
        buildCount: "{n} Builds",
        channelAll: "Alle",
        channelExperimental: "Experimentell",
        channelStable: "Stabil",
        copied: "Kopiert",
        copy: "Kopieren",
        ctaChangelog: "Änderungsprotokoll",
        ctaDownload: "JAR herunterladen",
        disclaimer:
          "Haftungsausschluss: Nicht für den Produktivbetrieb empfohlen. Nutzung auf eigene Gefahr. Das Leaf-Team übernimmt keine Verantwortung.",
        eyebrow: "Downloads",
        heroBuild: "Build #{n}",
        heroReleasedOn: "Veröffentlicht am {date}",
        intro:
          "Wähle eine Minecraft-Version und lade die Server-JAR herunter. Verwende den stabilen Kanal für Produktivumgebungen.",
        pagination: "Seite {page} von {total}",
        pillExperimental: "Experimentell",
        pillLatestExperimental: "Neuester experimenteller Build",
        pillLatestStable: "Neueste stabile Version",
        pillStable: "Stabil",
        pillUnmaintained: "Nicht gepflegt",
        sha256Label: "sha256",
        stateApiDownBody:
          "Versuche es später erneut oder lade die JAR direkt von GitHub Releases herunter.",
        stateApiDownTitle: "Download-Dienst vorübergehend nicht verfügbar",
        stateGithubFallback: "Zu GitHub Releases",
        stateNoBuildsBody: "Für diese Minecraft-Version wurden noch keine Builds veröffentlicht.",
        stateNoBuildsTitle: "Keine Builds verfügbar",
        stateNoChannelBuilds: "Keine {channel}-Builds verfügbar",
        stateNoStableBody:
          "Es sind nur experimentelle Builds verfügbar. Mit Vorsicht verwenden — nicht für den Produktivbetrieb empfohlen.",
        stateNoStableTitle: "Keine stabilen Builds verfügbar",
        timelineHeading: "Neueste Builds",
        timelineSummary: "{version} · Zeigt die letzten {count}",
        timelineViewAll: "Alle {count} Builds für {version} anzeigen",
        title: "Leaf herunterladen",
        viewAllVersions: "Alle anzeigen",
      },
      home: {
        config: {
          bullets: [
            "Hot-Reload zur Laufzeit — kein Neustart nötig",
            "Präzise Abstimmung für Server jeder Größe",
            "Klare Kommentare — jede Option verständlich",
          ],
          cta: "Konfigurationsanleitung lesen",
          eyebrow: "Schau rein",
          filename: "leaf-global.yml",
          snippet: {
            footer: "# … FIXES / NETWORK / GAMEPLAY und Dutzende weitere nicht gezeigt",
            header: "# Leaf-Konfiguration — Teilansicht",
          },
          sub: "Eine flache YAML-Datei für jeden Server-Parameter. Ungenutzte Optionen sind standardmäßig ausgeblendet — übersichtlich, lesbar, kein Ballast.",
          title: "Ändere, was du brauchst. Lass den Rest.",
        },
        cta: {
          primary: `v${stats.version} laden`,
          secondary: "Schnellstart",
          sub: "Eine JAR, zwei Minuten. Leaf läuft direkt in deiner bestehenden Server-Umgebung.",
          title: "Dein Server ist bereit. Leaf auch.",
        },
        faq: {
          faq: [
            {
              a: "Leaf basiert auf Paper und übernimmt dessen vollständigen API-Vertrag. Alles, was auf Paper läuft, läuft auch auf Leaf — der Unterschied liegt darin, was nach der API-Rückgabe passiert.",
              q: "Ist Leaf ein Paper-Fork?",
            },
            {
              a: "Nein. Spielmechaniken (Redstone-Timing, Mob-KI, Physik) sind identisch mit Vanilla. Optimierungen finden unterhalb der Gameplay-Schicht statt.",
              q: "Werden Spieler Verhaltensänderungen bemerken?",
            },
            {
              a: "Ja, Leaf enthält alle Purpur-Patches, wobei einige Purpur-Konfigurationsoptionen in die Gale- und Leaf-Konfigurationsdateien verschoben wurden.",
              q: "Enthält Leaf Purpur?",
            },
          ],
          head: {
            eyebrow: "Fragen",
            sub: "Was die Dokumentation noch nicht abgedeckt hat.",
            title: "Häufig gestellte Fragen",
          },
        },
        features: {
          features: [
            {
              body: "Für anspruchsvolle Szenarien entwickelt — trägt hohe Spielerzahlen bei verbesserter Leistung und flüssigem Gameplay.",
              title: "Gebaut für Skalierung",
            },
            {
              body: "Kein Aufwand. Kern tauschen, Server starten — volle Paper-Plugin-Kompatibilität inklusive.",
              title: "Nahtlos kompatibel",
            },
            {
              body: "Immer aktuell. Neueste Abhängigkeiten, Upstream-Fixes ab dem ersten Tag.",
              title: "Zukunftsorientiert",
            },
          ],
          featuresHead: {
            eyebrow: "Was du bekommst",
            sub: "Leaf enthält Dutzende Optimierungen. Diese drei stehen stellvertretend für alle.",
            title: "Drei Dinge zählen. Den Rest findest du in den Docs.",
          },
        },
        footer: {
          cols: [
            {
              h: "Projekt",
              items: [
                { href: "/download", title: "Download" },
                { href: "https://github.com/Winds-Studio/Leaf", title: "GitHub" },
                { href: "/docs/dev/api", title: "API-Dokumentation" },
              ],
            },
            {
              h: "Community",
              items: [
                { href: "https://discord.com/invite/gfgAwdSEuM", title: "Discord" },
                { href: "https://qm.qq.com/q/m85buUivEA", title: "QQ-Gruppe" },
              ],
            },
            {
              h: "Ressourcen",
              items: [
                {
                  href: "https://github.com/Winds-Studio/Leaf#%EF%B8%8F-license",
                  title: "Lizenz",
                },
              ],
            },
          ],
          copyright: "© 2026 Leaf MC. Alle Rechte vorbehalten.",
          copyrightNote: "Der Seiteninhalt ist unter CC BY-NC-SA 4.0 lizenziert.",
          tag: "Ein hochoptimierter, kompatibler Minecraft-Serverkern, der das Vanilla-Verhalten respektiert.",
        },
        hero: {
          ctaPrimary: "Loslegen",
          ctaSecondary: "Auf GitHub ansehen",
          meta: [
            { label: "Neueste Version", value: stats.version },
            { label: "Aktive Server", value: stats.servers },
            { label: "Stars", value: stats.stars },
          ],
          pill: `v${stats.version} veröffentlicht`,
          subtitle:
            "Ein leistungsstarker Minecraft-Serverkern. Vanilla-getreu, voll Paper-kompatibel und optimiert für Server, die echten Durchsatz brauchen.",
          titleA: "Dein Server ",
          titleB: "fliegt",
          titleC: " — kein Lag mehr.",
        },
        placeholder: {
          aiLabel: "KI-Platzhalter",
          ariaHidden: "Platzhalter angezeigt",
          ariaReveal: "Klicken, um Platzhalter anzuzeigen",
          badge1: "Status: Vorübergehend",
          badge2: "Autor: Kein Mensch",
          badge3: "Lebensdauer: Bis der Dev Zeit hat",
          body: "Ja, auch dieser Text wurde von einer KI geschrieben. Der Entwickler weiß noch nicht, was hier hin soll — große Pläne, aber die Deadline klopfte an. Statt einer leeren Fläche hat er mich hier platziert. Sobald er Zeit und Inspiration findet, werde ich durch echten, handgeschriebenen Inhalt ersetzt. Bis dahin halte ich die Stellung.",
          footer: "Rest der Seite: 100% handgemacht ✋",
          overlayHint: "Klicken zum Anzeigen →",
          overlayTitle: "Ich bin ein Platzhalter",
          title: "Hallo, ich bin ein KI-generierter Platzhalter",
          todo: "// TODO: auf Inspiration warten",
        },
      },
    },
    en: {
      download: {
        apiDescription: "Pull builds directly via the v2 API. Full documentation at",
        apiReferenceLink: "API reference",
        apiTitle: "For scripts & CI",
        bannerUnmaintained: "No longer receiving updates · Last built {date}",
        buildCount: "{n} builds",
        channelAll: "All",
        channelExperimental: "Experimental",
        channelStable: "Stable",
        copied: "Copied",
        copy: "Copy",
        ctaChangelog: "Changelog",
        ctaDownload: "Download JAR",
        disclaimer:
          "Disclaimer: Not recommended for production use. Use at your own risk. The Leaf team is not responsible for any issues.",
        eyebrow: "Downloads",
        heroBuild: "Build #{n}",
        heroReleasedOn: "Released {date}",
        intro:
          "Select a Minecraft version and download the server JAR. Use the stable channel for production environments.",
        pagination: "Page {page} of {total}",
        pillExperimental: "Experimental",
        pillLatestExperimental: "Latest experimental",
        pillLatestStable: "Latest stable",
        pillStable: "Stable",
        pillUnmaintained: "Unmaintained",
        sha256Label: "sha256",
        stateApiDownBody: "Try again later, or download the JAR directly from GitHub Releases.",
        stateApiDownTitle: "Download service unavailable",
        stateGithubFallback: "Go to GitHub Releases",
        stateNoBuildsBody: "No builds have been released for this Minecraft version yet.",
        stateNoBuildsTitle: "No builds available",
        stateNoChannelBuilds: "No {channel} builds available",
        stateNoStableBody:
          "Only experimental builds are available. Use with caution — not recommended for production.",
        stateNoStableTitle: "No stable builds available",
        timelineHeading: "Recent builds",
        timelineSummary: "{version} · Showing latest {count}",
        timelineViewAll: "View all {count} builds for {version}",
        title: "Get Leaf",
        viewAllVersions: "View all",
      },
      home: {
        config: {
          bullets: [
            "Hot-reload at runtime — no restart needed for most changes",
            "Fine-grained tuning for servers of any size",
            "Clear inline comments — every option self-documented",
          ],
          cta: "Read the config guide",
          eyebrow: "Take a look",
          filename: "leaf-global.yml",
          snippet: {
            footer: "# … FIXES / NETWORK / GAMEPLAY and dozens more not shown",
            header: "# Leaf config — partial view",
          },
          sub: "A flat YAML file that controls every detail of your server. Options you don't need are hidden by default, keeping the config clean and readable.",
          title: "Change what you need. Leave the rest.",
        },
        cta: {
          primary: `Download v${stats.version}`,
          secondary: "Quick start",
          sub: "One JAR, two minutes. Leaf drops into your existing server setup.",
          title: "Your server is ready. So is Leaf.",
        },
        faq: {
          faq: [
            {
              a: "Leaf is built on top of Paper and inherits its full API contract. Anything that runs on Paper runs on Leaf — the difference is what happens after the API returns.",
              q: "Is Leaf a Paper fork?",
            },
            {
              a: "No. Gameplay mechanics (redstone timing, mob AI, physics) are identical to vanilla. Optimizations happen below the gameplay layer.",
              q: "Will players notice any behavior changes?",
            },
            {
              a: "Yes, Leaf includes all Purpur patches, though some Purpur config options have been moved into the Gale and Leaf configuration files.",
              q: "Does Leaf include Purpur?",
            },
          ],
          head: {
            eyebrow: "Questions",
            sub: "The things the docs haven't covered yet.",
            title: "Frequently asked questions",
          },
        },
        features: {
          features: [
            {
              body: "Handles demanding server scenarios. Designed for large player counts with improved performance and smooth gameplay.",
              title: "Built for scale",
            },
            {
              body: "No compromises. Swap the core, start the server, keep full Paper plugin compatibility.",
              title: "Drop-in compatible",
            },
            {
              body: "Stays current. Uses the latest dependencies — upstream fixes arrive on day one.",
              title: "Future-facing",
            },
          ],
          featuresHead: {
            eyebrow: "What you get",
            sub: "Leaf ships with dozens of optimizations. These three represent all of them.",
            title: "Three things matter most. The rest is in the docs.",
          },
        },
        footer: {
          cols: [
            {
              h: "Project",
              items: [
                { href: "/download", title: "Download" },
                { href: "https://github.com/Winds-Studio/Leaf", title: "GitHub" },
                { href: "/docs/dev/api", title: "API Docs" },
              ],
            },
            {
              h: "Community",
              items: [
                { href: "https://discord.com/invite/gfgAwdSEuM", title: "Discord" },
                { href: "https://qm.qq.com/q/m85buUivEA", title: "QQ Group" },
              ],
            },
            {
              h: "Resources",
              items: [
                {
                  href: "https://github.com/Winds-Studio/Leaf#%EF%B8%8F-license",
                  title: "License",
                },
              ],
            },
          ],
          copyright: "© 2026 Leaf MC. All rights reserved.",
          copyrightNote: "Site content is licensed under CC BY-NC-SA 4.0.",
          tag: "A highly optimized, compatible Minecraft server core that respects vanilla behavior.",
        },
        hero: {
          ctaPrimary: "Get started",
          ctaSecondary: "View on GitHub",
          meta: [
            { label: "Latest version", value: stats.version },
            { label: "Servers running", value: stats.servers },
            { label: "Stars", value: stats.stars },
          ],
          pill: `v${stats.version} released`,
          subtitle:
            "A performance-focused Minecraft server core. Vanilla-accurate, fully Paper-compatible, and built for servers that demand real throughput.",
          titleA: "Make your server ",
          titleB: "fly",
          titleC: ", leave lag behind.",
        },
        placeholder: {
          aiLabel: "AI Placeholder",
          ariaHidden: "Placeholder revealed",
          ariaReveal: "Click to reveal placeholder",
          badge1: "Status: Temporary",
          badge2: "Author: Not human",
          badge3: "Lifespan: Until the dev has time",
          body: "Yes, even this text was written by AI. The developer hasn't figured out what goes here yet — they had grand plans, but the deadline came knocking. Rather than leave you staring at a blank, they dropped me in as a stand-in. Once inspiration strikes (and they find the time), I'll be swapped out for something hand-crafted. Until then, I'm holding the fort.",
          footer: "Rest of this page: 100% hand-crafted ✋",
          overlayHint: "Click to reveal →",
          overlayTitle: "I'm a placeholder",
          title: "Hi, I'm an AI-generated placeholder",
          todo: "// TODO: awaiting inspiration",
        },
      },
    },
    zh: {
      download: {
        apiDescription: "通过 v2 API 直接拉取构建。完整文档见",
        apiReferenceLink: "API 参考",
        apiTitle: "用于脚本与 CI",
        bannerUnmaintained: "已不再接收更新 · 最后构建 {date}",
        buildCount: "{n} 个构建",
        channelAll: "全部",
        channelExperimental: "实验性",
        channelStable: "稳定",
        copied: "已复制",
        copy: "复制",
        ctaChangelog: "更新日志",
        ctaDownload: "下载 JAR",
        disclaimer: "免责声明：不建议用于生产环境，相关风险由用户自行承担，Leaf 项目组不对此负责。",
        eyebrow: "下载",
        heroBuild: "构建 #{n}",
        heroReleasedOn: "{date} 发布",
        intro: "选择 Minecraft 版本，下载对应的服务端 JAR。生产环境请使用稳定通道。",
        pagination: "第 {page} 页 / 共 {total} 页",
        pillExperimental: "实验性",
        pillLatestExperimental: "最新实验性构建",
        pillLatestStable: "最新稳定版本",
        pillStable: "稳定",
        pillUnmaintained: "已停更",
        sha256Label: "sha256",
        stateApiDownBody: "稍后再试，或直接从 GitHub Releases 页面下载 JAR。",
        stateApiDownTitle: "下载服务暂时不可用",
        stateGithubFallback: "前往 GitHub Releases",
        stateNoBuildsBody: "该 Minecraft 版本尚未发布任何构建。",
        stateNoBuildsTitle: "暂无构建",
        stateNoChannelBuilds: "暂无 {channel} 构建",
        stateNoStableBody: "当前仅有实验性构建可用，请谨慎使用，不建议用于生产环境。",
        stateNoStableTitle: "该版本暂无稳定构建",
        timelineHeading: "近期构建",
        timelineSummary: "{version} · 显示最近 {count} 条",
        timelineViewAll: "查看 {version} 全部 {count} 个构建",
        title: "获取 Leaf",
        viewAllVersions: "查看全部",
      },
      home: {
        config: {
          bullets: [
            "运行时热重载——大部分配置项无需重启",
            "精准的性能调优选项，适合不同规模和需求的服务器",
            "清晰的注释和文档，帮助你理解每个选项的作用",
          ],
          cta: "阅读配置指南",
          eyebrow: "上手看看",
          filename: "leaf-global.yml",
          snippet: {
            footer: "# … FIXES / NETWORK / GAMEPLAY 等数十项未列出",
            header: "# Leaf 配置 — 部分展示",
          },
          sub: "一份扁平的 YAML 文件，控制服务器的每一个细节。无需调整的选项已经被隐藏了，保持配置文件简洁易懂。",
          title: "需要什么改什么，其余的不用管。",
        },
        cta: {
          primary: `下载 v${stats.version}`,
          secondary: "阅读快速上手",
          sub: "一个 jar，两分钟。Leaf 兼容你现有的服务器环境。",
          title: "你的服务器准备好了，Leaf 就准备好了。",
        },
        faq: {
          faq: [
            {
              a: "Leaf 构建于 Paper 之上，继承其全部 API 契约。能在 Paper 上跑的插件就能在 Leaf 上跑——差别在于 API 返回之后发生了什么。",
              q: "Leaf 是 Paper 的 fork 吗？",
            },
            {
              a: "不会。玩法相关的机制（红石时序、生物 AI、物理）与原版完全一致。优化只发生在玩法层之下。",
              q: "玩家会感觉到行为变化吗？",
            },
            {
              a: "是的，Leaf 包含所有 Purpur 的补丁，但部分 Purpur 配置项已移至 Gale 和 Leaf 的配置中。",
              q: "Leaf 是否包括 PurPur？",
            },
          ],
          head: {
            eyebrow: "疑问",
            sub: "文档里还没写到的那些。",
            title: "常见问题",
          },
        },
        features: {
          features: [
            {
              body: "应付各种服务器场景，设计用于承载大量玩家，提升性能并保持流畅。",
              title: "专为规模而生",
            },
            {
              body: "无需妥协。替换核心，点击开服，保持与 Paper 完全一致的插件兼容性。",
              title: "无缝兼容",
            },
            {
              body: "紧跟前沿，追求现代。使用最新的依赖项，在第一天就获得来自上游的修复与优化。",
              title: "面向未来",
            },
          ],
          featuresHead: {
            eyebrow: "你能得到什么",
            sub: "Leaf 内置了数十项优化，但这三项更值得出现在首页。",
            title: "三件事最重要，其余都在文档里。",
          },
        },
        footer: {
          cols: [
            {
              h: "项目",
              items: [
                { href: "/download", title: "下载" },
                { href: "https://github.com/Winds-Studio/Leaf", title: "GitHub" },
                { href: "/docs/dev/api", title: "API 文档" },
              ],
            },
            {
              h: "社区",
              items: [
                { href: "https://discord.com/invite/gfgAwdSEuM", title: "Discord" },
                { href: "https://qm.qq.com/q/m85buUivEA", title: "QQ 交流群" },
              ],
            },
            {
              h: "资源",
              items: [
                {
                  href: "https://github.com/Winds-Studio/Leaf#%EF%B8%8F-license",
                  title: "许可证",
                },
              ],
            },
          ],
          copyright: "© 2026 Leaf MC. 保留所有权利。",
          copyrightNote: "本站内容遵循 CC BY-NC-SA 4.0 许可协议发布。",
          tag: "一个高度优化、兼容、尊重原版行为的 Minecraft 服务端核心。",
        },
        hero: {
          ctaPrimary: "立即开始",
          ctaSecondary: "前往 GitHub",
          meta: [
            { label: "最新版本", value: stats.version },
            { label: "在用服务器", value: stats.servers },
            { label: "Star", value: stats.stars },
          ],
          pill: `v${stats.version} 已发布`,
          subtitle:
            "Leaf 是一个专注性能提升的 Minecraft 服务端核心，尊重原版行为、兼容插件生态。稳定地运行与强劲优化，给那些最需要它的服务器。",
          titleA: "让你的服务器 ",
          titleB: "飞起来",
          titleC: "，告别 PPT。",
        },
        placeholder: {
          aiLabel: "AI 临时顶班",
          ariaHidden: "占位符内容已显示",
          ariaReveal: "点击显示占位符内容",
          badge1: "状态：临时顶班",
          badge2: "作者：不是人类",
          badge3: "寿命：直到前端有空",
          body: "没错，连你正在读的这段文字也是 AI 写的。那位前端还没想好这一块到底要做成什么样，本来想精雕细琢一番，但 deadline 已经追到屁股后面了——急于求成的他直接把我丢在这，先糊弄你一下。等他哪天有空（且有灵感）了，我就会被一段真正手工敲的内容替换掉。在此之前，就由我代班啦。",
          footer: "本页其它部分：100% 手工打造 ✋",
          overlayHint: "点击查看 →",
          overlayTitle: "我是一个占位符",
          title: "你好，我是一段 AI 生成的占位符",
          todo: "// TODO: 等灵感降临",
        },
      },
    },
  }

  return dictionaries[locale]
}
