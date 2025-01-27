import SearchBar from "@/components/SearchBar";
import SongList from "@/components/SongList";


export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
          Melody Stream 
        </span>
      </h1>
      <SearchBar />
      this is song
      <SongList />
    </div>
  )
}

