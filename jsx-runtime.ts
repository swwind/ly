import { toArray } from "./utils.ts";
import {
  type Key,
  type Props,
  createElement,
  type VNode,
  type ComponentType,
  type ClassAttributes,
  type ComponentChildren,
} from "./vnode.ts";
import type { JSXInternal } from "./jsx.d.ts";

export function jsx(type: string, props: Props | null, key?: Key): VNode;
export function jsx<P extends Props>(
  type: ComponentType<P>,
  props: P & { children?: ComponentChildren } & ClassAttributes,
  key?: Key
): VNode;
export function jsx(
  type: string | ComponentType,
  props: Props | null,
  key?: Key
): VNode {
  const children = [];
  props ??= {};
  if ("children" in props) {
    children.push(...toArray(props.children));
    delete props.children;
  }
  props["key"] = key;
  return createElement(type, props, ...children);
}

export { jsx as jsxs };
export { jsx as jsxDEV };

export type { JSXInternal as JSX };
