import { withIdempotency } from "@/api/bus/utils/idempotency";
import { createLogger } from "@/utils/logger";
import events from "@grantly/event/clerk";
import { bus } from "sst/aws/bus";

const logger = createLogger("clerk.waitlistEntry.created");

export const handler = bus.subscriber(
  events["clerk.waitlistEntry.created"],
  withIdempotency(async (evt, raw) => {
    logger.info("Waitlist entry created", {
      waitlistEntryId: evt.properties.data.id,
    });
  })
);
