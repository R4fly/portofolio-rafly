# System Architecture — Web Portfolio

> Dokumentasi arsitektur sistem untuk Web Portfolio: Junior Developer & Gitaris.

---

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER BROWSER                                  │
│                     (Chrome, Safari, Firefox, Mobile)                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           VERCEL (CDN + Edge)                             │
│                                                                           │
│  ┌─────────────────────┐    ┌──────────────────────────────────────────┐ │
│  │   Static Assets     │    │         Next.js Server (Edge)           │ │
│  │   (HTML, CSS, JS)   │    │  - Server Components                    │ │
│  │   Images (WebP/AVIF)│    │  - API Routes                          │ │
│  │   Fonts             │    │  - Middleware (Auth)                   │ │
│  └─────────────────────┘    └──────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
            ┌───────────┐   ┌───────────┐   ┌───────────┐
            │ Supabase  │   │ Supabase  │   │  Storage  │
            │ Database  │   │ Realtime  │   │ (Audio,   │
            │(PostgreSQL│   │ Broadcast │   │  Images)  │
            │  + RLS)   │   │ Replication│   │           │
            └───────────┘   └───────────┘   └───────────┘
```

---

## 2. Technology Stack Overview

### Frontend Layer
| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 15 (App Router) | React framework with SSR/SSG/ISR |
| Styling | Tailwind CSS + ShadcnUI | Utility-first styling + pre-built components |
| State Management | Zustand + React Query | Local state + server-state management |
| Real-time | Supabase Realtime | Live data sync (guestbook, stats, chat) |
| Auth | Supabase Auth | Authentication + session management |

### Backend Layer
| Layer | Technology | Purpose |
|-------|------------|---------|
| Database | Supabase PostgreSQL | Primary data store |
| API | Next.js API Routes + Supabase | Backend endpoints + database access |
| Realtime | Supabase Realtime | WebSocket-based real-time updates |
| Storage | Supabase Storage | File storage (audio, images) |
| Auth | Supabase Auth | JWT-based authentication |

### External Services
| Service | Purpose |
|---------|---------|
| Vercel | Hosting + CDN + Edge Functions |
| Supabase | Database + Auth + Realtime + Storage |
| Umami / Vercel Analytics | Analytics tracking |
| Google Fonts / Fontsource | Typography (Plus Jakarta Sans, Inter, Geist Mono) |

---

## 3. Data Flow Architecture

### 3.1. Server-Side Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        USER REQUEST (Browser)                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS SERVER (Edge)                          │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │                    Middleware (auth check)                      │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                    │                                  │
│                    ┌───────────────┴───────────────┐                 │
│                    ▼                               ▼                 │
│      ┌─────────────────────┐         ┌──────────────────────────┐   │
│      │  Server Components  │         │    API Routes (Server)   │   │
│      │  (page.tsx, layout) │         │    (route.ts)            │   │
│      └─────────────────────┘         └──────────────────────────┘   │
│                    │                               │                 │
│                    ▼                               ▼                 │
│      ┌─────────────────────┐         ┌──────────────────────────┐   │
│      │  Supabase Server    │         │   Database Queries       │   │
│      │  Client             │         │   (Supabase)             │   │
│      │  (Service Role)     │         │                          │   │
│      └─────────────────────┘         └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        SUPABASE DATABASE                              │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │   PostgreSQL + RLS                                               │ │
│  │   Tables: profiles, projects, tracks, live_stats,              │ │
│  │   guestbook, bookings, messages                                 │ │
│  └──────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2. Client-Side Data Flow (Realtime)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                                   │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │                    React Component (Client)                     │ │
│  │                                                                 │ │
│  │  ┌──────────────────────────────────────────────────────────┐  │ │
│  │  │          React Query / SWR Hook                         │  │ │
│  │  │      (useRealtimeStats, useGuestbook, etc.)            │  │ │
│  │  └──────────────────────────────────────────────────────────┘  │ │
│  │                            │                                   │ │
│  └────────────────────────────┼───────────────────────────────────┘ │
│                                │                                     │
└────────────────────────────────┼─────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                  SUPABASE REALTIME (WebSocket)                        │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  Channel: "realtime:public:guestbook"                           │ │
│  │  - Subscribes to INSERT, UPDATE, DELETE operations             │ │
│  │  - Broadcast to all connected clients                          │ │
│  │                                                                 │ │
│  │  Channel: "realtime:public:live_stats"                         │ │
│  │  - Subscribes to UPDATE operations                             │ │
│  │  - Updates stats dashboard instantly                           │ │
│  │                                                                 │ │
│  │  Channel: "realtime:public:messages"                           │ │
│  │  - Subscribes to INSERT operations                             │ │
│  │  - Private chat functionality                                  │ │
│  └──────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        SUPABASE DATABASE                              │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  • guestbook (REPLICA IDENTITY FULL)                            │ │
│  │  • live_stats (REPLICA IDENTITY FULL)                           │ │
│  │  • messages (REPLICA IDENTITY FULL)                             │ │
│  └──────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Database Schema Diagram

```
┌───────────────────────────────────────────────────────────────────────────┐
│                             auth.users                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  id (PK)  │  email  │  encrypted_password  │  ...                 │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                   │ (1:1)                               │
│                                   ▼                                     │
│                             profiles                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  id (PK)  │  full_name  │  avatar_url  │  role  │  company_name   │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                         │                 │                             │
│              (1:many)   │                 │   (1:many)                  │
│                         ▼                 ▼                             │
│              bookings                    messages                        │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  id (PK)  │  client_id (FK)  │  client_name  │  client_email      │ │
│  │  booking_type  │  scheduled_at  │  status  │  notes              │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│                          ┌──────────────────┐                          │
│                          │    projects       │                          │
│                          │  ┌────────────────────────────────────────┐ │
│                          │  │  id (PK)  │  title  │  slug (UNIQUE)  │ │
│                          │  │  description  │  thumbnail_url        │ │
│                          │  │  tech_stack[]  │  live_url            │ │
│                          │  │  repository_url  │  is_featured       │ │
│                          │  │  created_at                           │ │
│                          │  └────────────────────────────────────────┘ │
│                          │                                             │
│                          │  ┌──────────────────┐                      │
│                          │  │    tracks         │                      │
│                          │  │  ┌────────────────────────────────────┐ │
│                          │  │  │  id (PK)  │  title  │  genre      │ │
│                          │  │  │  audio_url  │  duration            │ │
│                          │  │  │  waveform_data (JSONB)             │ │
│                          │  │  │  created_at                        │ │
│                          │  │  └────────────────────────────────────┘ │
│                          │                                             │
│                          │  ┌──────────────────┐                      │
│                          │  │  live_stats      │                      │
│                          │  │  ┌────────────────────────────────────┐ │
│                          │  │  │  id (PK)  │  metric_key (UNIQUE)  │ │
│                          │  │  │  metric_value  │  updated_at       │ │
│                          │  │  └────────────────────────────────────┘ │
│                          │                                             │
│                          │  ┌──────────────────┐                      │
│                          │  │  guestbook       │                      │
│                          │  │  ┌────────────────────────────────────┐ │
│                          │  │  │  id (PK)  │  name  │  message      │ │
│                          │  │  │  is_approved  │  created_at        │ │
│                          │  │  └────────────────────────────────────┘ │
│                          └─────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Authentication Flow

