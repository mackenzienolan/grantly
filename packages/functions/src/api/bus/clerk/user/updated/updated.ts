import { withIdempotency } from "@/api/bus/utils/idempotency";
import { createLogger } from "@/utils/logger";
import events from "@grantly/event/clerk";
import { bus } from "sst/aws/bus";

const logger = createLogger("clerk.user.updated");

export const handler = bus.subscriber(
  events["clerk.user.updated"],
  withIdempotency(async (evt, raw) => {
    logger.info("User updated", {
      userId: evt.properties.data.id,
    });
  })
);
