import { withIdempotency } from "@/bus/utils/idempotency";
import { createLogger } from "@/utils/logger";
import events from "@grantly/events/clerk";
import { bus } from "sst/aws/bus";

const logger = createLogger("clerk.waitlistEntry.created");

export const handler = bus.subscriber(
  events["clerk.waitlistEntry.created"],
  withIdempotency(async (evt, raw) => {
    logger.info({ evt }, "Waitlist entry created");
  })
);
