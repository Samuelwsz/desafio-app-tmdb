"use client"

import { Movie } from "../interface"
import { Card } from "@/components/card"
import { Button } from "@/components/ui/button"
import Loading from "../loading"
import { Pagination } from "@/components/pagination"
import { useFetchCategorys } from "@/lib/useFetchCategorys"

const categorys = [
  { id: "28", name: "Ação" },
  { id: "12", name: "Aventura" },
  { id: "16", name: "Animação" },
  { id: "35", name: "Comédia" },
  { id: "80", name: "Crime" },
  { id: "99", name: "Documentário" },
  { id: "18", name: "Drama" },
  { id: "10751", name: "Família" },
  { id: "14", name: "Fantasia" },
  { id: "36", name: "História" },
  { id: "27", name: "Terror" },
  { id: "10402", name: "Música" },
  { id: "9648", name: "Mistério" },
  { id: "10749", name: "Romance" },
  { id: "878", name: "Ficção Científica" },
  { id: "10770", name: "Cinema TV" },
  { id: "53", name: "Thriller" },
  { id: "10752", name: "Guerra" },
  { id: "37", name: "Faroeste" },
]

export default function Categorys() {
  const {
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    currentPage,
    goToFirstPage,
    totalPages,
    loading,
    movies,
    totalResults,
    handleCategoryChange,
    itemsPerPage,
  } = useFetchCategorys()

  return (
    <div className="max-w-7xl m-auto">
      {/*botoes para cada categoria*/}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 items-center gap-3 justify-center my-10 mx-3">
        {categorys.map((c) => (
          <Button key={c.id} onClick={() => handleCategoryChange(c.id)}>
            {c.name}
          </Button>
        ))}
      </div>
      {loading && <Loading />}
      {/*filmes por categoria*/}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center">
          {movies.map((movie: Movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        goToFirstPage={goToFirstPage}
        goToLastPage={goToLastPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        totalResults={totalResults}
      />
    </div>
  )
}
