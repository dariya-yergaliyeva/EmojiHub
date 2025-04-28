"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { type RouteProp, useRoute } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useBooks } from "../context/BookContext"
import { getBookById } from "../services/api"
import type { Book } from "../types/book"
import type { RootStackParamList } from "../types/navigation"

type BookDetailScreenRouteProp = RouteProp<RootStackParamList, "BookDetail">

const BookDetailScreen = () => {
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const route = useRoute<BookDetailScreenRouteProp>()
  const { theme } = useTheme()
  const { favorites, toggleFavorite } = useBooks()

  const { id } = route.params
  const isFavorite = favorites.some((item) => item.id === id)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true)
        setError(null)
        const bookData = await getBookById(id)
        setBook(bookData)
      } catch (error) {
        console.error("Error fetching book:", error)
        setError("Не удалось загрузить информацию о книге")
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  const handleShare = async () => {
    if (!book) return

    try {
      await Share.share({
        message: `Проверь эту книгу: ${book.title} от ${book.author}`,
        title: book.title,
      })
    } catch (error) {
      console.error("Error sharing book:", error)
    }
  }

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Загрузка информации о книге...</Text>
      </View>
    )
  }

  if (error || !book) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.background }]}>
        <Ionicons name="ios-alert-circle-outline" size={64} color={theme.error} />
        <Text style={[styles.errorText, { color: theme.error }]}>{error || "Книга не найдена"}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: book.coverUrl || "https://via.placeholder.com/300x450?text=No+Cover" }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: theme.text }]}>{book.title}</Text>
          <Text style={[styles.author, { color: theme.textSecondary }]}>{book.author}</Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: isFavorite ? theme.error : theme.primary }]}
              onPress={() => toggleFavorite(book)}
            >
              <Ionicons name={isFavorite ? "ios-heart" : "ios-heart-outline"} size={20} color="#fff" />
              <Text style={styles.actionButtonText}>{isFavorite ? "В избранном" : "В избранное"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.secondary }]} onPress={handleShare}>
              <Ionicons name="ios-share-outline" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Поделиться</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.infoContainer, { borderColor: theme.border }]}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Год издания</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>{book.year}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Жанр</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>{book.genre}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Страниц</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>{book.pages}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Язык</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>{book.language}</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={[styles.descriptionTitle, { color: theme.text }]}>Описание</Text>
            <Text style={[styles.description, { color: theme.textSecondary }]}>{book.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const { width } = Dimensions.get("window")
const imageWidth = width * 0.5
const imageHeight = imageWidth * 1.5

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  coverImage: {
    width: imageWidth,
    height: imageHeight,
    borderRadius: 8,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  author: {
    fontSize: 18,
    marginTop: 4,
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 140,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  infoItem: {
    width: "50%",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  descriptionContainer: {
    marginTop: 24,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
})

export default BookDetailScreen
