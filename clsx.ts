import { isArray } from "./utils.ts";

export type ClassNames =
  | string
  | Record<string, boolean>
  | false
  | null
  | undefined
  | ClassNames[];

function collect(cn: ClassNames): string[] {
  if (typeof cn === "string") return cn.split(" ");
  if (isArray(cn)) return cn.flatMap(collect);
  if (cn == null || cn === false) return [];
  return Object.entries(cn)
    .filter(([_, v]) => v)
    .flatMap(([k]) => k.split(" "));
}

export function clsx(cn: ClassNames): string {
  return collect(cn)
    .filter((x) => x !== "")
    .join(" ");
}
