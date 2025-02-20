CREATE TYPE "public"."feature_reset_periods" AS ENUM('daily', 'weekly', 'monthly', 'yearly', 'never', 'billing_period');--> statement-breakpoint
CREATE TABLE "feature_variants" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "feature_variants_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"feature_id" integer,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"type" "feature_types" NOT NULL,
	"quota" integer,
	"reset_period" "feature_reset_periods",
	"teamId" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "features" ADD COLUMN "description" varchar(255);--> statement-breakpoint
ALTER TABLE "features" DROP COLUMN "productId";--> statement-breakpoint
ALTER TABLE "features" DROP COLUMN "type";