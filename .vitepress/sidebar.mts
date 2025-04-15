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
                //{ text: "How to setup Sentry", link: "/docs/how-to/setup-sentry" } // TODO
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
    ]
}