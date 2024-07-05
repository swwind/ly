import { createServer } from "@swwind/firefly/server";
import { manifest } from "firefly:manifest/server";

import Root from "./root.tsx";

export default createServer(<Root />, { manifest });
