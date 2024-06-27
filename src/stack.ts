import { JSX } from "./jsx-runtime.ts";

export type Stack<T> = Array<T>;

export function pushd<T>(stack: Stack<T>, item: T) {
  stack.push(item);
}

export function current<T>(stack: Stack<T>): T | null {
  return stack.length > 0 ? stack[stack.length - 1] : null;
}

export function popd<T>(stack: Stack<T>) {
  stack.pop();
}

export function withd<T, R>(stack: Stack<T>, item: T, fn: () => R) {
  pushd(stack, item);
  try {
    return fn();
  } finally {
    popd(stack);
  }
}
