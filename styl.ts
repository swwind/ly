import type { MaybeComputed } from "./jsx.d.ts";

export type DOMCSSProperties = {
  [key in keyof Omit<
    CSSStyleDeclaration,
    | "item"
    | "parentRule"
    | "setProperty"
    | "removeProperty"
    | "getPropertyValue"
    | "getPropertyPriority"
    | number
  >]?: MaybeComputed<string | number | null | undefined>;
};
export type AllCSSProperties = {
  [key: string]: MaybeComputed<string | number | null | undefined>;
};
export interface CSSProperties extends AllCSSProperties, DOMCSSProperties {}

export function styl(style: CSSProperties) {
  return Object.entries(style)
    .map(([name, value]) => {
      name = name.replace(/[A-Z]g/, "-$&").toLowerCase();
      if (!name.startsWith("--") && typeof value === "number") {
        value = value + "px";
      }
      return `${name}:${value}`;
    })
    .join(";");
}
