import { Hono } from "hono";
import oauth from "./oauth";
const stripe = new Hono();

stripe.route("/oauth", oauth);

export default stripe;
