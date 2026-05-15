import path from 'path'
import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

// This regex contains the bots that we need to do a blocking render for and can't safely stream the response
// due to how they parse the DOM. For example, they might explicitly check for metadata in the `head` tag, so we can't stream metadata tags after the `head` was sent.
// Note: The pattern [\w-]+-Google captures all Google crawlers with "-Google" suffix (e.g., Mediapartners-Google, AdsBot-Google, Storebot-Google)
// as well as crawlers starting with "Google-" (e.g., Google-PageRenderer, Google-InspectionTool)
export const HTML_LIMITED_BOT_UA_RE =
  /[\w-]+-Google|Google-[\w-]+|Chrome-Lighthouse|applebot|facebookexternalhit|WhatsApp|googleweblight/i

const nextConfig: NextConfig = {
  cacheComponents: true,
  htmlLimitedBots: HTML_LIMITED_BOT_UA_RE,
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '4kav3digtb.ufs.sh',
        port: '',
        pathname: '/f/**',
      },
      {
        protocol: 'https',
        hostname: 'ernn9x55red.exactdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'aspyee.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'centre.aspyee.org',
        port: '',
        pathname: '/**',
      },
      // Legacy UploadThing CDN domains (domain changed from utfs.io → ufs.sh)
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.ufs.sh',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Exclude problematic node_modules from Turbopack processing
  // transpilePackages: [],
  // serverExternalPackages: [
  //     '@esbuild/linux-x64',
  //     '@esbuild/darwin-x64',
  //     '@esbuild/darwin-arm64',
  //     '@esbuild/win32-x64',
  //     'esbuild',
  //     'drizzle-kit',
  //     'esbuild-register',
  //     '@payloadcms/drizzle',
  //     '@payloadcms/db-postgres',
  //   ],
  // webpack: (config, { isServer }) => {
  //   // Ensure Payload config alias is available on both server and client
  //   config.resolve.alias = {
  //     ...(config.resolve.alias || {}),
  //     '@payload-config': path.resolve(__dirname, './src/payload.config.ts'),
  //   }

  //   if (!isServer) {
  //     // On client-side, replace payload and logging packages with empty modules
  //     config.resolve.alias = {
  //       ...config.resolve.alias,
  //       'pino': false,
  //       'thread-stream': false,
  //     }
  //   }
    
  //   // Ignore problematic files from thread-stream package
  //   config.module = config.module || {}
  //   config.module.rules = config.module.rules || []
  //   config.module.rules.push({
  //     test: /thread-stream[\\/]test[\\/]/,
  //     loader: 'ignore-loader',
  //   })
  //   config.module.rules.push({
  //     test: /thread-stream[\/]bench\.js$/,
  //     loader: 'ignore-loader',
  //   })
    
  //   return config
  // },
}

export default withNextIntl(
  withPayload(nextConfig, {
    devBundleServerPackages: false,
  }),
)
