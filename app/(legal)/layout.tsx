import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
      <article className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-sans prose-headings:tracking-tight prose-h1:text-3xl prose-h1:font-bold prose-h1:md:text-4xl prose-h2:text-2xl prose-h2:font-semibold prose-h2:md:text-3xl prose-h3:text-xl prose-h3:font-semibold prose-h3:md:text-2xl prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground">
        {children}
      </article>
    </div>
  )
}