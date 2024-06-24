// deno-lint-ignore-file no-explicit-any

import { isDEV, isSSR } from "./flags.ts";
import { LayerElement } from "./layer.ts";
import { Stack, current, popd, pushd } from "./stack.ts";
import { enqueueUpdate } from "./update.ts";

export type Ref<T = any> = { value: T; readonly previous: T };
export type MaybeRef<T> = T | Ref<T>;
export type Computed<T = any> = { readonly value: T; readonly previous: T };
export type MaybeComputed<T> = T | Computed<T>;

export type State = RefState | ComputedState | EffectState;
export type RemovableState = ComputedState | EffectState;

const scopes: Stack<"computed" | "effect"> = [];

function assertRecursive(name: string) {
  const scope = current(scopes);
  if (scope) {
    throw new TypeError(`Cannot construct ${name} inside ${scope}`);
  }
}

export type Capture = {
  _getters: Set<RefState | ComputedState>;
  _setters: Set<RefState>;
};

export const captures: Stack<Capture> = [];

export function createCapture(): Capture {
  return { _getters: new Set(), _setters: new Set() };
}

export class RefState<T = any> extends LayerElement {
  private _old: T;
  private _state: T;
  private _pending: T;

  constructor(init: T) {
    super();

    this._old = init;
    this._state = init;
    this._pending = init;
  }

  get value(): T {
    current(captures)?._getters.add(this);
    return this._state;
  }

  set value(state: T) {
    current(captures)?._setters.add(this);
    if (state !== this._state) {
      this._pending = state;
      enqueueUpdate(this);
    }
  }

  get previous(): T {
    return this._old;
  }

  override update(): boolean {
    // skip if nothing changes
    if (this._state === this._pending) {
      return false;
    }

    // update states
    this._old = this._state;
    this._state = this._pending;
    return true;
  }
}

export class ComputedState<T = any> extends LayerElement {
  private _fn: () => T;
  private _old: T;
  private _state: T;
  private _capture: Capture;

  constructor(fn: () => T) {
    super();
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
    current(captures)?._getters.add(this);
    return this._state;
  }

  get previous(): T {
    return this._old;
  }

  evaluate(): T {
    if (isDEV) pushd(scopes, "computed");
    pushd(captures, this._capture);
    try {
      return this._fn();
    } finally {
      if (isDEV) popd(scopes);
      popd(captures);
    }
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

export class EffectState extends LayerElement {
  private _fn: () => void | (() => void);
  private _capture: Capture;
  private _clear: void | (() => void);

  constructor(fn: () => void | (() => void)) {
    super();
    this._fn = fn;
    this._capture = createCapture();
    this._clear = this.evaluate();

    for (const node of this._capture._getters) {
      node._listeners.add(this);
    }
  }

  evaluate() {
    if (isDEV) pushd(scopes, "effect");
    pushd(captures, this._capture);
    try {
      return this._fn();
    } finally {
      if (isDEV) popd(scopes);
      popd(captures);
    }
  }

  override update(): boolean {
    this.remove();

    this._capture = createCapture();
    this._clear = this.evaluate();

    for (const node of this._capture._getters) {
      node._listeners.add(this);
    }

    return true;
  }

  override remove() {
    if (typeof this._clear === "function") {
      this._clear();
    }
    for (const node of this._capture._getters) {
      node._listeners.delete(this);
    }
  }
}

export function ref<T>(): Ref<T | null>;
export function ref<T>(init: T): Ref<T>;
export function ref<T>(init: T = null as T): Ref<T> {
  if (isDEV) assertRecursive("ref");
  return new RefState(init);
}

export function computed<T>(fn: () => T): Computed<T> {
  if (isDEV) assertRecursive("computed");
  return new ComputedState(fn);
}

export function effect(fn: () => void | (() => void)): void {
  if (isSSR) return;
  if (isDEV) assertRecursive("effect");
  new EffectState(fn);
}

export function layout(fn: () => void | (() => void)): void {
  new EffectState(fn);
}

export function isComputed<T>(v: unknown): v is Computed<T> {
  return v instanceof ComputedState || v instanceof RefState;
}

export function isRef<T>(v: unknown): v is Ref<T> {
  return v instanceof RefState;
}
