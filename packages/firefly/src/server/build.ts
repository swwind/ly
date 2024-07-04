import type { MetaFunction } from "./meta.ts";
import type { Action } from "./action.ts";
import type { Loader } from "./loader.ts";
import type { StaticFunction } from "./static.ts";
import type { Middleware } from "./middleware.ts";
import type { ComponentType } from "@swwind/ly";

export type Graph = {
  assets: string[];
  entry: number[];
  components: number[][];
};

export interface ClientManifest {
  components: ComponentType[];
}

export interface ServerManifest extends ClientManifest {
  base: string;
  graph: Graph;
  metas: (MetaFunction | null)[];
  actions: Action[][];
  loaders: Loader[][];
  statics: StaticFunction[];
  directory: Directory;
  middlewares: Middleware[];
}

export type Route = {
  index: number | null;
  error: number | null;
  layout: number | null;
  static: number | null;
  middleware: number | null;
};

export type Directory = {
  route: Route;
  children: [string, Directory][];
};
