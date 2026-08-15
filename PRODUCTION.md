# Production Deployment Guide — Web Portfolio

> Panduan lengkap untuk mendeploy Web Portfolio ke produksi dengan aman, cepat, dan profesional.

---

## 1. Prasyarat Sebelum Deploy

### 1.1. Checklist Kesiapan

Sebelum deploy ke production, pastikan semua item ini sudah selesai:

- [ ] Semua fitur utama berfungsi di localhost
- [ ] Responsive design di-test di semua breakpoints (mobile, tablet, desktop)
- [ ] Dark & Light mode berfungsi dengan baik
- [ ] Semua gambar sudah dikompresi ke format WebP/AVIF
- [ ] Alt text ada di semua gambar
- [ ] Meta tags (title, description, OG image) sudah di-set per halaman
- [ ] Robots.txt dan Sitemap.xml sudah dikonfigurasi
- [ ] Privacy Policy & Terms pages sudah selesai
- [ ] Cookie Banner berfungsi
- [ ] Analytics sudah terintegrasi
- [ ] Semua environment variables sudah di-set
- [ ] Tidak ada error/warning di console
- [ ] Build success (`npm run build`)
- [ ] Lighthouse score > 90 (Performance, Accessibility, SEO)

### 1.2. Environment Variables Production

Buat file `.env.production` atau set di Vercel dashboard:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]

# App
NEXT_PUBLIC_APP_URL=https://[your-domain.com]

# Analytics (Vercel)
VERCEL_ANALYTICS_ID=[your-analytics-id]

# Optional: Umami
NEXT_PUBLIC_UMAMI_WEBSITE_ID=[umami-id]
NEXT_PUBLIC_UMAMI_SCRIPT_URL=[umami-script-url]
```

---

## 2. Database Preparation (Supabase)

### 2.1. Setup Supabase Project

1. **Buat project di Supabase** → `https://supabase.com/dashboard`
2. **Pilih region** terdekat dengan target audiens (Singapore / Tokyo untuk Asia)
3. **Aktifkan Row Level Security (RLS)** di semua tabel
4. **Buat tabel** sesuai blueprint:

```sql
-- Tabel profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR,
  avatar_url TEXT,
  role VARCHAR CHECK (role IN ('admin', 'client', 'guest')) DEFAULT 'guest',
  company_name VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  tech_stack TEXT[],
  live_url TEXT,
  repository_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_projects_slug ON projects(slug);

-- Tabel tracks
CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  genre VARCHAR,
  audio_url TEXT NOT NULL,
  duration INTEGER,
  waveform_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel live_stats
CREATE TABLE live_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_key VARCHAR UNIQUE NOT NULL,
  metric_value INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel guestbook
CREATE TABLE guestbook (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  message TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE guestbook ENABLE REPLICA IDENTITY FULL;

-- Tabel bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  client_name VARCHAR NOT NULL,
  client_email VARCHAR NOT NULL,
  booking_type VARCHAR CHECK (booking_type IN ('web_consultation', 'guitar_session')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  status VARCHAR CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_bookings_scheduled_at ON bookings(scheduled_at);

-- Tabel messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  message_text TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.2. Enable Realtime

```sql
-- Aktifkan Realtime untuk tabel yang membutuhkan
ALTER TABLE guestbook REPLICA IDENTITY FULL;
ALTER TABLE live_stats REPLICA IDENTITY FULL;

-- Di Supabase Dashboard:
-- 1. Database → Replication → Publications
-- 2. Tambahkan tabel: guestbook, live_stats, messages
-- 3. Pilih operation: INSERT, UPDATE, DELETE
```

### 2.3. Seed Data Initial

```sql
-- Insert initial live_stats
INSERT INTO live_stats (metric_key, metric_value) VALUES
  ('github_commits', 486),
  ('hours_practiced', 1234),
  ('projects_active', 3),
  ('lines_of_code', 12750);

-- Insert sample projects
INSERT INTO projects (title, slug, description, tech_stack, is_featured) VALUES
  ('E-Commerce SaaS', 'e-commerce-saas', 'Platform e-commerce modern dengan realtime inventory', ARRAY['Next.js', 'TailwindCSS', 'Supabase'], TRUE),
  ('Studio Recording App', 'studio-recording', 'Aplikasi manajemen sesi rekaman untuk musisi', ARRAY['React', 'TypeScript', 'Supabase', 'Web Audio API'], TRUE),
  ('Portfolio Builder', 'portfolio-builder', 'Website builder untuk musisi dan seniman', ARRAY['Next.js', 'TailwindCSS', 'Supabase'], FALSE);
