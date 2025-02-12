import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  ...timestamps,
});

export const teamsTable = pgTable("teams", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  ownerId: integer().references(() => usersTable.id),
  ...timestamps,
});

export const integrationStatus = pgEnum("integration_status", [
  "active",
  "inactive",
]);

export const integrationTypes = pgEnum("integration_types", [
  "stripe",
  "lemonsqueezy",
]);

export const integrationsTable = pgTable("integrations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  teamId: integer().references(() => teamsTable.id),
  status: integrationStatus("status").notNull(),
  type: integrationTypes("type").notNull(),
  accessToken: varchar({ length: 255 }).notNull(),
  accessTokenExpiresAt: timestamp("access_token_expires_at").notNull(),
  refreshToken: varchar({ length: 255 }).notNull(),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at").notNull(),
  ...timestamps,
});

export const teamMembersTable = pgTable(
  "team_members",
  {
    teamId: integer().references(() => teamsTable.id),
    userId: integer().references(() => usersTable.id),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.teamId, t.userId] })]
);

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  externalId: varchar({ length: 255 }).notNull(),
  teamId: integer().references(() => teamsTable.id),
  ...timestamps,
});

export const featureTypes = pgEnum("feature_types", ["boolean", "metered"]);

export const featuresTable = pgTable("features", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  productId: integer().references(() => productsTable.id),
  type: featureTypes("type").notNull(),
  teamId: integer().references(() => teamsTable.id),
  ...timestamps,
});

export const productFeaturesTable = pgTable(
  "product_features",
  {
    productId: integer().references(() => productsTable.id),
    featureId: integer().references(() => featuresTable.id),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.productId, t.featureId] })]
);

export const customersTable = pgTable("customers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  externalId: varchar({ length: 255 }).notNull(),
  teamId: integer().references(() => teamsTable.id),
  ...timestamps,
});

export const entitlementsTable = pgTable("entitlements", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  customerId: integer().references(() => customersTable.id),
  featureId: integer().references(() => featuresTable.id),
  expiresAt: timestamp("expires_at"),
  quotaUsed: integer().notNull().default(0),
  ...timestamps,
});

export const userRelations = relations(usersTable, ({ many }) => ({
  teams: many(teamMembersTable),
}));

export const teamRelations = relations(teamsTable, ({ many, one }) => ({
  members: many(teamMembersTable),
  integrations: many(integrationsTable),
  customers: many(customersTable),
}));

export const integrationRelations = relations(integrationsTable, ({ one }) => ({
  team: one(teamsTable, {
    fields: [integrationsTable.teamId],
    references: [teamsTable.id],
  }),
}));

export const productRelations = relations(productsTable, ({ many }) => ({
  features: many(productFeaturesTable),
}));

export const featureRelations = relations(featuresTable, ({ one, many }) => ({
  product: one(productsTable, {
    fields: [featuresTable.productId],
    references: [productsTable.id],
  }),
  entitlements: many(entitlementsTable),
}));

export const customerRelations = relations(customersTable, ({ many, one }) => ({
  entitlements: many(entitlementsTable),
  team: one(teamsTable, {
    fields: [customersTable.teamId],
    references: [teamsTable.id],
  }),
}));

export const entitlementRelations = relations(entitlementsTable, ({ one }) => ({
  customer: one(customersTable, {
    fields: [entitlementsTable.customerId],
    references: [customersTable.id],
  }),
  feature: one(featuresTable, {
    fields: [entitlementsTable.featureId],
    references: [featuresTable.id],
  }),
}));
