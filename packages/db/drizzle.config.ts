import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  out: "./drizzle",
  schema: "./schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    ssl: Resource.App.stage === "prod" ? { rejectUnauthorized: true } : false,
    host: Resource["postgres-v2"].host,
    port: Resource["postgres-v2"].port,
    user: Resource["postgres-v2"].username,
    password: Resource["postgres-v2"].password,
    database: Resource["postgres-v2"].database,
  },
});
