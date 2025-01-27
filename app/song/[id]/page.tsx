"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import { usePlayerContext } from "../../../contexts/PlayerContext"
import type { Song } from "../../../types/song"
import { PlayIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import { getSongById } from "@/services/songService"

export default function SongDetails() {
  const { id } = useParams<{ id: string }>()
  const songId = id ? parseInt(id, 10) : null  // Convert the ID to a number
  console.log(songId)

  const [song, setSong] = useState<Song | null>(null)
  const { playSong } = usePlayerContext()

  useEffect(() => {
    if (songId !== null) {  // Ensure songId is not null before making the API call
      const fetchSong = async () => {
        const fetchedSong = await getSongById(songId)  // Pass songId as the number
        setSong(fetchedSong)
      }
      fetchSong()
    }
  }, [songId])  // Use songId instead of id

  if (!song) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-indigo-600">Loading song details...</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="relative pb-[60%]">
          <img
            src={song.image || "/placeholder.svg"}
            alt={song.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2 text-indigo-800">{song.name}</h1>
          <p className="text-xl text-indigo-600 mb-4">{song.artist_name}</p>
          <p className="text-gray-600 mb-6">Album: {song.album_name}</p>
          <button
            onClick={() => playSong(song)}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
          >
            <PlayIcon className="w-6 h-6" />
            <span>Play</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
