"use client"
import axios from "axios"
import { useEffect, useState } from "react"

interface MovieIdProps {
  params: {
    id: number
  }
}

const url = process.env.API_KEY

export default function MovieId({ params }: MovieIdProps) {
  const movieId = params.id

  const [movie, setMovie] = useState<Movie | null>(null)
  
  //5460b4c75854b99a5e30d1a559e883a9

  useEffect(() => {
    const fetchMovieId = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=5460b4c75854b99a5e30d1a559e883a9&language=pt-BR`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        const data = await response.data
        setMovie(data)
      } catch (error) {
        console.error("Erro ao buscar filme por ID:", error)
      }
    }

    fetchMovieId()
  }, [movieId])

  if (!movie) {
    return <div>Carregando...</div>
  }

  return (
    <div>
      <div>
        <h1>{movie.title || movie.name}</h1>
        <p>{movie.overview}</p>
      </div>
    </div>
  )
}
