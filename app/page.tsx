"use client"

import { Button } from "@/components/ui/button"
import { Movie } from "./interface"
import { Card } from "@/components/card"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { IconButton } from "@/components/icon-button"
import { FetchTrending } from "@/lib/fetchTrending"

export default function Home() {
  const {
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    handleSwitchTrending,
    itemsPerPage,
    trendingData,
    trendingType,
    currentPage,
    totalResults,
    totalPages,
  } = FetchTrending()

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
      <div className="flex my-4 justify-between mx-8">
        Mostrando {itemsPerPage} de {totalResults} itens
        <div className="flex items-center gap-1.5">
          <span className="mr-6">
            Página {currentPage} de {totalPages}
          </span>
          <IconButton onClick={goToFirstPage} disabled={currentPage === 1}>
            <ChevronsLeft />
          </IconButton>
          <IconButton onClick={goToPreviousPage} disabled={currentPage === 1}>
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </IconButton>
          <IconButton
            onClick={goToLastPage}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight />
          </IconButton>
        </div>
      </div>
    </main>
  )
}
