ALTER TABLE "features" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "features" ALTER COLUMN "reset_period" SET DEFAULT 'billing_period';