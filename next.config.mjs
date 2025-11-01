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
  // Acknowledge Turbopack as default bundler in Next.js 16
  // PayloadCMS may add webpack config internally - this suppresses the warning
  turbopack: {
    rules: {
      // Ignore README.md files in node_modules
      '*.md': {
        loaders: ['ignore-loader'],
        as: '*.js',
      },
    },
  },
  webpack: (config) => {
    // Fallback for webpack mode
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    })
    return config
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
