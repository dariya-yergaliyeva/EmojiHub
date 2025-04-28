"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import type { Book } from "../types/book"

// Context type
type BookContextType = {
  favorites: Book[]
  toggleFavorite: (book: Book) => void
  clearFavorites: () => void
}

// Create context
const BookContext = createContext<BookContextType | undefined>(undefined)

// Provider component
export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Book[]>([])

  // Load favorites from storage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites")
        if (storedFavorites !== null) {
          setFavorites(JSON.parse(storedFavorites))
        }
      } catch (error) {
        console.error("Error loading favorites:", error)
      }
    }

    loadFavorites()
  }, [])

  // Save favorites to storage
  const saveFavorites = async (newFavorites: Book[]) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites))
    } catch (error) {
      console.error("Error saving favorites:", error)
    }
  }

  // Toggle favorite function
  const toggleFavorite = (book: Book) => {
    const isAlreadyFavorite = favorites.some((item) => item.id === book.id)

    let newFavorites: Book[]

    if (isAlreadyFavorite) {
      newFavorites = favorites.filter((item) => item.id !== book.id)
    } else {
      newFavorites = [...favorites, book]
    }

    setFavorites(newFavorites)
    saveFavorites(newFavorites)
  }

  // Clear favorites function
  const clearFavorites = () => {
    setFavorites([])
    saveFavorites([])
  }

  return <BookContext.Provider value={{ favorites, toggleFavorite, clearFavorites }}>{children}</BookContext.Provider>
}

// Hook for using the book context
export const useBooks = () => {
  const context = useContext(BookContext)
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider")
  }
  return context
}
