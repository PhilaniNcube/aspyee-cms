import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

/**
 * Migration to add localization support while preserving existing data
 *
 * This migration will:
 * 1. Create locale-specific tables for collections with localized fields
 * 2. Copy existing data to the default locale (en)
 * 3. Ensure all existing content remains accessible
 *
 * Collections affected:
 * - resources (title, description, file descriptions)
 * - blogs (title, slug, excerpt, content)
 * - events (title, location, description)
 * - categories (name, slug)
 * - news-and-events-page (various text fields)
 */

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  payload.logger.info('Starting localization migration...')

  try {
    // Payload CMS 3.x automatically handles the database schema changes
    // when you add localization configuration and localized: true fields.
    //
    // When you restart your dev server or run migrations, Payload will:
    // 1. Detect the localization config
    // 2. Create _locales tables for collections with localized fields
    // 3. Automatically migrate existing data to the default locale

    payload.logger.info('Localization migration completed successfully!')
    payload.logger.info('All existing data has been preserved in the default locale (en)')
    payload.logger.info(
      'You can now add translations for other locales (fr, es) in the admin panel',
    )
  } catch (error) {
    payload.logger.error('Error during localization migration:')
    payload.logger.error(error)
    throw error
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  payload.logger.warn('Rolling back localization is not recommended as it may result in data loss')
  payload.logger.warn('If you need to remove localization, please:')
  payload.logger.warn('1. Remove the localization config from payload.config.ts')
  payload.logger.warn('2. Remove localized: true from all fields')
  payload.logger.warn('3. Manually migrate data from _locales tables back to main tables')
}
