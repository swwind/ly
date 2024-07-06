# vite 插件

Firefly 的开发和构建依赖于 [vite](https://vite.dev/) 项目。

## 安装

使用你所热爱的包管理工具安装 `@swwind/firefly-vite`。

```sh
npm i -D @swwind/firefly-vite
```

## 配置

创建 `./vite.config.ts`，写入以下内容。

```ts
import { defineConfig } from "vite";
import { firefly, fireflyMdx } from "@swwind/firefly-vite";

export default defineConfig({
  plugins: [firefly(), fireflyMdx({ jsxImportSource: "preact" })],
  build: {
    target: "esnext",
  },
});
```
