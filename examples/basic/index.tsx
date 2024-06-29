import { block, component, computed, effect, ref } from "@swwind/ly";
import { render } from "@swwind/ly/browser";

const app = document.getElementById("app");

const Counter = component(() => {
  const a = ref(0);
  const b = ref(0);

  const c = computed(() => a.value * b.value);

  effect(() => console.log(`a from ${a.previous} to ${a.value}`));
  effect(() => console.log(`b from ${b.previous} to ${b.value}`));
  effect(() => console.log(`c from ${c.previous} to ${c.value}`));

  return (
    <div class="example">
      <h2>Counter</h2>
      <p style={{ gap: "4px", display: "flex" }}>
        <button onClick={() => a.value++}>+1</button>
        <button onClick={() => a.value--}>-1</button>
        <span>a = {a}</span>
      </p>
      <p style={{ gap: "4px", display: "flex" }}>
        <button onClick={() => b.value++}>+1</button>
        <button onClick={() => b.value--}>-1</button>
        <span>b = {b}</span>
      </p>
      <p>a * b = {c}</p>
    </div>
  );
});

const Tabs = component(() => {
  const currentTab = ref<"home" | "about" | "info">("home");

  const Home = component(() => <div>Welcome to 🏠Home</div>);
  const About = component(() => (
    <div>
      <p>
        Get in touch: <code>joebiden@whitehouse.gov</code>
      </p>
      <p>
        Enter your email address: <input type="email" />
      </p>
    </div>
  ));
  const Info = component(() => (
    <div>Ly is the best framework I've ever seen!</div>
  ));

  const TabContent = block(() => {
    switch (currentTab.value) {
      case "home":
        return <Home />;
      case "about":
        return <About />;
      case "info":
        return <Info />;
    }
  });

  return (
    <div class="example">
      <h2>Tabs</h2>
      <p>
        <button onClick={() => (currentTab.value = "home")}>Home</button>
        <button onClick={() => (currentTab.value = "about")}>About</button>
        <button onClick={() => (currentTab.value = "info")}>Info</button>
      </p>
      <TabContent />
    </div>
  );
});

const App = component(() => {
  return (
    <>
      <h1>Example: Basic</h1>

      <Counter />
      <Tabs />
    </>
  );
});

render(<App />, app);
