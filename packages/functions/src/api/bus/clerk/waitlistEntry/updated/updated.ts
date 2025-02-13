import { withIdempotency } from "@/api/bus/utils/idempotency";
import { createLogger } from "@/utils/logger";
import events from "@grantly/event/clerk";
import { bus } from "sst/aws/bus";

const logger = createLogger("clerk.waitlistEntry.updated");

export const handler = bus.subscriber(
  events["clerk.waitlistEntry.updated"],
  withIdempotency(async (evt, raw) => {
    logger.info("Waitlist entry updated", {
      waitlistEntryId: evt.properties.data.id,
    });
  })
);
