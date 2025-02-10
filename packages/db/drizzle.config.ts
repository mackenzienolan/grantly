import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  out: "./drizzle",
  schema: "./schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: Resource.postgres.host,
    port: Resource.postgres.port,
    user: Resource.postgres.username,
    password: Resource.postgres.password,
    database: Resource.postgres.database,
  },
});
