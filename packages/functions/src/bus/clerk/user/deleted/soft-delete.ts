import { withIdempotency } from "@/bus/utils/idempotency";
import { createLogger } from "@/utils/logger";
import { db, usersTable } from "@grantly/db";
import events from "@grantly/events/clerk";
import { eq } from "drizzle-orm";
import { bus } from "sst/aws/bus";

const logger = createLogger("clerk.user.deleted");

export const handler = bus.subscriber(
  events["clerk.user.deleted"],
  withIdempotency(async (evt, _raw) => {
    logger.info({ evt }, "User deleted. Running soft delete.");

    const userId = evt.properties.data.id;

    if (!userId) {
      logger.error({ evt }, "User deleted. No user ID found.");
      return;
    }

    await db
      .update(usersTable)
      .set({ deletedAt: new Date() })
      .where(eq(usersTable.clerkUserId, userId));

    logger.info({ userId }, "User deleted. Soft delete complete.");
  })
);
