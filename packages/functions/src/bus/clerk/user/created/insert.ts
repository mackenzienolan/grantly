import { withIdempotency } from "@/bus/utils/idempotency";
import { createLogger } from "@/utils/logger";
import { db } from "@grantly/db";
import { usersTable } from "@grantly/db/schema";
import events from "@grantly/events/clerk";
import { bus } from "sst/aws/bus";
import {
  getPrimaryEmailAddress,
  getPrimaryPhoneNumber,
} from "../utils/getPrimary";

const logger = createLogger("clerk.user.created");

export const handler = bus.subscriber(
  events["clerk.user.created"],

  withIdempotency(async (evt, _raw) => {
    logger.info({ evt }, "User created. Running sync.");

    const userId = evt.properties.data.id;

    const insert = {
      clerkUserId: userId,
      firstName: evt.properties.data.first_name,
      lastName: evt.properties.data.last_name,
      birthday: evt.properties.data.birthday
        ? new Date(evt.properties.data.birthday)
        : undefined,
      primaryEmailAddress: getPrimaryEmailAddress(evt.properties.data),
      emails: evt.properties.data.email_addresses,
      primaryPhoneNumber: getPrimaryPhoneNumber(evt.properties.data),
      phoneNumbers: evt.properties.data.phone_numbers,
      imageUrl: evt.properties.data.image_url,
      _clerkRaw: evt.properties.data,
    } satisfies typeof usersTable.$inferInsert;

    await db.insert(usersTable).values(insert).onConflictDoUpdate({
      target: usersTable.clerkUserId,
      set: insert,
    });

    logger.info({ userId }, "User created. Sync complete.");
  })
);
