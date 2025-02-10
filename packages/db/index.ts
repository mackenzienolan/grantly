import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Resource } from "sst";
import * as schema from "./schema";

const pool = new Pool({
  host: Resource.postgres.host,
  port: Resource.postgres.port,
  user: Resource.postgres.username,
  password: Resource.postgres.password,
  database: Resource.postgres.database,
});

export const db = drizzle(pool, { schema });
