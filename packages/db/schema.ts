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
