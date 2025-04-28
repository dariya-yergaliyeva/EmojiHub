"use client"

import { useRouter } from "next/router"
import Link from "next/link"
import { Book, Heart, MessageSquare, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navigation() {
  const router = useRouter()

  const routes = [
    {
      href: "/",
      label: "Поиск",
      icon: Search,
      active: router.pathname === "/",
    },
    {
      href: "/favorites",
      label: "Избранное",
      icon: Heart,
      active: router.pathname === "/favorites",
    },
    {
      href: "/chat",
      label: "Рекомендации",
      icon: MessageSquare,
      active: router.pathname === "/chat",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Book className="h-6 w-6" />
          <span className="font-bold text-lg hidden sm:inline-block">BookVerse</span>
        </Link>
        <nav className="flex items-center space-x-2 lg:space-x-4 flex-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <route.icon className="h-4 w-4" />
              <span className="hidden sm:inline-block">{route.label}</span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
