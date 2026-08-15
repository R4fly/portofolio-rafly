import type { Metadata } from 'next'
import { ChatInterface } from '@/components/shared/chat-interface'

export const metadata: Metadata = {
  title: 'Live Chat',
  description: 'Komunikasi realtime dengan developer untuk diskusi proyek dan kolaborasi.',
}

// TODO: Ganti dengan ID admin asli Anda dari Supabase
// Jalankan SQL ini untuk dapat admin ID:
// SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1;
const ADMIN_ID = '736660ff-eb52-42ee-ac5a-46d076f5067a'

export default function ChatPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 font-sans text-3xl font-bold tracking-tight md:text-4xl">
          Live Chat
        </h1>
        <p className="text-muted-foreground">
          Komunikasi realtime dengan developer untuk diskusi proyek dan kolaborasi.
        </p>
      </div>

      {/* Chat Interface */}
      <ChatInterface adminId={ADMIN_ID} />
    </div>
  )
}