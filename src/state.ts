// deno-lint-ignore-file no-explicit-any

import { type Capture, createCapture, globalCapture } from "./capture.ts";
import { enqueueUpdate } from "./update.ts";
import { createGlobal } from "./utils.ts";

export type Ref<T = any> = { value: T; readonly previous: T };
export type MaybeRef<T> = T | Ref<T>;
export type Computed<T = any> = { readonly value: T; readonly previous: T };
export type MaybeComputed<T> = T | Computed<T>;

export type State = RefState | ComputedState | EffectState;
export type RemovableState = ComputedState | EffectState;

const globalScope = createGlobal<"computed" | "effect">();

function assertRecursive(name: string) {
  const scope = globalScope.current;
  if (scope) {
    throw new TypeError(`Cannot construct ${name} inside ${scope}`);
  }
}

export class RefState<T = any> {
  private _old: T;
  private _state: T;
  private _pending: T;
  _listeners: Set<ComputedState | EffectState> = new Set();

  constructor(init: T) {
    this._old = init;
    this._state = init;
    this._pending = init;
  }

  get value(): T {
    globalCapture.current?._getters.add(this);
    return this._state;
  }

  set value(state: T) {
    globalCapture.current?._setters.add(this);
    if (state !== this._state) {
      this._pending = state;
      enqueueUpdate(this);
    }
  }

  get previous(): T {
    return this._old;
  }

  update(): boolean {
    if (this._state === this._pending) {
      return false;
    }
    this._old = this._state;
    this._state = this._pending;
    return true;
  }

  remove() {}
}

export class ComputedState<T = any> {
  private _fn: () => T;
  private _old: T;
  private _state: T;
  private _capture: Capture;
  _listeners: Set<Computed | EffectState> = new Set();

  constructor(fn: () => T) {
    this._fn = fn;
    this._capture = createCapture();
    const state = this.evaluate();

    // create links
    for (const node of this._capture._getters) {
      node._listeners.add(this);
    }

    this._old = state;
    this._state = state;
  }

  get value(): T {
    globalCapture.current?._getters.add(this);
    return this._state;
  }

  get previous(): T {
    return this._old;
  }

  evaluate(): T {
    return globalScope.with("computed", () =>
      globalCapture.with(this._capture, this._fn)
    );
  }

  update(): boolean {
    // remove old links
    this.remove();

    // capture new deps
    this._capture = createCapture();
    const state = this.evaluate();

    // link to current getters
    for (const node of this._capture._getters) {
      node._listeners.add(this);
    }

    // skip update if nothing changes
    if (state === this._state) {
      return false;
    }

    // update current states
    this._old = this._state;
    this._state = state;

    return true;
  }

  remove() {
    // remove old links
    for (const node of this._capture._getters) {
      node._listeners.delete(this);
    }
  }
}

export class EffectState {
  private _fn: () => void | (() => void);
  private _capture: Capture;
  private _clear: void | (() => void);

  constructor(fn: () => void | (() => void)) {
    this._fn = fn;
    this._capture = createCapture();
    this._clear = this.evaluate();

    for (const node of this._capture._getters) {
      node._listeners.add(this);
    }
  }

  evaluate() {
    return globalScope.with("effect", () =>
      globalCapture.with(this._capture, this._fn)
    );
  }

  update(): void {
    this.remove();

    this._capture = createCapture();
    this._clear = this.evaluate();

    for (const node of this._capture._getters) {
      node._listeners.add(this);
    }
  }

  remove() {
    if (typeof this._clear === "function") {
      this._clear();
    }
    for (const node of this._capture._getters) {
      node._listeners.delete(this);
    }
  }
}

export type States = {
  refs: RefState[];
  computes: ComputedState[];
  effects: EffectState[];
};

export const globalStates = createGlobal<States>();

export function createStates(): States {
  return { refs: [], computes: [], effects: [] };
}

export function ref<T>(): Ref<T | null>;
export function ref<T>(init: T): Ref<T>;
export function ref<T>(init: T = null as T): Ref<T> {
  assertRecursive("ref");
  const state = new RefState(init);
  globalStates.current?.refs.push(state);
  return state;
}

export function computed<T>(fn: () => T): Computed<T> {
  assertRecursive("computed");
  const state = globalScope.with("computed", () => new ComputedState(fn));
  globalStates.current?.computes.push(state);
  return state;
}

export function effect(fn: () => void | (() => void)): void {
  assertRecursive("effect");
  const state = globalScope.with("effect", () => new EffectState(fn));
  globalStates.current?.effects.push(state);
}

export function layout(fn: () => void | (() => void)): void {
  const capture = createCapture();
  globalCapture.with(capture, fn);
}

export function isComputed<T>(v: unknown): v is Computed<T> {
  return v instanceof ComputedState || v instanceof RefState;
}

export function isRef<T>(v: unknown): v is Ref<T> {
  return v instanceof RefState;
}
