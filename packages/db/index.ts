import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Resource } from "sst";
import * as schema from "./schema";
export * from "./schema";

const pool = new Pool({
  ssl: Resource.App.stage === "main" ? { rejectUnauthorized: true } : false,
  host: Resource.postgres.host,
  port: Resource.postgres.port,
  user: Resource.postgres.username,
  password: Resource.postgres.password,
  database: Resource.postgres.database,
});

export const db = drizzle(pool, { schema });
