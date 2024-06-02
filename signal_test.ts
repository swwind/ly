import { computed, effect, ref } from "./signal.ts";

if (import.meta.main) {
  const a = ref(114);
  const b = ref(514);
  const c = computed(() => a.value + b.value);
  const d = computed(() => b.value + c.value);

  effect(() => console.log(a.value, "+", b.value, "=", c.value));
  effect(() => console.log("only a = ", a.value));
  effect(() => console.log("only b = ", b.value));
  effect(() => console.log("only c = ", c.value));
  effect(() => console.log("only d = ", d.value));

  setTimeout(() => {
    a.value = 233;
  }, 1000);
  setTimeout(() => {
    b.value = 666;
  }, 2000);
}
