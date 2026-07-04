import { DEFAULT_STATE } from "./defaults.js";

let state = structuredClone(DEFAULT_STATE);

export function getState() {
  return state;
}

export function replaceState(newState) {
  state = Object.assign(structuredClone(DEFAULT_STATE), newState);
}

export function resetState() {
  state = structuredClone(DEFAULT_STATE);
}
