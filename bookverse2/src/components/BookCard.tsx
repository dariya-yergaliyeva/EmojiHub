"use client"

import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useBooks } from "../context/BookContext"
import type { Book } from "../types/book"

interface BookCardProps {
  book: Book
  onPress: () => void
}

const BookCard = ({ book, onPress }: BookCardProps) => {
  const { theme } = useTheme()
  const { favorites, toggleFavorite } = useBooks()

  const isFavorite = favorites.some((item) => item.id === book.id)

  const handleFavoritePress = (e) => {
    e.stopPropagation()
    toggleFavorite(book)
  }

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: theme.card }]} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: book.coverUrl || "https://via.placeholder.com/300x450?text=No+Cover" }}
          style={styles.coverImage}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={[styles.favoriteButton, { backgroundColor: theme.background }]}
          onPress={handleFavoritePress}
        >
          <Ionicons
            name={isFavorite ? "ios-heart" : "ios-heart-outline"}
            size={18}
            color={isFavorite ? theme.error : theme.text}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {book.title}
        </Text>
        <Text style={[styles.author, { color: theme.textSecondary }]} numberOfLines={1}>
          {book.author}
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.year, { color: theme.textSecondary }]}>{book.year}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const { width } = Dimensions.get("window")
const cardWidth = (width - 40) / 2
const imageHeight = cardWidth * 1.5

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    borderRadius: 12,
    overflow: "hidden",
    margin: 8,
  },
  imageContainer: {
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: imageHeight,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  author: {
    fontSize: 14,
    marginTop: 2,
  },
  footer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  year: {
    fontSize: 12,
  },
})

export default BookCard
