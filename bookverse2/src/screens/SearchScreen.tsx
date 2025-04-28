"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { searchBooks } from "../services/api"
import BookCard from "../components/BookCard"
import type { Book } from "../types/book"
import type { RootStackParamList } from "../types/navigation"

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const SearchScreen = () => {
  const [query, setQuery] = useState("")
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigation = useNavigation<SearchScreenNavigationProp>()
  const { theme } = useTheme()

  const handleSearch = async () => {
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

  const renderItem = ({ item }: { item: Book }) => (
    <BookCard
      book={item}
      onPress={() =>
        navigation.navigate("BookDetail", {
          id: item.id,
          title: item.title,
        })
      }
    />
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>BookVerse</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Найдите свою следующую любимую книгу</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.searchInput,
              {
                backgroundColor: theme.card,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            placeholder="Поиск книг по названию, автору..."
            placeholderTextColor={theme.textSecondary}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={[styles.searchButton, { backgroundColor: theme.primary }]}
            onPress={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Ionicons name="ios-search" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        {error && <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>}

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Поиск книг...</Text>
          </View>
        ) : searched ? (
          books.length > 0 ? (
            <FlatList
              data={books}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.centerContainer}>
              <Ionicons name="ios-search-outline" size={64} color={theme.textSecondary} />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                Книги не найдены. Попробуйте другой запрос.
              </Text>
            </View>
          )
        ) : (
          <View style={styles.centerContainer}>
            <Ionicons name="ios-book-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>Введите запрос для поиска книг</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
  listContainer: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
})

export default SearchScreen
