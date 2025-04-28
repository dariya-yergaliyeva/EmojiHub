"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toggleFavorite, isFavorite } from "@/lib/favorites"
import { useState, useEffect } from "react"
import type { Book } from "@/types/book"

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  const [favorite, setFavorite] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      setFavorite(isFavorite(book.id))
    }
  }, [book.id])

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(book)
    setFavorite((prev) => !prev)
  }

  return (
    <Link href={`/book/${book.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Image
            src={book.coverUrl || "/placeholder.svg?height=300&width=200"}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          {isClient && (
            <Button
              variant="ghost"
              size="icon"
              className={favorite ? "text-red-500" : ""}
              onClick={handleToggleFavorite}
              type="button"
            >
              <Heart className="h-4 w-4" fill={favorite ? "currentColor" : "none"} />
              <span className="sr-only">{favorite ? "Удалить из избранного" : "Добавить в избранное"}</span>
            </Button>
          )}
          <span className="text-sm text-muted-foreground">{book.year}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
