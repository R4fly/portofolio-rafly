"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare } from "lucide-react"
import { usePathname } from "next/navigation"

export function MobileCTA() {
  const pathname = usePathname()
  
  // Hide on auth pages, dashboard, and legal pages
  if (
    pathname.startsWith("/login") || 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/privacy") || 
    pathname.startsWith("/terms") ||
    pathname.startsWith("/thank-you")
  ) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 p-3 safe-bottom">
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1 border-primary/50 text-primary hover:bg-primary/10" 
          asChild
        >
          <Link href="/#booking">
            <Calendar className="mr-2 h-4 w-4" />
            Book Session
          </Link>
        </Button>
        <Button 
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20" 
          asChild
        >
          <Link href="/#contact">
            <MessageSquare className="mr-2 h-4 w-4" />
            Hire Me
          </Link>
        </Button>
      </div>
    </div>
  )
}