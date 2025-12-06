import { defineConfig } from "vitepress";
import sidebar from "./sidebar.mjs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Leaf",
    description: "Performant fork of Paper",
    head: [["link", { rel: "icon", href: "/logo.svg" }]],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern-compiler"
                }
            }
        }
    },

    srcDir: "./pages",
    appearance: "force-dark",
    cleanUrls: true,

    locales: {
        root: {
            label: "English",
            lang: "en",
            // English navigation
            themeConfig: {
                nav: [
                    { text: "Home", link: "/" },
                    { text: "Download", link: "/download" },
                    { text: "Docs", link: "/docs/getting-started", activeMatch: "/docs/getting-started" }
                ]
            }
        },
        tr: {
            label: "Türkçe",
            lang: "tr",
            // Türkçe navigasyon
            themeConfig: {
                nav: [
                    { text: "Ana Sayfa", link: "/tr/" },
                    { text: "İndir", link: "/tr/download" },
                    { text: "Dokümantasyon", link: "/tr/docs/getting-started", activeMatch: "/tr/docs/getting-started" }
                ]
            }
        },
        de: {
            label: "Deutsch",
            lang: "de",
            // German navigation
            themeConfig: {
                nav: [
                    { text: "Startseite", link: "/de/" },
                    { text: "Herunterladen", link: "/de/download" },
                    { text: "Dokumentation", link: "/de/docs/getting-started", activeMatch: "/de/docs/getting-started" }
                ]
            }
        },
        pt: {
            label: "Português",
            lang: "pt",
            // Portuguese navigation
            themeConfig: {
                nav: [
                    { text: "Início", link: "/pt/" },
                    { text: "Baixar", link: "/pt/download" },
                    { text: "Documentação", link: "/pt/docs/getting-started", activeMatch: "/pt/docs/getting-started" }
                ]
            }
        },
        ru: {
            label: "Русский",
            lang: "ru",
            // Russian navigation
            themeConfig: {
                nav: [
                    { text: "Главная", link: "/ru/" },
                    { text: "Скачать", link: "/ru/download" },
                    { text: "Документация", link: "/ru/docs/getting-started", activeMatch: "/ru/docs/getting-started" }
                ]
            }
        },
        zh: {
            label: "简体中文",
            lang: "zh",
            // Chinese navigation
            themeConfig: {
                nav: [
                    { text: "首页", link: "/zh/" },
                    { text: "下载", link: "/zh/download" },
                    { text: "文档", link: "/zh/docs/getting-started", activeMatch: "/zh/docs/getting-started" }
                ]
            }
        }
    },

    themeConfig: {
        logo: "/logo.svg",

        // Default navigation (will be overridden by locale-specific navigation)
        nav: [
            { text: "Home", link: "/" },
            { text: "Download", link: "/download" },
            { text: "Docs", link: "/docs/getting-started", activeMatch: "/docs/getting-started" }
        ],

        sidebar,

        socialLinks: [
            { icon: "github", link: "https://github.com/Winds-Studio/Leaf" },
            { icon: "discord", link: "https://discord.gg/gfgAwdSEuM" }
        ]
    }
});