```
┌───────────────────────────────────────────────────────────────────────────┐
│                        AUTHENTICATION FLOW                              │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  1. USER ENTERS EMAIL/PASSWORD                                          │
│         │                                                               │
│         ▼                                                               │
│  2. SUPABASE AUTH (signInWithPassword)                                  │
│         │                                                               │
│         ├─── SUCCESS ──────────────────────────────────────────────┐   │
│         │                                                         │   │
│         ▼                                                         │   │
│  3. JWT TOKEN RETURNED (Session)                                   │   │
│         │                                                         │   │
│         ▼                                                         │   │
│  4. SUPABASE CLIENT UPDATED                                        │   │
│         │                                                         │   │
│         ▼                                                         │   │
│  5. REDIRECT TO DASHBOARD                                         │   │
│         │                                                         │   │
│         ▼                                                         │   │
│  6. FETCH USER PROFILE + RLS CHECKS                              │   │
│                                                                   │   │
│  ┌─────────────────────────────────────────────────────────────┐ │   │
│  │  MIDDLEWARE (Edge)                                         │ │   │
│  │  • Check JWT token on every request                        │ │   │
│  │  • Validate session with Supabase                          │ │   │
│  │  • Redirect to login if unauthenticated                   │ │   │
│  │  • Check role-based access (admin/client/guest)           │ │   │
│  └─────────────────────────────────────────────────────────────┘ │   │
│                                                                   │   │
│  ┌─────────────────────────────────────────────────────────────┐ │   │
│  │  RLS POLICIES (Database Level)                             │ │   │
│  │  • SELECT: User can only see their own data               │ │   │
│  │  • INSERT: User can insert data with their ID             │ │   │
│  │  • UPDATE: User can update their own data                 │ │   │
│  │  • DELETE: Admin only                                     │ │   │
│  └─────────────────────────────────────────────────────────────┘ │   │
│                                                                   │   │
└───────────────────────────────────────────────────────────────────────┘
```

