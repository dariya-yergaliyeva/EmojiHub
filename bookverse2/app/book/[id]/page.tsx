"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Book } from "@/types/book"
import { getBookById } from "@/lib/api"
import { toggleFavorite, isFavorite } from "@/lib/favorites"

export default function BookPage({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true)
        const bookData = await getBookById(params.id)
        setBook(bookData)
        setFavorite(isFavorite(bookData.id))
      } catch (error) {
        console.error("Error fetching book:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [params.id])

  const handleToggleFavorite = () => {
    if (book) {
      toggleFavorite(book)
      setFavorite(!favorite)
    }
  }

  if (loading) {
    return (
      <div className="container py-8 text-center">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="container py-8 text-center">
        <p className="text-muted-foreground">Книга не найдена</p>
        <Link href="/" className="text-primary hover:underline mt-4 inline-block">
          Вернуться к поиску
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад к поиску
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div className="relative aspect-[2/3] w-full max-w-[300px] mx-auto md:mx-0 overflow-hidden rounded-md shadow-md">
          <Image
            src={book.coverUrl || "/placeholder.svg?height=450&width=300"}
            alt={book.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-xl text-muted-foreground">{book.author}</p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleToggleFavorite}
              variant={favorite ? "default" : "outline"}
              className={favorite ? "bg-red-500 hover:bg-red-600" : ""}
            >
              <Heart className="mr-2 h-4 w-4" fill={favorite ? "white" : "none"} />
              {favorite ? "В избранном" : "Добавить в избранное"}
            </Button>

            <Button variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Читать отрывок
            </Button>
          </div>

          <Separator />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Год издания</p>
              <p className="font-medium">{book.year}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Жанр</p>
              <p className="font-medium">{book.genre}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Страниц</p>
              <p className="font-medium">{book.pages}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Язык</p>
              <p className="font-medium">{book.language}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-2">Описание</h2>
            <p className="text-muted-foreground">{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
