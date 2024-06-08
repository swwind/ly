import { computed, effect, ref, render } from "ly";
import type { Ref } from "./signal.ts";

function John({ count }: { count: Ref<number> }) {
  const two = computed(() => count.value * 2);

  return () => {
    return count.value % 3 === 0 ? (
      <p>count = {count}</p>
    ) : (
      <p>count * 2 = {two}</p>
    );
  };
}

function App() {
  const count = ref(1);

  effect(() => console.log("count", count.value));

  const two = computed(() => count.value * 2);
  const four = computed(() => two.value * 2);

  return (
    <div>
      <button onClick={() => count.value++}>click</button>
      <John count={count} />
      <John count={two} />
      <John count={four} />
    </div>
  );
}

render(<App />, document.getElementById("app")!);
