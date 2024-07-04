import { component$, h, type VNode } from "@swwind/ly";
import { isDEV } from "../../utils/envs.ts";
import { injectRuntime, injectRuntimeStatic } from "../runtime.ts";

export const RouterOutlet = component$(() => {
  const runtime = injectRuntime();
  const { components } = injectRuntimeStatic();

  return () => {
    const ids = runtime.value.components.toReversed();
    let node: VNode | null = null;
    for (const component of ids.map((x) => components[x])) {
      node = h(component, null, node);
    }
    return node;
  };
});

export function EntryPoint() {
  const runtime = injectRuntimeStatic();

  // dev specific entry
  if (isDEV) {
    return [
      <script type="module" src={`${runtime.base}@vite/client`} />,
      <script type="module" src={`${runtime.base}app/entry.client.tsx`} />,
    ];
  }

  const src = runtime.base + runtime.graph.assets[runtime.graph.entry[0]];

  return <script type="module" src={src} />;
}
