import { transform } from "@swc/core";
import type { ActionMeta, LoaderMeta, Project } from "./scanner.ts";
import type { Graph } from "@swwind/firefly/server";
import removeExportsWasm from "@swwind/remove-exports";

export function toClientManifestCode({ structure }: Project) {
  return [
    /** @see https://vitejs.dev/guide/backend-integration.html */
    `import "vite/modulepreload-polyfill";`,
    `const components = new Array(${structure.componentPaths.length});`,
    `export const manifest = { components };`,
  ].join("\n");
}

export function toServerManifestCode(
  project: Project,
  graph: Graph,
  base: string
) {
  const { structure, actions, loaders, middlewares, metas } = project;

  return [
    ...structure.componentPaths.map(
      (filePath, i) => `import c${i} from "${filePath}";`
    ),
    ...actions.map(
      (actions, i) =>
        `import { ${actions
          .map(({ name }, j) => `${name} as a${i}_${j}`)
          .join(", ")} } from "${structure.componentPaths[i]}";`
    ),
    ...loaders.map(
      (loaders, i) =>
        `import { ${loaders
          .map(({ name }, j) => `${name} as l${i}_${j}`)
          .join(", ")} } from "${structure.componentPaths[i]}";`
    ),
    ...metas.flatMap((hasMeta, i) =>
      hasMeta
        ? [`import { meta as t${i} } from "${structure.componentPaths[i]}";`]
        : []
    ),
    ...structure.middlewarePaths.map(
      (filePath, i) => `import m${i} from "${filePath}";`
    ),
    ...structure.staticPaths.map(
      (filePath, i) => `import s${i} from "${filePath}";`
    ),

    // assign ref
    ...actions.flatMap((actions, i) =>
      actions.map(({ ref }, j) => `a${i}_${j}._ref = "${ref}";`)
    ),
    ...loaders.flatMap((loaders, i) =>
      loaders.map(({ ref }, j) => `l${i}_${j}._ref = "${ref}";`)
    ),
    ...middlewares.map(({ ref }, i) => `m${i}._ref = "${ref}";`),

    // export
    `const base = ${JSON.stringify(base)};`,
    `const graph = ${JSON.stringify(graph)};`,
    `const metas = [${structure.componentPaths
      .map((_, i) => (metas[i] ? `t${i}` : "null"))
      .join(", ")}];`,
    `const actions = [${actions
      .map((a, i) => `[${a.map((_, j) => `a${i}_${j}`).join(", ")}]`)
      .join(", ")}];`,
    `const loaders = [${loaders
      .map((l, i) => `[${l.map((_, j) => `l${i}_${j}`).join(", ")}]`)
      .join(", ")}];`,
    `const statics = [${structure.staticPaths
      .map((_, i) => `s${i}`)
      .join(", ")}];`,
    `const directory = ${JSON.stringify(structure.directory)};`,
    `const components = [${structure.componentPaths
      .map((_, i) => `c${i}`)
      .join(", ")}];`,
    `const middlewares = [${middlewares.map((_, i) => `m${i}`).join(", ")}];`,
    `export const manifest = { base, graph, metas, actions, loaders, statics, directory, components, middlewares };`,
  ].join("\n");
}

export async function removeClientServerExports(
  source: string,
  actions: ActionMeta,
  loaders: LoaderMeta,
  hasMeta: boolean
) {
  const removes = [
    ...actions.map(({ name }) => name),
    ...loaders.map(({ name }) => name),
    ...(hasMeta ? ["meta"] : []),
  ];

  // console.log("wasm", wasm);
  const { code } = await transform(source, {
    jsc: {
      parser: {
        syntax: "ecmascript",
        jsx: false,
      },
      experimental: {
        plugins: [[removeExportsWasm, { removes }]],
      },
    },
  });

  const lines: string[] = [];

  if (actions.length > 0) {
    lines.push(`import { useAction as __useAction } from "@swwind/firefly";`);
  }
  if (loaders.length > 0) {
    lines.push(`import { useLoader as __useLoader } from "@swwind/firefly";`);
  }
  lines.push(
    ...actions.map(
      (action) =>
        `export const ${action.name} = () => __useAction("${action.ref}");`
    )
  );
  lines.push(
    ...loaders.map(
      (loader) =>
        `export const ${loader.name} = () => __useLoader("${loader.ref}");`
    )
  );

  return lines.join("\n") + code;
}

export function toAssetsManifestCode(graph: Graph, base: string) {
  return `export default [${graph.assets
    .map((asset) => JSON.stringify(base + asset))
    .join(", ")}];`;
}
