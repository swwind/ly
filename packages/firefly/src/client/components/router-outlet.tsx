import { component$, computed, h, type Computed, type VNode } from "@swwind/ly";
import { isDEV } from "../../utils/envs.ts";
import { injectRuntime, injectRuntimeStatic } from "../runtime.ts";

export const RouterOutlet = component$(() => {
  const runtime = injectRuntime();
  const runtimeStatic = injectRuntimeStatic();

  const components = computed(() => runtime.value.components);
  const Layout = component$<{ current: number }>((props) => {
    const currentComponent = computed(() => components.value[props.current]);

    return () => {
      if (currentComponent.value == null) {
        return null;
      }
      const Component = runtimeStatic.components[currentComponent.value];

      if (Component) {
        return (
          <Component>
            <Layout current={props.current + 1} />
          </Component>
        );
      }

      return <Layout current={props.current + 1} />;
    };
  });

  return <Layout current={0} />;
});

export function EntryPoint() {
  const runtime = injectRuntimeStatic();

  // dev specific entry
  if (isDEV) {
    return [
      <script type="module" src={`${runtime.base}@vite/client`} />,
      <script type="module" src={`${runtime.base}src/entry.client.tsx`} />,
    ];
  }

  const src = runtime.base + runtime.graph.assets[runtime.graph.entry[0]];

  return <script type="module" src={src} />;
}
