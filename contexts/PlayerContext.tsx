"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { Song } from "../types/song"
import { getSongs } from "../services/songService"

interface PlayerContextType {
  currentSong: Song | null
  isPlaying: boolean
  playlist: Song[]
  playSong: (song: Song) => void
  togglePlay: () => void
  nextSong: () => void
  previousSong: () => void
  searchSongs: (term: string) => Promise<void>
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlist, setPlaylist] = useState<Song[]>([])

  const playSong = useCallback((song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }, [])

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const nextSong = useCallback(() => {
    if (!currentSong || playlist.length === 0) return
    const currentIndex = playlist.findIndex((song) => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % playlist.length
    setCurrentSong(playlist[nextIndex])
  }, [currentSong, playlist])

  const previousSong = useCallback(() => {
    if (!currentSong || playlist.length === 0) return
    const currentIndex = playlist.findIndex((song) => song.id === currentSong.id)
    const previousIndex = (currentIndex - 1 + playlist.length) % playlist.length
    setCurrentSong(playlist[previousIndex])
  }, [currentSong, playlist])

  const searchSongs = useCallback(async (term: string) => {
    try {
      const songs = await getSongs(term)
      setPlaylist(songs)
    } catch (error) {
      console.error("Error searching songs:", error)
      setPlaylist([])
    }
  }, [])

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playlist,
        playSong,
        togglePlay,
        nextSong,
        previousSong,
        searchSongs,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayerContext() {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error("usePlayerContext must be used within a PlayerProvider")
  }
  return context
}

