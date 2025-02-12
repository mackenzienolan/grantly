import app from "@grantly/api";
import { handle } from "hono/aws-lambda";

export const handler = handle(app);
