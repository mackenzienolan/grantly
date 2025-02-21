ALTER TABLE "integrations" ALTER COLUMN "teamId" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_teamId_type_unique" UNIQUE("teamId","type");--> statement-breakpoint
ALTER TABLE "public"."integrations" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."integration_types";--> statement-breakpoint
CREATE TYPE "public"."integration_types" AS ENUM('stripe');--> statement-breakpoint
ALTER TABLE "public"."integrations" ALTER COLUMN "type" SET DATA TYPE "public"."integration_types" USING "type"::"public"."integration_types";