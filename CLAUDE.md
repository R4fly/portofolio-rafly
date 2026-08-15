# CLAUDE.md — Web Portfolio: Junior Developer & Gitaris

> **Important:** CLAUDE.md instructions should be written in English for optimal Claude Code processing.
> This document is written in Indonesian for ease of understanding by the project owner.

---

## 1. Project Overview

- **Name**: Web Portfolio — Junior Developer & Gitaris
- **Description**: Website portfolio mewah yang memadukan identitas sebagai Junior Full-Stack Web Developer dan Gitaris. Dilengkapi dengan sistem realtime (live chat, booking, guestbook), dashboard stats interaktif, audio showcase, dan command palette navigasi.
- **Goal**: Menampilkan keahlian teknis dan kreatif secara profesional untuk menarik klien potensial di bidang web development dan kolaborasi musik.
- **Target Users**: Klien potensial (bisnis/individu), rekruter IT, musisi kolaborator, dan pengunjung umum.
- **Version**: v1.0.0
- **Status**: Active Development

---

## 2. Tech Stack

| Category | Technology |
|----------|------------|
| **Language** | TypeScript |
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS + ShadcnUI |
| **Database** | Supabase (PostgreSQL) |
| **ORM/Client** | Supabase Client / Drizzle ORM |
| **Auth** | Supabase Auth |
| **Realtime** | Supabase Realtime (Broadcast & Replication) |
| **State Management** | Zustand + React Query |
| **Data Fetching** | React Query / SWR |
| **UI Library** | ShadcnUI (Radix UI + Tailwind) |
| **Package Manager** | npm |
| **Deployment** | Vercel |
| **Analytics** | Vercel Analytics / Umami |
| **Image Optimization** | Next.js Image Component + Sharp |

---

## 3. Commands

```bash
# Development
npm run dev          # Jalankan dev server (localhost:3000)
npm run build        # Build untuk production
npm run start        # Jalankan production build
npm run lint         # Jalankan ESLint
npm run format       # Format kode dengan Prettier

# Package Management
npm add [package]    # Install package baru
npm add -D [package] # Install dev dependency

# Database
npm run db:migrate   # Jalankan migrasi Supabase
npm run db:seed      # Seed data awal ke Supabase
npm run db:reset     # Reset database (development only)

# Supabase
npm run supabase:start  # Jalankan Supabase lokal
npm run supabase:stop   # Stop Supabase lokal
npm run supabase:reset  # Reset Supabase lokal

# Testing (jika ada)
npm run test         # Jalankan semua test
npm run test:unit    # Jalankan unit test
npm run test:e2e     # Jalankan e2e test

# Deployment
npm run deploy       # Deploy ke Vercel (production)
npm run deploy:preview # Deploy ke Vercel (preview)
```

> **Never use npm or yarn** — always use `npm` for this project.

---

## 4. Project Structure

**Architecture:** Next.js App Router (No `src/` directory) — Modular by feature.