---

## 6. Realtime Architecture

```
┌───────────────────────────────────────────────────────────────────────────┐
│                         REALTIME ARCHITECTURE                           │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  CLIENT SIDE                                                       │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Supabase Client (Browser)                                     │ │
│  │  │  • subscribe() → Channel                                      │ │
│  │  │  • Realtime Channel: "realtime:public:guestbook"              │ │
│  │  │  • Realtime Channel: "realtime:public:live_stats"             │ │
│  │  │  • Realtime Channel: "realtime:public:messages"               │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                              │                                      │
│  │                              ▼                                      │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  React Query Hooks                                             │ │
│  │  │  • useRealtimeGuestbook() → returns messages                  │ │
│  │  │  • useRealtimeStats() → returns live stats                   │ │
│  │  │  • useRealtimeMessages() → returns chat messages              │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  SUPABASE REALTIME SERVER                                          │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  WebSocket Connection                                          │ │
│  │  │  • wss://[project].supabase.co/realtime/v1/ws                 │ │
│  │  │  • JWT authentication required                                 │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                              │                                      │
│  │                              ▼                                      │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Replication Engine                                            │ │
│  │  │  • Tracks changes to: guestbook, live_stats, messages         │ │
│  │  │  • Broadcasts changes to all subscribers                      │ │
│  │  │  • Filters by table + operation (INSERT/UPDATE/DELETE)       │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  DATABASE (PostgreSQL)                                             │ │
│  │  • guestbook: REPLICA IDENTITY FULL                               │ │
│  │  • live_stats: REPLICA IDENTITY FULL                              │ │
│  │  • messages: REPLICA IDENTITY FULL                                │ │
│  │  • Triggers and publication setup                                 │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Component Architecture

```
┌───────────────────────────────────────────────────────────────────────────┐
│                         COMPONENT ARCHITECTURE                           │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  Root Layout (app/layout.tsx) — Server Component                  │ │
│  │  • Providers (Theme, React Query, Supabase)                       │ │
│  │  • Header + Footer                                                │ │
│  │  • Cookie Banner                                                  │ │
│  │  • Analytics Scripts                                              │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  Home Page (app/page.tsx) — Server Component                      │ │
│  │                                                                    │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Section: Hero (Above the Fold)                               │ │
│  │  │  • Title + Subtitle                                           │ │
│  │  │  • Dual CTA (Primary + Secondary)                             │ │
│  │  │  • Hero Image (priority)                                      │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                    │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Section: Realtime Stats — Client Component                   │ │
│  │  │  • Stats Cards (4 columns)                                    │ │
│  │  │  • Animated numbers                                           │ │
│  │  │  • Supabase Realtime subscription                             │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                    │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Section: Featured Projects — Server Component                │ │
│  │  │  • Project Grid (3 columns)                                   │ │
│  │  │  • Card component with Dialog on click                       │ │
│  │  │  • Tech stack badges                                          │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                    │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Section: Audio Showcase — Client Component                   │ │
│  │  │  • Audio Player with waveform                                 │ │
│  │  │  • Play/Pause controls                                        │ │
│  │  │  • Track list                                                 │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                    │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Section: Guestbook — Client Component                        │ │
│  │  │  • Message list (realtime)                                    │ │
│  │  │  • Submit form                                               │ │
│  │  │  • Supabase Realtime subscription                             │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                    │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Sticky Mobile CTA — Client Component                         │ │
│  │  │  • Appears only on mobile (< 768px)                           │ │
│  │  │  • Fixed positioning at bottom                                │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                    │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Command Palette (CMD+K) — Client Component                   │ │
│  │  │  • Global keyboard shortcut                                   │ │
│  │  │  • Search navigation + projects                               │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 8. State Management Architecture

