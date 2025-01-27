"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePlayerContext } from "../contexts/PlayerContext"
import { motion } from "framer-motion"
import { PlayIcon } from "@heroicons/react/24/solid"

export default function SongList() {
  const { playlist, searchSongs, playSong } = usePlayerContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSongs = async () => {
      await searchSongs("")
      setLoading(false)
    }
    fetchSongs()
  }, [searchSongs])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-indigo-600">Loading songs...</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {playlist.map((song, index) => (
        <motion.div
          key={song.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >

          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 group">
            <div className="relative pb-[100%]">
              <img
                src={song.image || "/placeholder.svg"}
                alt={song.name}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <button
                  onClick={() => playSong(song)}
                  className="transform scale-0 group-hover:scale-100 transition-all duration-300"
                >
                  <PlayIcon className="w-16 h-16 text-white" />
                </button>
              </div>
            </div>
            <Link href={`/song/${song.id}`}>
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-1 truncate text-indigo-800">{song.name}</h2>
              <p className="text-sm text-indigo-600 truncate">{song.artist_name}</p>
            </div>
            </Link>
          </div>
     
        </motion.div>
      ))}
    </div>
  )
}