```
web-portfolio/
├── app/                          # App Router (No src/)
│   ├── (auth)/                   # Route Group — Autentikasi
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (legal)/                  # Route Group — Legal Pages
│   │   ├── privacy-policy/
│   │   │   └── page.tsx
│   │   └── terms/
│   │       └── page.tsx
│   ├── dashboard/                # Client/Admin Dashboard
│   │   ├── chat/
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── thank-you/
│   │   └── page.tsx
│   ├── layout.tsx                # Root Layout
│   ├── page.tsx                  # Home Page
│   ├── not-found.tsx             # Custom 404 Page
│   ├── favicon.ico               # Favicon 32x32
│   ├── apple-icon.png            # iOS Favicon 180x180
│   ├── icon.png                  # Android Favicon 192x192 & 512x512
│   ├── sitemap.ts                # Sitemap.xml generator
│   └── robots.ts                 # Robots.txt generator
│
├── components/
│   ├── ui/                       # ShadcnUI components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── alert.tsx
│   │   ├── calendar.tsx
│   │   ├── skeleton.tsx
│   │   └── ... (other shadcn components)
│   ├── shared/                   # Global components
│   │   ├── cookie-banner.tsx
│   │   ├── audio-player.tsx
│   │   ├── stats-card.tsx
│   │   ├── command-menu.tsx      # CMD+K Palette
│   │   ├── mobile-cta.tsx
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── theme-toggle.tsx
│   │   └── realtime-guestbook.tsx
│   └── forms/                    # Form components
│       ├── booking-form.tsx
│       └── contact-form.tsx
│
├── lib/
│   ├── supabase/                 # Supabase config
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   ├── realtime.ts           # Realtime subscriptions
│   │   └── types.ts              # Database types
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-realtime-stats.ts
│   │   ├── use-realtime-messages.ts
│   │   ├── use-command-menu.ts
│   │   └── use-auth.ts
│   ├── queries/                  # React Query hooks
│   │   ├── projects.ts
│   │   ├── tracks.ts
│   │   ├── stats.ts
│   │   └── guestbook.ts
│   ├── analytics/                # Analytics integration
│   │   └── index.tsx
│   └── utils.ts                  # Utility functions (clsx, etc.)
│
├── public/
│   ├── audio/                    # Audio samples
│   │   ├── string-snap.mp3
│   │   └── ... (guitar samples)
│   ├── images/                   # Optimized images (WebP/AVIF)
│   │   ├── hero-guitar.avif
│   │   ├── project-1.webp
│   │   ├── project-2.webp
│   │   ├── og-image.png
│   │   └── ... (other images)
│   └── fonts/                    # Local fonts (if not using Google)
│
├── styles/
│   └── globals.css               # Global styles + CSS variables
│
├── types/                        # TypeScript types
│   ├── database.ts
│   └── api.ts
│
├── middleware.ts                 # Next.js middleware (auth)
├── next.config.js                # Next.js config
├── tailwind.config.js            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore file
├── DESIGN.md                     # Design tokens & guidelines
├── CLAUDE.md                     # This file — AI instructions
├── architecture.md               # System architecture
└── production.md                 # Production deployment guide
```

**Aturan Penempatan File:**
- **Komponen UI baru** selalu di `components/ui/` (ShadcnUI) atau `components/shared/` (global).
- **Halaman baru** selalu di `app/[nama-page]/page.tsx`.
- **Route Group** untuk halaman dengan layout sama: `app/(group)/`.
- **Logic bisnis** selalu di `lib/` (Supabase, queries, hooks).
- **Tipe TypeScript** selalu di `types/` atau `lib/supabase/types.ts`.
- **Helper dan utility** selalu di `lib/utils.ts` atau `lib/[nama-helper].ts`.
- **Jangan buat folder baru tanpa konfirmasi terlebih dahulu.**
- **Jangan gunakan direktori `src/`** — semua file di root project.

---

## 5. Naming Conventions

### File dan Folder
| Type | Convention | Example |
|------|------------|---------|
| Komponen React | PascalCase | `UserCard.tsx`, `AudioPlayer.tsx` |
| Non-komponen | camelCase | `useAuth.ts`, `getUserById.ts` |
| Folder | kebab-case | `user-profile/`, `booking-form/` |
| Halaman App Router | `page.tsx` | `app/dashboard/page.tsx` |
| Layout App Router | `layout.tsx` | `app/(auth)/layout.tsx` |
| Route Group | `(group-name)` | `app/(auth)/`, `app/(legal)/` |
| Test file | `[nama].test.ts` atau `[nama].spec.ts` | `useAuth.test.ts` |
| API Route | `route.ts` | `app/api/users/route.ts` |

### Di dalam Kode
| Type | Convention | Example |
|------|------------|---------|
| Variabel | camelCase | `userData`, `isLoading` |
| Konstanta | UPPER_SNAKE | `MAX_RETRY`, `BASE_URL` |
| Fungsi | camelCase | `getUserById`, `formatDate` |
| Tipe/Interface | PascalCase | `UserType`, `ApiResponse` |
| Enum | PascalCase | `UserRole`, `OrderStatus` |
| CSS Class (Tailwind) | kebab-case | `user-card`, `nav-item` |
| Props Component | PascalCase + `Props` | `UserCardProps` |

### Git Branch
| Branch Type | Convention | Example |
|-------------|------------|---------|
| Fitur baru | `feat/[nama-fitur]` | `feat/realtime-chat` |
| Bug fix | `fix/[nama-bug]` | `fix/mobile-cta-overlap` |
| Hotfix | `hotfix/[nama]` | `hotfix/auth-callback` |
| Refactor | `refactor/[nama]` | `refactor/supabase-client` |

---

## 6. Code Conventions

