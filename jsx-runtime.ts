import { toArray } from "./utils.ts";
import {
  type Key,
  type Props,
  createElement,
  type VNode,
  type ComponentType,
} from "./vnode.ts";

export function jsx(type: string, props: Props | null, key?: Key): VNode;
export function jsx<P extends Props>(
  type: ComponentType<P>,
  props: P,
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
