import { type AppType } from "@grantly/api";
import { hc } from "hono/client";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!);