### Pendekatan Coding
- Terapkan prinsip **Clean Code** dan **DRY**.
- Hindari duplikasi kode — jadikan function jika dipakai lebih dari sekali.
- Tulis kode yang mudah dibaca, bukan yang paling singkat.
- Gunakan **Early Return** untuk mengurangi nested condition.

### TypeScript
- Gunakan `strict: true` di `tsconfig.json`.
- **Tidak boleh menggunakan tipe `any`** — selalu gunakan `unknown` jika tipe tidak diketahui.
- Selalu tulis tipe return function secara eksplisit.
- Gunakan `interface` untuk object, `type` untuk union atau intersection.
- Gunakan `satisfies` operator untuk validasi tipe objek literal.

```typescript
// ✅ Benar
interface User {
  id: string;
  name: string;
  email: string;
}

type UserRole = 'admin' | 'client' | 'guest';

function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Salah
function getUser(id: any): any {
  // ...
}
```

### Urutan Import
1. **Library eksternal** (React, Next.js, dll)
2. **Internal absolut** (`@/components`, `@/lib`, `@/types`)
3. **Internal relatif** (`./Component`, `../utils`)
4. **Tipe dan Interface**
5. **Assets dan styles**

```typescript
// ✅ Benar
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useSupabase } from '@/lib/supabase/client';
import { User } from '@/types/database';

import { formatDate } from '../utils';
import './styles.css';

// ❌ Salah — import acak
import './styles.css';
import React from 'react';
import { Button } from '@/components/ui/button';
```

### Export Pattern
- **Gunakan named export** untuk komponen dan fungsi (kecuali page/layout).
- **Default export hanya** untuk `page.tsx` dan `layout.tsx`.

```typescript
// ✅ Benar
export function UserCard({ user }: UserCardProps) {
  // ...
}

export const getUser = async (id: string) => {
  // ...
};

// ❌ Salah — default export untuk komponen reusable
export default function UserCard({ user }: UserCardProps) {
  // ...
}
```

### Error Handling
- Selalu gunakan **try-catch** untuk async function.
- Jangan biarkan error tanpa penanganan.
- Tulis pesan error yang informatif dan spesifik.
- Gunakan **Error Boundaries** untuk React components.

```typescript
// ✅ Benar
try {
  const data = await fetchData();
  return data;
} catch (error) {
  console.error('Failed to fetch data:', error);
  throw new Error('Unable to load data. Please try again.');
}

// ❌ Salah
const data = await fetchData(); // No error handling
```

---

## 7. Component Rules

### Urutan Penulisan dalam Satu Komponen
1. **Import** statements
2. **Tipe atau Interface** untuk props
3. **Definisi komponen** (function declaration)
4. **Hooks** (useState, useEffect, useContext, dll)
5. **Handler dan fungsi lokal**
6. **Return JSX**
7. **Export**

### Aturan Props
- Selalu tulis tipe props secara eksplisit.
- Gunakan **default value** untuk props yang opsional.
- Maksimal **5 props** per komponen — jika lebih, refactor.
- Gunakan **destructuring** untuk props.

```typescript
// ✅ Benar
interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;
  className?: string;
}

export function UserCard({ user, onSelect, className = '' }: UserCardProps) {
  // ...
}

// ❌ Salah — terlalu banyak props
interface BadComponentProps {
  user: User;
  onSelect: (user: User) => void;
  onDelete: (user: User) => void;
  onEdit: (user: User) => void;
  onShare: (user: User) => void;
  isSelected: boolean;
  isHovered: boolean;
  className: string;
}
```

### Server vs Client Component (Next.js)
- **Default: gunakan Server Component.**
- Gunakan `'use client'` hanya jika butuh:
  - `useState`, `useEffect`, atau hooks lainnya
  - Event listener (`onClick`, `onChange`, dll)
  - Browser API (`localStorage`, `window`, dll)
  - Library yang tidak support SSR (3D, audio, dll)

```typescript
// ✅ Server Component — default
export function ProjectCard({ project }: { project: Project }) {
  return <div className="card">{project.title}</div>;
}

// ✅ Client Component — dengan 'use client'
'use client';

export function AudioPlayer({ track }: { track: Track }) {
  const [isPlaying, setIsPlaying] = useState(false);
  // ...
}
```

