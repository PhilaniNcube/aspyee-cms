#!/usr/bin/env node
/**
 * Database Structure Checker
 *
 * This script connects to your Neon database and shows:
 * 1. All tables in your database
 * 2. Column structure of main tables (resources, blogs, events, categories)
 * 3. Whether _locales tables exist
 * 4. Sample data from each table
 */

import pg from 'pg'
import { config } from 'dotenv'

// Load environment variables
config()

const { Pool } = pg

async function checkDatabaseStructure() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    console.log('\n🔍 Checking Database Structure...\n')
    console.log('='.repeat(80))

    // 1. List all tables
    console.log('\n📋 ALL TABLES IN DATABASE:\n')
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `)

    const allTables = tablesResult.rows.map((r) => r.table_name)
    console.log(allTables.join('\n'))
    console.log(`\nTotal: ${allTables.length} tables`)

    // 2. Check for _locales tables
    console.log('\n' + '='.repeat(80))
    console.log('\n🌐 LOCALES TABLES:\n')
    const localesTables = allTables.filter((t) => t.endsWith('_locales'))
    if (localesTables.length > 0) {
      console.log('✅ Found locales tables:')
      localesTables.forEach((t) => console.log(`  - ${t}`))
    } else {
      console.log('❌ NO _locales tables found')
    }

    // 3. Check structure of main collections
    const collections = ['resources', 'blogs', 'events', 'categories', 'news_and_events_page']

    for (const collection of collections) {
      if (allTables.includes(collection)) {
        console.log('\n' + '='.repeat(80))
        console.log(`\n📊 TABLE: ${collection.toUpperCase()}\n`)

        // Get columns
        const columnsResult = await pool.query(
          `
          SELECT 
            column_name, 
            data_type, 
            is_nullable,
            column_default
          FROM information_schema.columns 
          WHERE table_name = $1 
          ORDER BY ordinal_position
        `,
          [collection],
        )

        console.log('Columns:')
        columnsResult.rows.forEach((col) => {
          console.log(
            `  - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'}`,
          )
        })

        // Count rows
        const countResult = await pool.query(`SELECT COUNT(*) as count FROM ${collection}`)
        console.log(`\nTotal rows: ${countResult.rows[0].count}`)

        // Show sample data (first 3 rows, limited columns)
        const hasTitle = columnsResult.rows.some((col) => col.column_name === 'title')
        const hasName = columnsResult.rows.some((col) => col.column_name === 'name')

        if (hasTitle || hasName) {
          const titleCol = hasTitle ? 'title' : 'name'
          const sampleResult = await pool.query(`
            SELECT id, ${titleCol}, created_at 
            FROM ${collection} 
            ORDER BY id 
            LIMIT 3
          `)

          if (sampleResult.rows.length > 0) {
            console.log(`\nSample data (first 3 rows):`)
            sampleResult.rows.forEach((row) => {
              console.log(
                `  ID ${row.id}: "${row[titleCol] || 'NULL'}" (created: ${row.created_at})`,
              )
            })
          }
        }

        // Check corresponding _locales table
        const localesTable = `${collection}_locales`
        if (allTables.includes(localesTable)) {
          console.log(`\n🌐 LOCALES TABLE: ${localesTable}`)

          const localesColumnsResult = await pool.query(
            `
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = $1 
            ORDER BY ordinal_position
          `,
            [localesTable],
          )

          console.log('Columns:')
          localesColumnsResult.rows.forEach((col) => {
            console.log(`  - ${col.column_name} (${col.data_type})`)
          })

          const localesCountResult = await pool.query(
            `SELECT COUNT(*) as count FROM ${localesTable}`,
          )
          console.log(`Total rows: ${localesCountResult.rows[0].count}`)

          // Show sample localized data
          const localesSampleResult = await pool.query(`
            SELECT _parent_id, _locale, title, name 
            FROM ${localesTable} 
            LIMIT 5
          `)

          if (localesSampleResult.rows.length > 0) {
            console.log(`\nSample localized data:`)
            localesSampleResult.rows.forEach((row) => {
              const content = row.title || row.name || 'NULL'
              console.log(`  Parent ID ${row._parent_id} [${row._locale}]: "${content}"`)
            })
          }
        }
      }
    }

    console.log('\n' + '='.repeat(80))
    console.log('\n✅ Database structure check complete!\n')
  } catch (error) {
    console.error('❌ Error checking database structure:', error)
  } finally {
    await pool.end()
  }
}

checkDatabaseStructure()
