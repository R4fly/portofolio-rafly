import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Kebijakan privasi website portfolio Rafly Baehaqi. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.',
  alternates: {
    canonical: '/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  const lastUpdated = '15 Agustus 2026'

  return (
    <>
      {/* Header */}
      <header className="mb-12 border-b border-border/40 pb-8">
        <p className="mb-2 font-mono text-sm uppercase tracking-wider text-primary">
          Legal
        </p>
        <h1 className="mb-4 font-sans text-3xl font-bold tracking-tight md:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground">
          Terakhir diperbarui: <time dateTime="2026-08-15">{lastUpdated}</time>
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-10">
        <p className="leading-relaxed text-foreground">
          Selamat datang di website portfolio Rafly Baehaqi (&quot;Kami&quot;, &quot;Situs&quot;).
          Kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi yang
          Anda berikan saat menggunakan layanan kami. Kebijakan Privasi ini menjelaskan
          bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi
          Anda sesuai dengan Undang-Undang Perlindungan Data Pribadi Indonesia (UU PDP)
          dan regulasi internasional yang berlaku.
        </p>
      </section>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          1. Informasi yang Kami Kumpulkan
        </h2>
        <p className="mb-4">Kami mengumpulkan beberapa jenis informasi, antara lain:</p>

        <h3 className="mb-3 mt-6 font-sans text-xl font-semibold md:text-2xl">
          1.1 Informasi yang Anda Berikan Secara Langsung
        </h3>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Nama lengkap</strong> — saat Anda mengirim pesan melalui Contact Form
            atau mengisi formulir booking.
          </li>
          <li>
            <strong>Alamat email</strong> — untuk komunikasi balasan terkait konsultasi
            atau sesi.
          </li>
          <li>
            <strong>Pesan dan catatan</strong> — konten yang Anda tulis pada Contact Form,
            Booking Form, atau Guestbook.
          </li>
          <li>
            <strong>Data autentikasi</strong> — saat Anda mendaftar sebagai klien di
            Client Portal (jika menggunakan fitur ini).
          </li>
        </ul>

        <h3 className="mb-3 mt-6 font-sans text-xl font-semibold md:text-2xl">
          1.2 Informasi yang Dikumpulkan Secara Otomatis
        </h3>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Data analitik anonim</strong> — melalui Vercel Analytics, kami
            mengumpulkan data seperti halaman yang dikunjungi, negara asal, dan jenis
            perangkat. Data ini tidak dapat diidentifikasi secara personal.
          </li>
          <li>
            <strong>Informasi teknis</strong> — alamat IP, user agent browser, dan
            timestamp kunjungan untuk keperluan keamanan dan pencegahan spam.
          </li>
          <li>
            <strong>Cookie</strong> — file kecil yang disimpan di browser Anda untuk
            menyimpan preferensi seperti tema (dark/light mode) dan persetujuan cookie.
          </li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          2. Bagaimana Kami Menggunakan Informasi Anda
        </h2>
        <p className="mb-4">Informasi yang kami kumpulkan digunakan untuk:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Merespons pesan dan permintaan konsultasi yang Anda kirimkan.</li>
          <li>
            Memproses booking sesi konsultasi web development atau kolaborasi musik.
          </li>
          <li>Menampilkan pesan Anda di Buku Tamu (jika Anda mengizinkan).</li>
          <li>
            Meningkatkan kualitas website berdasarkan data analitik anonim.
          </li>
          <li>Mencegah penyalahgunaan, spam, atau aktivitas ilegal di website.</li>
          <li>Mematuhi kewajiban hukum yang berlaku.</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          3. Penyimpanan dan Keamanan Data
        </h2>
        <p className="mb-4">
          Data Anda disimpan di infrastruktur yang aman menggunakan penyedia layanan
          tepercaya:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Supabase</strong> — sebagai database utama untuk menyimpan data
            formulir, booking, dan guestbook. Supabase menggunakan enkripsi AES-256 dan
            mematuhi standar keamanan SOC 2.
          </li>
          <li>
            <strong>Vercel</strong> — sebagai platform hosting dan penyedia analytics.
            Data analitik yang dikumpulkan bersifat anonim.
          </li>
        </ul>
        <p>
          Kami menerapkan langkah-langkah keamanan teknis dan organisasional untuk
          melindungi data Anda dari akses tidak sah, kehilangan, atau kerusakan. Namun,
          tidak ada sistem yang 100% aman, dan kami tidak dapat menjamin keamanan mutlak.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          4. Cookie dan Teknologi Pelacakan
        </h2>
        <p className="mb-4">
          Kami menggunakan cookie untuk meningkatkan pengalaman Anda di website:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Cookie esensial</strong> — untuk menyimpan preferensi tema dan status
            persetujuan cookie itu sendiri.
          </li>
          <li>
            <strong>Cookie analitik</strong> — untuk Vercel Analytics, mengumpulkan data
            penggunaan anonim.
          </li>
        </ul>
        <p>
          Anda dapat memilih untuk menolak cookie non-esensial melalui Cookie Banner yang
          muncul saat kunjungan pertama. Anda juga dapat mengelola cookie melalui
          pengaturan browser Anda.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          5. Hak-Hak Anda (Sesuai UU PDP)
        </h2>
        <p className="mb-4">Anda memiliki hak untuk:</p>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Mengakses</strong> data pribadi Anda yang kami simpan.
          </li>
          <li>
            <strong>Memperbaiki</strong> data yang tidak akurat atau tidak lengkap.
          </li>
          <li>
            <strong>Menghapus</strong> data pribadi Anda dari sistem kami.
          </li>
          <li>
            <strong>Menarik persetujuan</strong> atas pemrosesan data yang sebelumnya
            Anda setujui.
          </li>
          <li>
            <strong>Mengajukan keluhan</strong> kepada otoritas perlindungan data jika
            Anda merasa hak Anda dilanggar.
          </li>
        </ul>
        <p>
          Untuk menggunakan hak-hak ini, silakan hubungi kami melalui informasi kontak
          di bagian bawah kebijakan ini.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          6. Berbagi Data dengan Pihak Ketiga
        </h2>
        <p>
          Kami <strong>tidak menjual, menyewakan, atau memperdagangkan</strong> data
          pribadi Anda kepada pihak ketiga. Data Anda hanya dibagikan kepada penyedia
          layanan tepercaya (Supabase, Vercel) yang membantu kami mengoperasikan website,
          dan mereka terikat kontrak untuk menjaga kerahasiaan data Anda.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          7. Perubahan Kebijakan
        </h2>
        <p>
          Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan
          akan diumumkan dengan memperbarui tanggal &quot;Terakhir diperbarui&quot; di
          bagian atas halaman ini. Kami menyarankan Anda untuk meninjau kebijakan ini
          secara berkala.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          8. Hubungi Kami
        </h2>
        <p className="mb-4">
          Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin
          menggunakan hak-hak Anda, silakan hubungi kami melalui:
        </p>
        <ul className="list-none space-y-2 pl-0">
          <li>
            <strong>Email:</strong>{' '}
            <a
              href="mailto:hello@raflybaehaqi.my.id"
              className="text-primary hover:underline"
            >
              hello@raflybaehaqi.my.id
            </a>
          </li>
          <li>
            <strong>Lokasi:</strong> Yogyakarta, Indonesia
          </li>
          <li>
            <strong>GitHub:</strong>{' '}
            <a
              href="https://github.com/raflybaehaqi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              github.com/raflybaehaqi
            </a>
          </li>
        </ul>
      </section>

      {/* Footer Navigation */}
      <footer className="mt-12 flex flex-col gap-4 border-t border-border/40 pt-8 sm:flex-row sm:justify-between">
        <Link
          href="/terms"
          className="text-sm font-medium text-primary hover:underline"
        >
          Lihat Terms of Service →
        </Link>
        <Link href="/" className="text-sm font-medium text-primary hover:underline">
          ← Kembali ke Beranda
        </Link>
      </footer>
    </>
  )
}