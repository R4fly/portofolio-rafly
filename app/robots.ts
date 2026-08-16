import type { MetadataRoute } from 'next'

/**
 * Generator robots.txt otomatis.
 * Mengarahkan crawler untuk index halaman publik,
 * tapi exclude area privat (dashboard, login, thank-you).
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://raflybaehaqi.my.id'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/dashboard', '/login', '/thank-you', '/auth/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}