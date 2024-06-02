// deno-lint-ignore-file no-explicit-any

export type RuntimeContext = {
  dependencies: Set<GraphNode> | null;
  dirtyNodes: Set<GraphNode>;
  queueUpdate: boolean;
};

export const context: RuntimeContext = {
  dependencies: null,
  dirtyNodes: new Set(),
  queueUpdate: false,
};

export class GraphNode {
  _dirty = 0;
  _dests = new Set<GraphNode>();

  _update() {}
  _remove() {}
}

export type Callback<T> = (t: T) => void;
export type Unsubscribe = () => void;

export class ValueNode<T = any> extends GraphNode {
  _state: T;
  _callbacks = new Set<Callback<T>>();

  constructor(initial: T) {
    super();
    this._state = initial;
  }

  get value(): T {
    context.dependencies?.add(this);
    return this._state;
  }

  _subscribe(fn: Callback<T>): Unsubscribe {
    fn(this._state);
    this._callbacks.add(fn);
    return () => {
      this._callbacks.delete(fn);
    };
  }

  override _update(): void {
    for (const callback of this._callbacks) {
      callback(this._state);
    }
  }
}

export class RefNode<T = any> extends ValueNode<T> {
  constructor(initial: T) {
    super(initial);
  }

  get value(): T {
    return super.value;
  }

  set value(state: T) {
    if (state !== this._state) {
      context.dirtyNodes.add(this);
      this._state = state;
      enqueueUpdate();
    }
  }
}

export class ComputedNode<T = any> extends ValueNode<T> {
  private _compute: () => T;
  private _sources: Set<GraphNode>;

  constructor(compute: () => T) {
    const [state, sources] = capture(compute);
    super(state);
    this._compute = compute;
    this._sources = sources;
    for (const node of sources) {
      node._dests.add(this);
    }
  }

  get value(): T {
    return super.value;
  }

  override _update(): void {
    for (const node of this._sources) {
      node._dests.delete(this);
    }
    const [state, sources] = capture(this._compute);
    this._state = state;
    this._sources = sources;
    for (const node of sources) {
      node._dests.add(this);
    }
    super._update();
  }

  override _remove(): void {
    for (const node of this._sources) {
      node._dests.delete(this);
    }
  }
}

export type EffectClearFunction = () => void;
export type EffectFunction = () => EffectClearFunction | void;

export class EffectNode extends GraphNode {
  private _clear: ReturnType<EffectFunction>;
  private _effect: EffectFunction;
  private _sources: Set<GraphNode>;

  constructor(effect: EffectFunction) {
    super();

    this._effect = effect;

    const [clear, sources] = capture(effect);
    this._clear = clear;
    this._sources = sources;
    for (const node of sources) {
      node._dests.add(this);
    }
  }

  override _update(): void {
    if (typeof this._clear === "function") {
      (0, this._clear)();
    }
    for (const node of this._sources) {
      node._dests.delete(this);
    }

    const [clear, sources] = capture(this._effect);
    this._clear = clear;
    this._sources = sources;
    for (const node of sources) {
      node._dests.add(this);
    }
  }

  override _remove(): void {
    if (typeof this._clear === "function") {
      (0, this._clear)();
    }
    for (const node of this._sources) {
      node._dests.delete(this);
    }
  }
}

export interface Ref<T = any> {
  value: T;
}

export interface Computed<T = any> {
  readonly value: T;
}

export function ref<T>(): Ref<T | null>;
export function ref<T>(t: T): Ref<T>;
export function ref<T>(t: T = null as T): Ref<T> {
  return new RefNode(t);
}

export function computed<T>(fn: () => T): Computed<T> {
  return new ComputedNode(fn);
}

export function effect(fn: EffectFunction): void {
  new EffectNode(fn);
}

function update() {
  context.queueUpdate = false;

  while (context.dirtyNodes.size > 0) {
    const queue: GraphNode[] = [...context.dirtyNodes];
    context.dirtyNodes = new Set();

    const mark = (node: GraphNode) => {
      if (!node._dirty++) {
        for (const dest of node._dests) {
          mark(dest);
        }
      }
    };
    for (const node of queue) {
      mark(node);
    }

    while (queue.length > 0) {
      const node = queue.shift()!;
      node._update();
      for (const dest of node._dests) {
        if (!--dest._dirty) {
          queue.push(dest);
        }
      }
    }
  }
}

function enqueueUpdate() {
  if (!context.queueUpdate) {
    context.queueUpdate = true;
    setTimeout(() => update());
  }
}

function capture<T>(fn: () => T) {
  context.dependencies = new Set();
  const value = fn();
  const states = context.dependencies;
  context.dependencies = null;
  return [value, states] as [T, Set<GraphNode>];
}

export function take<T>(ref: Ref<T> | Computed<T>) {
  const deps = context.dependencies;
  context.dependencies = null;
  const value = ref.value;
  context.dependencies = deps;
  return value;
}
