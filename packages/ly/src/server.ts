import { clsx } from "./clsx.ts";
import { isSSR } from "./flags.ts";
import { styl } from "./styl.ts";
import { isArray, isVoidTag, toArray, valueOf } from "./utils.ts";
import {
  ComponentList,
  type ComponentChildren,
  type ComponentType,
  type LyDOMAttributes,
  type Primitives,
  type Props,
  type Slots,
  VNode,
  isVNode,
  withSlots,
} from "./vnode.ts";

function sanitizeHTML(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

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

function serializeChildren(children: ComponentChildren) {
  return toArray(children)
    .map((child) =>
      isVNode(child)
        ? serializeVNode(child)
        : sanitizeHTML(serializePrimitive(valueOf(child)))
    )
    .join("");
}

function serializeVNode(vnode: VNode): string {
  // fragment
  if (vnode.type === null) {
    const children = vnode.slots["default"] ?? [];
    return serializeChildren(children);
  }
  // dom elements
  else if (typeof vnode.type === "string") {
    const attributes: [string, string][] = [];

    for (const [key, value] of Object.entries(vnode.props)) {
      if (key === "_dangerouslySetInnerHTML") {
        continue;
      } else if (key === "class") {
        attributes.push([key, clsx(value)]);
      } else if (key === "style") {
        attributes.push([key, styl(value)]);
      } else if (key === "v-model") {
        attributes.push(["value", String(value)]);
      } else if (key.startsWith("on")) {
        // do nothing
      } else {
        let content = valueOf(value);
        if (typeof content === "boolean") {
          if (key.startsWith("aria-")) {
            // ARIA attributes takes boolean into "true" / "false"
            content = String(key);
          } else {
            // other attributes takes boolean as "" / remove
            content = content ? "" : null;
          }
        }
        if (content == null) {
          // do nothing
        } else {
          attributes.push([key, String(content)]);
        }
      }
    }

    const nameAttrs = [
      vnode.type,
      ...attributes.map(([k, v]) => `${k}="${sanitizeHTML(v)}"`),
    ].join(" ");

    if (isVoidTag(vnode.type)) {
      return `<${nameAttrs}/>`;
    }

    const children = (vnode.props as LyDOMAttributes)._dangerouslySetInnerHTML
      ? valueOf(
          (vnode.props as LyDOMAttributes)._dangerouslySetInnerHTML!.__html
        )
      : serializeChildren(vnode.slots["default"] ?? []);
    return `<${nameAttrs}>${children}</${vnode.type}>`;
  }
  // components
  else {
    const inside = execute(vnode.type, vnode.props, vnode.slots);

    if (inside === null) return "";

    if (typeof inside === "function") {
      return serializeChildren(inside()) + "<!--/-->";
    } else if (inside instanceof ComponentList) {
      return (
        inside._array.value
          .map((x, i) => inside._map(x, i))
          .map((vnode) => serializeVNode(vnode))
          .join("") + "<!--%-->"
      );
    } else if (isArray(inside)) {
      return inside.map((vnode) => serializeVNode(vnode)).join("");
    } else {
      return serializeVNode(inside);
    }
  }
}

export function renderToString(vnode: VNode) {
  if (!isSSR) {
    throw new Error("Cannot use renderToString() without SSR flag.");
  }

  return serializeVNode(vnode);
}
