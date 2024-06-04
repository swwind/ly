export const isArray = Array.isArray;

export function toArray<T>(arr: T | T[]): T[] {
  return isArray(arr) ? arr : [arr];
}
