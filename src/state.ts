// deno-lint-ignore-file no-explicit-any

import { isDEV, isSSR } from "./flags.ts";
import { LayerElement } from "./layer.ts";
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

class ComputedElement extends LayerElement {}
class RefElement extends ComputedElement {}

function createRef<T>(init: T): Ref<T> {
  let state = init;
  let pending = init;
  let previous = init;

  return new (class extends RefElement {
    get value() {
      current(captures)?._getters.add(this);
      return pending;
    }
    set value(v: T) {
      current(captures)?._setters.add(this);
      if (v !== pending) {
        pending = state;
        enqueueUpdate(this);
      }
    }
    get previous() {
      return previous;
    }
    override update() {
      // skip if nothing changes
      if (state === pending) {
        return false;
      }

      // update states
      previous = state;
      state = pending;
      return true;
    }
  })();
}

function createSSRRef<T>(init: T): Ref<T> {
  return new (class extends RefElement {
    get value() {
      return init;
    }
    set value(_v: T) {
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

  return new (class extends ComputedElement {
    constructor() {
      super();
      setup(this);
      previous = state = pending;
    }
    get value() {
      current(captures)?._getters.add(this);
      return state;
    }
    get previous() {
      return previous;
    }
    override update() {
      clean(this);
      setup(this);

      // skip update if nothing changes
      if (pending === state) {
        return false;
      }

      // update current states
      previous = state;
      state = pending;

      return true;
    }
    override remove() {
      clean(this);
    }
  })();
}

function createSSRComputed<T>(fn: () => T): Computed<T> {
  const state = fn();
  return new (class extends ComputedElement {
    get value() {
      return state;
    }
    get previous() {
      return state;
    }
  })();
}

export type EffectClear = () => void;

function createEffect(fn: () => void | EffectClear) {
  let capture: Capture;
  let clear: void | EffectClear;

  const evaluate = () => {
    if (isDEV) pushd(scopes, "effect");
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

  new (class extends LayerElement {
    constructor() {
      super();
      setup(this);
    }
    override update() {
      clean(this);
      setup(this);
      return true;
    }
    override remove() {
      clean(this);
    }
  })();
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

export function effect(fn: () => void | (() => void)): void {
  if (isSSR) return;
  if (isDEV) assertRecursive("effect");
  createEffect(fn);
}

export function layout(fn: () => void | (() => void)): void {
  if (isSSR) return createSSREffect(fn);
  createEffect(fn);
}

export function isComputed<T>(v: unknown): v is Computed<T> {
  return v instanceof ComputedElement;
}

export function isRef<T>(v: unknown): v is Ref<T> {
  return v instanceof RefElement;
}
