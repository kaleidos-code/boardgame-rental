import path from 'path'
import { fileURLToPath } from 'url'

import withPlaiceholder from '@plaiceholder/next'
import withBundleAnalyzer from '@next/bundle-analyzer'

import i18n from './i18nconfig.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  output: 'standalone',
  experimental: {
    serverMinification: false
  },
  images: {
    remotePatterns: [{
      protocol: 'http',
      hostname: 'localhost',
      port: process.env.NODE_ENV === 'development' ? '3000' : '3090'
    }]
  }
}

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

export default bundleAnalyzer(withPlaiceholder(nextConfig))
