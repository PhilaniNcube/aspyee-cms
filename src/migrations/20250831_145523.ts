import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_resources_themes" AS ENUM('Industrial, technical and vocational training', 'Gender and Transformation', 'Entrepreneurship and informal sector formalisation', 'Labour migration & mobility', 'Digital skills & future of work', 'Education systems & policy', 'Financing & investment in skills', 'Informal sector & livelihoods', 'Green skills / sustainability', 'Innovation & partnerships');
  CREATE TYPE "public"."enum_resources_target_groups" AS ENUM('Policymakers', 'Educators & Implementers', 'Youth', 'Private Sector / Employers', 'Researchers', 'TVET Managers / Principals', 'HR / Labour Market Actors', 'Donors & Development Partners');
  CREATE TYPE "public"."enum_resources_type" AS ENUM('framework', 'report', 'toolkit', 'policy', 'case_study', 'evaluation', 'academic');
  CREATE TYPE "public"."enum_resources_good_practice" AS ENUM('yes', 'no');
  CREATE TYPE "public"."enum_resources_language" AS ENUM('English', 'French', 'Portuguese', 'Arabic', 'Other');
  CREATE TYPE "public"."enum_resources_publisher" AS ENUM('African Union', 'ILO', 'UNESCO', 'World Bank', 'African Development Bank', 'UNECA', 'UNICEF', 'UNDP', 'GIZ', 'British Council', 'European Union', 'USAID', 'Other');
  CREATE TYPE "public"."enum_countries_type" AS ENUM('continental', 'regional', 'country');
  CREATE TYPE "public"."enum_countries_region" AS ENUM('africa_wide', 'north_africa', 'west_africa', 'central_africa', 'east_africa', 'southern_africa');
  CREATE TABLE "resources_themes" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_resources_themes",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "resources_target_groups" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_resources_target_groups",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "resources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"type" "enum_resources_type" NOT NULL,
  	"good_practice" "enum_resources_good_practice" NOT NULL,
  	"language" "enum_resources_language" NOT NULL,
  	"country_region_id" integer NOT NULL,
  	"year_published" numeric,
  	"publisher" "enum_resources_publisher",
  	"custom_publisher" varchar,
  	"featured_image_id" integer,
  	"description" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "countries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"type" "enum_countries_type" NOT NULL,
  	"region" "enum_countries_region",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "resources_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "countries_id" integer;
  ALTER TABLE "resources_themes" ADD CONSTRAINT "resources_themes_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources_target_groups" ADD CONSTRAINT "resources_target_groups_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_country_region_id_countries_id_fk" FOREIGN KEY ("country_region_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "resources_themes_order_idx" ON "resources_themes" USING btree ("order");
  CREATE INDEX "resources_themes_parent_idx" ON "resources_themes" USING btree ("parent_id");
  CREATE INDEX "resources_target_groups_order_idx" ON "resources_target_groups" USING btree ("order");
  CREATE INDEX "resources_target_groups_parent_idx" ON "resources_target_groups" USING btree ("parent_id");
  CREATE INDEX "resources_country_region_idx" ON "resources" USING btree ("country_region_id");
  CREATE INDEX "resources_featured_image_idx" ON "resources" USING btree ("featured_image_id");
  CREATE INDEX "resources_updated_at_idx" ON "resources" USING btree ("updated_at");
  CREATE INDEX "resources_created_at_idx" ON "resources" USING btree ("created_at");
  CREATE UNIQUE INDEX "countries_value_idx" ON "countries" USING btree ("value");
  CREATE INDEX "countries_updated_at_idx" ON "countries" USING btree ("updated_at");
  CREATE INDEX "countries_created_at_idx" ON "countries" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_resources_id_idx" ON "payload_locked_documents_rels" USING btree ("resources_id");
  CREATE INDEX "payload_locked_documents_rels_countries_id_idx" ON "payload_locked_documents_rels" USING btree ("countries_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "resources_themes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "resources_target_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "countries" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "resources_themes" CASCADE;
  DROP TABLE "resources_target_groups" CASCADE;
  DROP TABLE "resources" CASCADE;
  DROP TABLE "countries" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_resources_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_countries_fk";
  
  DROP INDEX "payload_locked_documents_rels_resources_id_idx";
  DROP INDEX "payload_locked_documents_rels_countries_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "resources_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "countries_id";
  DROP TYPE "public"."enum_resources_themes";
  DROP TYPE "public"."enum_resources_target_groups";
  DROP TYPE "public"."enum_resources_type";
  DROP TYPE "public"."enum_resources_good_practice";
  DROP TYPE "public"."enum_resources_language";
  DROP TYPE "public"."enum_resources_publisher";
  DROP TYPE "public"."enum_countries_type";
  DROP TYPE "public"."enum_countries_region";`)
}
