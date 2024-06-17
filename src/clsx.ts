import { isComputed, type Computed } from "./state.ts";
import { toArray, type MaybeArray } from "./utils.ts";

export type ClassName =
  | string
  | Record<string, Computed<boolean>>
  | Computed<string | false | null | undefined>;
export type ClassNames = MaybeArray<ClassName>;

export function clsx(cns: ClassNames): string {
  const cls = toArray(cns)
    .map((x) => {
      if (typeof x === "string") return x;
      if (isComputed(x)) return x.value || "";
      return Object.entries(x)
        .filter(([_, v]) => v.value)
        .map(([k, _]) => k)
        .join(" ");
    })
    .join(" ")
    .trim();
  return cls && cls.split(/\s+/).join(" ");
}
