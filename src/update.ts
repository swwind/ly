import { createHeap } from "./heap.ts";
import type { Layer, LayerElement } from "./layer.ts";
import type { State } from "./state.ts";

let dirtyStates = new Set<LayerElement>();
let currentUpdate = false;

export function enqueueUpdate(node: LayerElement) {
  dirtyStates.add(node);
  if (!currentUpdate) {
    currentUpdate = true;
    setTimeout(updateStates);
  }
}

function updateStates() {
  currentUpdate = false;

  while (dirtyStates.size > 0) {
    const dirty = [...dirtyStates];
    dirtyStates = new Set();

    const layers = createHeap<Layer>();

    for (const ref of dirty) {
      layers.push(ref.layer);
      ref.layer.heap.push(ref);
    }

    while (layers.size() > 0) {
      const layer = layers.pop();

      while (layer.heap.size() > 0) {
        const elem = layer.heap.pop() as State;

        if (elem.update()) {
          for (const node of elem.listeners) {
            layers.push(node.layer);
            node.layer.heap.push(node);
          }
        }
      }
    }
  }
}
