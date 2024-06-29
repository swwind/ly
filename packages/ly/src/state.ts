// deno-lint-ignore-file no-explicit-any

import { isDEV, isSSR } from "./flags.ts";
import { LayerElement, createLayerElement } from "./layer.ts";
import { Stack, current, popd, pushd } from "./stack.ts";
import { enqueueUpdate } from "./update.ts";

export type Ref<T = any> = { value: T; readonly previous: T };
export type MaybeRef<T> = T | Ref<T>;
export type Computed<T = any> = { readonly value: T; readonly previous: T };
export type MaybeComputed<T> = T | Computed<T>;

export type State = LayerElement;

const scopes: Stack<"computed" | "effect"> = [];

function assertRecursive(name: string) {
  const scope = current(scopes);
  if (scope) {
    throw new TypeError(`Cannot construct ${name} inside ${scope}`);
  }
}

export type Capture = {
  _getters: Set<LayerElement>;
  _setters: Set<LayerElement>;
};

export const captures: Stack<Capture> = [];

export function createCapture(): Capture {
  return { _getters: new Set(), _setters: new Set() };
}

class ComputedClass {}
class RefClass extends ComputedClass {}

function createRef<T>(init: T): Ref<T> {
  let state = init;
  let pending = init;
  let previous = init;

  const elem = createLayerElement({
    update() {
      // skip if nothing changes
      if (state === pending) {
        return false;
      }

      // update states
      previous = state;
      state = pending;
      return true;
    },
  });

  return new (class extends RefClass {
    get value() {
      current(captures)?._getters.add(elem);
      return pending;
    }
    set value(v: T) {
      current(captures)?._setters.add(elem);
      if (v !== pending) {
        pending = v;
        enqueueUpdate(elem);
      }
    }
    get previous() {
      return previous;
    }
  })();
}

function createSSRRef<T>(init: T): Ref<T> {
  return new (class extends RefClass {
    get value() {
      return init;
    }
    set value(_: T) {
      throw new Error("Cannot set ref in SSR mode");
    }
    get previous() {
      return init;
    }
  })();
}

function createComputed<T>(fn: () => T): Computed<T> {
  let capture: Capture;
  let state: T;
  let pending: T;
  let previous: T;

  const evaluate = () => {
    if (isDEV) pushd(scopes, "computed");
    pushd(captures, capture);
    try {
      return fn();
    } finally {
      if (isDEV) popd(scopes);
      popd(captures);
    }
  };
  const setup = (self: LayerElement) => {
    capture = createCapture();
    pending = evaluate();
    for (const node of capture._getters) {
      node.listeners.add(self);
    }
  };
  const clean = (self: LayerElement) => {
    for (const node of capture._getters) {
      node.listeners.delete(self);
    }
  };

  const elem = createLayerElement({
    update() {
      clean(elem);
      setup(elem);

      // skip update if nothing changes
      if (pending === state) {
        return false;
      }

      // update current states
      previous = state;
      state = pending;

      return true;
    },
    remove() {
      clean(elem);
    },
  });

  setup(elem);
  previous = state = pending!;

  return new (class extends ComputedClass {
    get value() {
      current(captures)?._getters.add(elem);
      return state;
    }
    get previous() {
      return previous;
    }
  })();
}

function createSSRComputed<T>(fn: () => T): Computed<T> {
  const state = fn();

  return new (class extends ComputedClass {
    get value() {
      return state;
    }
    get previous() {
      return state;
    }
  })();
}

export type EffectClear = () => void;

function createEffect(fn: () => void | EffectClear, layout = false) {
  let capture: Capture;
  let clear: void | EffectClear;

  const evaluate = () => {
    if (isDEV && !layout) pushd(scopes, "effect");
    pushd(captures, capture);
    try {
      return fn();
    } finally {
      if (isDEV && !layout) popd(scopes);
      popd(captures);
    }
  };
  const setup = (self: LayerElement) => {
    capture = createCapture();
    clear = evaluate();
    for (const node of capture._getters) {
      node.listeners.add(self);
    }
  };
  const clean = (self: LayerElement) => {
    if (typeof clear === "function") clear();
    for (const node of capture._getters) {
      node.listeners.delete(self);
    }
  };

  const elem = createLayerElement({
    update() {
      clean(elem);
      setup(elem);
      return true;
    },
    remove() {
      clean(elem);
    },
  });

  setup(elem);
}

function createSSREffect(fn: () => void | EffectClear) {
  fn();
}

export function ref<T>(): Ref<T | null>;
export function ref<T>(init: T): Ref<T>;
export function ref<T>(init: T = null as T): Ref<T> {
  if (isSSR) return createSSRRef(init);
  if (isDEV) assertRecursive("ref");
  return createRef(init);
}

export function computed<T>(fn: () => T): Computed<T> {
  if (isSSR) return createSSRComputed(fn);
  if (isDEV) assertRecursive("computed");
  return createComputed(fn);
}

export function effect(fn: () => void | EffectClear): void {
  if (isSSR) return;
  if (isDEV) assertRecursive("effect");
  createEffect(fn);
}

export function layout(fn: () => void | EffectClear): void {
  if (isSSR) return createSSREffect(fn);
  createEffect(fn, true);
}

export function isComputed<T>(v: unknown): v is Computed<T> {
  return v instanceof ComputedClass;
}

export function isRef<T>(v: unknown): v is Ref<T> {
  return v instanceof RefClass;
}
