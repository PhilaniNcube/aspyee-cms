import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Adds downloads table and download_count column on resources
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "resources" ADD COLUMN IF NOT EXISTS "download_count" int DEFAULT 0;
    CREATE TABLE IF NOT EXISTS "downloads" (
      "id" serial PRIMARY KEY,
      "resource_id" integer NOT NULL REFERENCES "resources"("id") ON DELETE CASCADE,
      "user_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
      "file_id" varchar,
      "ip" varchar,
      "userAgent" varchar,
      "createdAt" timestamp with time zone DEFAULT now(),
      "updatedAt" timestamp with time zone DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS "downloads_resource_idx" ON "downloads" USING btree ("resource_id");
    CREATE INDEX IF NOT EXISTS "downloads_user_idx" ON "downloads" USING btree ("user_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "downloads_user_idx";
    DROP INDEX IF EXISTS "downloads_resource_idx";
    DROP TABLE IF EXISTS "downloads";
    ALTER TABLE "resources" DROP COLUMN IF EXISTS "download_count";
  `)
}