```

### 2.4. Storage Setup (Supabase Storage)

1. **Buat bucket** di Supabase Storage:
   - `audio/` — untuk file audio (.mp3, .wav)
   - `images/` — untuk gambar project dan avatar
   - `thumbnails/` — untuk thumbnail project

2. **Set RLS Policy** untuk storage:

```sql
-- Bucket images — publik (read)
CREATE POLICY "Images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

-- Bucket audio — publik (read)
CREATE POLICY "Audio are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'audio');

-- Bucket thumbnails — publik (read)
CREATE POLICY "Thumbnails are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'thumbnails');

-- Upload hanya untuk admin (authenticated)
CREATE POLICY "Admins can upload images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
```

---

## 3. Build & Deploy

### 3.1. Local Build Test

```bash
# Install dependencies
npm install

# Build production
npm run build

# Test production build locally
npm run start
```

### 3.2. Deploy ke Vercel

#### Opsi A: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm add -g vercel

# Login ke Vercel
vercel login

# Deploy ke production
vercel --prod

# Deploy ke preview (staging)
vercel
```

#### Opsi B: Deploy via Git Integration

1. **Push ke GitHub**:
```bash
git add .
git commit -m "chore: production release v1.0.0"
git push origin main
```

2. **Import project ke Vercel**:
   - Dashboard Vercel → Add New → Project
   - Pilih repository GitHub
   - Framework: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Set Environment Variables** di Vercel Dashboard:
   - Project → Settings → Environment Variables
   - Tambahkan semua variabel dari `.env.production`

4. **Deploy**:
   - Vercel akan otomatis deploy setiap push ke `main`

### 3.3. Custom Domain Setup

1. **Beli domain** (jika belum): Namecheap, GoDaddy, Niagahoster, dll.
2. **Set Nameservers** ke Vercel atau Cloudflare.
3. **Tambahkan domain** di Vercel Dashboard:
   - Project → Settings → Domains
   - Tambahkan: `your-domain.com` dan `www.your-domain.com`
4. **Set DNS Records**:
   - A Record → `76.76.21.21` (Vercel IP)
   - CNAME → `cname.vercel-dns.com`

---

## 4. Post-Deployment Checklist

### 4.1. Verify Live Site

- [ ] Website dapat diakses di domain production
- [ ] HTTPS aktif (SSL certificate dari Vercel)
- [ ] Semua halaman loading dengan benar
- [ ] Dark/Light mode berfungsi
- [ ] Responsive di mobile, tablet, desktop
- [ ] Gambar loading dengan baik (WebP/AVIF)
- [ ] Database connection berhasil
- [ ] Realtime features berfungsi (guestbook, stats)
- [ ] Authentication bekerja (login/logout)
- [ ] Form validation dan error states berfungsi
- [ ] Cookie Banner muncul dan menyimpan preferensi
- [ ] Analytics tracking aktif

### 4.2. Verify SEO

- [ ] Meta tags (title, description) correct per page
- [ ] OG image appears on social media share
- [ ] Robots.txt accessible: `your-domain.com/robots.txt`
- [ ] Sitemap.xml accessible: `your-domain.com/sitemap.xml`
- [ ] Google Search Console configured
- [ ] Google Analytics / Vercel Analytics tracking active

### 4.3. Verify Performance

- [ ] Lighthouse score > 90
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Total Blocking Time (TBT) < 200ms
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Core Web Vitals pass all metrics

### 4.4. Verify Security

- [ ] HTTPS enforced (Vercel auto)
- [ ] Environment variables not exposed
- [ ] Supabase RLS policies active
- [ ] Input validation on all forms
- [ ] No sensitive data in client-side code
- [ ] Cookie consent active (GDPR compliant)
- [ ] Privacy Policy & Terms pages accessible

---

## 5. Monitoring & Maintenance

### 5.1. Analytics Dashboard

**Vercel Analytics:**
- **URL:** Vercel Dashboard → Project → Analytics
- **Monitor:** Traffic, page views, performance, Core Web Vitals

