import type { LoaderStore } from "../server/event.ts";
import { injectRender } from "./navigate.ts";
import { injectRuntime } from "./runtime.ts";
import type { Meta } from "../server/meta.ts";
import type { Params } from "../server/router.ts";
import { effect } from "@swwind/ly";

/**
 * 古希腊掌管历史记录的神
 */
export type HistoryState = {
  meta: Meta;
  params: Params;
  loaders: LoaderStore;
  position: [number, number];
  components: number[];
};

let currentTimeout: number | null = null;
// fix: too many calls to history API when scrolling
function slowdown(fn: () => void, timeout = 500) {
  if (currentTimeout !== null) {
    clearTimeout(currentTimeout);
  }
  currentTimeout = setTimeout(fn, timeout);
}

export function replaceState(state: Partial<HistoryState>) {
  history.replaceState({ ...history.state, ...state }, "");
}

export function replaceURL(url: string | URL) {
  history.replaceState(history.state, "", url);
}

export function pushState(state: HistoryState, url: string | URL) {
  history.pushState(state, "", url);
}

export function provideHistoryStore() {
  const runtime = injectRuntime();
  const render = injectRender();

  // listen runtime update
  effect(() => {
    replaceState({
      meta: runtime.value.meta,
      params: runtime.value.params,
      loaders: runtime.value.loaders,
      position: [scrollX, scrollY],
      components: runtime.value.components,
    });
  });

  // add popstate callback
  effect(() => {
    async function popstate(e: PopStateEvent) {
      const state = e.state as HistoryState;
      await render(state.meta, state.params, state.loaders, state.components);
      scrollTo(state.position[0], state.position[1]);
    }

    function scroll() {
      slowdown(() => {
        replaceState({ position: [scrollX, scrollY] });
      });
    }

    addEventListener("popstate", popstate);
    addEventListener("scroll", scroll);

    return () => {
      removeEventListener("popstate", popstate);
      removeEventListener("scroll", scroll);
    };
  });
}
