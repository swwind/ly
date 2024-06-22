# 组件

组件是网站交互逻辑的最小单位，分为静态组件和动态组件两种。

## 静态组件

静态组件是指其 DOM 结构不会发生变化的组件，可以在组件中直接返回其 DOM 结构。

```jsx
function App() {
  return <div>hello world</div>;
}
```

如果想要加入交互内容，可以使用[信号系统](/signals)来进行。

```jsx
function App() {
  const count = ref(0);
  const increment = () => count.value++;

  return [
    <button onClick={increment}>click me</button>,
    <div>count = {count}</div>,
  ];
}
```

## 动态组件

动态组件是指其 DOM 结构会随信号系统发生变化的组件，需要在定义的时候返回一个函数。

```jsx
function App() {
  const count = ref(0);
  const increment = () => count.value++;

  return () => [
    <button onClick={increment}>click me</button>,
    count.value % 2 === 0 ? (
      <span>count is odd</span>
    ) : (
      <span>count is even</span>
    ),
  ];
}
```

组件在渲染的时候会监听其中用到的所有信号，并在其中某个信号更新的时候移除原来的所有 DOM 结构，并插入新的 DOM 结构。

在某些情况下，如果整个组件中只有一部分有动态 DOM 变换的部分，可以使用 `block` 函数来创建一个简单的动态组件。

```jsx
function App() {
  const count = ref(0);
  const increment = () => count.value++;

  const Banner = block(() =>
    count.value % 2 === 0 ? (
      <span>count is odd</span>
    ) : (
      <span>count is even</span>
    )
  );

  return [
    <button onClick={increment}>click me</button>,
    // Banner 可以直接作为组件使用
    <Banner />,
  ];
}
```
