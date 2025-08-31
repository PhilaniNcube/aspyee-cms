import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "resources" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_resources_type";
  CREATE TYPE "public"."enum_resources_type" AS ENUM('academic', 'case_study', 'evaluation', 'framework', 'multimedia', 'policy', 'report', 'toolkit');
  ALTER TABLE "resources" ALTER COLUMN "type" SET DATA TYPE "public"."enum_resources_type" USING "type"::"public"."enum_resources_type";
  ALTER TABLE "media" ADD COLUMN "_key" varchar;
  CREATE INDEX "resources_type_idx" ON "resources" USING btree ("type");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "resources" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_resources_type";
  CREATE TYPE "public"."enum_resources_type" AS ENUM('framework', 'report', 'toolkit', 'policy', 'case_study', 'evaluation', 'academic');
  ALTER TABLE "resources" ALTER COLUMN "type" SET DATA TYPE "public"."enum_resources_type" USING "type"::"public"."enum_resources_type";
  DROP INDEX "resources_type_idx";
  ALTER TABLE "media" DROP COLUMN "_key";`)
}
