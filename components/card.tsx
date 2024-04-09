import { Movie } from "@/app/interface"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Star, ThumbsUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Card({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movie/${movie.id}`} key={movie.id} className="group m-4 ">
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
  )
}
