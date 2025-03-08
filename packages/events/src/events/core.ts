import { integrationsTable } from "@grantly/db";
import { createSelectSchema } from "drizzle-zod";
import { defineEvent } from "../../event";

const events = {
  "integration.created": defineEvent("integration.created", createSelectSchema(integrationsTable)),
} as const;

export default events;
