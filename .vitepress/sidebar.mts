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
            text: "Benchmarks",
            items: [
                { text: "Entity Performance", link: "/docs/benchmark/entity-performance" },
                { text: "Chunk Generation", link: "/docs/benchmark/chunk-generation" }
            ]
        },
        {
            text: "Config",
            items: [
                { text: "Leaf global", link: "/docs/config/leaf-global" },
                { text: "Gale global", link: "/docs/config/gale-global" },
                { text: "Gale world defaults", link: "/docs/config/gale-world-defaults" },
                { text: "Leaf JVM Flags", link: "/docs/config/system-properties" }
            ]
        },
        {
            text: "How to",
            items: [
                { text: "How to setup Sentry", link: "/docs/how-to/setup-sentry" },
                { text: "Optimize your Leaf Server", link: "/docs/how-to/optimize-leaf-server" },
                { text: "Java Flags for Servers", link: "/docs/how-to/java-flags" }
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
    '/tr/docs/': [
        {
            text: "Giriş",
            items: [
                { text: "Başlarken", link: "/tr/docs" },
                { text: "Sıkça Sorulan Sorular", link: "/tr/docs/faq" },
                { text: "Faydalı Web Siteleri", link: "/tr/docs/useful-sites" }
            ]
        },
        {
            text: "Benchmarks",
            items: [
                { text: "Entity Performansı", link: "/tr/docs/benchmark/entity-performance" },
                { text: "Chunk Üretimi", link: "/tr/docs/benchmark/chunk-generation" }
            ]
        },
        {
            text: "Konfigürasyon",
            items: [
                { text: "Leaf global", link: "/tr/docs/config/leaf-global" },
                { text: "Gale global", link: "/tr/docs/config/gale-global" },
                { text: "Gale dünya varsayılanları", link: "/tr/docs/config/gale-world-defaults" },
                { text: "Leaf JVM Flags", link: "/tr/docs/config/system-properties" }
            ]
        },
        {
            text: "Nasıl Yapılır",
            items: [
                { text: "Sentry nasıl kurulur", link: "/tr/docs/how-to/setup-sentry" },
                { text: "Leaf Sunucunuzu optimize edin", link: "/tr/docs/how-to/optimize-leaf-server" },
                { text: "Sunucular için Java Flags", link: "/tr/docs/how-to/java-flags" }
            ]
        },
        {
            text: "Geliştirme",
            items: [
                { text: "Leaf Geliştirme Rehberi", link: "/tr/docs/dev" },
                { text: "Leaf API", link: "/tr/docs/dev/api" },
                //{ text: "Build", link: "/tr/docs/dev/build" } // TODO
                { text: "🌿 Leaf’e katkıda bulunma", link: "/tr/docs/dev/contributing" }
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
            text: "Benchmarks",
            items: [
                { text: "Entity-Leistung", link: "/de/docs/benchmark/entity-performance" },
                { text: "Chunk-Generierung", link: "/de/docs/benchmark/chunk-generation" }
            ]
        },
        {
            text: "Konfiguration",
            items: [
                { text: "Globale Leaf Konfiguration", link: "/de/docs/config/leaf-global" },
                { text: "Globale Gale Konfiguration", link: "/de/docs/config/gale-global" },
                { text: "Weltspezifische Gale Konfiguration", link: "/de/docs/config/gale-world-defaults" },
                { text: "Leaf JVM Flags", link: "/de/docs/config/system-properties" }
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
            text: "基准测试",
            items: [
                { text: "实体性能", link: "/zh/docs/benchmark/entity-performance" },
                { text: "区块生成", link: "/zh/docs/benchmark/chunk-generation" }
            ]
        },
        {
            text: "配置文件",
            items: [
                { text: "Leaf 全局配置", link: "/zh/docs/config/leaf-global" },
                { text: "Gale 全局配置", link: "/zh/docs/config/gale-global" },
                { text: "Gale 世界配置", link: "/zh/docs/config/gale-world-defaults" },
                { text: "Leaf JVM 参数", link: "/zh/docs/config/system-properties" }
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
    ],
    '/ru/docs/': [
        {
            text: "Введение",
            items: [
                { text: "Начало работы", link: "/ru/docs" },
                { text: "Часто Задаваемые Вопросы", link: "/ru/docs/faq" },
                { text: "Полезные сайты", link: "/ru/docs/useful-sites" }
            ]
        },
        {
            text: "Тесты производительности",
            items: [
                { text: "Производительность сущностей", link: "/ru/docs/benchmark/entity-performance" },
                { text: "Генерация чанков", link: "/ru/docs/benchmark/chunk-generation" }
            ]
        },
        {
            text: "Конфигурация",
            items: [
                { text: "Глобальные настройки Leaf", link: "/ru/docs/config/leaf-global" },
                { text: "Глобальные настройки Gale", link: "/ru/docs/config/gale-global" },
                { text: "Настройки мира по умолчанию (Gale)", link: "/ru/docs/config/gale-world-defaults" },
                { text: "JVM-флаги Leaf", link: "/ru/docs/config/system-properties" }
            ]
        },
        {
            text: "Руководства",
            items: [
                // { text: "Настройка Sentry", link: "/ru/docs/how-to/setup-sentry" }, // TODO
                // { text: "Оптимизация вашего сервера Leaf", link: "/ru/docs/how-to/optimize-leaf-server" }, // TODO
                // { text: "JVM-флаги для серверов", link: "/ru/docs/how-to/java-flags" } // TODO
            ]
        },
        {
            text: "Разработка",
            items: [
                { text: "Руководство по разработке с Leaf", link: "/ru/docs/dev" },
                { text: "Leaf API", link: "/ru/docs/dev/api" },
                //{ text: "Build", link: "/docs/dev/build" } // TODO
                { text: "🌿 Участие в разработке Leaf", link: "/ru/docs/dev/contributing" }
            ]
        }
    ]
}