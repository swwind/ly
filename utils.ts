import { type Computed, ComputedNode, type Ref, RefNode } from "./signal.ts";

export const isArray = Array.isArray;

export function isRef<T>(child: unknown): child is Ref<T> {
  return child instanceof RefNode;
}

export function isComputed<T>(child: unknown): child is Computed<T> {
  return child instanceof ComputedNode || child instanceof RefNode;
}

export function insertAfter(parent: Node, after: Node | null, node: Node) {
  parent.insertBefore(node, (after && after.nextSibling) || parent.firstChild);
}
