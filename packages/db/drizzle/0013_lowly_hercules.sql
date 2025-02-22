ALTER TABLE "keys" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "keys" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;