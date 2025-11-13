import { getPayload } from 'payload'
import config from './src/payload.config.js'

async function checkDatabase() {
  try {
    console.log('\n🔍 Checking Payload Database...\n')
    console.log('=' .repeat(80))

    const payload = await getPayload({ config })

    // Check Resources
    console.log('\n📊 RESOURCES COLLECTION:\n')
    const resources = await payload.find({
      collection: 'resources',
      limit: 3,
      locale: 'en',
    })
    
    console.log(`Total resources: ${resources.totalDocs}`)
    console.log('\nFirst 3 resources:')
    resources.docs.forEach((doc, i) => {
      console.log(`  ${i + 1}. ID ${doc.id}: "${doc.title || 'NO TITLE'}"`)
      console.log(`     Type: ${doc.type}`)
    })

    // Try to check if _locales table exists by querying with locale
    console.log('\n🌐 Testing localization...')
    try {
      const resourcesAllLocales = await payload.find({
        collection: 'resources',
        limit: 1,
        locale: 'all',
      })
      console.log('✅ Localization is working!')
      if (resourcesAllLocales.docs[0]) {
        console.log('\nFirst resource in all locales:')
        console.log(JSON.stringify(resourcesAllLocales.docs[0], null, 2))
      }
    } catch (err) {
      console.log('❌ Localization query failed:', err.message)
    }

    // Check Blogs
    console.log('\n\n📝 BLOGS COLLECTION:\n')
    const blogs = await payload.find({
      collection: 'blogs',
      limit: 3,
      locale: 'en',
    })
    
    console.log(`Total blogs: ${blogs.totalDocs}`)
    console.log('\nFirst 3 blogs:')
    blogs.docs.forEach((doc, i) => {
      console.log(`  ${i + 1}. ID ${doc.id}: "${doc.title || 'NO TITLE'}"`)
    })

    // Check Events
    console.log('\n\n📅 EVENTS COLLECTION:\n')
    const events = await payload.find({
      collection: 'events',
      limit: 3,
      locale: 'en',
    })
    
    console.log(`Total events: ${events.totalDocs}`)
    console.log('\nFirst 3 events:')
    events.docs.forEach((doc, i) => {
      console.log(`  ${i + 1}. ID ${doc.id}: "${doc.title || 'NO TITLE'}"`)
    })

    // Check Categories
    console.log('\n\n🏷️  CATEGORIES COLLECTION:\n')
    const categories = await payload.find({
      collection: 'categories',
      limit: 10,
      locale: 'en',
    })
    
    console.log(`Total categories: ${categories.totalDocs}`)
    console.log('\nAll categories:')
    categories.docs.forEach((doc, i) => {
      console.log(`  ${i + 1}. ID ${doc.id}: "${doc.name || 'NO NAME'}"`)
    })

    console.log('\n' + '='.repeat(80))
    console.log('\n✅ Check complete!\n')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

checkDatabase()
