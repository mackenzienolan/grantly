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
import { nanoid } from "nanoid";
import { omit } from "radash";
import { z } from "zod";

const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
};

const livemode = boolean("livemode").notNull().default(true);

const timestampsHardDelete = omit(timestamps, ["deletedAt"]);

// Helper for uid field
const uid = () =>
  varchar("uid", { length: 21 })
    .notNull()
    .$defaultFn(() => nanoid());

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  uid: uid(),
  clerkUserId: varchar({ length: 255 }).notNull().unique(),
  firstName: varchar({ length: 255 }),
  lastName: varchar({ length: 255 }),
  birthday: timestamp("birthday"),
  primaryEmailAddress: varchar({ length: 255 }).notNull().unique(),
  emails: jsonb("emails").notNull(),
  primaryPhoneNumber: varchar({ length: 255 }),
  phoneNumbers: jsonb("phone_numbers").notNull(),
  imageUrl: varchar({ length: 255 }),
  _clerkRaw: jsonb("clerk_raw").$type<z.infer<typeof UserJSONSchema>>().notNull(),
  ...timestamps,
});

export const teamsTable = pgTable("teams", {
  id: varchar({ length: 255 }).primaryKey(),
  uid: uid(),
  name: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull(),
  ownerId: integer(),
  onboardingComplete: boolean("onboarding_complete").notNull().default(false),
  _clerkRaw: jsonb("clerk_raw").$type<z.infer<typeof OrganizationJSONSchema>>().notNull(),
  ...timestamps,
});

export const integrationStatus = pgEnum("integration_status", ["active", "inactive"]);

export const integrationTypes = pgEnum("integration_types", ["stripe"]);

export const integrationsTable = pgTable(
  "integrations",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    uid: uid(),
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
  uid: uid(),
  role: varchar({ length: 255 }).notNull(),
  _clerkRaw: jsonb("clerk_raw").$type<z.infer<typeof OrganizationMembershipJSONSchema>>().notNull(),
  teamId: varchar({ length: 255 }),
  userId: integer("user_id"),
  ...timestamps,
});

export const productsTable = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  uid: uid(),
  name: varchar({ length: 255 }).notNull(),
  externalId: varchar({ length: 255 }).notNull(),
  teamId: varchar({ length: 255 }),
  livemode,
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

export const featuresTable = pgTable(
  "features",
  {
    uid: uid(),
    name: varchar({ length: 255 }).notNull(),
    key: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }),
    type: featureTypes("type").notNull(),
    quota: integer("quota"),
    resetPeriod: featureResetPeriods("reset_period").default("billing_period"),
    teamId: varchar({ length: 255 }),
    livemode,
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.teamId, t.key] })]
);

export const productFeaturesTable = pgTable(
  "product_features",
  {
    uid: uid(),
    productId: integer("product_id").notNull(),
    featureId: integer("feature_id").notNull(),
    teamId: varchar({ length: 255 }).notNull(),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.productId, t.featureId, t.teamId] })]
);

export const customersTable = pgTable(
  "customers",
  {
    uid: uid(),
    externalId: varchar({ length: 255 }).notNull(),
    teamId: varchar({ length: 255 }),
    livemode,
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.externalId, t.teamId] })]
);

export const meterEventTypes = pgEnum("meter_event_types", ["increment", "decrement"]);

export const meterEventsTable = pgTable(
  "meter_events",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    uid: uid(),
    eventId: varchar({ length: 255 }).notNull(),
    eventType: meterEventTypes("event_type").notNull(),
    amount: integer().notNull(),
    featureKey: varchar({ length: 255 }).notNull(),
    teamId: varchar({ length: 255 }).notNull(),
    customerId: varchar({ length: 255 }).notNull(),
    livemode,
    ...timestamps,
  },
  (t) => [unique().on(t.eventId, t.teamId)]
);

export const entitlementsTable = pgTable(
  "entitlements",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    uid: uid(),
    customerId: varchar({ length: 255 }).notNull(),
    teamId: varchar({ length: 255 }).notNull(),
    featureKey: varchar({ length: 255 }).notNull(),
    expiresAt: timestamp("expires_at"),
    quotaUsed: integer().notNull().default(0),
    resetsAt: timestamp("resets_at"),
    ...timestamps,
  },
  (t) => [unique().on(t.customerId, t.teamId, t.featureKey)]
);

export const keyTypes = pgEnum("key_types", ["api_key", "publishable_key"]);
export const keysTable = pgTable("keys", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  uid: uid(),
  key: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  type: keyTypes("type").notNull(),
  teamId: varchar({ length: 255 }).notNull(),
  createdBy: integer("created_by").notNull(),
  expiresAt: timestamp("expires_at"),
  livemode,
  ...timestampsHardDelete,
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

export const productFeatureRelations = relations(productFeaturesTable, ({ one }) => ({
  product: one(productsTable, {
    fields: [productFeaturesTable.productId],
    references: [productsTable.id],
  }),
  feature: one(featuresTable, {
    fields: [productFeaturesTable.featureId, productFeaturesTable.teamId],
    references: [featuresTable.key, featuresTable.teamId],
  }),
}));

export const featureRelations = relations(featuresTable, ({ one, many }) => ({
  // products: many(productFeaturesTable),
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
    fields: [entitlementsTable.featureKey],
    references: [featuresTable.key],
  }),
}));
