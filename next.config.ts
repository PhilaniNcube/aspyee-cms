import path from 'path'
import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  cacheComponents: true,
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
    ],
  },
  // Exclude problematic node_modules from Turbopack processing
  transpilePackages: [],
  serverExternalPackages: [
      '@esbuild/linux-x64',
      '@esbuild/darwin-x64',
      '@esbuild/darwin-arm64',
      '@esbuild/win32-x64',
      'esbuild',
      'drizzle-kit',
      'esbuild-register',
      '@payloadcms/drizzle',
      '@payloadcms/db-postgres',
    ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // On client-side, replace payload and logging packages with empty modules
      config.resolve.alias = {
        ...config.resolve.alias,
        'payload': false,
        'pino': false,
        'thread-stream': false,
      }
    }
    
    // Ignore problematic files from thread-stream package
    config.module = config.module || {}
    config.module.rules = config.module.rules || []
    config.module.rules.push({
      test: /thread-stream[\\/]test[\\/]/,
      loader: 'ignore-loader',
    })
    config.module.rules.push({
      test: /thread-stream[\/]bench\.js$/,
      loader: 'ignore-loader',
    })

    // Ensure Payload config alias is available on both server and client
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@payload-config': path.resolve(__dirname, './src/payload.config.ts'),
    }
    
    return config
  },
}

export default withNextIntl(
  withPayload(nextConfig, {
    devBundleServerPackages: false,
  }),
)
