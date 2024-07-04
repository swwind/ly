import { computed } from "@swwind/ly";
import { injectRuntime } from "./runtime.tsx";

export function injectParam(param: string) {
  const runtime = injectRuntime();
  return computed(() => {
    return runtime.value.params.find(([ref, _]) => ref === param)?.[1] || "";
  });
}

export function injectCatchParam() {
  return injectParam("$");
}
