export const CompareSymbol = Symbol("compare");

export interface Comparable {
  [CompareSymbol](value: Comparable): number;
}

export type Heap<T extends Comparable> = {
  push(elem: T): void;
  size(): number;
  pop(): T;
  has(elem: T): boolean;
};

export function createHeap<T extends Comparable>(): Heap<T> {
  // make index start at 1
  const a = [,] as unknown as T[];
  // remember duplicated items
  const s = new Set<T>();
  const cmp = (a: T, b: T) => a[CompareSymbol](b);
  const swap = (i: number, j: number) => ([a[i], a[j]] = [a[j], a[i]]);
  const size = () => a.length - 1;
  const up = (x: number) => {
    for (; x > 1 && cmp(a[x], a[x >> 1]) < 0; x >>= 1) swap(x, x >> 1);
  };
  const down = (x: number, n: number) => {
    for (let t = x * 2; t <= n; x = t, t = x * 2) {
      if (t + 1 <= n && cmp(a[t + 1], a[t]) < 0) t += 1;
      if (cmp(a[x], a[t]) <= 0) break;
      swap(x, t);
    }
  };
  const has = (elem: T) => s.has(elem);
  const push = (elem: T) => {
    if (has(elem)) return;
    up(a.push(elem) - 1);
    s.add(elem);
  };
  const pop = () => {
    const n = size();
    swap(1, n);
    down(1, n - 1);
    const k = a.pop() as T;
    s.delete(k);
    return k;
  };
  return { push, size, pop, has };
}
