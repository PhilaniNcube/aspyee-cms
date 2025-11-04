import { withPayload } from '@payloadcms/next/withPayload'

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
    return config
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
  // Ensure server packages are properly externalized
  serverExternals: ['esbuild', 'drizzle-kit', '@esbuild/linux-x64'],
})
