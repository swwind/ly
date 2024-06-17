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
    for (const child of this.children) child.remove();
    for (const state of this.states) state.remove();
    for (const dom of this.doms) dom.remove();
  }
}

export const globalLayer = createGlobal<Layer>();

export function createRootLayer() {
  return new Layer();
}

export function createLayer() {
  return new Layer(globalLayer.current);
}
