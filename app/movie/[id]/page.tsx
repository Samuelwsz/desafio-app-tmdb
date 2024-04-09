"use client"

import { CastMember, Genre, Movie, Trailer } from "@/app/interface"
import Loading from "@/app/loading"
import axios from "axios"
import { format, formatDuration } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Sparkles, Star, ThumbsDown, ThumbsUp } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface MovieIdProps {
  params: {
    id: number
  }
}

export default function MovieId({ params }: MovieIdProps) {
  const movieId = params.id

  const [movie, setMovie] = useState<Movie | null>(null)
  const [cast, setCast] = useState<CastMember[]>([])
  const [trailer, setTrailer] = useState<Trailer | null>(null)
  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(() => {
    const fetchMovieId = async () => {
      try {
        // Obter informações do filme
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=5460b4c75854b99a5e30d1a559e883a9&language=pt-BR&append_to_response=genres`
        )
        setMovie(movieResponse.data)

        // Obter o gênero
        const movieGenres = movieResponse.data.genres
        setGenres(movieGenres)

        // Obter informações do elenco
        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=5460b4c75854b99a5e30d1a559e883a9&language=pt-BR`
        )
        setCast(castResponse.data.cast)

        // Obter informações do trailer
        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=5460b4c75854b99a5e30d1a559e883a9&language=pt-BR`
        )
        // Verificar se há um trailer disponível
        const trailerData = trailerResponse.data.results.find(
          (video: Trailer) => video.type === "Trailer"
        )
        setTrailer(trailerData)
      } catch (error) {
        console.error("Erro ao buscar filme por ID:", error)
      }
    }

    fetchMovieId()
  }, [movieId])

  if (!movie) {
    return (
      <div>
        <Loading />
      </div>
    )
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

  return (
    <div className="max-w-7xl mx-auto">
      {/*detalhes do filme ou serie*/}
      <div className="block lg:flex m-3">
        <Image
          alt="Image"
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`}
          width={500}
          height={500}
          className="sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300"
        />

        <div className="ml-2">
          <div className="flex justify-between mb-2">
            <h1 className="text-xl font-medium">{movie.title || movie.name}</h1>
            <div className="flex items-center gap-5">
              <ThumbsUp />
              <ThumbsDown />
            </div>
          </div>
          <div className="">
            <div className="flex justify-between">
              <h1 className="text-lg font-medium">Sinopse</h1>
              <p className="flex items-center gap-2">
                <Star className="size-5 dark:text-yellow-300" />{" "}
                {movie.vote_average.toFixed(1)}
              </p>
            </div>
            <p className="dark:text-slate-300 text-justify">{movie.overview}</p>
          </div>

          <div className="flex justify-between my-2">
            <p>
              Data de lançamento:{" "}
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
          <div className="flex justify-between">
            <h1>
              Tipo de programa: {movie.original_title ? "Filme" : "Série de TV"}
            </h1>
            <h1 className="flex items-center gap-2">
              <Sparkles className="size-5 dark:text-yellow-400" /> Popularidade:{" "}
              {movie.popularity.toFixed(1)}
            </h1>
          </div>
          <div className="block lg:flex justify-between my-2">
            <div className="flex gap-2">
              Gêneros:
              <ul className="flex gap-2">
                {genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
            <div> Tempo do filme: {formatMovieDuration(movie.runtime)}</div>
          </div>
        </div>
      </div>
      {/*elenco*/}
      <div className="mx-10">
        <h2 className="my-3 text-xl font-medium">Elenco</h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-6">
            {cast.map((member) => (
              <div key={member.id} className="text-sm">
                <div>
                  {member.profile_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/w185/${member.profile_path}`}
                      alt={member.name}
                      width={100}
                      height={100}
                      quality={100}
                      className="w-28 h-28 mb-1"
                    />
                  )}
                </div>
                <div>
                  <p>{member.name}</p>
                  <p className="text-slate-500 dark:text-slate-400">{member.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*trailer*/}
      <div className="flex justify-center my-5">
        {trailer && (
          <div>
            <h2 className="text-xl font-medium">Trailer</h2>
            <iframe
              title="Trailer"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              allowFullScreen
              className="w-96 h-96 sm:w-[560px] sm:h-[380px]"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  )
}
