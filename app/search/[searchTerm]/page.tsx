import { Movie } from "@/app/interface"
import { Card } from "@/components/card"
import axios from "axios"

interface SearchTermProps {
  params: {
    searchTerm: string
  }
}

export default async function SearchPage({ params }: SearchTermProps) {
  const searchTerm = params.searchTerm

  const res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=5460b4c75854b99a5e30d1a559e883a9&query=${searchTerm}&language=pt-BRpage=1&include_adult=false`
  )

  const data = await res.data
  const results = data.results

  return (
    <div>
      {results.length === 0 && (
        <h1 className="text-center my-10 text-2xl">
          Sem resultados encontrados
        </h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
        {results &&
          results.map((movie: Movie) => <Card key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}
