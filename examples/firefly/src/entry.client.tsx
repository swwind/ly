import { hydrate } from "@swwind/firefly";
import { manifest } from "firefly:manifest/client";

import Root from "./root.tsx";

hydrate(<Root />, { manifest });
