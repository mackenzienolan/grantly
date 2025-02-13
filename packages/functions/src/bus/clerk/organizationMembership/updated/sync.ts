import { withIdempotency } from "@/bus/utils/idempotency";
import { createLogger } from "@/utils/logger";
import { db, teamMembersTable } from "@grantly/db";
import events from "@grantly/events/clerk";
import { eq } from "drizzle-orm";
import { bus } from "sst/aws/bus";

const logger = createLogger("clerk.organizationMembership.updated");

export const handler = bus.subscriber(
  events["clerk.organizationMembership.updated"],
  withIdempotency(async (evt, _raw) => {
    logger.info({ evt }, "Organization membership updated. Running sync.");

    const membershipId = evt.properties.data.id;

    const update = {
      teamId: evt.properties.data.organization.id,
      userId: evt.properties.data.public_user_data.user_id,
      role: evt.properties.data.role,
      updatedAt: new Date(evt.properties.data.updated_at),
      _clerkRaw: evt.properties.data,
    } satisfies Omit<typeof teamMembersTable.$inferInsert, "id" | "createdAt">;
    await db
      .update(teamMembersTable)
      .set(update)
      .where(eq(teamMembersTable.id, membershipId));

    logger.info(
      { membershipId },
      "Organization membership updated. Sync complete."
    );
  })
);
