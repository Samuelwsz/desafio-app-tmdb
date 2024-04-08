"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Star, ThumbsUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const [trendingType, setTrendingType] = useState("day")
  const [trendingData, setTrendingData] = useState<Movie[]>([])

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/all/${trendingType}?api_key=5460b4c75854b99a5e30d1a559e883a9&language=pt-BR`
        )
        setTrendingData(res.data.results)
      } catch (error) {
        console.error("Erro ao buscar os filmes do Top Trending:", error)
      }
    }
    fetchTrending()
  }, [trendingType])

  const handleSwitchTrending = (type: string) => {
    setTrendingType(type)
  }

  return (
    <main className="max-w-7xl m-auto">
      <div className="flex justify-center my-5">
        <Button
          className={`mr-5 ${
            trendingType === "day" ? "font-semibold bg-orange-400" : "font-normal"
          }`}
          onClick={() => handleSwitchTrending("day")}
        >
          Principais tendências do Dia
        </Button>
        <Button
          className={`ml-5 ${
            trendingType === "week" ? "font-semibold bg-orange-400" : "font-normal"
          }`}
          onClick={() => handleSwitchTrending("week")}
        >
          Principais tendências da Semana
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
        {trendingData.map((movie: Movie) => (
          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className="group m-4 "
          >
            <Image
              alt="Image"
              src={`https://image.tmdb.org/t/p/original/${
                movie.backdrop_path || movie.poster_path
              }`}
              width={500}
              height={300}
              className="sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300"
            />
            <div className="border border-slate-800 border-t-0 p-2">
              <div className="flex justify-between">
                <h1>{movie.title || movie.name}</h1>
                <p className="flex items-center gap-2">
                  <Star className="size-5 dark:text-yellow-300" />{" "}
                  {movie.vote_average.toFixed(1)}
                </p>
              </div>
              <div className="flex justify-between">
                <p>
                  {format(
                    new Date(movie.release_date || movie.first_air_date),
                    "dd-MM-yyyy",
                    { locale: ptBR }
                  )}
                </p>
                <p className="flex items-center gap-2">
                  <ThumbsUp className="size-5" />
                  {movie.vote_count}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
