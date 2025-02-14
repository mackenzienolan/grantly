import { WebhookEvent } from "@clerk/backend";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { Webhook } from "svix";
import type { AppRouteHandler } from "../../lib/types";

import { Resource } from "sst";
import { sendEvent } from "./utils";
import type { ClerkRoute } from "./webhooks.routes";

export const clerk: AppRouteHandler<ClerkRoute> = async (c) => {
  const SIGNING_SECRET = Resource.CLERK_WEBHOOK_SECRET.value;

  if (!SIGNING_SECRET) {
    return c.json(
      {
        message:
          "Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
      },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const svix_id = c.req.header("svix-id");
  const svix_timestamp = c.req.header("svix-timestamp");
  const svix_signature = c.req.header("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return c.json(
      {
        message: "Error: Missing Svix headers",
      },
      HttpStatusCodes.BAD_REQUEST
    );
  }

  // Get body
  const payload = await c.req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return c.json(
      {
        message: "Error: Verification error",
      },
      HttpStatusCodes.BAD_REQUEST
    );
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", body);

  const res = await sendEvent(evt);

  c.var.logger.info(res, `Published event ${eventType} with ID ${id} to bus`);
  return c.json({ message: "Webhook received" }, HttpStatusCodes.OK);
};
