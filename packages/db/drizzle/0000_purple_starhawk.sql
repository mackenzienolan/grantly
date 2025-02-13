CREATE TYPE "public"."feature_types" AS ENUM('boolean', 'metered');--> statement-breakpoint
CREATE TYPE "public"."integration_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."integration_types" AS ENUM('stripe', 'lemonsqueezy');--> statement-breakpoint
CREATE TABLE "customers" (
	"externalId" varchar(255) NOT NULL,
	"teamId" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "customers_externalId_teamId_pk" PRIMARY KEY("externalId","teamId")
);
--> statement-breakpoint
CREATE TABLE "entitlements" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "entitlements_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"customerId" varchar(255) NOT NULL,
	"teamId" varchar(255),
	"featureId" integer,
	"expires_at" timestamp,
	"quotaUsed" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "features" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "features_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"productId" integer,
	"type" "feature_types" NOT NULL,
	"teamId" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "integrations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "integrations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"teamId" integer,
	"status" "integration_status" NOT NULL,
	"type" "integration_types" NOT NULL,
	"accessToken" varchar(255) NOT NULL,
	"access_token_expires_at" timestamp NOT NULL,
	"refreshToken" varchar(255) NOT NULL,
	"refresh_token_expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "product_features" (
	"productId" integer,
	"featureId" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "product_features_productId_featureId_pk" PRIMARY KEY("productId","featureId")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"externalId" varchar(255) NOT NULL,
	"teamId" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"role" varchar(255) NOT NULL,
	"clerk_raw" jsonb NOT NULL,
	"teamId" varchar(255),
	"userId" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"ownerId" integer,
	"clerk_raw" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"clerkUserId" varchar(255) NOT NULL,
	"firstName" varchar(255),
	"lastName" varchar(255),
	"birthday" date,
	"primaryEmailAddress" varchar(255) NOT NULL,
	"emails" jsonb NOT NULL,
	"primaryPhoneNumber" varchar(255),
	"phone_numbers" jsonb NOT NULL,
	"imageUrl" varchar(255),
	"clerk_raw" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_primaryEmailAddress_unique" UNIQUE("primaryEmailAddress")
);
