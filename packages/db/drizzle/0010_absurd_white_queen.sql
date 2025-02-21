ALTER TABLE "features" ADD COLUMN "key" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "features" ADD CONSTRAINT "features_teamId_key_unique" UNIQUE("teamId","key");