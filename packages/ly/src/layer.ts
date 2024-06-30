import { isSSR } from "./flags.ts";
import { type Comparable, createHeap, Heap } from "./heap.ts";
import { Stack, current, popd, pushd, withd } from "./stack.ts";

const layers: Stack<Layer> = [];
const nodes: Stack<Node[]> = [];

export interface LayerElement extends Comparable {
  layer: Layer;
  hooks: {
    remove?: () => void;
    update?: () => boolean;
  };
  listeners: Set<LayerElement>;
}

export function createLayerElement(hooks: LayerElement["hooks"]) {
  const layer = current(layers)!;
  const elem: LayerElement = {
    layer,
    hooks,
    index: layer.states.length,
    listeners: new Set(),
  };
  layer.states.push(elem);
  return elem;
}

export interface Layer extends Comparable {
  children: Set<Layer>;
  states: LayerElement[];
  doms: Node[];
  heap: Heap<LayerElement>;
  remove(keepDoms?: boolean): void;
}

export function createLayer(callback?: () => void) {
  const parent = current(layers);

  const children = new Set<Layer>();
  const states = [] as LayerElement[];
  const doms = [] as Node[];
  const index = parent ? parent.index + 1 : 0;
  const remove = (keepDoms = false) => {
    for (const child of children) child.remove(true);
    for (const state of states) state.hooks.remove?.();
    if (!keepDoms) for (const dom of doms) (dom as ChildNode).remove();
  };
  const heap = createHeap<LayerElement>();

  const layer: Layer = { children, states, index, doms, heap, remove };

  if (parent) {
    parent.children.add(layer);
  }

  if (callback) {
    pushd(layers, layer);
    pushd(nodes, doms);
    try {
      callback();
    } finally {
      popd(layers);
      popd(nodes);
    }
    appendNodes(...doms);
  }

  return layer;
}

if (!isSSR) {
  const rootLayer = createLayer();
  pushd(layers, rootLayer);
}

export function appendNodes(...node: Node[]) {
  current(nodes)?.push(...node);
}

export function withNodes(node: Node[], fn: () => void) {
  withd(nodes, node, fn);
}
