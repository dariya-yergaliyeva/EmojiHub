"use client"

import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert, Linking } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"

const SettingsScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme()

  const handleRateApp = () => {
    // In a real app, this would link to the App Store or Google Play
    Alert.alert("Оценить приложение", "Вы будете перенаправлены в магазин приложений", [
      { text: "Отмена", style: "cancel" },
      { text: "OK", onPress: () => console.log("Rate app pressed") },
    ])
  }

  const handleContactSupport = () => {
    Linking.openURL("mailto:support@bookverse.app")
  }

  const handlePrivacyPolicy = () => {
    Linking.openURL("https://bookverse.app/privacy")
  }

  const handleTermsOfService = () => {
    Linking.openURL("https://bookverse.app/terms")
  }

  const handleClearData = () => {
    Alert.alert(
      "Очистить данные",
      "Вы уверены, что хотите очистить все данные приложения? Это действие нельзя отменить.",
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Очистить",
          style: "destructive",
          onPress: () => console.log("Clear data pressed"),
        },
      ],
    )
  }

  const renderSettingItem = (
    icon: string,
    title: string,
    onPress: () => void,
    rightElement?: React.ReactNode,
    destructive = false,
  ) => (
    <TouchableOpacity style={[styles.settingItem, { borderBottomColor: theme.border }]} onPress={onPress}>
      <View style={styles.settingItemLeft}>
        <Ionicons name={icon as any} size={22} color={destructive ? theme.error : theme.text} />
        <Text style={[styles.settingItemTitle, { color: destructive ? theme.error : theme.text }]}>{title}</Text>
      </View>
      {rightElement || <Ionicons name="ios-chevron-forward" size={20} color={theme.textSecondary} />}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Настройки</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Внешний вид</Text>
          {renderSettingItem(
            "ios-moon-outline",
            "Темная тема",
            toggleTheme,
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: theme.primaryLight }}
              thumbColor={isDark ? theme.primary : "#f4f3f4"}
            />,
          )}
        </View>

        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Приложение</Text>
          {renderSettingItem("ios-star-outline", "Оценить приложение", handleRateApp)}
          {renderSettingItem("ios-mail-outline", "Связаться с поддержкой", handleContactSupport)}
          {renderSettingItem("ios-document-text-outline", "Политика конфиденциальности", handlePrivacyPolicy)}
          {renderSettingItem("ios-document-outline", "Условия использования", handleTermsOfService)}
        </View>

        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Данные</Text>
          {renderSettingItem("ios-trash-outline", "Очистить данные", handleClearData, undefined, true)}
        </View>

        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: theme.textSecondary }]}>BookVerse v1.0.0</Text>
        </View>
      </ScrollView>
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
  section: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingItemTitle: {
    fontSize: 16,
    marginLeft: 12,
  },
  versionContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  versionText: {
    fontSize: 14,
  },
})

export default SettingsScreen
