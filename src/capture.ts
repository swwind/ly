import type { ComputedState, RefState } from "./state.ts";
import { createGlobal } from "./utils.ts";

export type Capture = {
  _getters: Set<RefState | ComputedState>;
  _setters: Set<RefState>;
};

export const globalCapture = createGlobal<Capture>();

export function createCapture(): Capture {
  return { _getters: new Set(), _setters: new Set() };
}
