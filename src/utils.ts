export const isArray = Array.isArray;

export type MaybeArray<T> = T | Array<T>;

export function toArray<T>(arr: T | T[]): T[] {
  return isArray(arr) ? arr : [arr];
}

export function createGlobal<T>() {
  let value: T | null = null;
  return {
    get current() {
      return value;
    },
    with<R>(v: T, callback: () => R) {
      const old = value;
      value = v;
      try {
        return callback();
      } finally {
        value = old;
      }
    },
  };
}

export function isString(x: unknown): x is string {
  return typeof x === "string";
}

export function isNumber(x: unknown): x is number {
  return typeof x === "number";
}
