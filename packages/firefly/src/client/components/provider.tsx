import type { JSX } from "@swwind/ly";
import { provideNavigation } from "../navigate.ts";
import { provideHistoryStore } from "../history.ts";

interface ProviderProps extends JSX.HTMLAttributes<HTMLHtmlElement> {}

export function FireflyProvider(props: ProviderProps) {
  provideNavigation();
  provideHistoryStore();

  return (
    <html {...props}>
      <slot />
    </html>
  );
}
