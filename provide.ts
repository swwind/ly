// deno-lint-ignore-file no-explicit-any

export type ProvideKey = symbol | string;

let currentProvides: Map<ProvideKey, any> | null = null;

export function startProvide(map: Map<ProvideKey, any>) {
  currentProvides = map;
}

export function endProvide(): Map<ProvideKey, any> {
  const provides = currentProvides;
  currentProvides = null;
  return provides as Map<ProvideKey, any>;
}

export function provide<T>(key: ProvideKey, value: T) {
  if (!currentProvides) {
    throw new Error("Please use provide() in setup function.");
  }

  currentProvides.set(key, value);
}

export function inject<T>(key: ProvideKey): T | undefined;
export function inject<T>(key: ProvideKey, fallback: T): T;
export function inject<T>(key: ProvideKey, fallback?: T): T | undefined {
  if (!currentProvides) {
    throw new Error("Please use inject() in setup function.");
  }

  if (!currentProvides.has(key)) {
    return fallback;
  }

  return currentProvides.get(key);
}
