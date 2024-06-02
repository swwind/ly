# Components

组件只能通过函数的方式定义。

```tsx
import { ref } from "riakuto";

function App() {
  const count = ref(0);

  const increment = () => count.value++;

  return <div onClick={increment}>{count}</div>;
}
```

每个组件的函数只会在最初调用的时候创建一次，之后永远不会被调用。

组件函数内部不可以使用信号系统的 `.value`。

你必须将所有的交互逻辑使用信号系统实现。

## 返回值

所有的动态交互逻辑都完全由信号系统实现。如果你有需要动态更新 DOM 结构的地方，请使用 Computed 函数。

```tsx
function App1() {
  return <div>never change</div>;
}
function App2() {
  const count = ref(0);
  return <div>count = {count}</div>;
}
function App3() {
  const show = ref(false);
  return computed(() =>
    show.value ? (
      <div>welcome to my website</div>
    ) : (
      <div>there is nothing here</div>
    )
  );
}
```
