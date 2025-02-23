import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Resource } from "sst";
import * as schema from "./schema";

const pool = new Pool({
  ssl: Resource.App.stage === "prod" ? { rejectUnauthorized: true } : false,
  host: Resource["postgres-v2"].host,
  port: Resource["postgres-v2"].port,
  user: Resource["postgres-v2"].username,
  password: Resource["postgres-v2"].password,
  database: Resource["postgres-v2"].database,
});

export const db = drizzle(pool, { schema });
