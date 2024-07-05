import {
  FireflyProvider,
  RouterHead,
  RouterOutlet,
  EntryPoint,
} from "@swwind/firefly";
import { component$ } from "@swwind/ly";

export default component$(() => {
  return (
    <FireflyProvider lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <RouterHead />
      </head>
      <body>
        <RouterOutlet />
        <EntryPoint />
      </body>
    </FireflyProvider>
  );
});
