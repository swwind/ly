// deno-lint-ignore-file no-explicit-any

export type ProvideKey = symbol | string;
export type ProvideMap = Map<ProvideKey, any>;

let currentProvides: ProvideMap | null = null;

export function provideProvides<T>(map: ProvideMap, callback: () => T) {
  const old = currentProvides;
  currentProvides = map;
  try {
    return callback();
  } finally {
    currentProvides = old;
  }
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
