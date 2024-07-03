import {
  type ComponentChildren,
  type Primitives,
  type ComponentType,
  type Slots,
  VNode,
  isVNode,
  withSlots,
  type Props,
  type LyDOMAttributes,
  ComponentList,
  type Key,
} from "./vnode.ts";
import { type Layer, appendNodes, createLayer, withNodes } from "./layer.ts";
import { layout, isComputed } from "./state.ts";
import { isNumber, isVoidTag, toArray } from "./utils.ts";
import { type ClassNames, clsx, hasComputedClass } from "./clsx.ts";
import { type CSSProperties, hasComputedStyle, styl } from "./styl.ts";
import { isDEV, isSSR } from "./flags.ts";

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
  } else {
    if (typeof value === "boolean") {
      if (key.startsWith("aria-")) {
        // ARIA attributes takes boolean into "true" / "false"
        value = String(value);
      } else {
        // other attributes takes boolean as "" / remove
        value = value ? "" : null;
      }
    }
    if (value == null) {
      dom.removeAttribute(key);
    } else {
      dom.setAttribute(key, String(value));
    }
  }
}

function realizeChildren(children: ComponentChildren, ns: string | null) {
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

function getNS(type: string, props: Props, ns: string | null) {
  if (type === "svg") {
    return props["xmlns"] || "http://www.w3.org/2000/svg";
  } else if (type === "math") {
    return props["xmlns"] || "http://www.w3.org/1998/Math/MathML";
  } else {
    return ns;
  }
}

function realizeVNode(vnode: VNode, ns: string | null) {
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
        if (hasComputedClass(value as ClassNames)) {
          layout(() => setAttribute(elem, key, clsx(value as ClassNames)));
        } else {
          setAttribute(elem, key, clsx(value as ClassNames));
        }
      } else if (key === "style") {
        if (hasComputedStyle(value as CSSProperties)) {
          layout(() => setAttribute(elem, key, styl(value as CSSProperties)));
        } else {
          setAttribute(elem, key, styl(value as CSSProperties));
        }
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
    } else if (inside instanceof ComponentList) {
      const comment = new Comment("%");
      appendNodes(comment);

      const map = new Map<Key, Layer>();
      const nokey = [] as Layer[];

      // do initialize and updates
      layout(() => {
        const array = inside._array.value;
        const vnodes = [] as VNode[];
        const layers = [] as Layer[];
        const keys = new Set<Key>();

        // run map function to get VNode arrays
        for (let i = 0; i < array.length; ++i) {
          const vnode = inside._map(array[i], i);
          if (!(vnode instanceof VNode)) {
            throw new Error("return value must be instance of VNode");
          }
          vnodes.push(vnode);
          const key = vnode.key;
          if (key == null) {
            if (isDEV) {
              console.warn("vnode should have a key property");
            }
          } else if (keys.has(key)) {
            if (isDEV) {
              console.warn(
                `duplicated key found: '${key}', this is undefined behavior`
              );
            }
          } else {
            keys.add(key);
          }
        }

        // remove old layers
        for (const [key, layer] of Array.from(map.entries())) {
          if (!keys.has(key)) {
            map.delete(key);
            layer.remove();
          }
        }
        while (nokey.length > 0) {
          nokey.pop()!.remove();
        }

        // create new layers
        for (const vnode of vnodes) {
          const key = vnode.key;
          if (key == null) {
            const layer = createLayer(() => realizeVNode(vnode, ns));
            nokey.push(layer);
            layers.push(layer);
          } else {
            const cacheLayer = map.get(key);
            if (cacheLayer) {
              layers.push(cacheLayer);
            } else {
              const layer = createLayer(() => realizeVNode(vnode, ns));
              map.set(key, layer);
              layers.push(layer);
            }
          }
        }

        // adjust DOM orders
        for (const layer of layers) {
          comment.before(...layer.doms);
        }
      });

      // do final clean
      layout(() => {
        return () => {
          for (const layer of map.values()) layer.remove();
          for (const layer of nokey) layer.remove();
        };
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

  const layer = createLayer(() => realizeVNode(vnode, null));
  parent.replaceChildren(...layer.doms);
}

export function hydrate(vnode: VNode, parent: Element, replace?: Node) {
  if (isSSR) {
    throw new Error(
      "Cannot use hydrate() in SSR mode, this is only allowed in browser."
    );
  }

  const layer = createLayer(() => realizeVNode(vnode, null));
  const fragment = new DocumentFragment();
  fragment.append(...layer.doms);
  if (replace) {
    parent.replaceChild(fragment, replace);
  } else {
    parent.replaceChildren(fragment);
  }
}
