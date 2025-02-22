import { z } from "zod";
import { type ListApiKeysResponse } from "./data";
export type Count = {
  api_key: number;
  publishable_key: number;
};

export const keyTypes = ["api_key", "publishable_key"] as const;

export const schema = z.object({
  type: z.enum(keyTypes),
  description: z.string().nonempty(),
  expiresAt: z.date().optional(),
});

export type Schema = z.infer<typeof schema>;

export type DataItem = ListApiKeysResponse[number];
