// deno-lint-ignore-file ban-types no-explicit-any
import { isComputed, isRef, type Computed, type Ref } from "./signal.ts";
import { isArray } from "./utils.ts";

export type Key = string | number;

export type VNode = {
  type: string | ComponentType | null;
  props: Props;
  slots: Slots;
  key?: Key;
  ref?: Ref;
};

export type Permitives =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | VNode
  | Permitives[];
export type ComponentChild = Permitives | Computed<Permitives>;
export type ComponentChildren = ComponentChild | ComponentChild[];

export type Attributes<T = HTMLElement> = {
  key?: Key;
  ref?: Ref<T>;
};

export type Props = Record<string, any>;
export type Slots = Record<string, ComponentChild[]>;
export type ComponentType<P extends Props = {}> = (
  props: P
) => ComponentChildren;

export function component$<P extends Props = {}>(
  component: ComponentType<P>
): ComponentType<P> {
  return component;
}

export const Fragment = component$(() => createElement(Slot, null));
export const Slot = component$<{ name?: string }>(() => {
  throw new Error("Usage of <Slot /> outside of components");
});

let currentSlots: Slots | null = null;
const DEFAULT_SLOT_NAME = "default";

export function provideSlots<T>(slots: Slots, callback: () => T) {
  const old = currentSlots;
  currentSlots = slots;
  try {
    return callback();
  } finally {
    currentSlots = old;
  }
}

export function createElement(
  type: string | ComponentType | null,
  props: Props | null,
  ...children: ComponentChild[]
): VNode {
  props ??= {};

  if (type === Slot) {
    const name = props["name"] || DEFAULT_SLOT_NAME;
    return createElement(null, null, ...(currentSlots?.[name] ?? children));
  }

  const slots: Slots = {};
  const normalizedProps: Props = {};

  let ref: Ref | undefined = undefined;

  for (const child of children) {
    if (isComputed(child)) {
      slots[DEFAULT_SLOT_NAME] ??= [];
      slots[DEFAULT_SLOT_NAME].push(child);
    } else if (isArray(child)) {
      slots[DEFAULT_SLOT_NAME] ??= [];
      slots[DEFAULT_SLOT_NAME].push(...child);
    } else if (
      typeof child === "object" &&
      child !== null &&
      child.type === "template"
    ) {
      const name = child.props["slot"] || DEFAULT_SLOT_NAME;
      slots[name] ??= [];
      slots[name].push(...(child.slots[DEFAULT_SLOT_NAME] ?? []));
    } else {
      slots[DEFAULT_SLOT_NAME] ??= [];
      slots[DEFAULT_SLOT_NAME].push(child);
    }
  }

  for (const key in props) {
    const value = props[key];

    if (key === "ref") {
      if (isRef(value)) {
        ref = value;
      }
    } else {
      normalizedProps[key] = value;
    }
  }

  return { type, props: normalizedProps, slots, key: undefined, ref };
}
