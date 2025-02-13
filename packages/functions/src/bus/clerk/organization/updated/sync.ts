import { withIdempotency } from "@/bus/utils/idempotency";
import { createLogger } from "@/utils/logger";
import { db, teamsTable } from "@grantly/db";
import events from "@grantly/events/clerk";
import { eq } from "drizzle-orm";
import { bus } from "sst/aws/bus";

const logger = createLogger("clerk.organization.updated");

export const handler = bus.subscriber(
  events["clerk.organization.updated"],
  withIdempotency(async (evt, raw) => {
    logger.info({ evt }, "Organization updated. Running sync.");

    const orgId = evt.properties.data.id;

    const update = {
      name: evt.properties.data.name,
      slug: evt.properties.data.slug,
      updatedAt: new Date(evt.properties.data.updated_at),
      _clerkRaw: evt.properties.data,
    } satisfies Omit<typeof teamsTable.$inferInsert, "id" | "createdAt">;
    await db.update(teamsTable).set(update).where(eq(teamsTable.id, orgId));

    logger.info({ orgId }, "Organization updated. Sync complete.");
  })
);
