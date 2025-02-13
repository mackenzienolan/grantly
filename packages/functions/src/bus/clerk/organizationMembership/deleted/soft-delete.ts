import { withIdempotency } from "@/bus/utils/idempotency";
import { createLogger } from "@/utils/logger";
import { db, teamMembersTable } from "@grantly/db";
import events from "@grantly/events/clerk";
import { eq } from "drizzle-orm";
import { bus } from "sst/aws/bus";

const logger = createLogger("clerk.organizationMembership.deleted");

export const handler = bus.subscriber(
  events["clerk.organizationMembership.deleted"],
  withIdempotency(async (evt, _raw) => {
    logger.info(
      { evt },
      "Organization membership deleted. Running soft delete."
    );

    const membershipId = evt.properties.data.id;

    await db
      .update(teamMembersTable)
      .set({ deletedAt: new Date() })
      .where(eq(teamMembersTable.id, membershipId));

    logger.info(
      { membershipId },
      "Organization membership deleted. Soft delete complete."
    );
  })
);
