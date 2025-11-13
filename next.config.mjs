import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  images: {
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
  // Acknowledge Turbopack as default bundler in Next.js 16
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mark esbuild and platform-specific packages as external
      config.externals = config.externals || []
      if (Array.isArray(config.externals)) {
        config.externals.push('esbuild', '@esbuild/linux-x64', 'drizzle-kit', 'esbuild-register')
      }
    }

    // Exclude test files and non-JS files from node_modules to prevent build errors
    config.resolve = config.resolve || {}
    config.resolve.alias = config.resolve.alias || {}

    // Add module rules to exclude non-JS files from being processed
    config.module = config.module || {}
    config.module.rules = config.module.rules || []
    config.module.rules.push({
      test: /\/(LICENSE|README|CHANGELOG|\.md|\.txt)$/i,
      type: 'asset/resource',
      generator: {
        emit: false,
      },
    })

    // Ignore test files, LICENSE, and other non-JS files in node_modules
    config.plugins = config.plugins || []
    config.plugins.push(
      new (require('webpack').IgnorePlugin)({
        checkResource: (resource, context) => {
          // Completely ignore thread-stream test directory
          if (context.includes('thread-stream') && resource.includes('/test/')) {
            return true
          }
          // Ignore test directories and files
          if (/\/test\//.test(resource) || /\.test\.js$/.test(resource)) {
            return true
          }
          // Ignore LICENSE and other non-JS files in node_modules
          if (
            context.includes('node_modules') &&
            (/LICENSE$/i.test(resource) ||
              /README/i.test(resource) ||
              /CHANGELOG/i.test(resource) ||
              /\.md$/i.test(resource) ||
              /\.txt$/i.test(resource))
          ) {
            return true
          }
          return false
        },
      }),
    )

    return config
  },
}

export default withNextIntl(
  withPayload(nextConfig, {
    devBundleServerPackages: false,
    // Ensure server packages are properly externalized
    serverExternals: ['esbuild', 'drizzle-kit', '@esbuild/linux-x64'],
  }),
)
