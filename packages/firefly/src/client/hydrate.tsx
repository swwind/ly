import { type VNode } from "@swwind/ly";
import { hydrate as _hydrate } from "@swwind/ly/browser";
import {
  createRuntime,
  provideRuntime,
  runtimeLoad,
  type Runtime,
  type RuntimeStatic,
} from "./runtime.ts";
import type { SerializedRuntime } from "./components/router-head.tsx";
import type { ClientManifest } from "../server/build.ts";
import { isDEV } from "../utils/envs.ts";

export type Options = {
  manifest: ClientManifest;
};

export async function hydrate(vnode: VNode, { manifest }: Options) {
  const [runtime, runtimeStatic] = await createClientRuntime(manifest);

  // fix for https://github.com/vitejs/vite/issues/15765
  let injections: NodeListOf<HTMLStyleElement> | null = null;
  if (isDEV) {
    injections = document.head.querySelectorAll("style[data-vite-dev-id]");
  }

  provideRuntime(runtime, runtimeStatic);

  _hydrate(vnode, document, document.documentElement);

  if (isDEV && injections) {
    injections.forEach((element) => document.head.appendChild(element));
  }
}

async function createClientRuntime(
  manifest: ClientManifest
): Promise<[Runtime, RuntimeStatic]> {
  const element = document.querySelector("script[data-firefly-metadata]");
  if (!element || !element.textContent)
    throw new Error("Can't find SSR hydrate data");
  const json = JSON.parse(element.textContent) as SerializedRuntime;

  const [runtime, runtimeStatic] = createRuntime(
    json.meta,
    json.base,
    json.graph,
    json.params,
    json.loaders,
    manifest,
    new URL(location.href),
    json.components
  );
  await runtimeLoad(runtimeStatic, json.components);

  return [runtime, runtimeStatic];
}