**Google Search Console:**
- **URL:** `https://search.google.com/search-console`
- **Monitor:** Indexing, search performance, crawling errors

**Google Analytics (opsional):**
- **URL:** `https://analytics.google.com`
- **Monitor:** User behavior, conversions, traffic sources

### 5.2. Error Monitoring

**Vercel Logs:**
- Vercel Dashboard → Project → Deployments → [Latest] → Functions

**Sentry (opsional):**
```bash
npm add @sentry/nextjs
```

### 5.3. Uptime Monitoring

**Recommended services:**
- **UptimeRobot** (free) — ping monitoring
- **Better Uptime** — status page + alerts
- **Vercel Analytics** — built-in uptime monitoring

### 5.4. Backup Strategy

**Database Backup:**
- Supabase → Database → Backups (auto daily)
- Export manual: `pg_dump` atau Supabase Dashboard

**Code Backup:**
- GitHub repository (auto backup)
- Local clone + upstream sync

---

## 6. Rollback Procedure

### 6.1. Rollback Vercel Deployment

1. Vercel Dashboard → Project → Deployments
2. Pilih deployment yang stabil
3. Klik "Promote to Production"

### 6.2. Rollback Database

```bash
# 1. Download backup dari Supabase
# 2. Restore database
psql -h [db-host] -U [db-user] -d [db-name] -f backup.sql
```

---

## 7. Environment Variables Reference

### Production Variables

```env
# Supabase — REQUIRED
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]

# App URL — REQUIRED
NEXT_PUBLIC_APP_URL=https://[your-domain.com]

# Analytics — OPTIONAL
VERCEL_ANALYTICS_ID=[id]
NEXT_PUBLIC_UMAMI_WEBSITE_ID=[id]
NEXT_PUBLIC_UMAMI_SCRIPT_URL=[url]

# Feature Flags — OPTIONAL
NEXT_PUBLIC_ENABLE_REALTIME=true
NEXT_PUBLIC_ENABLE_CHAT=true
```

---

## 8. Performance Optimization Checklist

### 8.1. Images
- [ ] All images in WebP/AVIF format
- [ ] Proper width/height attributes
- [ ] `priority` flag for LCP images
- [ ] Lazy loading for below-the-fold images
- [ ] Compression quality 75-82%

### 8.2. Fonts
- [ ] Preload critical fonts
- [ ] `font-display: swap` for Google Fonts
- [ ] Optimized font loading

### 8.3. Next.js Optimizations
- [ ] Server Components by default
- [ ] Dynamic imports for heavy components
- [ ] ISR for static pages with data
- [ ] Proper cache headers

### 8.4. Supabase Optimizations
- [ ] Database indexing on query columns
- [ ] RLS policies optimized
- [ ] Connection pooling enabled (Supabase)
- [ ] Edge functions for heavy operations

---

## 9. Cost Estimation

| Service | Cost (Monthly) | Notes |
|---------|---------------|-------|
| Vercel (Hobby) | $0 | 100GB bandwidth, 100 deployments/mo |
| Supabase (Free) | $0 | 500MB database, 1GB file storage |
| Custom Domain | $8-15/year | Namecheap, GoDaddy, dll |
| SSL Certificate | $0 | Included with Vercel |
| Cloudflare (opsional) | $0 | CDN + DNS management |
| **Total** | **~$1/month** | Sangat affordable untuk portfolio pribadi |

---

## 10. Troubleshooting Common Issues

### Issue: "404 Not Found" pada deployment

- Periksa `vercel.json` configuration
- Pastikan `package.json` build script correct
- Periksa `next.config.js` output: `output: 'standalone'`

### Issue: Supabase connection failed

- Periksa environment variables di Vercel
- Pastikan IP address tidak di-block di Supabase
- Cek Supabase project status

### Issue: Images not loading

- Periksa format file (harus .webp/.avif)
- Pastikan path image correct (public/images/)
- Cek Next.js Image component configuration

### Issue: Realtime not working

- Cek Supabase Replication setup
- Pastikan tabel sudah `REPLICA IDENTITY FULL`
- Cek subscription status di console

### Issue: Lighthouse score low

- Optimasi gambar (format WebP/AVIF)
- Kurangi JavaScript bundle size
- Implement lazy loading
- Gunakan Server Components

---

*Dokumen ini harus diupdate setiap kali ada perubahan signifikan di infrastruktur atau deployment process.*