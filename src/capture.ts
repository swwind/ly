import type { ComputedState, RefState } from "./state.ts";
import { createStack } from "./utils.ts";

export type Capture = {
  _getters: Set<RefState | ComputedState>;
  _setters: Set<RefState>;
};

export const globalCapture = createStack<Capture>();

export function createCapture(): Capture {
  return { _getters: new Set(), _setters: new Set() };
}
