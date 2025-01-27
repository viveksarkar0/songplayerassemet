

## Getting Started
<img width="1470" alt="Screenshot 2025-01-27 at 8 21 43 PM" src="https://github.com/user-attachments/assets/aa600cf2-cb86-4270-9153-8719e4f68836" />
feture is search feature
<img width="1470" alt="Screenshot 2025-01-27 at 8 13 12 PM" src="https://github.com/user-attachments/assets/85cd3298-1e17-4236-b290-c2a167817dc3" />

if you want to show the detail click on the below music titile 
![Uploading Screenshot 2025-01-27 at 8.13.51 PM.png…]()



Here's a short explanation for API functions to include in a README:

---

### Jamendo API Functions

This project uses the Jamendo API to fetch music data. Below is a brief description of the available API functions:

#### **1. `getSongs(searchTerm: string): Promise<Song[]>`**
- **Description**: Fetches a list of songs matching the given search term.
- **Parameters**:
  - `searchTerm` (optional): A string to search for songs by name. Defaults to an empty string, returning the top tracks.
- **Returns**: An array of `Song` objects with details like song name, artist, album, duration, image, and audio link.
- **API Endpoint**: `GET https://api.jamendo.com/v3.0/tracks`
- **Example Usage**:
  ```typescript
  const songs = await getSongs("chill");
  console.log(songs); // Logs an array of matching songs
  ```

#### **2. `getSongById(id: number): Promise<Song | null>`**
- **Description**: Fetches details of a single song by its unique ID.
- **Parameters**:
  - `id`: The unique numeric ID of the song.
- **Returns**: A `Song` object with details of the song or `null` if not found.
- **API Endpoint**: `GET https://api.jamendo.com/v3.0/tracks?id=<id>`
- **Example Usage**:
  ```typescript
  const song = await getSongById(12345);
  console.log(song); // Logs the details of the song with ID 12345
  ```

---

### Notes
- Both functions require a valid **client ID** (`7d0b6f06`) to authenticate requests with the Jamendo API.
- Error handling is included, and any failure to fetch data will log the error and return an empty array (`getSongs`) or `null` (`getSongById`).
- The responses include useful fields such as:
  - `id`: Unique identifier for the song.
  - `name`: Name of the song.
  - `duration`: Length of the track in seconds.
  - `artist_name`: Name of the artist.
  - `album_name`: Name of the album.
  - `image`: URL of the album artwork.
  - `audio`: URL to the song's audio file.

For more information about the Jamendo API, visit [Jamendo API Documentation](https://developer.jamendo.com/v3.0).




you can click on photo to direct play the music 



First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
