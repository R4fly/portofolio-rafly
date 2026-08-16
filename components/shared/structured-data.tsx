export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Muhammad Rafly Baehaqi',
    alternateName: 'Rafly Baehaqi',
    jobTitle: 'Junior Web Developer',
    description:
      'Junior Web Developer & Gitaris dari Yogyakarta. Spesialis Next.js, TypeScript, dan Supabase.',
    url: 'https://raflybaehaqi.my.id',
    email: 'mailto:muhammadraflybaehaqi@gmail.com',
    telephone: '+6281228660551',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Yogyakarta',
      addressRegion: 'DI Yogyakarta',
      addressCountry: 'ID',
    },
    sameAs: [
      'https://github.com/R4fly',
      'https://www.npmjs.com/~baehaqirafly3',
      'https://www.linkedin.com/in/muhammad-rafly-baehaqi-57a349352',
      'https://www.instagram.com/rafly_baehaqi',
      'https://www.tiktok.com/@rflyhq',
    ],
    knowsAbout: [
      'Web Development',
      'Next.js',
      'React',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Tailwind CSS',
      'Node.js',
      'Guitar Performance',
      'Blues Music',
      'Rock Music',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'SMK Negeri 2 Yogyakarta',
      description: 'Sistem Informasi Jaringan dan Aplikasi (SIJA)',
    },
    performsIn: {
      '@type': 'MusicGroup',
      name: 'Solo Guitarist',
      genre: ['Blues', 'Rock', 'Jazz Fusion'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}