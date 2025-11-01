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
    ],
  },
  // Exclude problematic node_modules from Turbopack processing
  transpilePackages: [],
  serverExternalPackages: ['@esbuild/linux-x64', 'esbuild', 'drizzle-kit', 'esbuild-register'],
  // Acknowledge Turbopack as default bundler in Next.js 16
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mark esbuild and platform-specific packages as external
      config.externals = config.externals || []
      if (Array.isArray(config.externals)) {
        config.externals.push('esbuild', '@esbuild/linux-x64', 'drizzle-kit')
      }
    }
    return config
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
