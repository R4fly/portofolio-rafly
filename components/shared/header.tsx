"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCommandMenuStore } from "@/lib/stores/command-store"
import { ThemeToggle } from "./theme-toggle"
import { Menu, Command, LogIn } from "lucide-react"

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
  const openCommandMenu = useCommandMenuStore((state) => state.open)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary font-mono font-bold text-white">
            R
          </div>
          <span className="hidden font-sans text-xl font-bold tracking-tight sm:inline-block">
            Rafly<span className="text-primary">.dev</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 gap-2 px-3 text-muted-foreground hover:text-foreground"
            onClick={openCommandMenu}
            aria-label="Open command menu"
          >
            <Command className="h-4 w-4" />
            <span className="hidden lg:inline">Cari...</span>
            <kbd className="hidden h-5 items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium lg:inline-flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <ThemeToggle />
          <Button
            variant="default"
            size="sm"
            className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Client Portal
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "border-b border-border/40 py-2 text-lg font-medium transition-colors hover:text-primary",
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Command Menu Button di Mobile */}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    openCommandMenu()
                  }}
                  className="flex items-center gap-3 rounded-lg border border-border/40 p-3 text-left transition-colors hover:border-primary/50"
                >
                  <Command className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Command Menu</p>
                    <p className="text-xs text-muted-foreground">Navigasi cepat (CMD+K)</p>
                  </div>
                  <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                    ⌘K
                  </kbd>
                </button>

                <Button
                  className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
                >
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