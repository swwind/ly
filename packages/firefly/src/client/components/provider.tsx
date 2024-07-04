import type { JSX } from "@swwind/ly";
import { provideHistoryStore } from "../history.ts";
import { provideNavigation } from "../navigate.ts";

interface ProviderProps extends JSX.HTMLAttributes<HTMLHtmlElement> {}

export function FireflyProvider(props: ProviderProps) {
  provideNavigation();
  provideHistoryStore();

  return <html {...props} />;
}
