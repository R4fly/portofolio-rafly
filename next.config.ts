import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Image optimization — Next.js otomatis convert ke WebP/AVIF
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'raflybaehaqi.my.id',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Untuk placeholder images
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net', // Untuk devicons
      },
    ],
    // Format modern untuk production (Next.js auto-selects best format)
    formats: ['image/avif', 'image/webp'],
    // Device sizes untuk responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes untuk art direction
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // Enable React strict mode
  reactStrictMode: true,

  // Production optimizations
  poweredByHeader: false,

  // Compress responses
  compress: true,
}

export default nextConfig