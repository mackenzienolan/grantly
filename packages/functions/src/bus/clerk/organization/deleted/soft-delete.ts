import { withIdempotency } from "@/bus/utils/idempotency";
import { createLogger } from "@/utils/logger";
import { db, teamsTable } from "@grantly/db";
import events from "@grantly/events/clerk";
import { eq } from "drizzle-orm";
import { bus } from "sst/aws/bus";

const logger = createLogger("clerk.organization.deleted");

export const handler = bus.subscriber(
  events["clerk.organization.deleted"],
  withIdempotency(async (evt, raw) => {
    logger.info({ evt }, "Organization deleted. Running sync.");

    const orgId = evt.properties.data.id;

    await db
      .update(teamsTable)
      .set({
        deletedAt: new Date(),
      })
      .where(eq(teamsTable.id, orgId));

    logger.info({ orgId }, "Organization deleted. Sync complete.");
  })
);
