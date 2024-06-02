import {
  endSlots,
  startSlots,
  type ComponentChild,
  type ComponentType,
  type Props,
  type Slots,
  type VNode,
} from "./vnode.ts";
import { insertAfter, isArray, isComputed } from "./utils.ts";
import type { ValueNode } from "./signal.ts";
import { endProvide, startProvide } from "./provide.ts";

function setupVNode(comp: ComponentType, props: Props, slots: Slots) {
  // startProvide(new Map());
  startSlots(slots);

  const vnodes = comp(props);

  endSlots();
  // const provides = endProvide();

  return vnodes;
}

function mountVNodes(
  vnodes: ComponentChild[],
  parent: Node,
  after: Node | null
) {
  const comments = new Array(vnodes.length);

  for (let i = 0; i < vnodes.length; ++i) {
    comments[i] = document.createComment("/");
    insertAfter(parent, i > 0 ? comments[i - 1] : after, comments[i]);
  }

  for (let i = 0; i < vnodes.length; ++i) {
    mountVNode(vnodes[i], parent, comments[i]);
  }
}

function mountVNode(vnode: ComponentChild, parent: Node, after: Node | null) {
  if (vnode == null || vnode === false) {
    const text = document.createComment("null");
    return insertAfter(parent, after, text);
  }

  if (
    typeof vnode === "number" ||
    typeof vnode === "bigint" ||
    typeof vnode === "boolean" ||
    typeof vnode === "string"
  ) {
    const text = document.createTextNode(String(vnode));
    return insertAfter(parent, after, text);
  }

  if (isComputed(vnode)) {
    const computed = vnode as ValueNode<ComponentChild>;
    computed._subscribe((vnode) => {
      mountVNode(vnode, parent, after);
    });
    return;
  }

  if (vnode.type === null) {
    const children = vnode.slots["default"] ?? [];
    return mountVNodes(children, parent, after);
  } else if (typeof vnode.type === "string") {
    const elem = document.createElement(vnode.type);

    // TODO: set elem props
    for (const key in vnode.props) {
      const value = vnode.props[key];
      if (key.startsWith("on")) {
        const name = key.slice(2).toLowerCase();
        elem.addEventListener(name, vnode.props[key]);
      } else {
        if (isComputed(value)) {
          (value as ValueNode)._subscribe((value) => {
            elem.setAttribute(key, value);
          });
        } else {
          elem.setAttribute(key, vnode.props[key]);
        }
      }
    }

    const children = vnode.slots["default"] ?? [];
    mountVNodes(children, elem, null);

    return insertAfter(parent, after, elem);
  } else {
    const vnodes = setupVNode(vnode.type, vnode.props, vnode.slots);

    if (isArray(vnodes)) {
      return mountVNodes(vnodes, parent, after);
    }

    return mountVNode(vnode, parent, after);
  }
}

/**
 * Renders VNode inside
 *
 * ```html
 * <parent>
 *   <after />
 *   <!-- here -->
 * </parent>
 * ```
 *
 * or (if after is null)
 *
 * ```html
 * <parent>
 *   <!-- here -->
 * </parent>
 * ```
 */
export function render(vnode: VNode, parent: Node, after: Node | null = null) {
  mountVNode(vnode, parent, after);
}

/**
 * Hydrate VNode inside
 *
 * ```html
 * <parent>
 *   <after />
 *   <!-- here -->
 * </parent>
 * ```
 *
 * or (if after is null)
 *
 * ```html
 * <parent>
 *   <!-- here -->
 * </parent>
 * ```
 */
export function hydrate(vnode: VNode, parent: Node, after: Node | null) {}
