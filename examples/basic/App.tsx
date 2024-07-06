import {
  dynamic$,
  component$,
  computed,
  effect,
  ref,
  list$,
  Ref,
} from "@swwind/ly";
import { HITLogo } from "./src/HIT.tsx";
import { MathML } from "./src/MathML.tsx";

const Counter = component$(() => {
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

const Tabs = component$(() => {
  const currentTab = ref<"home" | "about" | "info">("home");

  const Home = component$(() => <p>Welcome to 🏠Home</p>);
  const About = component$(() => (
    <div>
      <p>
        Get in touch: <code>joebiden@whitehouse.gov</code>
      </p>
      <p>
        Enter your email address: <input type="email" />
      </p>
    </div>
  ));
  const Info = component$(() => (
    <p>Ly is the best framework I've ever seen!</p>
  ));

  const TabContent = dynamic$(() => {
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

const SyncInput = component$(() => {
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

const SyncCheckbox = component$(() => {
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

const InnerHTML = component$(() => {
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

const TemplateSlots = component$(() => {
  const Card = component$(() => {
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
      <p style={{ display: "flex" }}>
        <Card>Custom Body 1</Card>
        <Card>
          <template>Custom Body 2</template>
        </Card>
        <Card>
          <template slot="title">Custom Title 3</template>
          <template>Custom Body 3</template>
        </Card>
      </p>
    </div>
  );
});

const ArrayList = component$(() => {
  let count = 8;
  const array = ref([1, 2, 3, 4, 5, 6, 7, 8]);
  const insert = () => {
    const k = Math.floor(Math.random() * array.value.length);
    array.value = [
      ...array.value.slice(0, k),
      ++count,
      ...array.value.slice(k),
    ];
  };
  const remove = () => {
    if (array.value.length > 0) {
      const k = Math.floor(Math.random() * array.value.length);
      array.value = [...array.value.slice(0, k), ...array.value.slice(k + 1)];
    }
  };
  const shuffle = () => {
    const a = array.value;
    for (let i = 1; i < array.value.length; ++i) {
      const j = Math.floor(Math.random() * i);
      [a[i], a[j]] = [a[j], a[i]];
    }
    array.value = [...array.value];
  };

  const Counter = component$(() => {
    const count = ref(0);
    const increment = () => count.value++;
    return (
      <>
        <button onClick={increment}>+1</button>
        <span>value={count}</span>
      </>
    );
  });

  const List = list$(array, (x) => (
    <li key={x} class="fade-in-animation">
      <span>{x}: </span>
      <Counter />
    </li>
  ));

  return (
    <div class="example">
      <h2>Array & List</h2>
      <p>
        <button onClick={insert}>insert</button>
        <button onClick={remove}>remove</button>
        <button onClick={shuffle}>shuffle</button>
      </p>
      <p>
        <ul>
          <List />
        </ul>
      </p>
    </div>
  );
});

const SVGMath = component$(() => {
  return (
    <div class="example">
      <h2>SVG & MathML</h2>
      <p style={{ display: "flex", gap: "2rem" }}>
        <div style={{ flex: "1", height: "200px" }}>
          <HITLogo />
        </div>
        <div style={{ flex: "1" }}>
          <MathML />
        </div>
      </p>
    </div>
  );
});

const InputVModel = component$(() => {
  const text = ref("default");

  return (
    <div class="example">
      <h2>
        Input <code>v-model</code> Property
      </h2>
      <p>
        <input type="text" v-model={text} />
      </p>
      <p>
        <textarea v-model={text} />
      </p>
      <p>
        <select v-model={text}>
          <option value="default">Default</option>
          <option value="another">Another</option>
        </select>
      </p>
      <p>Your input is: {text}</p>
    </div>
  );
});

const App = component$(() => {
  return (
    <>
      <h1>Example: Basic</h1>

      <Counter />
      <Tabs />
      <SyncInput />
      <SyncCheckbox />
      <InnerHTML />
      <TemplateSlots />
      <ArrayList />
      <SVGMath />
      <InputVModel />
    </>
  );
});

export { App };
