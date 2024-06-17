type Compare<T> = (a: T, b: T) => number;

export type Heap<T> = {
  push(elem: T): void;
  size(): number;
  pop(): T;
};

export function createHeap<T>(cmp: Compare<T>): Heap<T> {
  const a = [,] as T[];
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
  const push = (elem: T) => up(a.push(elem) - 1);
  const pop = () => {
    const n = size();
    swap(1, n);
    down(1, n - 1);
    return a.pop() as T;
  };
  return { push, size, pop };
}
