import {
  type Runtime,
  type RuntimeStatic,
  provideRuntime,
} from "../client/runtime.ts";
import type { ServerManifest } from "./build.ts";
import {
  type ErrorResponse,
  type RedirectResponse,
  createRouter,
} from "./router.ts";
import { type FetchEvent, createFetchEvent } from "./event.ts";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { RedirectException } from "./exception.ts";
import { renderToString as render } from "@swwind/ly/server";
import type { VNode } from "@swwind/ly";

export type ServerOptions = {
  manifest: ServerManifest;
};

declare module "hono" {
  interface ContextRenderer {
    (runtime: Runtime, runtimeStatic: RuntimeStatic): Promise<Response>;
  }
  interface ContextVariableMap {
    event: FetchEvent;
  }
}

export function createServer(vnode: VNode, { manifest }: ServerOptions) {
  const app = new Hono();

  app.use(async (c, next) => {
    c.setRenderer(async (runtime, runtimeStatic) => {
      provideRuntime(runtime, runtimeStatic);
      const html = render(vnode);
      return c.html("<!DOCTYPE html>" + html);
    });
    c.set("event", createFetchEvent(c, manifest));

    await next();
  });

  // redirect tailing slash
  app.use(async (c, next) => {
    if (!c.req.path.endsWith("/_data.json") && !c.req.path.endsWith("/")) {
      const url = new URL(c.req.url);
      url.pathname += "/";
      return c.redirect(url.href, 308);
    }

    await next();
  });

  const route = createRouter(manifest.directory);
  app.route("/", route);

  app.onError(async (err, c) => {
    const isDataRequest = c.req.path.endsWith("/_data.json");

    if (err instanceof RedirectException) {
      const target =
        typeof err.target === "string"
          ? new URL(err.target, c.req.url)
          : err.target;

      if (isDataRequest) {
        return c.json<RedirectResponse>({
          ok: "redirect",
          redirect: target.href,
        });
      }

      return c.redirect(target.href, err.status);
    }

    if (err instanceof HTTPException && err.res) {
      if (isDataRequest) {
        return c.json<ErrorResponse>({
          ok: "error",
          error: await err.res.text(),
          status: err.res.status,
        });
      }
      // TODO: render error page
      return err.res;
    }

    const message = err.message;
    const status = err instanceof HTTPException ? err.status : 500;

    if (isDataRequest) {
      return c.json<ErrorResponse>({
        ok: "error",
        error: message,
        status,
      });
    }
    // TODO: render error page
    return c.body(message, status);
  });

  return app;
}
