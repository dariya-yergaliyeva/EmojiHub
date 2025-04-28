import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ThemeProvider } from "./src/context/ThemeContext"
import { BookProvider } from "./src/context/BookContext"
import { StatusBar } from "expo-status-bar"

// Screens
import SearchScreen from "./src/screens/SearchScreen"
import BookDetailScreen from "./src/screens/BookDetailScreen"
import FavoritesScreen from "./src/screens/FavoritesScreen"
import ChatScreen from "./src/screens/ChatScreen"
import SettingsScreen from "./src/screens/SettingsScreen"

// Icons
import { Ionicons } from "@expo/vector-icons"

// Types
import type { RootStackParamList, TabParamList } from "./src/types/navigation"

// Create navigators
const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<TabParamList>()

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "ios-book"

          if (route.name === "Search") {
            iconName = focused ? "ios-search" : "ios-search-outline"
          } else if (route.name === "Favorites") {
            iconName = focused ? "ios-heart" : "ios-heart-outline"
          } else if (route.name === "Chat") {
            iconName = focused ? "ios-chatbubble" : "ios-chatbubble-outline"
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-settings" : "ios-settings-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#4361ee",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Search" component={SearchScreen} options={{ title: "Поиск" }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: "Избранное" }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ title: "Рекомендации" }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: "Настройки" }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <BookProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator>
              <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
              <Stack.Screen
                name="BookDetail"
                component={BookDetailScreen}
                options={({ route }) => ({
                  title: route.params?.title || "Детали книги",
                  headerBackTitle: "Назад",
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </BookProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

// Стили
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  searchButton: {
    width: 80,
    height: 48,
    backgroundColor: "#4361EE",
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bookList: {
    flex: 1,
  },
  bookCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bookCover: {
    width: 70,
    height: 100,
    borderRadius: 4,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  bookYear: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },
  favoriteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
  favorite: {
    fontSize: 24,
    color: "#999",
  },
  favoriteActive: {
    fontSize: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#4361EE",
  },
  detailImageContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  detailCover: {
    width: 180,
    height: 270,
    borderRadius: 8,
  },
  detailContent: {
    padding: 8,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  detailAuthor: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 24,
  },
  favoriteDetailButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  favoriteDetailButtonActive: {
    backgroundColor: "#ffebee",
  },
  favoriteDetailButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  detailInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 16,
    marginBottom: 24,
  },
  detailInfoItem: {
    width: "50%",
    marginBottom: 16,
  },
  detailInfoLabel: {
    fontSize: 14,
    color: "#888",
  },
  detailInfoValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  detailDescriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  navbar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#eee",
    height: 56,
  },
  navButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonActive: {
    borderTopWidth: 2,
    borderColor: "#4361EE",
  },
  navText: {
    fontSize: 14,
    color: "#888",
  },
  navTextActive: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4361EE",
  },
})
