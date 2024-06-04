import viteDeno from "https://deno.land/x/vite_deno_plugin@v0.9.4/mod.ts";

export default {
  plugins: [viteDeno()],
  esbuild: {
    jsxFactory: "h",
    jsxInject: "import { h } from './mod.ts'",
  },
};
