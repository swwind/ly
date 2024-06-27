import { type Comparable, createHeap, CompareSymbol } from "./heap.ts";
import { Stack, current, popd, pushd, withd } from "./stack.ts";

const layers: Stack<Layer> = [];
const nodes: Stack<Node[]> = [];

export class LayerElement implements Comparable {
  _layer: Layer = current(layers)!;
  _index: number = this._layer.states.push(this) - 1;
  _listeners: Set<LayerElement> = new Set();

  get [CompareSymbol]() {
    return this._index;
  }

  update(): boolean {
    return false;
  }
  remove() {}
}

export class Layer implements Comparable {
  parent: Layer | null = current(layers);
  children: Set<Layer> = new Set();
  states: LayerElement[] = [];
  doms: Node[] = [];
  depth = 0;
  heap = createHeap<LayerElement>();

  constructor(fn?: () => void) {
    if (this.parent) {
      this.parent.children.add(this);
      this.depth = this.parent.depth + 1;
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
