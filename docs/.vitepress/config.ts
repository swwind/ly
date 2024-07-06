import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ly",
  description: "Yet another frontend framework",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "介绍", link: "/introduction" },
    ],

    sidebar: [
      {
        text: "总览",
        items: [{ text: "介绍", link: "/introduction" }],
      },
      {
        text: "Ly",
        items: [
          { text: "介绍", link: "/ly/introduction" },
          { text: "组件系统", link: "/ly/components" },
          { text: "信号系统", link: "/ly/signals" },
        ],
      },
      {
        text: "Firefly",
        items: [{ text: "介绍", link: "/firefly/introduction" }],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/swwind/ly" }],
  },
});
