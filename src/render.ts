import { provideProvides } from "../provide.ts";
import {
  type ComponentChildren,
  type Permitives,
  provideSlots,
  type ComponentType,
  type Slots,
  type VNode,
  isVNode,
} from "../vnode.ts";
import { createLayer, createRootLayer, globalLayer } from "./layer.ts";
import { effect, isComputed } from "./state.ts";
import { createGlobal, toArray } from "./utils.ts";
import { clsx } from "./clsx.ts";
import { styl } from "./styl.ts";

function execute<P>(type: ComponentType<P>, props: P, slots: Slots) {
  return provideProvides(new Map(), () =>
    provideSlots(slots, () => type(props))
  );
}

const globalDom = createGlobal<ParentNode>();

function appendChild(node: Node) {
  globalDom.current?.appendChild(node);
}

function serializePermitive(permitive: Permitives) {
  return permitive == null || permitive === false ? "" : String(permitive);
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
      effect(() => {
        text.textContent = serializePermitive(child.value);
      });
      appendChild(text);
    } else if (isVNode(child)) {
      realize(child);
    } else {
      const str = serializePermitive(child);
      const text = new Text(str);
      appendChild(text);
    }
  }
}

function realize(vnode: VNode) {
  if (typeof vnode.type === "string") {
    const elem = document.createElement(vnode.type);

    for (const [key, value] of Object.entries(vnode.props)) {
      if (key === "class") {
        effect(() => setAttribute(elem, "class", clsx(value)));
      } else if (key === "style") {
        effect(() => setAttribute(elem, "style", styl(value)));
      } else if (key.startsWith("on")) {
        const name = key.slice(2).toLowerCase();
        elem.addEventListener(name, value);
      } else if (isComputed(value)) {
        effect(() => setAttribute(elem, key, value.value));
      } else {
        setAttribute(elem, key, value);
      }
    }

    const children = vnode.slots["default"] ?? [];
    globalDom.with(elem, () => realizeChildren(children));
    appendChild(elem);
    return;
  }

  if (vnode.type === null) {
    const children = vnode.slots["default"] ?? [];
    realizeChildren(children);
    return;
  }

  const inside = execute(vnode.type, vnode.props, vnode.slots);

  if (inside === null) return;
  if (typeof inside === "function") {
    // dynamic component
    effect(() => {
      const layer = createLayer();
      globalLayer.with(layer, () => {
        const children = inside();
        realizeChildren(children);
      });

      return () => {
        layer.remove();
      };
    });
    return;
  }

  for (const node of toArray(inside)) {
    realize(node);
  }
}

export function render(vnode: VNode, parent: Element) {
  const root = createRootLayer();
  const fragment = new DocumentFragment();
  globalDom.with(fragment, () => {
    globalLayer.with(root, () => realize(vnode));
  });
  parent.replaceChildren(fragment);
}

export function hydrate(vnode: VNode, parent: Element, replace?: ChildNode) {}
