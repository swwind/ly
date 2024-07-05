declare module "firefly:manifest/server" {
  export const manifest: import("./server/build.ts").ServerManifest;
}

declare module "firefly:manifest/client" {
  export const manifest: import("./server/build.ts").ClientManifest;
}

declare module "firefly:manifest/assets" {
  const assets: string[];
  export default assets;
}
