"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { X } from "lucide-react"
import Link from "next/link"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) {
      // Delay slightly to avoid layout shift flash
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted")
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "declined")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:bottom-8 md:right-8 md:left-auto md:max-w-sm animate-in slide-in-from-bottom-5 fade-in duration-300">
      <Card className="border-border shadow-2xl bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <CardContent className="pt-6 pb-2">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-sm">Cookie Preferences</h3>
            <button onClick={declineCookies} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Kami menggunakan cookie untuk menganalisis trafik dan meningkatkan pengalaman Anda. Dengan melanjutkan, Anda menyetujui{" "}
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Kebijakan Privasi
            </Link>{" "}
            kami.
          </p>
        </CardContent>
        <CardFooter className="flex gap-2 pb-4">
          <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={declineCookies}>
            Tolak
          </Button>
          <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-xs" onClick={acceptCookies}>
            Terima
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}