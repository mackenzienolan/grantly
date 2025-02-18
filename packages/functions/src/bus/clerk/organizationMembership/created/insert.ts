import { withIdempotency } from "@/bus/utils/idempotency";
import { createLogger } from "@/utils/logger";
import { db, teamMembersTable } from "@grantly/db";
import events from "@grantly/events/clerk";
import { bus } from "sst/aws/bus";

const logger = createLogger("clerk.organizationMembership.created");

export const handler = bus.subscriber(
  events["clerk.organizationMembership.created"],
  withIdempotency(async (evt, _raw) => {
    logger.info({ evt }, "Organization membership created. Running sync.");

    const membershipId = evt.properties.data.id;

    const insert = {
      id: membershipId,
      teamId: evt.properties.data.organization.id,
      userId: Number(evt.properties.data.public_user_data.user_id),
      role: evt.properties.data.role,
      createdAt: new Date(evt.properties.data.created_at),
      updatedAt: new Date(evt.properties.data.updated_at),
      _clerkRaw: evt.properties.data,
    } satisfies typeof teamMembersTable.$inferInsert;
    await db.insert(teamMembersTable).values(insert).onConflictDoUpdate({
      target: teamMembersTable.id,
      set: insert,
    });

    logger.info(
      { membershipId },
      "Organization membership created. Sync complete."
    );
  })
);
