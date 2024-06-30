import {
  type ComponentChildren,
  type Primitives,
  type ComponentType,
  type Slots,
  type VNode,
  isVNode,
  withSlots,
  type Props,
  LyDOMAttributes,
} from "./vnode.ts";
import { appendNodes, createLayer, withNodes } from "./layer.ts";
import { layout, isComputed } from "./state.ts";
import { isNumber, isVoidTag, toArray } from "./utils.ts";
import { clsx } from "./clsx.ts";
import { styl } from "./styl.ts";
import { isSSR } from "./flags.ts";

function execute<P extends Props>(
  type: ComponentType<P>,
  props: P,
  slots: Slots
) {
  return withSlots(slots, () => type(props));
}

function serializePrimitive(primitive: Primitives) {
  return primitive == null || primitive === false ? "" : String(primitive);
}

function setAttribute(dom: Element, key: string, value: unknown) {
  if (key === "value") {
    if (isNumber(value)) {
      (dom as HTMLInputElement).valueAsNumber = value;
    } else if (value instanceof Date) {
      (dom as HTMLInputElement).valueAsDate = value;
    } else {
      (dom as HTMLInputElement).value = String(value);
    }
  } else if (key === "checked") {
    (dom as HTMLInputElement).checked = Boolean(value);
  } else if (value == null || value === false) {
    dom.removeAttribute(key);
  } else if (value === true) {
    dom.setAttribute(key, "");
  } else {
    dom.setAttribute(key, String(value));
  }
}

function realizeChildren(children: ComponentChildren, ns?: string) {
  for (const child of toArray(children)) {
    if (isComputed(child)) {
      const text = new Text();
      layout(() => {
        text.textContent = serializePrimitive(child.value);
      });
      appendNodes(text);
    } else if (isVNode(child)) {
      realizeVNode(child, ns);
    } else {
      const str = serializePrimitive(child);
      const text = new Text(str);
      appendNodes(text);
    }
  }
}

function getNS(type: string, props: Props, ns?: string) {
  if (type === "svg") {
    return props["xmlns"] || "http://www.w3.org/2000/svg";
  } else if (type === "math") {
    return props["xmlns"] || "http://www.w3.org/1998/Math/MathML";
  } else {
    return ns;
  }
}

function realizeVNode(vnode: VNode, ns?: string) {
  // fragment
  if (vnode.type === null) {
    const children = vnode.slots["default"] ?? [];
    realizeChildren(children, ns);
  }
  // dom elements
  else if (typeof vnode.type === "string") {
    const elem = (ns = getNS(vnode.type, vnode.props, ns))
      ? document.createElementNS(ns, vnode.type)
      : document.createElement(vnode.type);

    for (const [key, value] of Object.entries(vnode.props)) {
      if (key === "_dangerouslySetInnerHTML") {
        continue;
      } else if (key === "class") {
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

    if (!isVoidTag(vnode.type)) {
      const dangerous = (vnode.props as LyDOMAttributes)
        ._dangerouslySetInnerHTML;
      if (dangerous) {
        const html = dangerous.__html;
        if (isComputed(html)) {
          layout(() => {
            elem.innerHTML = html.value;
          });
        } else {
          elem.innerHTML = html;
        }
      } else {
        const children = vnode.slots["default"] ?? [];
        const doms = [] as Node[];
        withNodes(doms, () => realizeChildren(children, ns));
        elem.append(...doms);
      }
    }

    appendNodes(elem);
    if (vnode.ref) {
      vnode.ref.value = elem;
    }
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
        const layer = createLayer(() => {
          const children = inside();
          realizeChildren(children, ns);
        });

        for (const dom of layer.doms) {
          comment.before(dom);
        }

        return () => layer.remove();
      });
    } else {
      for (const node of toArray(inside)) {
        realizeVNode(node, ns);
      }
    }
  }
}

export function render(vnode: VNode, parent: Element) {
  if (isSSR) {
    throw new Error(
      "Cannot use render() in SSR mode, please use renderToString() instead."
    );
  }

  const layer = createLayer(() => realizeVNode(vnode));
  parent.replaceChildren(...layer.doms);
}

export function hydrate(vnode: VNode, parent: Element, replace?: Node) {
  if (isSSR) {
    throw new Error(
      "Cannot use hydrate() in SSR mode, this is only allowed in browser."
    );
  }

  const layer = createLayer(() => realizeVNode(vnode));
  const fragment = new DocumentFragment();
  fragment.append(...layer.doms);
  if (replace) {
    parent.replaceChild(fragment, replace);
  } else {
    parent.replaceChildren(fragment);
  }
}
