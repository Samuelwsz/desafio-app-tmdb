"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { useEffect, useState } from "react"
import { Movie } from "./interface"
import { Card } from "@/components/card"

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
            trendingType === "day"
              ? "font-semibold bg-orange-400"
              : "font-normal"
          }`}
          onClick={() => handleSwitchTrending("day")}
        >
          Principais tendências do Dia
        </Button>
        <Button
          className={`ml-5 ${
            trendingType === "week"
              ? "font-semibold bg-orange-400"
              : "font-normal"
          }`}
          onClick={() => handleSwitchTrending("week")}
        >
          Principais tendências da Semana
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
        {trendingData.map((movie: Movie) => (
          <>
            <Card key={movie.id} movie={movie} />
          </>
        ))}
      </div>
    </main>
  )
}
