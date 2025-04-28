import type { Book } from "../types/book"

// Mock data for demonstration
const mockBooks: Book[] = [
  {
    id: "1",
    title: "Война и мир",
    author: "Лев Толстой",
    description: "Эпический роман, описывающий русское общество в эпоху войн против Наполеона в 1805-1812 годах.",
    coverUrl: "https://via.placeholder.com/300x450?text=Война+и+мир",
    year: 1869,
    genre: "Исторический роман",
    pages: 1225,
    language: "Русский",
  },
  {
    id: "2",
    title: "Преступление и наказание",
    author: "Фёдор Достоевский",
    description: "Психологический роман о нравственных и психологических терзаниях студента Родиона Раскольникова.",
    coverUrl: "https://via.placeholder.com/300x450?text=Преступление+и+наказание",
    year: 1866,
    genre: "Психологический роман",
    pages: 672,
    language: "Русский",
  },
  {
    id: "3",
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    description: "Роман, сочетающий в себе сатиру, фантастику, мистику и любовную историю.",
    coverUrl: "https://via.placeholder.com/300x450?text=Мастер+и+Маргарита",
    year: 1967,
    genre: "Фантастика",
    pages: 480,
    language: "Русский",
  },
  {
    id: "4",
    title: "1984",
    author: "Джордж Оруэлл",
    description: "Антиутопический роман о тоталитарном обществе и контроле над личностью.",
    coverUrl: "https://via.placeholder.com/300x450?text=1984",
    year: 1949,
    genre: "Антиутопия",
    pages: 328,
    language: "Английский",
  },
  {
    id: "5",
    title: "Гарри Поттер и философский камень",
    author: "Дж. К. Роулинг",
    description: "Первая книга из серии о юном волшебнике Гарри Поттере.",
    coverUrl: "https://via.placeholder.com/300x450?text=Гарри+Поттер",
    year: 1997,
    genre: "Фэнтези",
    pages: 332,
    language: "Английский",
  },
  {
    id: "6",
    title: "Гордость и предубеждение",
    author: "Джейн Остин",
    description: "Роман о жизни провинциального английского общества конца XVIII века.",
    coverUrl: "https://via.placeholder.com/300x450?text=Гордость+и+предубеждение",
    year: 1813,
    genre: "Роман",
    pages: 416,
    language: "Английский",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Search books
export async function searchBooks(query: string): Promise<Book[]> {
  try {
    await delay(800) // Simulate network delay

    if (!query || typeof query !== "string") {
      return []
    }

    const normalizedQuery = query.toLowerCase().trim()
    if (!normalizedQuery) {
      return []
    }

    return mockBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(normalizedQuery) || book.author.toLowerCase().includes(normalizedQuery),
    )
  } catch (error) {
    console.error("Error in searchBooks:", error)
    return []
  }
}

// Get book by ID
export async function getBookById(id: string): Promise<Book> {
  await delay(500) // Simulate network delay

  const book = mockBooks.find((book) => book.id === id)
  if (!book) {
    throw new Error("Book not found")
  }

  return book
}

// Get AI book recommendations (mock)
export async function getBookRecommendations(userInput: string): Promise<string> {
  await delay(1500) // Simulate AI processing time

  // Simple keyword matching for demo purposes
  const input = userInput.toLowerCase()

  if (input.includes("фантастика") || input.includes("фэнтези")) {
    return 'Основываясь на ваших предпочтениях, я рекомендую следующие книги:\n\n1. "Гарри Поттер" (серия) - Дж. К. Роулинг\n2. "Мастер и Маргарита" - Михаил Булгаков\n3. "Дюна" - Фрэнк Герберт\n4. "Нейромант" - Уильям Гибсон'
  }

  if (input.includes("классика") || input.includes("русская")) {
    return 'Вам могут понравиться эти классические произведения:\n\n1. "Война и мир" - Лев Толстой\n2. "Преступление и наказание" - Фёдор Достоевский\n3. "Анна Каренина" - Лев Толстой\n4. "Мёртвые души" - Николай Гоголь'
  }

  if (input.includes("детектив") || input.includes("триллер")) {
    return 'Вот несколько захватывающих детективов и триллеров:\n\n1. "Убийство в Восточном экспрессе" - Агата Кристи\n2. "Девушка с татуировкой дракона" - Стиг Ларссон\n3. "Молчание ягнят" - Томас Харрис\n4. "Шерлок Холмс" (серия) - Артур Конан Дойл'
  }

  return 'Спасибо за информацию о ваших предпочтениях! Вот несколько общих рекомендаций:\n\n1. "Сто лет одиночества" - Габриэль Гарсиа Маркес\n2. "Маленький принц" - Антуан де Сент-Экзюпери\n3. "Убить пересмешника" - Харпер Ли\n4. "Великий Гэтсби" - Фрэнсис Скотт Фицджеральд\n\nМожете рассказать подробнее о жанрах, которые вам нравятся?'
}
