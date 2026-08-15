import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Server Actions configuration (masih di dalam experimental untuk Next.js 16)
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  typescript: {
    ignoreBuildErrors: false, // Strict mode, jangan abaikan error TypeScript
  },
};

export default nextConfig;