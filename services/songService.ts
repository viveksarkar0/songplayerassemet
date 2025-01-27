import type { Song } from "../types/song"

const BASE_URL = "https://api.jamendo.com/v3.0"
const CLIENT_ID = "7d0b6f06";

export async function getSongs(searchTerm = ""): Promise<Song[]> {
  try {
    const params = new URLSearchParams({
      client_id: CLIENT_ID!,
      format: "json",
      limit: "20",
      include: "musicinfo",
      namesearch: searchTerm,
    })

    const response = await fetch(`${BASE_URL}/tracks/?${params.toString()}`)
    if (!response.ok) throw new Error("Failed to fetch songs")

    const data = await response.json()
    return data.results.map((track: any) => ({
      id: track.id,
      name: track.name,
      duration: track.duration,
      artist_name: track.artist_name,
      album_name: track.album_name,
      image: track.image,
      audio: track.audio,
      artist_id: track.artist_id,
      album_id: track.album_id,
    }))
  } catch (error) {
    console.error("Error fetching songs:", error)
    return []
  }
}

export async function getSongById(id: number): Promise<Song | null> {
  try {
    const params = new URLSearchParams({
      client_id: CLIENT_ID!,
      format: "json",
      id: id.toString(), // Use `id` as a parameter
    });

    // Corrected endpoint
    const response = await fetch(`${BASE_URL}/tracks?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch song");

    const data = await response.json();
    if (!data.results || data.results.length === 0) return null;

    const track = data.results[0];
    return {
      id: track.id,
      name: track.name,
      duration: track.duration,
      artist_name: track.artist_name,
      album_name: track.album_name,
      image: track.image,
      audio: track.audio,
      artist_id: track.artist_id,
      album_id: track.album_id,
    };
  } catch (error) {
    console.error("Error fetching song:", error);
    return null;
  }
}

