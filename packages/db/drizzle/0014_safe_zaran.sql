ALTER TABLE "entitlements" ALTER COLUMN "uid" SET DATA TYPE varchar(21);--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "uid" SET DATA TYPE varchar(21);--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "uid" varchar(21) NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "livemode" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "features" ADD COLUMN "livemode" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "integrations" ADD COLUMN "uid" varchar(21) NOT NULL;--> statement-breakpoint
ALTER TABLE "keys" ADD COLUMN "uid" varchar(21) NOT NULL;--> statement-breakpoint
ALTER TABLE "keys" ADD COLUMN "livemode" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "meter_events" ADD COLUMN "uid" varchar(21) NOT NULL;--> statement-breakpoint
ALTER TABLE "meter_events" ADD COLUMN "livemode" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "product_features" ADD COLUMN "uid" varchar(21) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "uid" varchar(21) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "livemode" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "team_members" ADD COLUMN "uid" varchar(21) NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "uid" varchar(21) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "uid" varchar(21) NOT NULL;