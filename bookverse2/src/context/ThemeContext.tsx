"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Theme colors
const lightTheme = {
  background: "#FFFFFF",
  card: "#F5F5F5",
  text: "#000000",
  textSecondary: "#666666",
  primary: "#4361EE",
  primaryLight: "#899BF1",
  secondary: "#3F37C9",
  border: "#E0E0E0",
  error: "#EF476F",
  disabled: "#CCCCCC",
}

const darkTheme = {
  background: "#121212",
  card: "#1E1E1E",
  text: "#FFFFFF",
  textSecondary: "#AAAAAA",
  primary: "#4361EE",
  primaryLight: "#899BF1",
  secondary: "#3F37C9",
  border: "#333333",
  error: "#EF476F",
  disabled: "#444444",
}

// Context type
type ThemeContextType = {
  theme: typeof lightTheme
  isDark: boolean
  toggleTheme: () => void
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme()
  const [isDark, setIsDark] = useState(false)

  // Load theme preference from storage
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme_preference")
        if (storedTheme !== null) {
          setIsDark(storedTheme === "dark")
        } else {
          // Use system preference as default
          setIsDark(colorScheme === "dark")
        }
      } catch (error) {
        console.error("Error loading theme preference:", error)
        // Fallback to system preference
        setIsDark(colorScheme === "dark")
      }
    }

    loadThemePreference()
  }, [colorScheme])

  // Toggle theme function
  const toggleTheme = async () => {
    try {
      const newTheme = !isDark
      setIsDark(newTheme)
      await AsyncStorage.setItem("theme_preference", newTheme ? "dark" : "light")
    } catch (error) {
      console.error("Error saving theme preference:", error)
    }
  }

  // Current theme
  const theme = isDark ? darkTheme : lightTheme

  return <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}

// Hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
