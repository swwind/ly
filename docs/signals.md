# 信号系统

信号系统是用于动态更新显示数据的一套系统。

## ref

使用 `ref` 函数创建一个新的信号源。

```ts
const one = ref(0);
```

之后可以使用 `value` 属性来访问、修改信号源当前的值。也可以使用 `previous` 属性来访问上次更新前的值。

```ts
console.log(one.value); // => 0
one.value = 233; // => 233
console.log(one.value); // => 233
console.log(one.previous); // => 0
```

注意，整个信号系统会在 `ref` 收到更新之后的下一个刻之后统一更新，因此在同步代码中多次更新 `ref` 不会导致 `previous` 的变化。

```js
const one = ref(0);

console.log(one.value, one.previous); // => 0, 0
one.value = 233;
console.log(one.value, one.previous); // => 233, 0
one.value = 514;
console.log(one.value, one.previous); // => 514, 0

await nextTick();
console.log(one.value, one.previous); // => 514, 0
one.value = 114;
console.log(one.value, one.previous); // => 114, 0

await nextTick();
console.log(one.value, one.previous); // => 114, 514
```

## computed

`computed` 是根据前置的信号来得到新的只读信号的函数，类似于 React 中的 `useMemo`。

该函数会自动捕获其中用到的所有信号，并在其中任何信号更新之后自动更新自身的值。

可以通过 `value` 属性获取当前的值，也可以通过 `previous` 属性获取上次的值。

```ts
const one = ref(2);
const two = computed(() => one.value * 2);
console.log(two.value, two.previous); // => 4, 4
one.value = 114;
console.log(two.value, two.previous); // => 4, 4

await nextTick();
console.log(two.value, two.previous); // => 228, 4
```

:::info
`ref` 和 `computed` 都有一层缓存机制，即如果更新后的值与当前的值相同（`===`），那么不会将该更新信号传递下去，也不会修改自身的 `previous` 值。

```js
const a = ref(0);
const b = ref(0);
const c = computed(() => a.value * b.value);

console.log(c.value, c.previous); // => 0, 0

a.value = 2;
b.value = 3;
await nextTick();
console.log(c.value, c.previous); // => 6, 0

a.value = 1;
b.value = 6;
await nextTick();
console.log(c.value, c.previous); // => 6, 0
```

:::

## effect

`effect` 则类似 React 中的 `useEffect`，用于触发一些操作。

```ts
effect(() => {
  console.log("two updated to", two.value);
});
```

也可以返回一个函数用于清理副作用。

```ts
effect(() => {
  const interval = setInterval(() => console.log("2333"), 5000);
  return () => clearInterval(interval);
});
```

:::info
`effect` 函数会在组件初始化的时候直接调用，并且会在 SSR 构建中整个移除。如果确实需要在服务端执行响应式的代码，可以使用 `layout` 函数，该函数功能与 `effect` 相同，但是不会从 SSR 构建中移除。
:::
