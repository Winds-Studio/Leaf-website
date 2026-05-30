import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import { zhCN } from "@fumadocs/language/zh-cn"
import { uiTranslations } from "fumadocs-ui/i18n"
import type { Locale } from "@/lib/i18n"
import Icon from "@/components/icon"
import { i18n } from "@/lib/i18n"
import { appName } from "./shared"

const localeUI = {
  de: {
    displayName: "Deutsch",
    navDocs: "Dokumentation",
    navDownload: "Download",
    navHome: "Startseite",
  },
  en: {
    displayName: "English",
    navDocs: "Docs",
    navDownload: "Download",
    navHome: "Home",
  },
  zh: {
    displayName: "简体中文",
    navDocs: "文档",
    navDownload: "下载",
    navHome: "首页",
  },
} satisfies Record<
  Locale,
  {
    displayName: string
    navDocs: string
    navDownload: string
    navHome: string
  }
>

export const i18nUI = i18n
  .translations()
  .extend(uiTranslations())
  .add("ui", localeUI)
  .preset("zh", zhCN())

export function baseOptions(locale: Locale): BaseLayoutProps {
  const t = localeUI[locale]
  return {
    githubUrl: `https://github.com/Winds-Studio/Leaf`,
    links: [
      { active: "url", on: "nav", text: t.navHome, type: "main", url: `/${locale}` },
      {
        active: "nested-url",
        on: "nav",
        text: t.navDownload,
        type: "main",
        url: `/${locale}/download`,
      },
      {
        active: "nested-url",
        on: "nav",
        text: t.navDocs,
        type: "main",
        url: `/${locale}/docs/getting-started`,
      },
    ],
    nav: {
      title: (
        <div className="flex w-full flex-1 items-center gap-2 py-1.5">
          <Icon.Leaf className="size-6 w-auto" />
          <span>{appName}</span>
        </div>
      ),
      url: `/${locale}`,
    },
  }
}
