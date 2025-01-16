import type { DefaultTheme } from "vitepress";

export const sidebar_en = [
  {
    text: "Welcome to Leaf Docs",
    link: "/pages/en/about",
  },
  {
    text: "To Do",
    link: "/pages/en/todo",
  },
  // Development
  {
    text: "Development",
    link: "/pages/en/dev/",
    items: [
      { text: "Leaf API", link: "/pages/en/dev/api" },
      {
        text: "Building",
        link: "/pages/en/dev/build",
      },
      {
        text: "Contributing to Leaf",
        link: "/pages/en/dev/contributing",
      },
    ],
  },
  // How-to
  {
    text: "How To",
    items: [
      { text: "Configure Sentry", link: "/pages/en/how-to/setup-sentry" },
    ],
  },
  // Reference
  {
    text: "Reference",
    link: "/pages/en/reference/",
    items: [
      // FAQ, index, system-properties, config (gale-global, gale-world, index, leaf-global, misc-config)
      { text: "FAQ", link: "/pages/en/reference/faq" },
      {
        text: "System Properties",
        link: "/pages/en/reference/system-properties",
      },
      {
        text: "Configuration",
        link: "/pages/en/reference/config/",
        items: [
          {
            text: "Gale Global Configuration",
            link: "/pages/en/reference/config/gale-global",
          },
          {
            text: "Gale World Configuration",
            link: "/pages/en/reference/config/gale-world",
          },
          {
            text: "Leaf Global Configuration",
            link: "/pages/en/reference/config/leaf-global",
          },
          {
            text: "Other Configurations",
            link: "/pages/en/reference/config/misc-config",
          },
        ],
      },
    ],
  },
];

export const enConfig: DefaultTheme.Config = {
  sidebar: sidebar_en,
  nav: [
    { text: "Home", link: "/" },
    { text: "Build History", link: "/builds" },
  ],
};
