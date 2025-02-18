import { withIdempotency } from "@/bus/utils/idempotency";
import { createLogger } from "@/utils/logger";
import { createClerkClient } from "@clerk/backend";
import { db, usersTable } from "@grantly/db";
import events from "@grantly/events/clerk";
import { eq } from "drizzle-orm";
import { Resource } from "sst";
import { bus } from "sst/aws/bus";
import {
  getPrimaryEmailAddress,
  getPrimaryPhoneNumber,
} from "../utils/getPrimary";

const logger = createLogger("clerk.user.updated");
const client = createClerkClient({
  secretKey: Resource.CLERK_SECRET_KEY.value,
  publishableKey: Resource.CLERK_PUBLISHABLE_KEY.value,
});

export const handler = bus.subscriber(
  events["clerk.user.updated"],
  withIdempotency(async (evt, _raw) => {
    logger.info({ evt }, "User updated. Running sync.");

    const userId = evt.properties.data.id;

    const update = {
      firstName: evt.properties.data.first_name,
      lastName: evt.properties.data.last_name,
      birthday: evt.properties.data.birthday
        ? new Date(evt.properties.data.birthday)
        : undefined,
      primaryEmailAddress: getPrimaryEmailAddress(evt.properties.data),
      phoneNumbers: evt.properties.data.phone_numbers,
      primaryPhoneNumber: getPrimaryPhoneNumber(evt.properties.data),
      emails: evt.properties.data.email_addresses,
      _clerkRaw: evt.properties.data,
    } satisfies Omit<
      typeof usersTable.$inferInsert,
      "clerkUserId" | "createdAt"
    >;

    await db
      .update(usersTable)
      .set(update)
      .where(eq(usersTable.clerkUserId, userId));

    logger.info({ userId }, "User updated. Sync complete.");
  })
);
