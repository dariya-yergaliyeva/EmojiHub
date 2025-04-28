"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import BookCard from "@/components/book-card"
import { searchBooks } from "@/lib/api"
import type { Book } from "@/types/book"

export default function HomePage() {
  const [query, setQuery] = useState("")
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim() || loading) return

    setLoading(true)
    setError(null)
    try {
      const results = await searchBooks(query)
      setBooks(results)
      setSearched(true)
    } catch (error) {
      console.error("Error searching books:", error)
      setError("Произошла ошибка при поиске книг. Пожалуйста, попробуйте еще раз.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>BookVerse - Поиск книг</title>
        <meta name="description" content="Найдите свою следующую любимую книгу" />
      </Head>

      <div className="container py-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">BookVerse</h1>
          <p className="text-muted-foreground">Найдите свою следующую любимую книгу</p>
        </div>

        <form onSubmit={handleSearch} className="flex w-full max-w-lg mx-auto gap-2">
          <Input
            placeholder="Поиск книг по названию, автору..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            <Search className="h-4 w-4 mr-2" />
            {loading ? "Поиск..." : "Поиск"}
          </Button>
        </form>

        {error && (
          <div className="text-center py-6">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        ) : searched ? (
          books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Книги не найдены. Попробуйте другой запрос.</p>
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Введите запрос для поиска книг</p>
          </div>
        )}
      </div>
    </>
  )
}
