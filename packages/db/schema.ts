import {
  OrganizationJSONSchema,
  OrganizationMembershipJSONSchema,
  UserJSONSchema,
} from "@macknolandev/clerk-zod";
import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod";

const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
};

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  clerkUserId: varchar({ length: 255 }).notNull().unique(),
  firstName: varchar({ length: 255 }),
  lastName: varchar({ length: 255 }),
  birthday: timestamp("birthday"),
  primaryEmailAddress: varchar({ length: 255 }).notNull().unique(),
  emails: jsonb("emails").notNull(),
  primaryPhoneNumber: varchar({ length: 255 }),
  phoneNumbers: jsonb("phone_numbers").notNull(),
  imageUrl: varchar({ length: 255 }),
  _clerkRaw: jsonb("clerk_raw")
    .$type<z.infer<typeof UserJSONSchema>>()
    .notNull(),
  ...timestamps,
});

export const teamsTable = pgTable("teams", {
  id: varchar({ length: 255 }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull(),
  ownerId: integer(),
  onboardingComplete: boolean("onboarding_complete").notNull().default(false),
  _clerkRaw: jsonb("clerk_raw")
    .$type<z.infer<typeof OrganizationJSONSchema>>()
    .notNull(),
  ...timestamps,
});

export const integrationStatus = pgEnum("integration_status", [
  "active",
  "inactive",
]);

export const integrationTypes = pgEnum("integration_types", [
  "stripe",
  // "lemonsqueezy",
]);

export const integrationsTable = pgTable(
  "integrations",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    teamId: varchar({ length: 255 }),
    status: integrationStatus("status").notNull(),
    type: integrationTypes("type").notNull(),
    accessToken: varchar({ length: 255 }),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshToken: varchar({ length: 255 }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    _raw: jsonb("raw"),
    ...timestamps,
  },
  (t) => [unique().on(t.teamId, t.type)]
);

export const teamMembersTable = pgTable("team_members", {
  id: varchar({ length: 255 }).primaryKey(),
  role: varchar({ length: 255 }).notNull(),
  _clerkRaw: jsonb("clerk_raw")
    .$type<z.infer<typeof OrganizationMembershipJSONSchema>>()
    .notNull(),
  teamId: varchar({ length: 255 }),
  userId: integer("user_id"),
  ...timestamps,
});

export const productsTable = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  externalId: varchar({ length: 255 }).notNull(),
  teamId: varchar({ length: 255 }),
  ...timestamps,
});

export const featureTypes = pgEnum("feature_types", ["boolean", "metered"]);
export const featureResetPeriods = pgEnum("feature_reset_periods", [
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
  "billing_period",
]);

export const featuresTable = pgTable("features", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  type: featureTypes("type").notNull(),
  quota: integer("quota"),
  resetPeriod: featureResetPeriods("reset_period").default("billing_period"),
  teamId: varchar({ length: 255 }),
  ...timestamps,
});

export const productFeaturesTable = pgTable(
  "product_features",
  {
    productId: integer(),
    featureId: integer(),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.productId, t.featureId] })]
);

export const customersTable = pgTable(
  "customers",
  {
    externalId: varchar({ length: 255 }).notNull(),
    teamId: varchar({ length: 255 }),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.externalId, t.teamId] })]
);

export const entitlementsTable = pgTable("entitlements", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  customerId: varchar({ length: 255 }).notNull(),
  teamId: varchar({ length: 255 }),
  featureId: integer(),
  expiresAt: timestamp("expires_at"),
  quotaUsed: integer().notNull().default(0),
  ...timestamps,
});

export const userRelations = relations(usersTable, ({ many }) => ({
  teams: many(teamMembersTable),
}));

export const teamMembersRelations = relations(teamMembersTable, ({ one }) => ({
  team: one(teamsTable, {
    fields: [teamMembersTable.teamId],
    references: [teamsTable.id],
  }),
  member: one(usersTable, {
    fields: [teamMembersTable.userId],
    references: [usersTable.id],
  }),
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

export const productFeatureRelations = relations(
  productFeaturesTable,
  ({ one }) => ({
    product: one(productsTable, {
      fields: [productFeaturesTable.productId],
      references: [productsTable.id],
    }),
    feature: one(featuresTable, {
      fields: [productFeaturesTable.featureId],
      references: [featuresTable.id],
    }),
  })
);

export const featureRelations = relations(featuresTable, ({ one, many }) => ({
  products: many(productFeaturesTable),
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
    fields: [entitlementsTable.customerId, entitlementsTable.teamId],
    references: [customersTable.externalId, customersTable.teamId],
  }),
  feature: one(featuresTable, {
    fields: [entitlementsTable.featureId],
    references: [featuresTable.id],
  }),
}));
