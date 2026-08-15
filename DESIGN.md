---
version: alpha
name: "Web Portfolio — Junior Developer & Gitaris"
description: "Tampilan website portfolio mewah yang memadukan estetika profesional IT (Cyber/Clean) dengan energi kreatif panggung musik (Rock/Blues/Jazz)."
colors:
  # Dark Mode — Default
  dark:
    background: "#020617"
    surface: "#18181b"
    surface-light: "#27272a"
    primary: "#22d3ee"      # Cyan 400 — Aksen utama IT/Cyber
    secondary: "#f59e0b"    # Amber 500 — Aksen kedua Musik/Panggung
    tertiary: "#f97316"    # Orange 500 — Alternatif aksen hangat
    text-primary: "#fafafa" # Zinc 50
    text-secondary: "#a1a1aa" # Zinc 400
    border: "#3f3f46"      # Zinc 700

  # Light Mode
  light:
    background: "#fafafa"   # Zinc 50
    surface: "#ffffff"      # White
    surface-light: "#f4f4f5" # Zinc 100
    primary: "#0891b2"      # Cyan 600 — Kontras WCAG AAA
    secondary: "#d97706"    # Amber 600
    tertiary: "#ea580c"    # Orange 600
    text-primary: "#18181b" # Zinc 900
    text-secondary: "#52525b" # Zinc 600
    border: "#e4e4e7"      # Zinc 200

  # Common
  success: "#34d399"       # Emerald 400
  error: "#f87171"         # Red 400
  warning: "#fbbf24"       # Yellow 400

typography:
  heading:
    fontFamily: "'Plus Jakarta Sans', 'Cabinet Grotesk', system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  subheading:
    fontFamily: "'Plus Jakarta Sans', 'Cabinet Grotesk', system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Inter', 'Geist Sans', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.005em"
  small:
    fontFamily: "'Inter', 'Geist Sans', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  mono:
    fontFamily: "'Geist Mono', 'JetBrains Mono', monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5

rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
  "4xl": "80px"

components:
  button-primary:
    backgroundColor: "{colors.dark.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    fontSize: "0.875rem"
    fontWeight: 600
    transition: "all 0.2s ease"

  button-secondary:
    backgroundColor: "{colors.dark.secondary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    fontSize: "0.875rem"
    fontWeight: 600
    transition: "all 0.2s ease"

  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.dark.text-primary}"
    borderColor: "{colors.dark.border}"
    borderWidth: "1px"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    fontSize: "0.875rem"
    fontWeight: 500
    transition: "all 0.2s ease"

  card:
    backgroundColor: "{colors.dark.surface}"
    textColor: "{colors.dark.text-primary}"
    rounded: "{rounded.lg}"
    padding: "24px"
    borderColor: "{colors.dark.border}"
    borderWidth: "1px"
    transition: "all 0.3s ease"
    shadow: "0 4px 24px rgba(0, 0, 0, 0.3)"

  card-hover:
    backgroundColor: "{colors.dark.surface-light}"
    borderColor: "{colors.dark.primary}"
    shadow: "0 8px 40px rgba(34, 211, 238, 0.1)"

  stats-card:
    backgroundColor: "{colors.dark.surface}"
    textColor: "{colors.dark.text-primary}"
    rounded: "{rounded.md}"
    padding: "20px 24px"
    borderColor: "{colors.dark.border}"
    borderWidth: "1px"

  input:
    backgroundColor: "{colors.dark.surface-light}"
    textColor: "{colors.dark.text-primary}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    borderColor: "{colors.dark.border}"
    borderWidth: "1px"
    fontSize: "0.875rem"

  input-focus:
    borderColor: "{colors.dark.primary}"
    shadow: "0 0 0 3px rgba(34, 211, 238, 0.15)"

  dialog:
    backgroundColor: "{colors.dark.surface}"
    textColor: "{colors.dark.text-primary}"
    rounded: "{rounded.xl}"
    padding: "32px"
    overlay: "rgba(0, 0, 0, 0.7)"

  toast:
    backgroundColor: "{colors.dark.surface}"
    textColor: "{colors.dark.text-primary}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
    shadow: "0 8px 32px rgba(0, 0, 0, 0.4)"

  mobile-cta:
    backgroundColor: "{colors.dark.surface}"
    borderTopColor: "{colors.dark.border}"
    borderTopWidth: "1px"
    padding: "12px 16px"
    shadow: "0 -4px 24px rgba(0, 0, 0, 0.3)"

