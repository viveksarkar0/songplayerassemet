"use client"

import { useEffect, useRef } from "react"
import { usePlayerContext } from "../contexts/PlayerContext"
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"

export default function Player() {
  const { currentSong, isPlaying, togglePlay, nextSong, previousSong } = usePlayerContext()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audio
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentSong, isPlaying]) // Added isPlaying to dependencies

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  if (!currentSong) return null

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-md border-t border-indigo-200 p-4 shadow-lg"
    >
      <audio ref={audioRef} onEnded={nextSong} />
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center space-x-4">
          <img
            src={currentSong.image || "/placeholder.svg"}
            alt={currentSong.name}
            className="w-16 h-16 object-cover rounded-lg shadow-md"
          />
          <div>
            <h3 className="font-semibold text-indigo-800">{currentSong.name}</h3>
            <p className="text-sm text-indigo-600">{currentSong.artist_name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button
            onClick={previousSong}
            className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            aria-label="Previous song"
          >
            <BackwardIcon className="w-8 h-8" />
          </button>
          <button
            onClick={togglePlay}
            className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />}
          </button>
          <button
            onClick={nextSong}
            className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            aria-label="Next song"
          >
            <ForwardIcon className="w-8 h-8" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

