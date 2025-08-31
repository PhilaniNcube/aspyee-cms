-- Fix region column type conversion
BEGIN;

-- Drop the problematic column if it exists
ALTER TABLE "resources" DROP COLUMN IF EXISTS "region";

-- Create the enum type if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_resources_region') THEN
        CREATE TYPE "public"."enum_resources_region" AS ENUM('Continental', 'East_Africa', 'West_Africa', 'Central_Africa', 'North_Africa', 'Southern_Africa');
    END IF;
END $$;

-- Add the column with the correct enum type
ALTER TABLE "resources" ADD COLUMN "region" "public"."enum_resources_region";

COMMIT;
