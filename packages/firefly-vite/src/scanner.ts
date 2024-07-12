import { extname, join, resolve } from "node:path";
import { readdir, readFile, stat } from "node:fs/promises";
import { isJs, isJsOrMdx, isMdx } from "./utils/ext.ts";
import type { Directory, Route } from "@swwind/firefly/server";
import { parse } from "@swc/core";
import { analyze, type AnalyzeResult } from "./analyze.ts";

async function analyzeCode(code: string, index: number) {
  const module = await parse(code, { syntax: "typescript", tsx: true });
  return analyze(module, index);
}

function getFilenameWithoutExt(filename: string) {
  const ext = extname(filename);
  return ext ? filename.slice(0, -ext.length) : filename;
}

function isNameOf(name: string, filename: string) {
  return getFilenameWithoutExt(filename) === name;
}

function isIndex(filename: string) {
  return isJsOrMdx(filename) && isNameOf("index", filename);
}

function isError(filename: string) {
  return isJsOrMdx(filename) && isNameOf("error", filename);
}

function isLayout(filename: string) {
  return isJsOrMdx(filename) && isNameOf("layout", filename);
}

function isStatic(filename: string) {
  return isJs(filename) && isNameOf("static", filename);
}

function isMiddleware(filename: string) {
  return isJs(filename) && isNameOf("middleware", filename);
}

export async function scanProjectStructure(entrance: string) {
  entrance = resolve(entrance);

  const staticPaths: string[] = [];
  const componentPaths: string[] = [];
  const middlewarePaths: string[] = [];

  const registerStatic = (filePath?: string) =>
    filePath ? staticPaths.push(filePath) - 1 : null;
  const registerComponent = (filePath?: string) =>
    filePath ? componentPaths.push(filePath) - 1 : null;
  const registerMiddleware = (filePath?: string) =>
    filePath ? middlewarePaths.push(filePath) - 1 : null;

  const scan = async (dirPath: string): Promise<Directory> => {
    const filenames: string[] = [];
    const dirnames: string[] = [];

    for (const entry of await readdir(dirPath)) {
      const stats = await stat(join(dirPath, entry));
      if (stats.isFile()) filenames.push(entry);
      if (stats.isDirectory()) dirnames.push(entry);
    }

    const indexPaths: string[] = [];
    const errorPaths: string[] = [];
    const layoutPaths: string[] = [];
    const staticPaths: string[] = [];
    const middlewarePaths: string[] = [];

    // collect every files
    for (const filename of filenames) {
      const filePath = join(dirPath, filename);
      if (isIndex(filename)) indexPaths.push(filePath);
      if (isError(filename)) errorPaths.push(filePath);
      if (isLayout(filename)) layoutPaths.push(filePath);
      if (isStatic(filename)) staticPaths.push(filePath);
      if (isMiddleware(filename)) middlewarePaths.push(filePath);
    }

    // Test conflit files
    if (indexPaths.length > 1) {
      throw new Error(`Multiple index page found: ${indexPaths[1]}`);
    }
    if (errorPaths.length > 1) {
      throw new Error(`Multiple error page found: ${errorPaths[1]}`);
    }
    if (layoutPaths.length > 1) {
      throw new Error(`Multiple layout page found: ${layoutPaths[1]}`);
    }
    if (staticPaths.length > 1) {
      throw new Error(`Multiple static found: ${staticPaths[1]}`);
    }
    if (middlewarePaths.length > 1) {
      throw new Error(`Multiple middleware found: ${middlewarePaths[1]}`);
    }

    // register everything
    const index = registerComponent(indexPaths.at(0));
    const error = registerComponent(errorPaths.at(0));
    const layout = registerComponent(layoutPaths.at(0));
    const static1 = registerStatic(staticPaths.at(0));
    const middleware = registerMiddleware(middlewarePaths.at(0));

    const route: Route = {
      index,
      error,
      layout,
      static: static1,
      middleware,
    };
    const children: [string, Directory][] = [];

    for (const dirname of dirnames) {
      children.push([dirname, await scan(join(dirPath, dirname))]);
    }

    return { route, children };
  };

  const directory = await scan(entrance);

  return {
    directory,
    staticPaths,
    componentPaths,
    middlewarePaths,
  };
}

export type ProjectStructure = Awaited<ReturnType<typeof scanProjectStructure>>;

export async function analyzeLayoutOrIndex(
  filePath: string,
  index: number
): Promise<AnalyzeResult> {
  if (isMdx(filePath)) {
    return {
      action: [],
      loader: [],
      meta: true,
      middleware: false,
      component: true,
    };
  }

  const source = await readFile(filePath, "utf8");
  return await analyzeCode(source, index);
}

export async function resolveProject(structure: ProjectStructure) {
  const components = await Promise.all(
    structure.componentPaths.map((filepath, index) =>
      analyzeLayoutOrIndex(filepath, index)
    )
  );

  return {
    raw: components,
    metas: components.map((c) => c.meta),
    actions: components.map((c) => c.action),
    loaders: components.map((c) => c.loader),
    components: components.map((c) => c.component),
    middlewares: components.map((c) => c.middleware),
  };
}

export type Project = Awaited<ReturnType<typeof resolveProject>>;
