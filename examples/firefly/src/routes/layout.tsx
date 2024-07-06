import { component$ } from "@swwind/ly";

export default component$(() => {
  return (
    <div>
      <h1>Layout</h1>
      <slot />
    </div>
  );
});