### Komponen Kecil
- Pisah ke file sendiri jika dipakai lebih dari satu tempat.
- Boleh digabung dalam satu file jika hanya dipakai di satu komponen induk (co-location).

---

## 8. Styling Rules

### Pendekatan Styling
- Gunakan **Tailwind CSS** sebagai primary styling.
- **Jangan gunakan inline style** kecuali untuk nilai yang benar-benar dinamis.
- **Jangan gunakan `!important`** — gunakan specificity yang tepat.

### Tailwind CSS
- Gunakan utility class langsung di JSX.
- Gunakan **`clsx`** atau **`cn`** (dari utils) untuk conditional class.
- Ekstrak ke komponen jika class yang sama dipakai lebih dari 3 kali.
- Urutan class: **layout > spacing > sizing > color > typography > state**

```typescript
// ✅ Benar
import { cn } from '@/lib/utils';

<div className={cn(
  'flex items-center justify-between',
  'p-4 rounded-lg',
  'bg-surface text-text-primary',
  'hover:bg-surface-light transition-colors',
  isActive && 'border-primary border-2'
)}>
```

### Responsive Design
- Pendekatan **mobile-first**.
- Breakpoint:
  - `sm`: 640px (tablet kecil)
  - `md`: 768px (tablet)
  - `lg`: 1024px (desktop)
  - `xl`: 1280px (desktop lebar)
  - `2xl`: 1536px (ultra-wide)

### Dark Mode
- Gunakan **CSS variables** dari ShadcnUI untuk dark/light mode.
- Semua komponen harus di-test di dark dan light mode.
- Jangan hardcode warna — selalu gunakan variabel CSS atau token.

```css
/* ✅ Benar — menggunakan CSS variables */
.card {
  background: var(--card);
  color: var(--card-foreground);
}

/* ❌ Salah — hardcode warna */
.card {
  background: #18181b;
  color: #fafafa;
}
```

### Design Tokens
- Gunakan CSS variables untuk warna, spacing, dan typography.
- Definisi di `globals.css` (dari ShadcnUI).
- Referensi di DESIGN.md untuk konsistensi.

---

## 9. API & Data Fetching Rules

### Kapan Pakai Server vs Client Fetch
- **Server fetch:** data statis atau data yang tidak butuh interaksi user.
- **Client fetch:** data yang berubah setelah interaksi user.
- Gunakan **React Query** atau **SWR** untuk client-side data fetching.
- **Jangan gunakan `useEffect` untuk fetching data** — gunakan React Query.

```typescript
// ✅ Benar — React Query
import { useQuery } from '@tanstack/react-query';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(),
  });
}

// ❌ Salah — useEffect
useEffect(() => {
  fetchProjects().then(setProjects);
}, []);
```

### Format Response API
Selalu kembalikan format yang konsisten di semua endpoint:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  error?: string;
}
```

### Error Handling di API
- Selalu tangani error dengan try-catch.
- Kembalikan status code yang tepat (200, 400, 401, 404, 500).
- Jangan expose detail error ke client di production.

### Lokasi Fetch Function
- Semua fungsi fetch disimpan di `lib/queries/`.
- Jangan tulis fungsi fetch langsung di dalam komponen.

### Environment
- Gunakan environment variable untuk semua URL dan API key.
- Jangan hardcode URL atau secret apapun langsung di kode.

---

## 10. State Management Rules

### Hierarki State (gunakan dari yang paling sederhana dulu)
1. **Local state (`useState`)** : hanya dipakai 1 komponen.
2. **Lifted state** : dipakai 2-3 komponen yang berdekatan.
3. **Global state (Zustand)** : dipakai banyak komponen di banyak tempat.

### Kapan Pakai Global State (Zustand)
- Data user atau auth yang dibutuhkan banyak komponen.
- UI state global (tema, bahasa, layout toggle).
- Data yang perlu persist antar halaman.

### Aturan Zustand
- Buat store per domain atau fitur — jangan satu store untuk semuanya.
- Jangan simpan data yang bisa dihitung dari data lain.
- Gunakan **selector** untuk mengambil data spesifik dari store.

```typescript
// ✅ Benar
import { create } from 'zustand';

interface UIStore {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'dark' ? 'light' : 'dark'
  })),
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({
    isMobileMenuOpen: !state.isMobileMenuOpen
  })),
}));

