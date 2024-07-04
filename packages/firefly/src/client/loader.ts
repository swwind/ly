import { computed } from "@swwind/ly";
import type { LoaderHandler, LoaderReturnValue } from "../server/loader.ts";
import type { LoaderResponse } from "../server/router.ts";
import { injectRuntime } from "./runtime.ts";

export async function fetchLoaders(url: string | URL) {
  const target = new URL(url);
  if (!target.pathname.endsWith("/")) {
    target.pathname += "/";
  }
  target.hash = "";
  target.pathname += "_data.json";
  const response = await fetch(target);
  return (await response.json()) as LoaderResponse;
}

export function injectLoader<T extends LoaderReturnValue>(
  ref: string
): LoaderHandler<T> {
  const runtime = injectRuntime();
  return computed(() => {
    const loaders = runtime.value.loaders.find((item) => item[0] === ref);
    if (!loaders) {
      throw new Error(`Loader not found: "${ref}"`);
    }
    return loaders[1] as T;
  });
}
