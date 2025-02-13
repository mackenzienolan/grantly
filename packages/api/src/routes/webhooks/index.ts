import { Hono } from "hono";
import clerk from "./clerk";

const webhooks = new Hono();

webhooks.route("/clerk", clerk);

export default webhooks;
