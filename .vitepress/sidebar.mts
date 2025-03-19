// import {DefaultTheme} from "vitepress";
// import Sidebar = DefaultTheme.Sidebar;

export default {

    '/docs/': [
        {
            text: "Introduction",
            items: [
                { text: "Getting started", link: "/docs/getting-started" },
                { text: "Frequently Asked Questions", link: "/docs/faq" }
            ]
        },
        {
            text: "Config",
            items: [
                { text: "Leaf global", link: "/docs/config/leaf-global" },
                { text: "Gale global", link: "/docs/config/gale-global" },
                { text: "Gale world defaults", link: "/docs/config/gale-world-defaults" },
                
            ]
        }
    ]

}