```
┌───────────────────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT ARCHITECTURE                      │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  SERVER STATE (React Query)                                        │ │
│  │  • Caches data from Supabase                                      │ │
│  │  • Auto re-fetch on window focus + interval                       │ │
│  │  • Optimistic updates                                             │ │
│  │  • Request deduplication                                          │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Queries:                                                      │ │
│  │  │  • useProjects() → fetch all projects                         │ │
│  │  │  • useProject(slug) → fetch single project by slug            │ │
│  │  │  • useTracks() → fetch audio tracks                           │ │
│  │  │  • useStats() → fetch live stats                              │ │
│  │  │  • useGuestbook() → fetch guestbook messages                  │ │
│  │  │  • useBookings() → fetch user bookings                        │ │
│  │  │  • useMessages() → fetch chat messages                        │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Mutations:                                                    │ │
│  │  │  • useAddGuestbook() → add new message                        │ │
│  │  │  • useCreateBooking() → create new booking                    │ │
│  │  │  • useSendMessage() → send chat message                       │ │
│  │  │  • useUpdateStats() → update live stats (admin)              │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  LOCAL STATE (Zustand)                                             │ │
│  │  • UI state: theme, mobile menu, dialog open states               │ │
│  │  • Audio player state: playing, current track, volume             │ │
│  │  • Command palette state: open, search query, results             │ │
│  │  • Auth state: user, session, loading                             │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Stores:                                                       │ │
│  │  │  • useUIStore → theme, menu, dialog states                    │ │
│  │  │  • useAudioStore → audio player state                         │ │
│  │  │  • useCommandStore → command palette state                    │ │
│  │  │  • useAuthStore → auth state (redundant with Supabase)        │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  REALTIME STATE (Supabase Realtime)                                │ │
│  │  • Updates server state in real-time                              │ │
│  │  • React Query hooks subscribe to changes                         │ │
│  │  • Automatic UI updates without refetching                        │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Subscriptions:                                                │ │
│  │  │  • guestbook → new messages appear instantly                  │ │
│  │  │  • live_stats → stats update in real-time                     │ │
│  │  │  • messages → chat messages appear instantly                  │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Security Architecture

```
┌───────────────────────────────────────────────────────────────────────────┐
│                          SECURITY ARCHITECTURE                          │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  LAYER 1: HTTPS (Transport Layer)                                 │ │
│  │  • TLS 1.2+ encryption via Vercel + Cloudflare                   │ │
│  │  • HSTS headers enabled                                           │ │
│  │  • Perfect Forward Secrecy                                        │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  LAYER 2: Authentication (User Identity)                          │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Supabase Auth                                                │ │
│  │  │  • Email/Password login                                       │ │
│  │  │  • JWT tokens (signed, expires)                               │ │
│  │  │  • Session management                                        │ │
│  │  │  • Refresh token rotation                                     │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Next.js Middleware (Edge)                                    │ │
│  │  │  • Validates JWT on every request                             │ │
│  │  │  • Redirects unauthenticated users                           │ │
│  │  │  • Role-based access control (admin/client/guest)             │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  LAYER 3: Authorization (Permissions)                              │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Row Level Security (RLS) — Database Level                    │ │
│  │  │  • Profiles: Users can only see their own profile            │ │
│  │  │  • Projects: Public read, admin write                         │ │
│  │  │  • Tracks: Public read, admin write                           │ │
│  │  │  • Guestbook: Public insert, admin approve/delete             │ │
│  │  │  • Bookings: Users can see/update their own bookings          │ │
│  │  │  • Messages: Users can see only their own conversations       │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  API Middleware                                                │ │
│  │  │  • Validates user role before API operations                  │ │
│  │  │  • Sanitizes input (SQL injection prevention)                │ │
│  │  │  • Rate limiting (Supabase built-in)                         │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  LAYER 4: Data Protection                                          │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Environment Variables                                         │ │
│  │  │  • Secrets never committed to Git                             │ │
│  │  │  • Stored securely in Vercel Dashboard                        │ │
│  │  │  • Rotated regularly                                          │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Input Validation                                              │ │
│  │  │  • Zod schemas for all forms                                  │ │
│  │  │  • Client-side validation (UX)                                │ │
│  │  │  • Server-side validation (Security)                          │ │
│  │  │  • Sanitization of user input (XSS prevention)               │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Content Security Policy                                       │ │
│  │  │  • Restricts script sources                                    │ │
│  │  │  • Blocks inline scripts (unless nonce)                       │ │
│  │  │  • Prevents clickjacking (X-Frame-Options)                    │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 10. Performance Optimization Strategy

