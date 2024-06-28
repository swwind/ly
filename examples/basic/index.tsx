import { component } from "@swwind/ly";
import { render } from "@swwind/ly/browser";

const app = document.getElementById("app");

const App = component(() => {
  return <span>hello world</span>;
});

render(<App />, app);