---

## Overview

Portfolio pribadi yang memadukan identitas Junior Developer dan Gitaris dalam satu tampilan mewah. Kesan bersih dan profesional dari dunia teknologi dipadukan dengan energi kreatif dan hangat dari dunia musik.

**Karakter Tampilan:**
- **Dark Mode** sebagai default untuk kesan premium, modern, dan ramah mata
- **Aksen Cyan (IT/Cyber)** untuk elemen interaktif, statistik, dan teknologi
- **Aksen Amber/Orange (Musik/Panggung)** untuk sentuhan hangat, kreativitas, dan energi
- **Tipografi Geometris** untuk kekuatan visual, dipadukan dengan sans-serif bersih untuk keterbacaan
- **Monospace** untuk data, kode, dan elemen presisi

**Prinsip Desain:**
- Mobile-first dengan responsivitas sempurna di semua breakpoints
- Dark/Light mode toggles dengan transisi halus
- Animasi mikro untuk feedback interaksi
- Konsistensi visual di seluruh halaman melalui token reference

---

## Colors

### Dark Mode (Default)
- **Primary (#22d3ee / Cyan 400):** CTA utama, link, elemen interaktif, statistik, border aktif.
- **Secondary (#f59e0b / Amber 500):** CTA alternatif, aksen hangat, highlight kreatif.
- **Tertiary (#f97316 / Orange 500):** Elemen pendukung, variasi aksen hangat.
- **Background (#020617 / Slate 950):** Latar belakang utama — gelap, premium, fokus pada konten.
- **Surface (#18181b / Zinc 900):** Card, panel, komponen — memberi kedalaman.
- **Surface Light (#27272a / Zinc 800):** Hover state, input field, elemen interaktif.
- **Text Primary (#fafafa / Zinc 50):** Judul utama, teks penting.
- **Text Secondary (#a1a1aa / Zinc 400):** Deskripsi, teks pendukung.
- **Border (#3f3f46 / Zinc 700):** Pembatas elemen.

### Light Mode
- **Primary (#0891b2 / Cyan 600):** Memenuhi standar kontras WCAG AAA untuk keterbacaan.
- **Secondary (#d97706 / Amber 600):** Aksen hangat dengan kontras cukup.
- **Background (#fafafa / Zinc 50):** Latar belakang terang, bersih, dan luas.
- **Surface (#ffffff / White):** Komponen murni, panel, card.
- **Surface Light (#f4f4f5 / Zinc 100):** Hover dan interaksi ringan.
- **Text Primary (#18181b / Zinc 900):** Kontras tinggi untuk judul.
- **Text Secondary (#52525b / Zinc 600):** Teks tubuh yang nyaman dibaca.

**Aturan Pemakaian:**
- Primary untuk semua tombol aksi utama dan link penting — satu per halaman.
- Secondary untuk CTA alternatif, highlight, atau elemen yang ingin ditekankan tapi tidak mendominasi.
- Jangan gunakan lebih dari 3 warna aksen dalam satu area pandang.
- Pastikan kontras minimal 4.5:1 untuk teks kecil, 3:1 untuk teks besar.

---

## Typography

### Headings (font-sans)
- **Font:** Plus Jakarta Sans / Cabinet Grotesk
- **Karakter:** Geometris, berirama, bertenaga pada ketebalan Bold/Black.
- **Penggunaan:** Judul halaman (H1), subjudul section (H2), judul card (H3).
- **Ukuran:** Responsif dengan clamp — dari mobile ke desktop.
- **Letter Spacing:** Negative tracking (-0.025em) untuk kesan kompak dan modern.

### Body Text (font-sans)
- **Font:** Inter / Geist Sans
- **Karakter:** Sangat bersih, standar industri SaaS, keterbacaan tinggi di perangkat seluler.
- **Penggunaan:** Paragraf, deskripsi, label, teks pendukung.

### Monospace (font-mono)
- **Font:** Geist Mono / JetBrains Mono
- **Karakter:** Presisi developer, kode, data.
- **Penggunaan:** Realtime Stats (angka), kode snippet, timer audio, error messages.

### Hierarchy
1. **H1:** clamp(2.25rem, 5vw, 4rem) — Bold/Black, negative tracking
2. **H2:** clamp(1.75rem, 3.5vw, 2.75rem) — Bold
3. **H3:** clamp(1.25rem, 2.5vw, 1.875rem) — Semibold
4. **Body:** 1rem — Regular, line-height 1.6
5. **Small:** 0.875rem — Regular
6. **Mono:** 0.875rem — Medium

**Aturan:**
- Hierarki dari ukuran dan ketebalan, bukan mengganti font secara acak.
- Gunakan font-sans untuk semua teks kecuali data/kode.
- Maksimal 2 jenis font dalam satu halaman (sans + mono).

---

## Layout

### Grid System
- **Kolom:** 12 kolom fleksibel.
- **Gap:** 24px (lg) antar elemen, 16px (md) untuk mobile.
- **Container:** Max-width 1280px, padding 24px di desktop, 16px di mobile.

### Breakpoints (Mobile-First)
| Breakpoint | Min Width | Keterangan |
|------------|-----------|------------|
| sm | 640px | Tablet kecil |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Desktop lebar |
| 2xl | 1536px | Ultra-wide |

### Spacing System
- **xs:** 4px — Elemen mikro, icon spacing
- **sm:** 8px — Gap kecil antar elemen
- **md:** 16px — Gap standar, padding komponen
- **lg:** 24px — Gap section, padding halaman
- **xl:** 32px — Gap antar section besar
- **2xl:** 48px — Margin antar blok konten
- **3xl:** 64px — Padding section hero
- **4xl:** 80px — Margin halaman utama

### Responsive Rules
- **Hero Section:** Full viewport height minimum, konten terpusat.
- **Grid Cards:** 1 kolom (mobile) → 2 kolom (tablet) → 3-4 kolom (desktop).
- **Sticky Mobile CTA:** Hanya muncul di layar < 768px.
- **Padding Halaman:** 16px mobile, 24px tablet+, 48px desktop.

---

## Elevation & Depth

### Shadow System
| Level | Shadow | Penggunaan |
|-------|--------|------------|
| 0 | none | Elemen datar, background |
| 1 | 0 1px 3px rgba(0,0,0,0.12) | Elemen dasar |
| 2 | 0 4px 6px rgba(0,0,0,0.16) | Card, panel |
| 3 | 0 10px 30px rgba(0,0,0,0.20) | Dialog, modal |
| 4 | 0 20px 60px rgba(0,0,0,0.30) | Dropdown, overlay |

### Elevation Rules
- **Card:** Elevasi 2 dengan border tipis untuk kedalaman.
- **Dialog/Modal:** Elevasi 4 dengan overlay gelap.
- **Header:** Shadow halus (elevasi 1) saat scroll.
- **Dropdown:** Elevasi 4.
- **Hover Card:** Elevasi 3 + border aksen.

### Light Mode Elevation
- Shadow lebih halus, transparansi lebih rendah.
- Gunakan border untuk membedakan lapisan.

---

## Shapes

### Rounded System
| Level | Value | Penggunaan |
|-------|-------|------------|
| none | 0px | Elemen yang ingin tajam (jarang) |
| sm | 4px | Button kecil, badge, input |
| md | 8px | Button standar, card, input besar |
| lg | 12px | Card besar, panel |
| xl | 16px | Dialog, modal |
| full | 9999px | Avatar, pill badge |

### Aturan Penggunaan
- **Card utama:** rounded-lg (12px)
- **Button:** rounded-md (8px)
- **Input/Form:** rounded-md (8px)
- **Avatar:** rounded-full
- **Dialog:** rounded-xl (16px)
- **Jangan campur rounded dan sharp corners (none) di halaman yang sama** kecuali untuk tujuan desain yang jelas.

---

## Components

### Button Primary
- **Karakter:** Satu tombol utama per halaman.
- **Background:** {colors.dark.primary} / {colors.light.primary}
- **Text:** Putih (#ffffff)
- **Rounded:** {rounded.md}
- **Padding:** 12px 24px
- **Font:** 0.875rem, weight 600
- **Hover:** Opacity 0.85 atau warna lebih gelap
- **Loading:** Spinner + disabled state

### Button Secondary
- **Karakter:** CTA alternatif atau aksi pendukung.
- **Background:** {colors.dark.secondary} / {colors.light.secondary}
- **Text:** Putih (#ffffff)
- **Rounded:** {rounded.md}
- **Padding:** 12px 24px
- **Font:** 0.875rem, weight 600

### Button Outline
- **Karakter:** Aksi minimalis, sering untuk opsi sekunder.
- **Background:** Transparent
- **Text:** {colors.dark.text-primary}
- **Border:** 1px {colors.dark.border}
- **Hover:** Background {colors.dark.surface-light}

### Card
- **Karakter:** Permukaan default untuk konten berkelompok.
- **Background:** {colors.dark.surface} / {colors.light.surface}
- **Rounded:** {rounded.lg}
- **Padding:** 24px
- **Border:** 1px {colors.dark.border}
- **Shadow:** Elevasi 2
- **Hover:** Elevasi 3 + border aksen

### Stats Card
- **Karakter:** Menampilkan data realtime dengan presisi.
- **Background:** {colors.dark.surface}
- **Rounded:** {rounded.md}
- **Padding:** 20px 24px
- **Font:** Mono untuk angka, Sans untuk label.

### Input
- **Karakter:** Formulir dan input data.
- **Background:** {colors.dark.surface-light} / {colors.light.surface-light}
- **Rounded:** {rounded.md}
- **Padding:** 10px 16px
- **Border:** 1px {colors.dark.border}
- **Focus:** Border {colors.dark.primary} + shadow glow

### Dialog
- **Karakter:** Modal untuk detail proyek, info tambahan.
- **Background:** {colors.dark.surface}
- **Rounded:** {rounded.xl}
- **Padding:** 32px
- **Overlay:** rgba(0,0,0,0.7) blur
- **Close:** Tombol di pojok kanan atas.

### Mobile CTA
- **Karakter:** Sticky di bagian bawah layar mobile.
- **Background:** {colors.dark.surface}
- **Border Top:** 1px {colors.dark.border}
- **Padding:** 12px 16px
- **Shadow:** Elevasi 3 ke atas.
- **Hanya muncul:** Di layar < 768px.

---

## Do's and Don'ts

### DO's ✅
- Gunakan primary untuk satu CTA utama per halaman.
- Pertahankan spacing yang konsisten (kelipatan 8px).
- Tulis alt text deskriptif untuk semua gambar.
- Test dark dan light mode untuk setiap komponen baru.
- Gunakan token reference untuk warna dan rounded.
- Kompres semua gambar ke format WebP/AVIF.
- Gunakan loading states (skeleton) untuk data dari Supabase.
- Terapkan mobile-first responsive design.

### DON'Ts ❌
- Jangan gunakan inline style kecuali untuk nilai dinamis mutlak.
- Jangan hardcode nilai warna — selalu pakai CSS variables atau token.
- Jangan campur rounded dan sharp corners di halaman yang sama.
- Jangan gunakan lebih dari 2 jenis font dalam satu halaman.
- Jangan lupa alt text pada gambar.
- Jangan gunakan !important di CSS.
- Jangan buat komponen tanpa loading state jika data berasal dari API.
- Jangan ignore dark mode — selalu test.
- Jangan skip form validation dan error states.

---

## Animation Guidelines

### Micro-interactions
- **Hover:** Transisi 0.2s ease pada tombol dan card.
- **Loading:** Skeleton shimmer dengan animasi gradien.
- **Page Transition:** Fade-in 0.3s.
- **Modal/Dialog:** Scale + fade 0.25s ease-out.
- **Dark/Light Toggle:** Transisi warna 0.3s.

### Performance
- Gunakan `will-change: transform` untuk elemen yang beranimasi.
- Prefer `transform` dan `opacity` untuk animasi (GPU-accelerated).
- Hindari animasi `width`, `height`, `top`, `left` (layout thrashing).
- Batasi penggunaan animation pada 3-4 elemen per halaman.

---

## Tokens Reference

Semua nilai desain didefinisikan di schema dan direferensikan melalui `{token.path}`.

```yaml
# Contoh penggunaan di komponen
components:
  my-card:
    backgroundColor: "{colors.dark.surface}"
    textColor: "{colors.dark.text-primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
```

**Keuntungan:**
- Edit satu tempat, semua komponen ikut berubah.
- Konsistensi visual terjamin.
- Mudah untuk maintain dan scale.

---

*Document ini adalah living document. Update secara berkala seiring project berkembang.*