# 信号系统

信号系统是用于动态更新显示数据的一套系统。

## ref

使用 `ref` 函数创建一个新的信号源。

```ts
const one = ref(0);
```

之后可以使用 `value` 属性来访问、修改信号源当前的值。

```ts
console.log(one.value);

one.value = 233;
```

## computed

computed 是根据前置的信号源来得到新的只读信号的函数，类似于 React 中的 useMemo。

```ts
const two = computed(() => one.value * 2);
```

computed 会在其使用的信号源更新后自动更新。

## effect

effect 则类似 React 中的 useEffect，用于触发一些操作。

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
