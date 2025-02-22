CREATE TABLE "product_features" (
	"product_id" integer NOT NULL,
	"feature_id" integer NOT NULL,
	"teamId" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "product_features_product_id_feature_id_teamId_pk" PRIMARY KEY("product_id","feature_id","teamId")
);
--> statement-breakpoint
ALTER TABLE "features" ADD CONSTRAINT "features_teamId_key_pk" PRIMARY KEY("teamId","key");