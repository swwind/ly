import { defineConfig } from "vite";
import { firefly, fireflyMdx } from "@swwind/firefly-vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    firefly(),
    tsconfigPaths(),
    fireflyMdx({ jsxImportSource: "preact" }),
  ],
});
