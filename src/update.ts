import { ComputedState, type EffectState, type RefState } from "./state.ts";

let dirtyStates = new Set<RefState>();
let currentUpdate = false;

export function enqueueUpdate(node: RefState) {
  dirtyStates.add(node);
  if (!currentUpdate) {
    currentUpdate = true;
    setTimeout(updateStates);
  }
}

function mark(node: RefState | ComputedState) {
  for (const listener of node._listeners) {
    if (!listener._dirty++ && listener instanceof ComputedState) {
      mark(listener);
    }
  }
}

function unmark(node: RefState | ComputedState) {
  for (const listener of node._listeners) {
    if (!--listener._dirty && listener instanceof ComputedState) {
      unmark(listener);
    }
  }
}

function updateStates() {
  currentUpdate = false;

  while (dirtyStates.size > 0) {
    const dirty = [...dirtyStates];
    dirtyStates = new Set();
    const queue: (ComputedState | EffectState)[] = [];

    for (const node of dirty) mark(node);
    for (const node of dirty) {
      if (node._update()) {
        for (const dest of node._listeners) {
          if (!--dest._dirty) {
            queue.push(dest);
          }
        }
      } else {
        unmark(node);
      }
    }

    while (queue.length > 0) {
      const node = queue.pop()!;

      if (node._update()) {
        for (const dest of (node as ComputedState)._listeners) {
          if (!--dest._dirty) {
            queue.push(dest);
          }
        }
      } else if (node instanceof ComputedState) {
        unmark(node);
      }
    }
  }
}
