/**
 * JSON-LD Structured Data untuk SEO rich snippets.
 * Schema.org Person markup agar Google memahami ini adalah
 * portfolio individu (bukan bisnis atau organisasi).
 *
 * Server Component — tidak butuh interaktivitas.
 */
export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rafly Baehaqi',
    url: 'https://raflybaehaqi.my.id',
    image: 'https://raflybaehaqi.my.id/opengraph-image',
    jobTitle: 'Junior Full-Stack Web Developer',
    description:
      'Junior Full-Stack Developer dan Gitaris dari Yogyakarta. Membangun aplikasi web responsif dengan Next.js, TypeScript, dan Supabase, dipadukan dengan jiwa musik blues dan rock.',
    email: 'mailto:hello@raflybaehaqi.my.id',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Yogyakarta',
      addressRegion: 'DI Yogyakarta',
      addressCountry: 'ID',
    },
    sameAs: [
      'https://github.com/raflybaehaqi',
      'https://www.npmjs.com/~raflybaehaqi',
    ],
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'Web Development',
      'Guitar',
      'Blues Music',
      'Rock Music',
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Development Consultation',
          description: 'Konsultasi pengembangan aplikasi web modern',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Guitar Collaboration Session',
          description: 'Sesi kolaborasi musik dan gitar',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}