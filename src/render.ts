import {
  type ComponentChildren,
  type Primitives,
  provideSlots,
  type ComponentType,
  type Slots,
  type VNode,
  isVNode,
} from "../vnode.ts";
import { Layer, appendChild } from "./layer.ts";
import { layout, isComputed } from "./state.ts";
import { toArray } from "./utils.ts";
import { clsx } from "./clsx.ts";
import { styl } from "./styl.ts";
import { createElement, createText } from "./dom.ts";
import { declareNodes } from "./layer.ts";

function execute<P>(type: ComponentType<P>, props: P, slots: Slots) {
  return provideSlots(slots, () => type(props));
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
      const text = createText();
      layout(() => {
        text.textContent = serializePrimitive(child.value);
      });
      appendChild(text);
    } else if (isVNode(child)) {
      realizeVNode(child);
    } else {
      const str = serializePrimitive(child);
      const text = createText(str);
      appendChild(text);
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
    const elem = createElement(vnode.type);

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
    const doms: Node[] = [];
    declareNodes(doms, () => realizeChildren(children));
    elem.append(...doms);
    appendChild(elem);
  }
  // components
  else {
    const inside = execute(vnode.type, vnode.props, vnode.slots);

    if (inside === null) return;

    if (typeof inside === "function") {
      // dynamic component
      layout(() => {
        const layer = new Layer();
        layer.with(() => {
          const children = inside();
          realizeChildren(children);
        });

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
  const layer = new Layer();
  layer.with(() => realizeVNode(vnode));
  parent.replaceChildren(...layer.doms);
}

export function hydrate(vnode: VNode, parent: Element, replace?: ChildNode) {}
