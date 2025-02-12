import { Hono } from "hono";
import entitlements from "./entitlements";

const customers = new Hono();

customers.route("/:id/entitlements", entitlements);

export default customers;
