import { loader$ } from "@swwind/firefly/server";
import { component$, effect, ref } from "@swwind/ly";

export const useData = loader$((c) => {
  c.header("X-Message", "Hello!!!");

  return Math.random();
});

export default component$(() => {
  const count = ref(0);
  const increment = () => count.value++;
  effect(() => console.log(`count = ${count.value}`));

  const data = useData();

  return (
    <div>
      <h2>/index.tsx</h2>
      <p>
        <button onClick={increment}>+1</button>
      </p>
      <p>count = {count}</p>
      <p>data = {data}</p>
    </div>
  );
});
