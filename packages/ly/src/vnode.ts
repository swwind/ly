// deno-lint-ignore-file ban-types no-explicit-any

import { type Stack, current, popd, pushd } from "./stack.ts";
import { type Computed, type Ref, isRef, type MaybeComputed } from "./state.ts";
import { isNumber, isString } from "./utils.ts";

export type Key = string | number;

export class VNode {
  constructor(
    public type: string | ComponentType | null,
    public props: Props,
    public slots: Slots,
    public key?: Key,
    public ref?: Ref
  ) {}
}

export interface LyDOMAttributes {
  children?: ComponentChildren;
  _dangerouslySetInnerHTML?: { __html: MaybeComputed<string> };
}

export interface ClassAttributes<T = any> {
  key?: Key;
  ref?: Ref<T>;
}

export type Primitives = string | number | bigint | boolean | null | undefined;
export type ComponentChild = Primitives | Computed<Primitives> | VNode;
export type ComponentChildren = ComponentChild | ComponentChild[];

export type Props = Record<string, any>;
export type Slots = Record<string, ComponentChild[]>;
export type StaticComponent<P extends Props = {}> = (
  props: P
) => VNode | VNode[] | null;
export type DynamicComponent<P = {}> = (
  props: P
) => () => VNode | VNode[] | null;
export type ComponentType<P extends Props = {}> =
  | StaticComponent<P>
  | DynamicComponent<P>;

/**
 * Create a new component
 *
 * @example
 * ```jsx
 * const App = component$(() => {
 *   return <div>hello world</div>;
 * })
 *
 * render(<App />, document.getElementById('app'));
 * ```
 */
export function component$<P extends Props = {}>(
  fn: ComponentType<P>
): ComponentType<P> {
  return fn;
}

/**
 * Create a dynamic component
 *
 * @example
 * ```jsx
 * const show = ref(false);
 * const App = dynamic$(() => (
 *   show.value
 *     ? <div>shown</div>
 *     : <p>not shown</p>
 * ));
 * ```
 */
export function dynamic$<P extends Props = {}>(
  fn: (props: P) => VNode | VNode[] | null
): DynamicComponent<P> {
  return (p) => () => fn(p);
}

export const Fragment = component$(() => createVNode("slot", null));

const slots: Stack<Slots> = [];

export function withSlots<T>(slot: Slots, fn: () => T) {
  pushd(slots, slot);
  try {
    return fn();
  } finally {
    popd(slots);
  }
}

export class ComponentList<T> extends Array<VNode> {
  constructor(
    public _array: Computed<T[]>,
    public _map: (item: T, index: number) => VNode
  ) {
    super();
  }
}

/**
 * Create a list component.
 *
 * @example
 * ```jsx
 * const a = ref([2, 3, 4]);
 * const List = list$(a, (x) => {
 *   return <li key={x}>{x}</li>
 * });
 * // render
 * <ul>
 *   <List />
 * </ul>
 * ```
 */
export function list$<T>(
  array: Computed<T[]>,
  map: (item: T) => VNode
): StaticComponent<{}> {
  return () => new ComponentList(array, map);
}

export function createVNode(
  type: string | ComponentType | null,
  props: Props | null,
  ...children: ComponentChild[]
): VNode {
  props ??= {};

  if (type === "slot") {
    const name = (props["name"] || "default") as string;
    return createVNode(null, null, ...(current(slots)?.[name] ?? children));
  }

  const _slots: Slots = {};
  const _props: Props = {};

  let _key: Key | undefined = undefined;
  let _ref: Ref | undefined = undefined;

  for (const child of children) {
    if (isVNode(child) && child.type === "template") {
      (_slots[child.props["slot"] || "default"] ??= []).push(
        ...(child.slots["default"] ?? [])
      );
    } else {
      (_slots["default"] ??= []).push(child);
    }
  }

  for (const key in props) {
    const value = props[key];

    if (key === "ref") {
      if (isRef(value)) {
        _ref = value;
      }
    } else if (key === "key") {
      if (isString(value) || isNumber(value)) {
        _key = value;
      }
    } else {
      _props[key] = value;
    }
  }

  return new VNode(type, _props, _slots, _key, _ref);
}

export function isVNode(vnode: unknown): vnode is VNode {
  return vnode instanceof VNode;
}
