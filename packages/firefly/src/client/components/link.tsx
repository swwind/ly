import type { JSX } from "@swwind/ly";
import { injectNavigate } from "../navigate.ts";

interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function Link(props: LinkProps) {
  const navigate = injectNavigate();

  return (
    <a
      onClick={(e) => {
        const target = new URL(e.currentTarget.href, location.href);
        const self = (e.currentTarget.target || "_self") === "_self";
        const sameOrigin = target.host === location.host;
        if (self && sameOrigin) {
          e.preventDefault();
          navigate(target);
        }
      }}
      {...props}
    />
  );
}
