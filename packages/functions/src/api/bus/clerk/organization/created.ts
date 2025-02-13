import events from "@grantly/event/clerk";
import { bus } from "sst/aws/bus";
import { createLogger } from "../../../../utils/logger";
import { withIdempotency } from "../../utils/idempotency";

const logger = createLogger("clerk.organization.created");

export const handler = bus.subscriber(
  events["clerk.organization.created"],
  withIdempotency(async (evt, raw) => {
    logger.info("Organization created", {
      organizationId: evt.properties.data.id,
    });
  })
);
