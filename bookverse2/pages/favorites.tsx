"use client"

import { useEffect, useState } from "react"
import Head from "next/head"
import { Heart } from "lucide-react"
import BookCard from "@/components/book-card"
import { getFavorites } from "@/lib/favorites"
import type { Book } from "@/types/book"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Book[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Проверка, что код выполняется на клиенте
    setIsClient(true)

    const updateFavorites = () => {
      setFavorites(getFavorites())
    }

    // Initial load
    updateFavorites()

    // Update favorites when storage changes
    window.addEventListener("storage", updateFavorites)
    return () => window.removeEventListener("storage", updateFavorites)
  }, [])

  // Не рендерим содержимое на сервере, чтобы избежать несоответствия гидратации
  if (!isClient) {
    return (
      <div className="container py-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Избранное</h1>
          <p className="text-muted-foreground">Ваша персональная коллекция книг</p>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Избранное - BookVerse</title>
        <meta name="description" content="Ваша персональная коллекция книг" />
      </Head>

      <div className="container py-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Избранное</h1>
          <p className="text-muted-foreground">Ваша персональная коллекция книг</p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">У вас пока нет избранных книг</p>
          </div>
        )}
      </div>
    </>
  )
}
