import { injectRuntime, injectRuntimeStatic } from "../runtime.ts";
import type { LoaderStore } from "../../server/event.ts";
import type { Graph } from "../../server/build.ts";
import { getLinkPreloadAs, isAsset, isCss, isJs } from "../../utils/ext.ts";
import { isSSR } from "../../utils/envs.ts";
import type { Meta } from "../../server/meta.ts";
import type { Params } from "../../server/router.ts";
import { component$, computed, list$ } from "@swwind/ly";

export function RouterHead() {
  return (
    <>
      <DocumentHead />
      <PreloadHeads />
      {isSSR ? <MetadataInjector /> : null}
    </>
  );
}

export type SerializedRuntime = {
  meta: Meta;
  base: string;
  graph: Graph;
  params: Params;
  loaders: LoaderStore;
  components: number[];
};

function MetadataInjector() {
  const runtime = injectRuntime();
  const runtimeStatic = injectRuntimeStatic();

  const serialized = computed(() => {
    const object: SerializedRuntime = {
      meta: runtime.value.meta,
      base: runtimeStatic.base,
      graph: runtimeStatic.graph,
      params: runtime.value.params,
      loaders: runtime.value.loaders,
      components: runtime.value.components,
    };

    return JSON.stringify(object).replaceAll("/", "\\/");
  });

  return (
    <script
      type="application/json"
      data-firefly-metadata
      _dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}

function PreloadHeads() {
  const runtime = injectRuntime();
  const preloads = computed(() => runtime.value.preloads);
  const runtimeStatic = injectRuntimeStatic();

  const PreloadLink = component$<{ id: number }>((props) => {
    const href = runtimeStatic.base + runtimeStatic.graph.assets[props.id];

    if (isJs(href)) return <link rel="modulepreload" href={href} />;
    if (isCss(href)) return <link rel="stylesheet" href={href} />;
    if (isAsset(href))
      return <link rel="preload" href={href} as={getLinkPreloadAs(href)} />;

    return null;
  });

  // @ts-ignore TODO
  const List = list$(preloads, (id) => <PreloadLink key={id} id={id} />);

  return <List />;
}

const DocumentHead = component$(() => {
  const runtime = injectRuntime();
  const meta = computed(() => runtime.value.meta);

  return () => (
    <>
      <title>{meta.value.title}</title>
      {meta.value.description && (
        <meta name="description" content={meta.value.description} />
      )}
      {meta.value.meta.map((props) => (
        <meta {...props} />
      ))}
      {meta.value.link.map((props) => (
        <link {...props} />
      ))}
    </>
  );
});
