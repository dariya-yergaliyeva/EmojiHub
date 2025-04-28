"use client"

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useBooks } from "../context/BookContext"
import BookCard from "../components/BookCard"
import type { RootStackParamList } from "../types/navigation"

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const FavoritesScreen = () => {
  const navigation = useNavigation<FavoritesScreenNavigationProp>()
  const { theme } = useTheme()
  const { favorites } = useBooks()

  const renderItem = ({ item }) => (
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
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Избранное</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Ваша персональная коллекция книг</Text>
      </View>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="ios-heart-outline" size={64} color={theme.textSecondary} />
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>У вас пока нет избранных книг</Text>
          <TouchableOpacity
            style={[styles.searchButton, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate("Search")}
          >
            <Text style={styles.searchButtonText}>Найти книги</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
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
  listContainer: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  searchButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
})

export default FavoritesScreen
