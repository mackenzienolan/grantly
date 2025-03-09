import { integrationsTable } from "@grantly/db";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { defineEvent } from "../../event";

const events = {
  "integration.created": defineEvent(
    "integration.created",
    createSelectSchema(integrationsTable).extend({
      _raw: z.unknown(),
    })
  ),
} as const;

export default events;
