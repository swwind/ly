import { type Comparable, createHeap, CompareSymbol } from "./heap.ts";
import { createStack } from "./utils.ts";

export class LayerElement implements Comparable {
  _layer: Layer = globalLayer.current!;
  _index: number = this._layer.states.push(this) - 1;
  _listeners: Set<LayerElement> = new Set();

  [CompareSymbol](value: LayerElement) {
    return this._index - value._index;
  }

  update(): boolean {
    return false;
  }
  remove() {}
}

export class Layer implements Comparable {
  parent: Layer | undefined = globalLayer.current;
  children: Set<Layer> = new Set();
  states: LayerElement[] = [];
  doms: Node[] = [];
  depth = 0;
  heap = createHeap<LayerElement>();

  constructor() {
    if (this.parent) {
      this.parent.children.add(this);
      this.depth = this.parent.depth + 1;
    }
  }

  [CompareSymbol](value: Layer) {
    return this.depth - value.depth;
  }

  remove(doms: boolean = true) {
    for (const child of this.children) child.remove(false);
    for (const state of this.states) state.remove();
    if (doms) for (const dom of this.doms) (dom as ChildNode).remove();
  }

  /**
   * Capture all ref/computed/effect calls inside fn
   */
  with(fn: () => void) {
    globalLayer.pushd(this);
    globalNodes.pushd(this.doms);
    try {
      fn();
    } finally {
      globalNodes.popd();
      globalLayer.popd();
    }
    appendChild(...this.doms);
  }
}

const rootLayer = new Layer();
const globalLayer = createStack<Layer>();
const globalNodes = createStack<Node[]>();
globalLayer.pushd(rootLayer);

export function declareNodes(nodes: Node[], fn: () => void) {
  globalNodes.pushd(nodes);
  try {
    fn();
  } finally {
    globalNodes.popd();
  }
}

export function appendChild(...node: Node[]) {
  globalNodes.current?.push(...node);
}
