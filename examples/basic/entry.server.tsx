import { renderToString } from "@swwind/ly/server";
import { App } from "./App.tsx";

const html = renderToString(<App />);

console.log(html);
