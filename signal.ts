// deno-lint-ignore-file no-explicit-any

const isSSR = false;

export type Node = {
  _type: "ref" | "computed" | "effect";
  _dirty: number;
  _dsts: Set<Node>;
  _update(): void;
  _remove?(): void;
};

export type RuntimeContext = {
  dependencies: Set<Node> | null;
  dirtyNodes: Set<Node>;
  queueUpdate: boolean;
};

export const context: RuntimeContext = {
  dependencies: null,
  dirtyNodes: new Set(),
  queueUpdate: false,
};

export type Ref<T = any> = {
  value: T;
};

export type Computed<T = any> = {
  readonly value: T;
};

export type RefExt<T = any> = {
  _subscribe(fn: (t: T) => void): void;
  _unsubscribe(fn: (t: T) => void): void;
};

export function isRef<T>(ref: unknown): ref is Ref<T> {
  return (
    typeof ref === "object" &&
    ref !== null &&
    "_type" in ref &&
    ref._type === "ref"
  );
}

function update() {
  context.queueUpdate = false;

  while (context.dirtyNodes.size > 0) {
    const dirtyNodes = context.dirtyNodes;
    context.dirtyNodes = new Set();

    const queue: Node[] = [];
    const enqueue = (node: Node) => {
      queue.push(node);
      for (const to of node._dsts) {
        ++to._dirty;
      }
    };

    dirtyNodes.forEach((node) => enqueue(node));

    while (queue.length > 0) {
      const node = queue.shift()!;
      node._update();
      for (const to of node._dsts) {
        if (!--to._dirty) {
          enqueue(to);
        }
      }
    }
  }
}

function enqueueUpdate() {
  if (!context.queueUpdate) {
    context.queueUpdate = true;
    setTimeout(() => {
      update();
    });
  }
}

function capture<T>(fn: () => T) {
  context.dependencies = new Set();
  const value = fn();
  const states = context.dependencies;
  context.dependencies = null;
  return [value, states] as [T, Set<Node>];
}

export function take<T>(ref: Ref<T> | Computed<T>) {
  const deps = context.dependencies;
  context.dependencies = null;
  const value = ref.value;
  context.dependencies = deps;
  return value;
}

export function ref<T>(): Ref<T | null>;
export function ref<T>(t: T): Ref<T>;
export function ref<T>(t: T = null as T): Ref<T> {
  let state = t;
  const callbacks = new Set<(t: T) => void>();

  const signal: Ref<T> & Node & RefExt<T> = {
    get value(): T {
      context.dependencies?.add(signal);
      return state;
    },
    set value(t: T) {
      if (state !== t) {
        state = t;
        context.dirtyNodes.add(signal);
        enqueueUpdate();
      }
    },
    _type: "ref",
    _dirty: 0,
    _dsts: new Set(),
    _update() {
      for (const callback of callbacks) {
        callback(state);
      }
    },
    _subscribe(fn) {
      callbacks.add(fn);
    },
    _unsubscribe(fn) {
      callbacks.delete(fn);
    },
  };
  return signal;
}

export function computed<T>(fn: () => T): Computed<T> {
  if (isSSR) return { value: fn() };

  const callbacks = new Set<(t: T) => void>();
  let [state, sources] = capture(fn);

  const computes: Computed<T> & Node & RefExt<T> = {
    get value() {
      context.dependencies?.add(computes);
      return state;
    },
    _type: "computed",
    _dirty: 0,
    _dsts: new Set(),
    _update() {
      for (const node of sources) {
        node._dsts.delete(computes);
      }
      [state, sources] = capture(fn);
      for (const node of sources) {
        node._dsts.add(computes);
      }
      for (const callback of callbacks) {
        callback(state);
      }
    },
    _remove() {
      for (const node of sources) {
        node._dsts.delete(computes);
      }
    },
    _subscribe(fn) {
      callbacks.add(fn);
    },
    _unsubscribe(fn) {
      callbacks.delete(fn);
    },
  };

  for (const node of sources) {
    node._dsts.add(computes);
  }

  return computes;
}

export type EffectClearFunction = () => void;
export type EffectFunction = () => EffectClearFunction | void;

export function effect(fn: EffectFunction): void {
  if (isSSR) return;

  let [clear, sources] = capture(fn);

  const effect: Node = {
    _type: "effect",
    _dirty: 0,
    _dsts: new Set(),
    _update() {
      if (typeof clear === "function") {
        clear();
      }
      for (const node of sources) {
        node._dsts.delete(effect);
      }

      [clear, sources] = capture(fn);
      for (const node of sources) {
        node._dsts.add(effect);
      }
    },
    _remove() {
      if (typeof clear === "function") {
        clear();
      }
      for (const node of sources) {
        node._dsts.delete(this);
      }
    },
  };

  for (const node of sources) {
    node._dsts.add(effect);
  }
}
