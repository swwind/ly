import { effect, ref, render } from "ly";

function App() {
  const count = ref(1);

  effect(() => console.log("count", count.value));

  return (
    <div>
      <button onClick={() => count.value++}>click</button>
      <p>
        count = {count}
      </p>
    </div>
  );
}

render(<App />, document.getElementById("app"));
