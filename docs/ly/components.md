# 组件

组件是网站交互逻辑的最小单位，分为静态组件和动态组件两种。

## 静态组件

静态组件是指其 DOM 结构不会发生变化的组件，可以在组件中直接返回其 DOM 结构。

```jsx
function App() {
  return <div>hello world</div>;
}
// 或者可以套一个 component$ 函数，帮助限定返回类型
const App = component$(() => <div>hello world</div>);
```

框架会在每个组件初始化的时候调用该函数并生成对应 DOM 结构，之后便不会再运行该函数。因此，在组件 `return` 之前的部分，可以看作是实例化时的一次性的初始化代码。

如果想要在组件中加入一些动态的交互内容，可以使用[信号系统](/signals)来进行，下面是一个简单的例子。

```jsx
const App = component$(() => {
  const count = ref(0);
  const increment = () => count.value++;

  return [
    <button onClick={increment}>click me</button>,
    <div>count = {count}</div>,
  ];
});
```

:::info
你可以使用 `Fragment` 来包括多个子组件，但也可以直接返回一个数组。他们并没有太大区别。
:::

## 动态组件

动态组件是指其 DOM 结构会随信号系统发生变化的组件。需要注意的是，你不可以在组件的初始化部分直接读取信号量的值并动态返回需要渲染的 DOM 元素，这将不会正常工作。在 Ly 中，需要在定义组件的时候返回一个函数，再从该函数中读取信号量的值，并由此返回动态渲染的内容。框架在渲染的时候会自动监听其中用到的所有信号，并在其中某个信号更新的时候移除原来的所有 DOM 结构，并插入新的 DOM 结构。

```jsx
const Banner = component$((props) => {
  return () => {
    return props.count.value % 2 === 0 ? (
      <span>count is odd</span>
    ) : (
      <span>count is even</span>
    );
  };
});
```

或者如果组件不需要初始化代码，可以使用 `dynamic` 函数来简化一层组件的声明函数。

```jsx
// 上面的声明等价于
const Banner = dynamic$((props) => {
  return props.count.value % 2 === 0 ? (
    <span>count is odd</span>
  ) : (
    <span>count is even</span>
  );
});
```

使用的时候与其他的组件别无二致。

```jsx
const App = component$(() => {
  const count = ref(0);
  const increment = () => count.value++;

  return [
    <button onClick={increment}>click me</button>,
    <Banner count={count} />,
  ];
});
```

很多时候通过属性下传信号量会有点麻烦，但其实我们可以直接在组件的初始化部分通过闭包直接捕获子组件需要用到的信号量。例如上面的样例可以简化成如下内容。

```jsx
const App = component$(() => {
  const count = ref(0);
  const increment = () => count.value++;

  // 嵌套声明
  const Banner = dynamic$(() => {
    return count.value % 2 === 0 ? (
      <span>count is odd</span>
    ) : (
      <span>count is even</span>
    );
  });

  return [
    <button onClick={increment}>click me</button>,
    <Banner />, // 这样就不需要再通过属性下传信号量了
  ];
});
```
