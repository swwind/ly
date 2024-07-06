import { Form, Link } from "@swwind/firefly";
import { action$ } from "@swwind/firefly/server";
import { component$, computed, effect } from "@swwind/ly";

export const injectAction = action$(() => {
  if (Math.random() < 0.5) throw new Error("my error");

  return Math.random();
});

export default component$(() => {
  const action = injectAction();

  const data = computed(() => action.state.value.data);
  const error = computed(() => action.state.value.error);
  const status = computed(() => action.state.value.state);

  effect(() => {
    if (action.state.value.state === "ok") {
      alert(`ok: ${action.state.value.data}`);
    }
  });

  return (
    <Form action={action}>
      <div>action.state = {status}</div>
      <div>action.data = {data}</div>
      <div>action.error = {error}</div>
      <div>
        <button>Submit</button>
        <Link href="/">Go Home</Link>
      </div>
    </Form>
  );
});
