// deno-lint-ignore-file no-explicit-any
import type { ComponentType, Key, VNode } from "./types.ts";

function createVNode(
  type: string | ComponentType,
  props: Record<string, any>,
  key?: Key
): VNode {
  const { ref, children, ...remains } = props;
  return { type, props: remains, key, ref, children };
}

export { createVNode as jsx };
export { createVNode as jsxs };
export { createVNode as jsxDEV };
