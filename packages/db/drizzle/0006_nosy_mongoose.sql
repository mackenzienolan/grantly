DROP TABLE "feature_variants" CASCADE;--> statement-breakpoint
ALTER TABLE "features" ADD COLUMN "type" "feature_types";--> statement-breakpoint
ALTER TABLE "features" ADD COLUMN "quota" integer;--> statement-breakpoint
ALTER TABLE "features" ADD COLUMN "reset_period" "feature_reset_periods";