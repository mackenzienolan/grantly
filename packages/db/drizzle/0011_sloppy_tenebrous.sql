CREATE TYPE "public"."key_types" AS ENUM('api_key', 'publishable_key');--> statement-breakpoint
CREATE TYPE "public"."meter_event_types" AS ENUM('increment', 'decrement');--> statement-breakpoint
CREATE TABLE "keys" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "keys_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"key" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"type" "key_types" NOT NULL,
	"teamId" varchar(255) NOT NULL,
	"created_by" integer NOT NULL,
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "meter_events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "meter_events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"eventId" varchar(255) NOT NULL,
	"event_type" "meter_event_types" NOT NULL,
	"amount" integer NOT NULL,
	"featureKey" varchar(255) NOT NULL,
	"teamId" varchar(255) NOT NULL,
	"customerId" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "meter_events_eventId_teamId_unique" UNIQUE("eventId","teamId")
);
--> statement-breakpoint
ALTER TABLE "product_features" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "product_features" CASCADE;--> statement-breakpoint
ALTER TABLE "features" DROP CONSTRAINT "features_teamId_key_unique";--> statement-breakpoint
ALTER TABLE "entitlements" ALTER COLUMN "teamId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "entitlements" ADD COLUMN "uid" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "entitlements" ADD COLUMN "featureKey" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "entitlements" ADD COLUMN "resets_at" timestamp;--> statement-breakpoint
ALTER TABLE "features" ADD COLUMN "uid" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "entitlements" DROP COLUMN "featureId";--> statement-breakpoint
ALTER TABLE "features" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "entitlements" ADD CONSTRAINT "entitlements_customerId_teamId_featureKey_unique" UNIQUE("customerId","teamId","featureKey");