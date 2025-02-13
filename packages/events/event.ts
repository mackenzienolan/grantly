import crypto from "node:crypto";
import { event } from "sst/event";

export const defineEvent = event.builder({
  validator: (schema) => {
    return (input) => {
      return schema.parse(input);
    };
  },
  metadata: () => {
    return {
      idempotencyKey: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
  },
});
