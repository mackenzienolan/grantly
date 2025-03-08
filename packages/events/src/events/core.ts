import { integrationsTable } from "@grantly/db";
import { createInsertSchema } from "drizzle-zod";
import { defineEvent } from "../../event";

const events = {
  "integration.created": defineEvent("integration.created", createInsertSchema(integrationsTable)),
} as const;

export default events;
