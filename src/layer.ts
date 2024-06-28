import { type Comparable, createHeap, CompareSymbol } from "./heap.ts";
import { Stack, current, popd, pushd, withd } from "./stack.ts";

const layers: Stack<Layer> = [];
const nodes: Stack<Node[]> = [];

export class LayerElement implements Comparable {
  layer = current(layers)!;
  index = this.layer.states.push(this) - 1;
  listeners = new Set<LayerElement>();

  get [CompareSymbol]() {
    return this.index;
  }

  update() {
    return true;
  }
  remove() {}
}

export class Layer implements Comparable {
  children = new Set<Layer>();
  states = [] as LayerElement[];
  doms = [] as Node[];
  depth = 0;
  heap = createHeap<LayerElement>();

  constructor(fn?: () => void) {
    const parent = current(layers);
    if (parent) {
      parent.children.add(this);
      this.depth = parent.depth + 1;
    }

    if (fn) {
      pushd(layers, this);
      pushd(nodes, this.doms);
      try {
        fn();
      } finally {
        popd(layers);
        popd(nodes);
      }
      appendNodes(...this.doms);
    }
  }

  get [CompareSymbol]() {
    return this.depth;
  }

  remove(keepDoms: boolean = false) {
    for (const child of this.children) child.remove(true);
    for (const state of this.states) state.remove();
    if (!keepDoms) for (const dom of this.doms) (dom as ChildNode).remove();
  }
}

const rootLayer = new Layer();
pushd(layers, rootLayer);

export function appendNodes(...node: Node[]) {
  current(nodes)?.push(...node);
}

export function withNodes(node: Node[], fn: () => void) {
  withd(nodes, node, fn);
}
