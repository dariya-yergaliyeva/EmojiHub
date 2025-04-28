import type { Book } from "@/types/book"

const FAVORITES_KEY = "bookverse-favorites"

// Get all favorites
export function getFavorites(): Book[] {
  if (typeof window === "undefined") return []

  try {
    const favorites = localStorage.getItem(FAVORITES_KEY)
    return favorites ? JSON.parse(favorites) : []
  } catch (error) {
    console.error("Error getting favorites:", error)
    return []
  }
}

// Check if a book is in favorites
export function isFavorite(bookId: string): boolean {
  if (typeof window === "undefined") return false

  try {
    const favorites = getFavorites()
    return favorites.some((book) => book.id === bookId)
  } catch (error) {
    console.error("Error checking favorite:", error)
    return false
  }
}

// Toggle favorite status
export function toggleFavorite(book: Book): void {
  if (typeof window === "undefined") return

  try {
    const favorites = getFavorites()
    const index = favorites.findIndex((item) => item.id === book.id)

    if (index >= 0) {
      // Remove from favorites
      favorites.splice(index, 1)
    } else {
      // Add to favorites
      favorites.push(book)
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    // Dispatch storage event for other components to update
    window.dispatchEvent(new Event("storage"))
  } catch (error) {
    console.error("Error toggling favorite:", error)
  }
}
