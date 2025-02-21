import { z } from "zod";

export const bearerTokenSchema = z.string().regex(/^Bearer\s+\S+$/, {
  message: "Must be in the format 'Bearer <token>'",
});
