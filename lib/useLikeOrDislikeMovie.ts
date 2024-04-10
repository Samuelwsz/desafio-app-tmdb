import { useEffect, useState } from "react"
import { formatDuration } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Movie } from "@/app/interface"

export const useLikeOrDislikeMovie = () => {
  const [movie, setMovie] = useState<Movie | null>(null)

  const [likedMovies, setLikedMovies] = useState<Movie[]>([])
  const [dislikedMovies, setDislikedMovies] = useState<Movie[]>([])

  useEffect(() => {
    const fetchLikedMovies = async () => {
      try {
        const storedLikedMovies = localStorage.getItem("likedMovies")
        if (storedLikedMovies) {
          setLikedMovies(JSON.parse(storedLikedMovies))
        }
      } catch (error) {
        console.error("Erro ao buscar filmes curtidos:", error)
      }
    }
    fetchLikedMovies()
  }, [])

  // Função para adicionar/remover um filme curtido à lista de filmes curtidos
  const toggleLikeMovie = () => {
    if (movie) {
      const updatedLikedMovies = [...likedMovies]
      const index = updatedLikedMovies.findIndex((item) => item.id === movie.id)

      if (index === -1) {
        updatedLikedMovies.push(movie)
      } else {
        updatedLikedMovies.splice(index, 1)
      }

      setLikedMovies(updatedLikedMovies)
      localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies))
    }
  }

  useEffect(() => {
    const fetchDislikedMovies = async () => {
      try {
        const storedDislikedMovies = localStorage.getItem("dislikedMovies")
        if (storedDislikedMovies) {
          setDislikedMovies(JSON.parse(storedDislikedMovies))
        }
      } catch (error) {
        console.error("Erro ao buscar filmes não curtidos:", error)
      }
    }
    fetchDislikedMovies()
  }, [])

  const toggleDislikeMovie = () => {
    if (movie) {
      const updatedDislikedMovies = [...dislikedMovies]
      const index = updatedDislikedMovies.findIndex(
        (item) => item.id === movie.id
      )

      if (index === -1) {
        updatedDislikedMovies.push(movie)
      } else {
        updatedDislikedMovies.splice(index, 1)
      }

      setDislikedMovies(updatedDislikedMovies)
      localStorage.setItem(
        "dislikedMovies",
        JSON.stringify(updatedDislikedMovies)
      )
    }
  }

  // Função para formatar a duração do filme
  const formatMovieDuration = (runtime: number) => {
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    return formatDuration(
      { hours, minutes },
      { format: ["hours", "minutes"], locale: ptBR }
    )
  }

  return {
    formatMovieDuration,
    movie,
    setMovie,
    toggleLikeMovie,
    likedMovies,
    toggleDislikeMovie,
    dislikedMovies,
  }
}
