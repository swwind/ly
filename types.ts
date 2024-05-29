// deno-lint-ignore-file ban-types no-explicit-any

import type { Ref } from "./signal.ts";

export type Key = string | number;

export type VNode = {
  type: string | ComponentType;
  props: Record<string, any>;
  key?: Key;
  ref?: Ref;
  children?: ComponentChildren;
};

export type ComponentRenderFunction = () => VNode | VNode[] | null;
export type ComponentType<P = {}> = (props: P) => ComponentRenderFunction;

export type ComponentChild =
  | VNode
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined;
export type ComponentChildren = ComponentChild[] | ComponentChild;

export type Attributes<T = HTMLElement> = {
  key?: Key;
  ref?: Ref<T>;
};
