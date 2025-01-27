import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { PlayerProvider } from "../contexts/PlayerContext"
import Player from "../components/Player"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Song Player App",
  description: "A simple song player application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen`}>
        <PlayerProvider>
          <main className="min-h-screen pb-24">
            <div className="container mx-auto px-4 py-8">{children}</div>
          </main>
          <Player />
        </PlayerProvider>
      </body>
    </html>
  )
}

