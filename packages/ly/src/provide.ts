export type Context<T> = { current: T };

export function createContext<T>(): Context<T | null>;
export function createContext<T>(init: T): Context<T>;
export function createContext<T>(init: T = null as T): Context<T> {
  return { current: init };
}

export function provide<T>(context: Context<T>, value: T) {
  context.current = value;
}

export function inject<T>(context: Context<T>): T {
  return context.current;
}
