import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Syarat dan ketentuan penggunaan website portfolio Rafly Baehaqi.",
  alternates: {
    canonical: "/terms",
  },
}

export default function TermsOfServicePage() {
  const lastUpdated = '15 Agustus 2026'

  return (
    <>
      {/* Header */}
      <header className="mb-12 border-b border-border/40 pb-8">
        <p className="mb-2 font-mono text-sm uppercase tracking-wider text-primary">
          Legal
        </p>
        <h1 className="mb-4 font-sans text-3xl font-bold tracking-tight md:text-4xl">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground">
          Terakhir diperbarui: <time dateTime="2026-08-15">{lastUpdated}</time>
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-10">
        <p className="leading-relaxed text-foreground">
          Syarat dan Ketentuan ini (&quot;Syarat&quot;) mengatur penggunaan website
          portfolio Rafly Baehaqi (&quot;Situs&quot;) yang dapat diakses di{' '}
          <span className="font-mono text-primary">raflybaehaqi.my.id</span>. Dengan
          mengakses atau menggunakan Situs ini, Anda menyetujui untuk terikat oleh Syarat
          ini. Jika Anda tidak setuju dengan bagian mana pun dari Syarat ini, mohon untuk
          tidak menggunakan Situs kami.
        </p>
      </section>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          1. Penerimaan Syarat
        </h2>
        <p>
          Dengan mengakses, menjelajahi, atau menggunakan Situs ini, Anda mengakui bahwa
          Anda telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat ini
          serta Kebijakan Privasi kami. Situs ini disediakan &quot;sebagaimana
          adanya&quot; untuk tujuan informasi dan portofolio profesional.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          2. Penggunaan Layanan
        </h2>
        <h3 className="mb-3 mt-6 font-sans text-xl font-semibold md:text-2xl">
          2.1 Penggunaan yang Diizinkan
        </h3>
        <p className="mb-4">Anda dapat menggunakan Situs ini untuk:</p>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>Melihat portofolio proyek dan audio showcase.</li>
          <li>
            Mengirim pesan melalui Contact Form atau Guestbook dengan informasi yang
            benar dan tidak menyesatkan.
          </li>
          <li>Menjadwalkan sesi konsultasi atau kolaborasi musik.</li>
          <li>Menggunakan Client Portal jika Anda memiliki akses resmi.</li>
        </ul>

        <h3 className="mb-3 mt-6 font-sans text-xl font-semibold md:text-2xl">
          2.2 Penggunaan yang Dilarang
        </h3>
        <p className="mb-4">Anda <strong>TIDAK</strong> diperkenankan untuk:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Menggunakan Situs untuk tujuan ilegal, spam, atau aktivitas yang melanggar
            hukum.
          </li>
          <li>
            Mencoba mengakses bagian sistem yang tidak seharusnya dapat diakses (seperti
            database atau server backend).
          </li>
          <li>
            Mengunggah konten yang mengandung malware, virus, atau kode berbahaya.
          </li>
          <li>
            Menyebarkan konten yang menyinggung SARA, mengandung ujaran kebencian, atau
            melanggar hak cipta.
          </li>
          <li>
            Menggunakan bot, scraper, atau tool otomatis untuk mengakses Situs secara
            berlebihan.
          </li>
          <li>
            Melakukan reverse engineering, dekompilasi, atau upaya serupa terhadap kode
            sumber Situs.
          </li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          3. Hak Kekayaan Intelektual
        </h2>
        <p className="mb-4">
          Semua konten di Situs ini, termasuk namun tidak terbatas pada teks, desain,
          logo, gambar, audio rekaman gitar, dan kode sumber, adalah milik Rafly Baehaqi
          atau dilisensikan kepada kami, dan dilindungi oleh hukum hak cipta Indonesia
          dan internasional.
        </p>
        <p>
          Anda tidak diperkenankan untuk menyalin, mereproduksi, mendistribusikan, atau
          membuat karya turunan dari konten Situs tanpa izin tertulis dari kami, kecuali
          untuk penggunaan wajar (fair use) atau referensi dengan menyebutkan sumber yang
          jelas.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          4. Konten Pengguna (User-Generated Content)
        </h2>
        <p className="mb-4">
          Dengan mengirim pesan melalui Contact Form, Guestbook, atau fitur lain yang
          memungkinkan input pengguna, Anda:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Menjamin bahwa konten yang Anda kirim adalah milik Anda atau Anda memiliki
            izin untuk mengirimkannya.
          </li>
          <li>
            Memberikan kami lisensi non-eksklusif untuk menampilkan konten tersebut di
            Situs (khusus untuk Guestbook).
          </li>
          <li>
            Memahami bahwa kami berhak menghapus konten yang melanggar Syarat ini atau
            dianggap tidak pantas.
          </li>
        </ul>
      </section>

      {/* Section 5 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          5. Layanan Konsultasi dan Booking
        </h2>
        <p className="mb-4">
          Jika Anda menjadwalkan sesi konsultasi web development atau kolaborasi musik
          melalui fitur Booking:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Jadwal sesi bersifat tentatif hingga dikonfirmasi oleh kami melalui email.
          </li>
          <li>
            Detail teknis, biaya, dan lingkup pekerjaan akan dibahas terpisah melalui
            perjanjian tersendiri.
          </li>
          <li>
            Syarat ini tidak menggantikan perjanjian kontrak formal untuk proyek
            berbayar.
          </li>
          <li>
            Kami berhak membatalkan sesi jika terindikasi ada itikad tidak baik atau
            pelanggaran Syarat.
          </li>
        </ul>
      </section>

      {/* Section 6 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          6. Penafian (Disclaimer)
        </h2>
        <p className="mb-4">
          Situs ini disediakan &quot;sebagaimana adanya&quot; dan &quot;sebagaimana
          tersedia&quot; tanpa jaminan apa pun, baik tersurat maupun tersirat. Kami
          tidak menjamin bahwa:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Situs akan selalu tersedia tanpa gangguan atau bebas dari kesalahan.</li>
          <li>Informasi di Situs selalu akurat, lengkap, atau terkini.</li>
          <li>Situs bebas dari virus atau komponen berbahaya lainnya.</li>
        </ul>
        <p className="mt-4">
          Proyek portofolio yang ditampilkan adalah hasil karya sebelumnya dan tidak
          menjamin hasil yang sama untuk proyek baru. Setiap proyek memiliki tantangan
          dan hasilnya yang unik.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          7. Batasan Tanggung Jawab
        </h2>
        <p>
          Dalam batas maksimal yang diizinkan oleh hukum yang berlaku, Rafly Baehaqi
          tidak bertanggung jawab atas kerugian tidak langsung, insidental, khusus, atau
          konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan Situs
          ini, termasuk namun tidak terbatas pada hilangnya data, keuntungan, atau
          goodwill, meskipun kami telah diberi tahu tentang kemungkinan kerugian
          tersebut.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          8. Link Pihak Ketiga
        </h2>
        <p>
          Situs ini mungkin mengandung tautan ke website pihak ketiga (seperti GitHub,
          proyek live, atau resource eksternal). Kami tidak bertanggung jawab atas
          konten, kebijakan privasi, atau praktik dari website pihak ketiga tersebut.
          Penggunaan website pihak ketiga adalah risiko Anda sendiri.
        </p>
      </section>

      {/* Section 9 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          9. Hukum yang Berlaku
        </h2>
        <p>
          Syarat ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia.
          Setiap perselisihan yang timbul dari atau terkait dengan Syarat ini akan
          diselesaikan di pengadilan yang berwenang di wilayah Yogyakarta, Indonesia,
          tanpa mengesampingkan upaya mediasi atau arbitrase yang disepakati bersama.
        </p>
      </section>

      {/* Section 10 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          10. Perubahan Syarat
        </h2>
        <p>
          Kami berhak untuk memperbarui atau mengubah Syarat ini kapan saja tanpa
          pemberitahuan sebelumnya. Versi terbaru akan selalu tersedia di halaman ini
          dengan tanggal &quot;Terakhir diperbarui&quot;. Penggunaan Situs yang
          berkelanjutan setelah perubahan dianggap sebagai penerimaan terhadap Syarat
          yang diperbarui.
        </p>
      </section>

      {/* Section 11 */}
      <section className="mb-10">
        <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight md:text-3xl">
          11. Hubungi Kami
        </h2>
        <p className="mb-4">
          Jika Anda memiliki pertanyaan tentang Syarat ini, silakan hubungi kami melalui:
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
          href="/privacy-policy"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Lihat Privacy Policy
        </Link>
        <Link href="/" className="text-sm font-medium text-primary hover:underline">
          Kembali ke Beranda →
        </Link>
      </footer>
    </>
  )
}