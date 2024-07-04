import type {
  ActionHandler,
  ActionReturnValue,
  ActionState,
} from "../server/action.ts";
import { injectNavigate, injectRender } from "./navigate.ts";
import type { ActionResponse } from "../server/router.ts";
import { fetchLoaders } from "./loader.ts";
import { computed, ref } from "@swwind/ly";

export async function fetchAction<T>(ref: string, data: FormData) {
  const target = new URL(location.href);
  if (!target.pathname.endsWith("/")) {
    target.pathname += "/";
  }
  target.hash = "";
  target.pathname += "_data.json";
  target.searchParams.set("_action", ref);
  const response = await fetch(target, { method: "POST", body: data });
  return (await response.json()) as ActionResponse<T>;
}

export function injectAction<T extends ActionReturnValue>(
  actionRef: string
): ActionHandler<T> {
  const render = injectRender();
  const navigate = injectNavigate();

  const state = ref<ActionState<T>>({
    state: "idle",
    data: null,
    error: null,
  });

  const submit = async (formData: FormData) => {
    state.value = { state: "waiting", data: null, error: null };

    try {
      const resp = await fetchAction<T>(actionRef, formData);

      if (resp.ok === "action") {
        state.value = { state: "ok", data: resp.action, error: null };

        const data = await fetchLoaders(location.href);

        if (data.ok === "loader") {
          await render(data.meta, data.params, data.loaders, data.components);
        } else if (data.ok === "redirect") {
          await navigate(data.redirect);
        } else if (data.ok === "error") {
          throw new Error(data.error);
        } else {
          throw new Error("Invalid Response");
        }
      } else if (resp.ok === "redirect") {
        await navigate(resp.redirect);
      } else if (resp.ok === "error") {
        throw new Error(resp.error);
      } else {
        throw new Error("Invalid Response");
      }
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));
      state.value = { state: "error", data: null, error };
    }
  };

  return {
    ref: actionRef,
    state: computed(() => state.value),
    submit,
  };
}
