import { withIdempotency } from "@/bus/utils/idempotency";
import { createLogger } from "@/utils/logger";
import { db, teamsTable } from "@grantly/db";
import events from "@grantly/events/clerk";
import { bus } from "sst/aws/bus";

const logger = createLogger("clerk.organization.created");

export const handler = bus.subscriber(
  events["clerk.organization.created"],
  withIdempotency(async (evt, raw) => {
    logger.info({ evt }, "Organization created. Running sync.");

    const orgId = evt.properties.data.id;

    const insert = {
      id: orgId,
      name: evt.properties.data.name,
      slug: evt.properties.data.slug,
      createdAt: new Date(evt.properties.data.created_at),
      updatedAt: new Date(evt.properties.data.updated_at),
      _clerkRaw: evt.properties.data,
    } satisfies typeof teamsTable.$inferInsert;
    await db.insert(teamsTable).values(insert).onConflictDoUpdate({
      target: teamsTable.id,
      set: insert,
    });

    logger.info({ orgId }, "Organization created. Sync complete.");
  })
);
