import { Card } from "@/components/card"
import axios from "axios"
import { Movie } from "../interface"

export default async function TopRated() {
  const res =
    await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=5460b4c75854b99a5e30d1a559e883a9&language=pt-BR&page=1
`)

  const data = await res.data
  const results = await data.results

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
      {results &&
        results.map((movie: Movie) => <Card key={movie.id} movie={movie} />)}
    </div>
  )
}
