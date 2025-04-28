"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { getBookRecommendations } from "../services/api"

interface Message {
  id: string
  text: string
  isUser: boolean
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Привет! Я ваш помощник по книгам. Расскажите о своих предпочтениях, и я помогу найти книги, которые вам понравятся.",
      isUser: false,
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const { theme } = useTheme()
  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true })
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput("")

    // Add user message
    const userMessageObj = {
      id: Date.now().toString(),
      text: userMessage,
      isUser: true,
    }

    setMessages((prev) => [...prev, userMessageObj])
    setLoading(true)

    try {
      // Get AI response
      const response = await getBookRecommendations(userMessage)

      // Add AI message
      const aiMessageObj = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
      }

      setMessages((prev) => [...prev, aiMessageObj])
    } catch (error) {
      console.error("Error getting recommendations:", error)

      // Add error message
      const errorMessageObj = {
        id: (Date.now() + 1).toString(),
        text: "Извините, произошла ошибка при получении рекомендаций. Пожалуйста, попробуйте еще раз.",
        isUser: false,
      }

      setMessages((prev) => [...prev, errorMessageObj])
    } finally {
      setLoading(false)
    }
  }

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.isUser ? styles.userBubble : styles.aiBubble,
        {
          backgroundColor: item.isUser ? theme.primary : theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <Text style={[styles.messageText, { color: item.isUser ? "#fff" : theme.text }]}>{item.text}</Text>
    </View>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Рекомендации</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Общайтесь с ИИ для получения персонализированных рекомендаций
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        />

        <View style={[styles.inputContainer, { borderTopColor: theme.border }]}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.card,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            placeholder="Напишите ваши предпочтения в книгах..."
            placeholderTextColor={theme.textSecondary}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: input.trim() && !loading ? theme.primary : theme.disabled,
              },
            ]}
            onPress={handleSend}
            disabled={!input.trim() || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Ionicons name="ios-send" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  userBubble: {
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default ChatScreen
