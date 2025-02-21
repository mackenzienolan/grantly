import { createRouter } from "../../../lib/create-app";
import stripeRouter from "./stripe/stripe.index";

const router = createRouter().route("/", stripeRouter);

export default router;
