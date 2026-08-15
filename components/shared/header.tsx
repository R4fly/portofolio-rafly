"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Command, LogIn } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#audio", label: "Audio" },
  { href: "/#guestbook", label: "Guestbook" },
  { href: "/#booking", label: "Book Session" },
]

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold font-mono">
            R
          </div>
          <span className="font-bold text-xl font-sans tracking-tight hidden sm:inline-block">
            Rafly<span className="text-primary">.dev</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary font-medium",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Command Menu">
            <Command className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <Button variant="default" size="sm" className="ml-2 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Client Portal
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary py-2 border-b border-border/40",
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Client Portal
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}