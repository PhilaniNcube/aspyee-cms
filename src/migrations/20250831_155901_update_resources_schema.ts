import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_resources_countries" AS ENUM('Algeria', 'Egypt', 'Libya', 'Morocco', 'Sudan', 'Tunisia', 'Benin', 'Burkina_Faso', 'Cape_Verde', 'Cote_dIvoire', 'Gambia', 'Ghana', 'Guinea', 'Guinea_Bissau', 'Liberia', 'Mali', 'Mauritania', 'Niger', 'Nigeria', 'Senegal', 'Sierra_Leone', 'Togo', 'Cameroon', 'Central_African_Republic', 'Chad', 'Democratic_Republic_of_Congo', 'Equatorial_Guinea', 'Gabon', 'Republic_of_Congo', 'Sao_Tome_and_Principe', 'Burundi', 'Comoros', 'Djibouti', 'Eritrea', 'Ethiopia', 'Kenya', 'Madagascar', 'Mauritius', 'Rwanda', 'Seychelles', 'Somalia', 'South_Sudan', 'Tanzania', 'Uganda', 'Angola', 'Botswana', 'Eswatini', 'Lesotho', 'Malawi', 'Mozambique', 'Namibia', 'South_Africa', 'Zambia', 'Zimbabwe');
  CREATE TYPE "public"."enum_resources_region" AS ENUM('Continental', 'East_Africa', 'West_Africa', 'Central_Africa', 'North_Africa', 'Southern_Africa');
  ALTER TYPE "public"."enum_resources_target_groups" ADD VALUE 'Multimedia' BEFORE 'Private Sector / Employers';
  CREATE TABLE "resources_countries" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_resources_countries",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "resources" DROP CONSTRAINT "resources_country_region_id_countries_id_fk";
  
  DROP INDEX "resources_country_region_idx";
  ALTER TABLE "resources" ADD COLUMN "region" "enum_resources_region";
  ALTER TABLE "resources_countries" ADD CONSTRAINT "resources_countries_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "resources_countries_order_idx" ON "resources_countries" USING btree ("order");
  CREATE INDEX "resources_countries_parent_idx" ON "resources_countries" USING btree ("parent_id");
  ALTER TABLE "resources" DROP COLUMN "country_region_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "resources_countries" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "resources_countries" CASCADE;
  ALTER TABLE "resources_target_groups" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_resources_target_groups";
  CREATE TYPE "public"."enum_resources_target_groups" AS ENUM('Policymakers', 'Educators & Implementers', 'Youth', 'Private Sector / Employers', 'Researchers', 'TVET Managers / Principals', 'HR / Labour Market Actors', 'Donors & Development Partners');
  ALTER TABLE "resources_target_groups" ALTER COLUMN "value" SET DATA TYPE "public"."enum_resources_target_groups" USING "value"::"public"."enum_resources_target_groups";
  ALTER TABLE "resources" ADD COLUMN "country_region_id" integer NOT NULL;
  ALTER TABLE "resources" ADD CONSTRAINT "resources_country_region_id_countries_id_fk" FOREIGN KEY ("country_region_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "resources_country_region_idx" ON "resources" USING btree ("country_region_id");
  ALTER TABLE "resources" DROP COLUMN "region";
  DROP TYPE "public"."enum_resources_countries";
  DROP TYPE "public"."enum_resources_region";`)
}
