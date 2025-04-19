// import {DefaultTheme} from "vitepress";
// import Sidebar = DefaultTheme.Sidebar;

export default {

    '/docs/': [
        {
            text: "Introduction",
            items: [
                { text: "Getting started", link: "/docs" },
                { text: "Frequently Asked Questions", link: "/docs/faq" },
                { text: "Useful Websites", link: "/docs/useful-sites" }
            ]
        },
        {
            text: "Config",
            items: [
                { text: "Leaf global", link: "/docs/config/leaf-global" },
                { text: "Gale global", link: "/docs/config/gale-global" },
                { text: "Gale world defaults", link: "/docs/config/gale-world-defaults" }
            ]
        },
        {
            text: "How to",
            items: [
                { text: "How to setup Sentry", link: "/docs/how-to/setup-sentry" },
				{ text: "Optimize your Leaf Server", link: "/docs/how-to/optimize-leaf-server" }
            ]
        },
        {
            text: "Development",
            items: [
                { text: "Leaf Development Guide", link: "/docs/dev" },
                { text: "Leaf API", link: "/docs/dev/api" },
                //{ text: "Build", link: "/docs/dev/build" } // TODO
                { text: "🌿 Contributing to Leaf", link: "/docs/dev/contributing" }
            ]
        }
    ],
    '/de/docs/': [
        {
            text: "Einführung",
            items: [
                { text: "Erste Schritte", link: "/de/docs" },
                { text: "Häufig gestellte Fragen", link: "/de/docs/faq" },
                { text: "Nützliche Webseiten", link: "/de/docs/useful-sites" }
            ]
        },
        {
            text: "Konfiguration",
            items: [
                { text: "Globale Leaf-Konfiguration", link: "/de/docs/config/leaf-global" },
                { text: "Globale Leaf-Konfiguration", link: "/de/docs/config/gale-global" },
                { text: "Gale Weltkonfiguration", link: "/de/docs/config/gale-world-defaults" }
            ]
        },
        {
            text: "Anleitungen",
            items: [
                { text: "Sentry einrichten", link: "/de/docs/how-to/setup-sentry" } // TODO
            ]
        },
        {
            text: "Entwicklung",
            items: [
                { text: "Leaf Entwicklungshandbuch", link: "/de/docs/dev" },
                { text: "Leaf API", link: "/de/docs/dev/api" },
                //{ text: "Bauen", link: "/de/docs/dev/build" } // TODO
                { text: "🌿 Beitrag zu Leaf leisten", link: "/de/docs/dev/contributing" }
            ]
        }
    ],
    '/zh/docs/': [
        {
            text: "介绍",
            items: [
                { text: "开始", link: "/zh/docs" },
                { text: "常见问题与解答", link: "/zh/docs/faq" },
                { text: "有用的网站", link: "/zh/docs/useful-sites" }
            ]
        },
        {
            text: "配置文件",
            items: [
                { text: "Leaf 全局配置", link: "/zh/docs/config/leaf-global" },
                { text: "Gale 全局配置", link: "/zh/docs/config/gale-global" },
                { text: "Gale 世界配置", link: "/zh/docs/config/gale-world-defaults" }
            ]
        },
        {
            text: "教程",
            items: [
                //{ text: "配置 Sentry", link: "/zh/docs/how-to/setup-sentry" } // TODO
            ]
        },
        {
            text: "开发",
            items: [
                { text: "Leaf 开发指南", link: "/zh/docs/dev" },
                { text: "Leaf API", link: "/zh/docs/dev/api" },
                //{ text: "构建", link: "/zh/docs/dev/build" } // TODO
                { text: "🌿 贡献", link: "/zh/docs/dev/contributing" }
            ]
        }
    ]
}
