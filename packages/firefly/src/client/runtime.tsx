import type { FetchEvent, LoaderStore } from "../server/event.ts";
import type { ClientManifest, Graph, ServerManifest } from "../server/build.ts";
import { unique } from "../utils/algorithms.ts";
import type { Meta } from "../server/meta.ts";
import type { Params } from "../server/router.ts";
import {
  createContext,
  inject,
  provide,
  ref,
  type ComponentType,
  type Ref,
} from "@swwind/ly";

export type Runtime = {
  meta: Meta;
  params: Params;
  loaders: LoaderStore;
  location: URL;
  preloads: number[];
  components: number[];
};

export type RuntimeStatic = {
  base: string;
  graph: Graph;
  components: (ComponentType | null)[];
};

export function createRuntime(
  meta: Meta,
  base: string,
  graph: Graph,
  params: Params,
  loaders: LoaderStore,
  manifest: ClientManifest,
  location: URL,
  components: number[]
): [Runtime, RuntimeStatic] {
  const preloads = unique([
    ...graph.entry,
    ...components.flatMap((id) => graph.components[id]),
  ]);

  return [
    { meta, params, loaders, location, preloads, components },
    { base, graph, components: manifest.components },
  ];
}

export function createServerRuntime(
  manifest: ServerManifest,
  event: FetchEvent
) {
  return createRuntime(
    event.metas,
    manifest.base,
    manifest.graph,
    event.params,
    event.loaders,
    manifest,
    event.url,
    event.components
  );
}

export async function runtimeLoad(
  runtime: RuntimeStatic,
  components: number[]
) {
  await Promise.all(
    components
      .filter((id) => !runtime.components[id])
      .map(async (id) => {
        const path =
          runtime.base + runtime.graph.assets[runtime.graph.components[id][0]];
        const component = (await import(/* @vite-ignore */ path).then(
          (module) => module.default
        )) as ComponentType;
        runtime.components[id] = component;
      })
  );
}

export const RuntimeContext = createContext<Ref<Runtime>>();
export const RuntimeStaticContext = createContext<RuntimeStatic>();

export function provideRuntime(runtime: Runtime, runtimeStatic: RuntimeStatic) {
  provide(RuntimeContext, ref(runtime));
  provide(RuntimeStaticContext, runtimeStatic);
}

export function injectRuntime() {
  const runtime = inject(RuntimeContext);
  if (!runtime)
    throw new Error("Please nest your project inside <FireflyProvider />");
  return runtime;
}

export function injectRuntimeStatic() {
  const runtime = inject(RuntimeStaticContext);
  if (!runtime)
    throw new Error("Please nest your project inside <FireflyProvider />");
  return runtime;
}
