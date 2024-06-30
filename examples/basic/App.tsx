import { dynamic, component, computed, effect, ref } from "@swwind/ly";

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

  const Home = component(() => <p>Welcome to 🏠Home</p>);
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
  const Info = component(() => <p>Ly is the best framework I've ever seen!</p>);

  const TabContent = dynamic(() => {
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

const SyncInput = component(() => {
  const text = ref("hello world");
  effect(() => console.log(`text = ${text.value}`));

  return (
    <div class="example">
      <h2>Sync Inputs</h2>
      <p>
        Enter your password:{" "}
        <input
          type="text"
          value={text}
          onInput={(e) => (text.value = e.currentTarget.value)}
        />
      </p>
      <p>
        Repeat your password:{" "}
        <input
          type="text"
          value={text}
          onInput={(e) => (text.value = e.currentTarget.value)}
        />
      </p>
      <p>
        Your password is <span style={{ color: "red" }}>{text}</span>
      </p>
    </div>
  );
});

const SyncCheckbox = component(() => {
  const checked = ref(true);
  const inverse = () => (checked.value = !checked.value);

  effect(() => console.log(`checked = ${checked.value}`));

  return (
    <div class="example">
      <h2>Sync Checkbox</h2>
      <p>
        <button onClick={inverse}>inverse</button>
        <input
          type="checkbox"
          checked={checked}
          onInput={(e) => (checked.value = e.currentTarget.checked)}
        />
        <input
          type="checkbox"
          checked={checked}
          onInput={(e) => (checked.value = e.currentTarget.checked)}
        />
        {computed(() => (checked.value ? "Checked" : "Unchecked"))}
      </p>
    </div>
  );
});

const InnerHTML = component(() => {
  return (
    <div class="example">
      <h2>DangerouslySetInnerHTML</h2>
      <p>This is dangerous but still should be supported.</p>
      <p
        _dangerouslySetInnerHTML={{
          __html: '<code style="color:red">This is a red code</code>',
        }}
      />
    </div>
  );
});

const TemplateSlots = component(() => {
  const Card = component(() => {
    return (
      <div class="card">
        <div class="card-title">
          <slot name="title">Default Title</slot>
        </div>
        <div class="card-content">
          <slot>Default Body</slot>
        </div>
      </div>
    );
  });

  return (
    <div class="example">
      <h2>Template & Slot</h2>
      <div style={{ display: "flex" }}>
        <Card>Custom Body 1</Card>
        <Card>
          <template>Custom Body 2</template>
        </Card>
        <Card>
          <template slot="title">Custom Title 3</template>
          <template>Custom Body 3</template>
        </Card>
      </div>
    </div>
  );
});

const App = component(() => {
  return (
    <>
      <h1>Example: Basic</h1>

      <Counter />
      <Tabs />
      <SyncInput />
      <SyncCheckbox />
      <InnerHTML />
      <TemplateSlots />
    </>
  );
});

export { App };
