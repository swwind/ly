import { component$, effect, ref } from "@swwind/ly";

export default component$(() => {
  const count = ref(0);
  const increment = () => count.value++;
  effect(() => console.log(`count = ${count.value}`));

  return (
    <div>
      <h1>hello world2</h1>
      <p>
        <button onClick={increment}>+1</button>
      </p>
      <p>count = {count}</p>
    </div>
  );
});