// ❌ Salah — satu store untuk semuanya
const useStore = create((set) => ({
  theme: 'dark',
  user: null,
  projects: [],
  stats: [],
  // ... terlalu banyak
}));
```

### Kapan Pakai Context
- Untuk data yang jarang berubah (tema, locale, config global).
- Jangan gunakan Context untuk state yang sering berubah.

---

## 11. Performance Rules

### Code Splitting
- Gunakan **dynamic import** untuk komponen besar yang tidak langsung terlihat.
- Lazy load halaman dan komponen yang jarang diakses.

```typescript
// ✅ Benar
const AudioPlayer = dynamic(() => import('@/components/shared/audio-player'), {
  ssr: false,
  loading: () => <Skeleton className="h-32 w-full" />
});

// ❌ Salah — semua di-import di awal
import AudioPlayer from '@/components/shared/audio-player';
```

### Image Optimization
- Selalu gunakan komponen **Image** dari Next.js (`next/image`).
- Tentukan `width` dan `height` untuk setiap gambar.
- Gunakan format **WebP atau AVIF** untuk gambar baru.
- Jangan gunakan tag `<img>` HTML biasa.

```typescript
// ✅ Benar
import Image from 'next/image';

<Image
  src="/images/hero-guitar.avif"
  alt="Gitaris sedang bermain di studio"
  width={1200}
  height={800}
  priority
  className="rounded-lg"
/>

// ❌ Salah
<img src="/images/hero.jpg" alt="hero" />
```

### Re-render Optimization
- Gunakan **`useMemo`** untuk kalkulasi yang berat.
- Gunakan **`useCallback`** untuk fungsi yang dikirim sebagai props.
- Jangan overuse memo — lakukan profiling dulu sebelum optimize.

### Bundle Size
- Import hanya yang dibutuhkan, bukan seluruh library.

```typescript
// ✅ Benar
import { debounce } from 'lodash';

