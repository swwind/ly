import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ly",
  description: "Yet another frontend framework",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "文档", link: "/components" },
    ],

    sidebar: [
      {
        text: "文档",
        items: [
          { text: "组件系统", link: "/components" },
          { text: "信号系统", link: "/signals" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/swwind/ly" }],
  },
});
