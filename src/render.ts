import {
  type ComponentChildren,
  type Primitives,
  type ComponentType,
  type Slots,
  type VNode,
  isVNode,
  withSlots,
} from "./vnode.ts";
import { Layer, appendNodes, withNodes } from "./layer.ts";
import { layout, isComputed } from "./state.ts";
import { toArray } from "./utils.ts";
import { clsx } from "./clsx.ts";
import { styl } from "./styl.ts";

function execute<P>(type: ComponentType<P>, props: P, slots: Slots) {
  return withSlots(slots, () => type(props));
}

function serializePrimitive(primitive: Primitives) {
  return primitive == null || primitive === false ? "" : String(primitive);
}

function setAttribute(dom: Element, key: string, value: unknown) {
  if (value == null || value === false) {
    dom.removeAttribute(key);
  } else if (value === true) {
    dom.setAttribute(key, "");
  } else {
    dom.setAttribute(key, String(value));
  }
}

function realizeChildren(children: ComponentChildren) {
  for (const child of toArray(children)) {
    if (isComputed(child)) {
      const text = new Text();
      layout(() => {
        text.textContent = serializePrimitive(child.value);
      });
      appendNodes(text);
    } else if (isVNode(child)) {
      realizeVNode(child);
    } else {
      const str = serializePrimitive(child);
      const text = new Text(str);
      appendNodes(text);
    }
  }
}

function realizeVNode(vnode: VNode) {
  // fragment
  if (vnode.type === null) {
    const children = vnode.slots["default"] ?? [];
    realizeChildren(children);
  }
  // dom elements
  else if (typeof vnode.type === "string") {
    const elem = document.createElement(vnode.type);

    for (const [key, value] of Object.entries(vnode.props)) {
      if (key === "class") {
        layout(() => setAttribute(elem, "class", clsx(value)));
      } else if (key === "style") {
        layout(() => setAttribute(elem, "style", styl(value)));
      } else if (key.startsWith("on")) {
        const name = key.slice(2).toLowerCase();
        elem.addEventListener(name, value);
      } else if (isComputed(value)) {
        layout(() => setAttribute(elem, key, value.value));
      } else {
        setAttribute(elem, key, value);
      }
    }

    const children = vnode.slots["default"] ?? [];
    const doms = [] as Node[];
    withNodes(doms, () => realizeChildren(children));
    elem.append(...doms);
    appendNodes(elem);
  }
  // components
  else {
    const inside = execute(vnode.type, vnode.props, vnode.slots);

    if (inside === null) return;

    if (typeof inside === "function") {
      const comment = new Comment("/");
      appendNodes(comment);

      // dynamic component
      layout(() => {
        const layer = new Layer(() => {
          const children = inside();
          realizeChildren(children);
        });

        for (const dom of layer.doms) {
          comment.before(dom);
        }

        return () => layer.remove();
      });
    } else {
      for (const node of toArray(inside)) {
        realizeVNode(node);
      }
    }
  }
}

export function render(vnode: VNode, parent: Element) {
  const layer = new Layer(() => realizeVNode(vnode));
  parent.replaceChildren(...layer.doms);
}

export function hydrate(vnode: VNode, parent: Element, replace?: Node) {
  const layer = new Layer(() => realizeVNode(vnode));
  const fragment = new DocumentFragment();
  fragment.append(...layer.doms);
  if (replace) {
    parent.replaceChild(fragment, replace);
  } else {
    parent.replaceChildren(fragment);
  }
}