// ❌ Salah
import _ from 'lodash';
```

### SSR dan SSG (Next.js)
- Default ke **Server Component** untuk mengurangi JavaScript di client.
- Gunakan **Static Generation** untuk halaman yang datanya jarang berubah.
- Gunakan **ISR** untuk halaman yang butuh revalidasi berkala.

---

## 12. Git Rules

> **CRITICAL**: Setiap kali Claude Code selesai membuat perubahan atau penambahan kode, **langsung commit ke GitHub** sebelum melanjutkan ke task berikutnya. Ini penting supaya kamu bisa membandingkan kode lama dan kode baru, dan melakukan undo jika hasilnya tidak sesuai ekspektasi.

### Format Commit Message
```
feat     : deskripsi fitur baru
fix      : deskripsi bug yang diperbaiki
refactor : deskripsi perubahan refactor
style    : perubahan styling atau formatting
docs     : perubahan dokumentasi
test     : penambahan atau perubahan test
chore    : perubahan konfigurasi atau tooling
```

### Contoh
```
feat: add realtime guestbook with Supabase Replication
fix: resolve mobile CTA overlapping footer on iOS
refactor: extract audio player into reusable component
style: update dark mode colors to match DESIGN.md
docs: add production.md deployment guide
test: add unit tests for booking form validation
chore: upgrade Supabase client to v2.0
```

### Aturan Tambahan
- **Jangan commit** file `.env` atau file yang berisi secret apapun.
- Satu commit untuk satu perubahan yang spesifik.
- Jangan gabungkan banyak perubahan yang tidak berkaitan dalam satu commit.
- Tulis commit message dalam Bahasa Inggris.

---

## 13. Features

### Sudah selesai dan berjalan
- [x] Project setup (Next.js 15 + TypeScript + Tailwind + ShadcnUI)
- [x] Supabase integration (Client + Server)
- [x] Authentication (Supabase Auth)
- [x] Dark/Light mode toggles
- [x] Responsive layout (mobile-first)
- [x] Dynamic metadata per page
- [x] Favicon set (32x32, 180x180, 192x192, 512x512)
- [x] Robots.txt & Sitemap.xml auto-generation
- [x] Custom 404 page with guitar string theme
- [x] Analytics integration (Vercel Analytics)
- [x] Cookie Banner consent

### Sedang dikerjakan — jangan diubah tanpa konfirmasi
- [ ] Home Page — Hero Section with dual CTA
- [ ] Realtime Dashboard Stats component
- [ ] Project cards with ShadcnUI Dialog
- [ ] Dynamic Audio Showcase with waveform
- [ ] Contact form with validation and error states
- [ ] Booking form with calendar (ShadcnUI)

### Belum dimulai
- [ ] Realtime Guestbook
- [ ] Live Chat system (client portal)
- [ ] Command Palette (CMD+K)
- [ ] Secure Client Portal dashboard
- [ ] Privacy Policy & Terms pages
- [ ] Thank You page
- [ ] Sticky Mobile CTA
- [ ] SEO optimization (OG image, alt text)

---

## 14. Testing

### Pendekatan Testing
- **Jenis testing:** Unit + Integration + Manual.
- **Framework:** Jest / Vitest + React Testing Library.

### Yang Perlu Di-test
- Semua fungsi utility dan helper.
- Logic bisnis yang kompleks.
- API endpoint (happy path dan error case).
- Komponen kritis yang sering dipakai banyak halaman.

### Yang Tidak Perlu Di-test
- Komponen presentational yang sangat sederhana.
- Third-party library (sudah di-test oleh pembuatnya).
- File konfigurasi.

### Aturan Penulisan Test
- Satu test file per satu file yang di-test.
- Nama test harus deskriptif:
  - `'should [expected behavior] when [condition]'`
- Gunakan pola **AAA**: Arrange, Act, Assert.

### Coverage Target
- **Minimum coverage:** 60% (fokus pada fungsi bisnis).
- **Prioritas:** fungsi bisnis > API > komponen UI.

---

## 15. Do Not

> **Jika instruksi atau prompt kamu ambigu, TANYA DULU sebelum mulai coding. Jangan berasumsi dan langsung mengerjakan tanpa konfirmasi.**

### Struktur dan File
- ❌ Jangan buat folder baru tanpa konfirmasi.
- ❌ Jangan hapus file tanpa konfirmasi.
- ❌ Jangan pindahkan file tanpa konfirmasi.
- ❌ Jangan ubah struktur folder yang sudah ada.
- ❌ Jangan gunakan direktori `src/`.

### Kode
- ❌ Jangan gunakan tipe `any` di TypeScript.
- ❌ Jangan hardcode nilai yang seharusnya dari environment variable.
- ❌ Jangan commit file `.env` atau file yang berisi secret.
- ❌ Jangan install package baru tanpa konfirmasi.
- ❌ Jangan hapus atau ubah fitur yang sudah berjalan tanpa instruksi jelas.

### Pattern yang Dilarang
- ❌ Jangan gunakan `useEffect` untuk data fetching — pakai React Query.
- ❌ Jangan gunakan inline style untuk nilai yang bisa pakai utility class.
- ❌ Jangan gunakan `!important` di CSS.
- ❌ Jangan gunakan `<img>` tag — pakai `next/image`.
- ❌ Jangan import seluruh library — import spesifik.

### Database
- ❌ Jangan jalankan perintah yang mengubah atau menghapus data production.
- ❌ Jangan buat migrasi database tanpa konfirmasi.
- ❌ Jangan expose credential database ke sisi client.

### Keamanan
- ❌ Jangan expose API key atau secret apapun ke client.
- ❌ Jangan bypass validasi input dari user.
- ❌ Jangan skip error handling di API routes.

---

## 16. Environment Variables

### Setup
- Copy `.env.example` ke `.env.local` untuk development lokal.
- **Jangan pernah commit file `.env` atau `.env.local` ke repository.**

### Public Variables — aman dipakai di sisi client
```
NEXT_PUBLIC_SUPABASE_URL          # URL Supabase project
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Supabase anonymous key
NEXT_PUBLIC_APP_URL               # Base URL aplikasi
NEXT_PUBLIC_ANALYTICS_ID          # Vercel Analytics / Umami ID
```

### Server-only Variables — JANGAN pernah expose ke client
```
SUPABASE_SERVICE_ROLE_KEY         # Supabase service role key (admin)
DATABASE_URL                      # PostgreSQL connection string (jika langsung)
NEXT_PUBLIC_SUPABASE_ANON_KEY     # (juga dibutuhkan server)
```

### Auth Variables
```
NEXTAUTH_SECRET                   # Secret untuk JWT signing (jika pakai NextAuth)
NEXTAUTH_URL                      # Base URL aplikasi (jika pakai NextAuth)
SUPABASE_JWT_SECRET               # JWT secret dari Supabase
```

---