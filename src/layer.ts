import type { State } from "./state.ts";
import { createGlobal } from "./utils.ts";

export class Layer {
  parent: Layer | null;
  children: Set<Layer> = new Set();
  states: State[] = [];
  doms: ChildNode[] = [];

  constructor(parent?: Layer | null) {
    this.parent = parent ?? null;
    this.parent?.children.add(this);
  }

  remove() {
    // TODO
    this.parent?.children.delete(this);
  }
}

export const globalLayer = createGlobal<Layer>();

export function createRootLayer() {
  return new Layer();
}

export function createLayer() {
  return new Layer(globalLayer.current);
}