```
┌───────────────────────────────────────────────────────────────────────────┐
│                    PERFORMANCE OPTIMIZATION STRATEGY                     │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  IMAGE OPTIMIZATION                                                 │ │
│  │  • Next.js Image component auto-optimization                       │ │
│  │  • WebP/AVIF format for all images                                 │ │
│  │  • Priority flag for LCP images                                    │ │
│  │  • Lazy loading for below-the-fold                                 │ │
│  │  • Responsive sizes (sizes attribute)                             │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  CODE SPLITTING                                                    │ │
│  │  • Next.js automatic code splitting (pages)                       │ │
│  │  • Dynamic imports for heavy components                           │ │
│  │  • Lazy loading for modals/dialogs                               │ │
│  │  • Bundle analyzer: `ANALYZE=true npm run build`                 │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  CACHING STRATEGY                                                  │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Static Assets (Vercel CDN)                                    │ │
│  │  │  • Images: Cache-Control: public, max-age=31536000            │ │
│  │  │  • Fonts: Cache-Control: public, max-age=31536000             │ │
│  │  │  • CSS/JS: Cache-Control: public, max-age=31536000            │ │
│  │  │  • HTML: Cache-Control: public, max-age=0, must-revalidate   │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Data Caching (React Query)                                    │ │
│  │  │  • Projects: staleTime: 5 minutes                              │ │
│  │  │  • Stats: staleTime: 30 seconds (realtime)                    │ │
│  │  │  • Guestbook: staleTime: 10 seconds (realtime)               │ │
│  │  │  • Tracks: staleTime: 1 hour                                  │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  RENDERING STRATEGY (Next.js)                                      │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Server Components (SSR)                                       │ │
│  │  │  • Projects page (static data)                                │ │
│  │  │  • Blog/Portfolio pages                                       │ │
│  │  │  • Legal pages                                                │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Static Generation (SSG)                                       │ │
│  │  │  • Home page (revalidate: 1 hour)                             │ │
│  │  │  • Project pages (revalidate: 1 hour)                         │ │
│  │  │  • Thank You page (static)                                    │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Client Components (with 'use client')                         │ │
│  │  │  • Audio Player                                                │ │
│  │  │  • Realtime Stats                                             │ │
│  │  │  • Guestbook                                                   │ │
│  │  │  • Chat                                                       │ │
│  │  │  • Forms with validation                                      │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  DATABASE OPTIMIZATION                                             │ │
│  │  • Indexes on: projects.slug, bookings.scheduled_at               │ │
│  │  • RLS policies optimized for performance                         │ │
│  │  • Connection pooling (Supabase)                                  │ │
│  │  • Edge Functions for heavy operations                            │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 11. Deployment Architecture

```
┌───────────────────────────────────────────────────────────────────────────┐
│                         DEPLOYMENT ARCHITECTURE                         │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  DEVELOPMENT                                        ┌─────────────┐ │
│  │  • Localhost:3000                                   │  Developer   │ │
│  │  • npm run dev                                     │   Machine    │ │
│  │  • Supabase Local (optional)                        │             │ │
│  └─────────────────────────────────────────────────────┴─────────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  GIT (Version Control)                              ┌─────────────┐ │
│  │  • GitHub Repository                                │  GitHub     │ │
│  │  • Branch: feat/* → PR → main                      │   Actions   │ │
│  └─────────────────────────────────────────────────────┴─────────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  PREVIEW (Vercel)                                      ┌───────────┐ │
│  │  • Preview URL: [project]-[hash].vercel.app           │  Auto     │ │
│  │  • Branch: feature branches                           │  Deploy   │ │
│  │  • Testing: Unit + Integration                        │           │ │
│  └───────────────────────────────────────────────────────┴───────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  STAGING (Vercel)                                       ┌───────────┐ │
│  │  • Staging URL: staging.[your-domain.com]              │  Manual   │ │
│  │  • Branch: develop / main                             │  Deploy   │ │
│  │  • Testing: E2E + Performance                         │           │ │
│  └───────────────────────────────────────────────────────┴───────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  PRODUCTION (Vercel)                                    ┌───────────┐ │
│  │  • Production URL: [your-domain.com]                   │  Auto     │ │
│  │  • Branch: main                                        │  Deploy   │ │
│  │  • Edge Network + CDN                                  │           │ │
│  └───────────────────────────────────────────────────────┴───────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  EXTERNAL SERVICES                                                 │ │
│  │  ┌───────────────┐  ┌───────────────┐  ┌─────────────────────────┐ │ │
│  │  │   Supabase    │  │  Supabase     │  │  Supabase Storage       │ │ │
│  │  │   Database    │  │  Realtime     │  │  (Audio + Images)       │ │ │
│  │  └───────────────┘  └───────────────┘  └─────────────────────────┘ │ │
│  │  ┌───────────────┐  ┌───────────────┐                             │ │
│  │  │  Analytics    │  │  Cloudflare   │                             │ │
│  │  │  (Umami/VA)   │  │  (DNS + CDN)  │                             │ │
│  │  └───────────────┘  └───────────────┘                             │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 12. Monitoring & Observability

```
┌───────────────────────────────────────────────────────────────────────────┐
│                      MONITORING & OBSERVABILITY                         │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  PERFORMANCE MONITORING                                             │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Vercel Analytics                                              │ │
│  │  │  • Page load time                                              │ │
│  │  │  • Core Web Vitals (LCP, FID, CLS)                            │ │
│  │  │  • Traffic and user behavior                                   │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Lighthouse CI (GitHub Actions)                                │ │
│  │  │  • Automated performance testing                               │ │
│  │  │  • Score threshold: > 90                                       │ │
│  │  │  • Block PR if performance degrades                           │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  ERROR MONITORING                                                  │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Vercel Logs                                                   │ │
│  │  │  • Server-side errors                                         │ │
│  │  │  • API route errors                                           │ │
│  │  │  • Build errors                                               │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Sentry (Optional)                                            │ │
│  │  │  • Client-side errors                                         │ │
│  │  │  • Server-side errors                                         │ │
│  │  │  • Performance monitoring                                     │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  UPTIME MONITORING                                                 │ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  UptimeRobot / Better Uptime                                   │ │
│  │  │  • Ping monitoring (5-minute intervals)                       │ │
│  │  │  • Status page                                                │ │
│  │  │  • Email/Slack alerts                                         │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  │                                                                   │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  │  Supabase Dashboard                                            │ │
│  │  │  • Database health                                             │ │
│  │  │  • Connection pool                                            │ │
│  │  │  • Query performance                                           │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 13. Future Scalability Considerations

```
┌───────────────────────────────────────────────────────────────────────────┐
│                   FUTURE SCALABILITY CONSIDERATIONS                      │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  VERTICAL SCALING                                                   │ │
│  │  • Upgrade to Vercel Pro (edge functions, larger deployments)      │ │
│  │  • Upgrade to Supabase Pro (more resources, faster queries)       │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  HORIZONTAL SCALING                                                 │ │
│  │  • Multiple database read replicas (Supabase)                      │ │
│  │  • Edge Functions for global distribution                          │ │
│  │  • Cloudflare CDN for asset caching                                │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  FEATURE SCALING                                                    │ │
│  │  • Microservices architecture (if needed)                          │ │
│  │  • Dedicated API service (separate from Next.js)                   │ │
│  │  • Mobile app (React Native) sharing backend                       │ │
│  │  • E-commerce integration (booking + payments)                    │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  DATA SCALING                                                       │ │
│  │  • Partitioning large tables (bookings, messages)                  │ │
│  │  • Database sharding (if needed)                                   │ │
│  │  • ElasticSearch for search functionality                          │ │
│  │  • Data warehousing (analytics)                                    │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 14. Architecture Decision Records (ADR)

### ADR-001: Why Next.js App Router?
**Decision:** Use Next.js 15 App Router
**Rationale:**
- Server Components reduce client-side JavaScript
- Built-in API routes eliminate separate backend
- ISR and SSG for performance optimization
- Vercel integration simplifies deployment

### ADR-002: Why Supabase as Backend?
**Decision:** Use Supabase for database, auth, and realtime
**Rationale:**
- PostgreSQL with RLS provides robust security
- Built-in realtime eliminates WebSocket servers
- Auth out-of-the-box (email/password, OAuth)
- Storage for audio and images
- Free tier suitable for portfolio

### ADR-003: Why No `src/` Directory?
**Decision:** Keep files at root level
**Rationale:**
- Simpler imports (`@/components` vs `@/src/components`)
- Vercel/Next.js convention
- Shorter path for AI tools to understand

### ADR-004: Why Tailwind + ShadcnUI?
**Decision:** Use Tailwind CSS with ShadcnUI components
**Rationale:**
- Faster UI development
- Consistent design system
- Dark mode built-in
- Accessible components (Radix UI)
- Customizable via CSS variables

### ADR-005: Why React Query for Data Fetching?
**Decision:** Use React Query for server-state management
**Rationale:**
- Automatic caching and revalidation
- Optimistic updates for better UX
- Deduplication of requests
- Real-time integration with Supabase
- Clean and declarative API

---

## 15. Summary Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        SYSTEM OVERVIEW                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐          ┌──────────────────────────────────────┐  │
│  │     FRONTEND        │          │           BACKEND                    │  │
│  │  ┌───────────────┐  │          │  ┌────────────────────────────────┐ │  │
│  │  │  React +      │  │          │  │  Supabase PostgreSQL + RLS     │ │  │
│  │  │  Next.js      │  │──────────│  │  • profiles, projects, tracks  │ │  │
│  │  │  (App Router) │  │          │  │  • live_stats, guestbook       │ │  │
│  │  └───────────────┘  │          │  │  • bookings, messages          │ │  │
│  │  ┌───────────────┐  │          │  └────────────────────────────────┘ │  │
│  │  │  Tailwind +   │  │          │  ┌────────────────────────────────┐ │  │
│  │  │  ShadcnUI     │  │          │  │  Supabase Auth                │ │  │
│  │  └───────────────┘  │          │  │  • Email/Password             │ │  │
│  │  ┌───────────────┐  │          │  │  • JWT Tokens                │ │  │
│  │  │  Zustand +    │  │          │  │  • Session Management         │ │  │
│  │  │  React Query  │  │          │  └────────────────────────────────┘ │  │
│  │  └───────────────┘  │          │  ┌────────────────────────────────┐ │  │
│  │  ┌───────────────┐  │          │  │  Supabase Realtime            │ │  │
│  │  │  Supabase     │  │──────────│  │  • Guestbook (Replication)    │ │  │
│  │  │  Client       │  │          │  │  • Stats (Broadcast)          │ │  │
│  │  │  (Browser)    │  │          │  │  • Messages (Replication)     │ │  │
│  │  └───────────────┘  │          │  └────────────────────────────────┘ │  │
│  └─────────────────────┘          │  ┌────────────────────────────────┐ │  │
│                                   │  │  Supabase Storage             │ │  │
│                                   │  │  • Audio (.mp3, .wav)         │ │  │
│                                   │  │  • Images (WebP/AVIF)         │ │  │
│                                   │  └────────────────────────────────┘ │  │
│                                   └──────────────────────────────────────┘  │
│                                                         │                   │
│  ┌──────────────────────────────────────────────────────┘                   │
│  │                                                                          │
│  ▼                                                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  VERCEL (CDN + Edge)                                                 │   │
│  │  • Static Assets (HTML, CSS, JS)                                   │   │
│  │  • Edge Functions (Middleware, API routes)                        │   │
│  │  • Automatic SSL + HTTPS                                          │   │
│  │  • Analytics + Logging                                            │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  EXTERNAL SERVICES                                                  │   │
│  │  • Umami Analytics                                                  │   │
│  │  • Google Fonts (Plus Jakarta Sans, Inter, Geist Mono)             │   │
│  │  • Cloudflare DNS (Optional)                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

*Dokumen arsitektur ini adalah living document. Update secara berkala seiring perubahan sistem dan penambahan fitur.*