import { type AppType } from "@grantly/api";
import { hc } from "hono/client";
import { Resource } from "sst";

export const client = hc<AppType>(Resource.apiRouter.url);
