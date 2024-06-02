// deno-lint-ignore-file ban-types no-explicit-any
import type { Computed, Ref } from "./signal.ts";
import { isArray, isComputed, isRef } from "./utils.ts";

export type Key = string | number;
export type MaybeRef<T> = Ref<T> | T;
export type MaybeComputed<T> = Computed<T> | T;
export type MaybeArray<T> = Array<T> | T;

export type Props = Record<string, any>;
export type Slots = Record<string, ComponentChild[]>;

export type VNode = {
  type: string | ComponentType | null;
  props: Props;
  slots: Slots;
  key?: Key;
  ref?: Ref;
};

export type ComponentType<P extends Props = {}> = (
  props: P
) => MaybeComputed<VNode | VNode[] | null>;

export type ComponentChildVariants =
  | VNode
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined;
export type ComponentChild = MaybeComputed<ComponentChildVariants>;
export type ComponentChildren = MaybeArray<ComponentChild>;

export type Attributes<T = HTMLElement> = {
  key?: Key;
  ref?: Ref<T>;
};

export function component$<P extends Props = {}>(
  component: ComponentType<P>
): ComponentType<P> {
  return component;
}

export const Fragment = component$(() => h(null, { children: h(Slot, null) }));
export const Slot = component$<{ name?: string }>(() => null);

let currentSlots: Slots | null = null;
const DEFAULT_SLOT_NAME = "default";

export function startSlots(slots: Slots) {
  currentSlots = slots;
}

export function endSlots() {
  currentSlots = null;
}

export function h(
  type: string | ComponentType | null,
  props: Props | null,
  key?: Key
): VNode {
  props ??= {};

  if (type === Slot) {
    const name = props["name"] || "default";
    const children = currentSlots?.[name] || props["children"];
    return h(null, children ? { children } : null, key);
  }

  const slots: Slots = {};
  const normalizedProps: Props = {};

  let ref: Ref | undefined = undefined;

  for (const key in props) {
    const value = props[key];

    if (key === "children") {
      const children: ComponentChild[] = isArray(value) ? value : [value];

      for (const child of children) {
        if (isRef(child) || isComputed(child)) {
          slots[DEFAULT_SLOT_NAME] ??= [];
          slots[DEFAULT_SLOT_NAME].push(child);
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
    } else if (key === "ref") {
      ref = isRef(value) ? value : undefined;
    } else {
      normalizedProps[key] = value;
    }
  }

  return { type, props: normalizedProps, slots, key, ref };
}
