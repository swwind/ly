import { type MaybeComputed, isComputed } from "./state.ts";

export const isArray = Array.isArray;

export type MaybeArray<T> = T | Array<T>;

export function toArray<T>(arr: T | T[]): T[] {
  return isArray(arr) ? arr : [arr];
}

export function createStack<T>() {
  const stack: T[] = [];
  return {
    get current() {
      return stack.at(-1);
    },
    pushd(v: T) {
      stack.push(v);
    },
    popd() {
      stack.pop();
    },
  };
}

export function isString(x: unknown): x is string {
  return typeof x === "string";
}

export function isNumber(x: unknown): x is number {
  return typeof x === "number";
}

export function valueOf<T>(x: MaybeComputed<T>): T {
  return isComputed(x) ? x.value : x;
}
