import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={`flex min-h-screen flex-col ${inter.className}`}>
        <Navigation />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  )
}
