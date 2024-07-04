import type { LoaderStore } from "../server/event.ts";
import { pushState, replaceState, replaceURL } from "./history.ts";
import {
  type Runtime,
  runtimeLoad,
  injectRuntime,
  type RuntimeStatic,
  injectRuntimeStatic,
} from "./runtime.ts";
import { unique } from "../utils/algorithms.ts";
import type { Meta } from "../server/meta.ts";
import type { Params } from "../server/router.ts";
import { fetchLoaders } from "./loader.ts";
import {
  computed,
  createContext,
  inject,
  provide,
  type Computed,
  type Ref,
} from "@swwind/ly";

export type Render = (
  meta: Meta,
  params: Params,
  loaders: LoaderStore,
  components: number[]
) => Promise<void>;

export const RenderContext = createContext<Render>(async () => {});

export function createRender(
  runtime: Ref<Runtime>,
  runtimeStatic: RuntimeStatic
): Render {
  return async (meta, params, loaders, components) => {
    // preload components
    runtime.value = {
      ...runtime.value,
      preloads: unique([
        ...runtime.value.preloads,
        ...components.flatMap((id) => runtimeStatic.graph.components[id]),
      ]),
    };

    // async load modules
    await runtimeLoad(runtimeStatic, components);

    // apply new values
    runtime.value = {
      ...runtime.value,
      meta,
      params,
      loaders,
      components,
    };
  };
}

export function injectRender() {
  return inject(RenderContext);
}

export type Navigate = (target: string | URL) => Promise<void>;

export const NavigateContext = createContext<Navigate>(async () => {});

export function createNavigate(render: Render): Navigate {
  return async function navigate(target) {
    if (typeof target === "string") {
      target = new URL(target, location.href);
    }

    if (target.host !== location.host) {
      open(target);
      return;
    }

    if (
      target.pathname === location.pathname &&
      target.search === location.search
    ) {
      const targetAnchor = decodeURIComponent(target.hash);
      const originAnchor = decodeURIComponent(location.hash);

      // check if is hash update
      if (targetAnchor !== originAnchor && targetAnchor) {
        document
          .getElementById(targetAnchor.slice(1))
          ?.scrollIntoView({ behavior: "smooth" });
        replaceURL(target);
        return;
      }

      // then there is nothing to do
      return;
    }

    // fix pathname
    if (!target.pathname.endsWith("/")) {
      target.pathname += "/";
    }

    try {
      const resp = await fetchLoaders(target);

      if (resp.ok === "loader") {
        replaceState({ position: [scrollX, scrollY] });
        pushState(
          {
            meta: resp.meta,
            params: resp.params,
            loaders: resp.loaders,
            position: [0, 0],
            components: resp.components,
          },
          target
        );
        await render(resp.meta, resp.params, resp.loaders, resp.components);
        if (target.hash) {
          document
            .getElementById(decodeURIComponent(target.hash.slice(1)))
            ?.scrollIntoView({ behavior: "smooth" });
        } else {
          scrollTo(0, 0);
        }
      } else if (resp.ok === "redirect") {
        await navigate(resp.redirect);
      } else if (resp.ok === "error") {
        throw new Error(resp.error);
      } else {
        throw new Error(`Invalid Response`);
      }
    } catch (e) {
      console.error(`Failed to navigate to ${target.href}`);
      console.error(e);
    }
  };
}

export function injectNavigate() {
  return inject(NavigateContext);
}

export function injectLocation(): Computed<URL> {
  const runtime = injectRuntime();
  return computed(() => new URL(runtime.value.location));
}

export function provideNavigation() {
  const runtime = injectRuntime();
  const runtimeStatic = injectRuntimeStatic();

  const render = createRender(runtime, runtimeStatic);
  const navigate = createNavigate(render);

  provide(RenderContext, render);
  provide(NavigateContext, navigate);
}
