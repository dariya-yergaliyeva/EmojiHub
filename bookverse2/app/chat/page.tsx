"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { getBookRecommendations } from "@/lib/api"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Привет! Я ваш помощник по книгам. Расскажите о своих предпочтениях, и я помогу найти книги, которые вам понравятся.",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput("")

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    setLoading(true)
    try {
      // In a real app, this would call an AI API
      const recommendations = await getBookRecommendations(userMessage)

      // Add assistant response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: recommendations,
        },
      ])
    } catch (error) {
      console.error("Error getting recommendations:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Извините, произошла ошибка при получении рекомендаций. Пожалуйста, попробуйте еще раз.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container flex flex-col h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)]">
      <div className="text-center py-4 space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Рекомендации по чтению</h1>
        <p className="text-muted-foreground">Общайтесь с ИИ для получения персонализированных рекомендаций</p>
      </div>

      <Separator />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 max-w-[80%]",
              message.role === "assistant" ? "self-start" : "self-end ml-auto",
            )}
          >
            {message.role === "assistant" && (
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
            )}
            <div
              className={cn(
                "rounded-lg px-4 py-2 text-sm",
                message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground",
              )}
            >
              {message.content}
            </div>
            {message.role === "user" && (
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Напишите ваши предпочтения в книгах..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4 mr-2" />
            Отправить
          </Button>
        </form>
      </div>
    </div>
  )
}
