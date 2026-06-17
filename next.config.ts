import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),

  // Tree-shake barrel imports lourds (phosphor-icons, lucide, etc.)
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react', 'lucide-react'],
  },
  // Optimisation SEO
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      },
    ]
  },

  // L'ancienne page /tarifs (design obsolète) est remplacée par la section
  // tarifs de la home → redirection permanente pour préserver le SEO.
  async redirects() {
    return [
      {
        source: '/tarifs',
        destination: '/#tarifs',
        permanent: true,
      },
    ]
  },

  // Optimisation images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: 'https', hostname: 'solyb.fr' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.in' },
    ],
  },

  // Compression automatique
  compress: true,

  // Headers SEO & Sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  },

  // Génération statique pour SEO
  output: 'standalone',

  webpack: (config, { dev }) => {
    if (dev && config.cache && typeof config.cache === 'object') {
      // Fix EPERM rename error on Windows — use 'memory' cache in dev
      config.cache = { type: 'memory' }
    }
    return config
  },

}

export default nextConfig
