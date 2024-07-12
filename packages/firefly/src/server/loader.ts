import type { Context } from "hono";
import { injectLoader } from "../client/loader.ts";
import type { Computed } from "@swwind/ly";
import { middleware$, type Middleware } from "./middleware.ts";

export type LoaderReturnValue = {} | null;
export type LoaderFunction<T extends LoaderReturnValue = LoaderReturnValue> = (
  c: Context
) => T | Promise<T>;
export interface Loader<T extends LoaderReturnValue = LoaderReturnValue> {
  (): LoaderHandler<T>;
  _m?: Middleware;
  _fn?: LoaderFunction<T>;
  _ref?: string;
}
export type LoaderHandler<T extends LoaderReturnValue> = Computed<T>;

/**
 * Perform data-query for frontend
 *
 * ## Examples
 *
 * ```js
 * export const useUser = loader$(async (c) => {
 *   return { username: 'Alice' };
 * });
 *
 * export default component$(() => {
 *   const user = useUser(); // => Computed<{ username: string; }>
 *   const username = computed(() => user.value.username);
 *   return <span>username = {username}</span>
 * });
 * ```
 */
export function loader$<T extends LoaderReturnValue>(
  ...funcs:
    | [...Middleware[], LoaderFunction<T>]
    | [string, ...Middleware[], LoaderFunction<T>]
): Loader<T> {
  const handler = () => injectLoader<T>(handler._ref);
  handler._ref = typeof funcs[0] === "string" ? (funcs.shift() as string) : "";
  handler._fn = funcs.pop() as LoaderFunction<T>;
  handler._m = middleware$(...(funcs as Middleware[]));
  return handler;
}
