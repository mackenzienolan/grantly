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

export const teams = pgTable("teams", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  ownerId: integer().references(() => usersTable.id),
  ...timestamps,
});

export const teamMembers = pgTable(
  "team_members",
  {
    teamId: integer().references(() => teams.id),
    userId: integer().references(() => usersTable.id),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.teamId, t.userId] })]
);

export const products = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  externalId: varchar({ length: 255 }).notNull(),
  teamId: integer().references(() => teams.id),
  ...timestamps,
});

export const featureTypes = pgEnum("feature_types", ["boolean", "metered"]);

export const features = pgTable("features", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  productId: integer().references(() => products.id),
  type: featureTypes("type").notNull(),
  ...timestamps,
});

export const productFeatures = pgTable(
  "product_features",
  {
    productId: integer().references(() => products.id),
    featureId: integer().references(() => features.id),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.productId, t.featureId] })]
);
