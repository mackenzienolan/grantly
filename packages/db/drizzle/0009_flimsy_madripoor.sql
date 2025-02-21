ALTER TABLE "integrations" ALTER COLUMN "accessToken" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "integrations" ALTER COLUMN "access_token_expires_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "integrations" ALTER COLUMN "refreshToken" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "integrations" ALTER COLUMN "refresh_token_expires_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "integrations" ADD COLUMN "raw" jsonb;--> statement-breakpoint
ALTER TABLE "integrations" DROP COLUMN "name";