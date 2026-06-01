import { i18nProvider } from "fumadocs-ui/i18n"
import "./global.css"
import { RootProvider } from "fumadocs-ui/provider/next"
import { Inter, JetBrains_Mono } from "next/font/google"
import React from "react"
import SearchDialog from "@/components/search"
import { i18nUI } from "@/lib/layout.shared"

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>
  children: React.ReactNode
}) {
  const paramsResolved = await params
  return (
    <html
      lang={paramsResolved.lang}
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      style={{
        fontFamily: 'var(--font-inter), "PingFang SC", "Microsoft YaHei", system-ui, sans-serif',
      }}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <RootProvider i18n={i18nProvider(i18nUI, paramsResolved.lang)} search={{ SearchDialog }}>
          {children}
        </RootProvider>
        {process.env.NODE_ENV === "production" && (
          <script
            async
            data-domains="www.leafmc.one"
            data-website-id="10d1f4d2-4468-47fa-afe9-68206a082b9f"
            src="https://umami.crashvibe.cn/script.js"
          />
        )}
      </body>
    </html>
  )
}
