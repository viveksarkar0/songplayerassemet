"use client"

import { useState } from "react"
import { usePlayerContext } from "../contexts/PlayerContext"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const { searchSongs } = usePlayerContext()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    searchSongs(term)
  }

  return (
    <div className="relative mb-8">
      <input
        type="text"
        placeholder="Search songs or artists..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full pl-12 pr-4 py-3 border-2 border-indigo-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white bg-opacity-80 backdrop-blur-sm"
      />
      <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-indigo-400" />
    </div>
  )
}

