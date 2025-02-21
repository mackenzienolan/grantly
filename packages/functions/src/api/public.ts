import app from "@grantly/api/public";
import { handle } from "hono/aws-lambda";

export const handler = handle(app);
