// deno-lint-ignore-file no-explicit-any
import { isRef, type Ref, type RefExt } from "./signal.ts";
import type { VNode } from "./types.ts";

type VDOM = {
  dom: HTMLElement | Text;
  vnode: VNode | string;
};

function createVDOM(
  type: string,
  props: Record<string, any>,
  vnode: VNode
): VDOM {
  const element = document.createElement(type);
  const events: [string, () => void][] = [];
  const attrs: [string, string][] = [];
  const attrrefs: [string, RefExt<string>][] = [];

  for (const [key, value] of Object.entries(props)) {
    if (key === "bind:value") {
      if (!isRef(value)) {
        console.warn("bind:value should be a Ref");
      }

      const ref = value as Ref<string> & RefExt<string>;

      if (element instanceof HTMLInputElement) {
        events.push(["input", () => (ref.value = element.value)]);
        attrrefs.push(["value", ref]);
      }
    } else if (key.startsWith("on") && key.length > 2) {
      const event = key[2].toLowerCase() + key.slice(3);
      element.addEventListener(event, value);
    } else {
      if (isRef(value)) {
        attrrefs.push([key, value as Ref & RefExt]);
      } else {
        attrs.push([key, value]);
      }
    }
  }

  return {
    dom: element,
    vnode: vnode,
  };
}

function createVText(text: string) {
  const element = new Text(text);
  return element;
}

export function render(vnode: VNode, element: Element) {}
export function hydrate(vnode: VNode, element: Element) {}
