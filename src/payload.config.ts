// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'

// NOTE: Users collection resides in a nested folder with lowercase `users` and a `config.ts` file.
// Import adjusted to match actual path to fix module resolution during Payload type generation.
import { Users } from './collections/users/config'
import { Media } from './collections/Media'
import { Resources } from './collections/Resources'
import { Bookmarks } from './collections/Bookmarks'
import { Downloads } from './collections/Downloads'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Resources, Bookmarks, Downloads],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    uploadthingStorage({
      collections: {
        media: true,
      },
      clientUploads: true,

      options: {
        token: process.env.UPLOADTHING_TOKEN,
      },
    }),
  ],
})
