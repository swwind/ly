import {
  type ComponentChildren,
  type Permitives,
  provideSlots,
  type ComponentChild,
  type VNode,
  isVNode,
} from "./vnode.ts";
import { toArray } from "./utils.ts";
import {
  type ComputedState,
  EffectState,
  collect,
  isComputed,
  type Computed,
} from "./signal.ts";

type VDOM = {
  children: VDOM[];
  states: (ComputedState | EffectState)[];
  doms: ChildNode[];
  contain: boolean;
};

function createVDOM(contain: boolean = false): VDOM {
  return { children: [], states: [], doms: [], contain };
}

function removeVDOM(vdom: VDOM, remove: boolean = true) {
  for (const child of vdom.children) {
    removeVDOM(child, remove && !vdom.contain);
  }
  for (const state of vdom.states) {
    state._remove();
  }
  if (remove) {
    for (const dom of vdom.doms) {
      dom.remove();
    }
  }
}

type Mount = (node: Node) => void;

function mountChildren(vnodes: ComponentChildren, mount: Mount): VDOM {
  vnodes = toArray(vnodes);

  const vdom = createVDOM();

  for (let i = 0; i < vnodes.length; ++i) {
    const child = mountChild(vnodes[i], mount);
    vdom.children.push(child);
    vdom.doms.push(...child.doms);
  }

  return vdom;
}

function setAttribute(elem: Element, key: string, value: unknown) {
  if (value === false || value == null) {
    elem.removeAttribute(key);
  } else if (value === true) {
    elem.setAttribute(key, "");
  } else {
    elem.setAttribute(key, String(value));
  }
}

function mountVNode(vnode: VNode, mount: Mount): VDOM {
  if (vnode.type === null) {
    const children = vnode.slots["default"] ?? [];

    return mountChildren(children, mount);
  } else if (typeof vnode.type === "string") {
    const elem = document.createElement(vnode.type);
    const vdom = createVDOM(true);
    vdom.doms.push(elem);

    // TODO: set elem props
    for (const key in vnode.props) {
      const value = vnode.props[key];
      if (key.startsWith("on")) {
        const name = key.slice(2).toLowerCase();
        elem.addEventListener(name, value);
      } else if (isComputed(value)) {
        vdom.states.push(
          new EffectState(() => setAttribute(elem, key, value.value))
        );
      } else {
        setAttribute(elem, key, value);
      }
    }

    vdom.children.push(
      mountChildren(vnode.slots["default"] ?? [], (node) => {
        elem.appendChild(node);
      })
    );

    mount(elem);

    return vdom;
  } else if (typeof vnode.type === "function") {
    const { type, slots, props } = vnode;
    const [vnodes, _refs, computes, effects] = collect(() =>
      provideSlots(slots, () => type(props))
    );

    if (typeof vnodes === "function") {
      const vdom = createVDOM();

      const anchor = new Comment("/");
      mount(anchor);

      vdom.states.push(
        new EffectState(() => {
          const children = mountChildren(vnodes(), (node) =>
            anchor.before(node)
          );
          return () => removeVDOM(children);
        })
      );

      return vdom;
    }

    const vdom = createVDOM();
    vdom.children.push(mountChildren(vnodes, mount));
    vdom.states.push(...computes);
    vdom.states.push(...effects);

    return vdom;
  } else {
    throw new Error("Invalid VNode");
  }
}

function toString(permitive: Permitives) {
  return permitive == null || permitive === false ? "" : String(permitive);
}

function mountPermitives(
  vnode: Permitives | Computed<Permitives>,
  mount: Mount
): VDOM {
  const vdom = createVDOM();
  const text = new Text();
  vdom.doms.push(text);

  if (isComputed(vnode)) {
    vdom.states.push(
      new EffectState(() => {
        console.log("update text.Content only", vnode.value);
        text.textContent = toString(vnode.value);
      })
    );
  } else {
    text.textContent = toString(vnode);
  }

  mount(text);
  return vdom;
}

function mountChild(vnode: ComponentChild, mount: Mount): VDOM {
  return isVNode(vnode)
    ? mountVNode(vnode, mount)
    : mountPermitives(vnode, mount);
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
export function render(vnode: VNode, parent: Node) {
  mountVNode(vnode, (node) => parent.appendChild(node));
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
export function hydrate(vnode: VNode, target: ChildNode) {
  mountVNode(vnode, (node) => target.replaceWith(node));
}
