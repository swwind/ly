export type ProvideKey = symbol | string | number;
export type ProvideMap = Map<ProvideKey, any>;

const map: ProvideMap = new Map();

export function provide<T>(key: ProvideKey, value: T) {
  map.set(key, value);
}

export function inject<T>(key: ProvideKey): T | undefined {
  return map.get(key) as T | undefined;
}
