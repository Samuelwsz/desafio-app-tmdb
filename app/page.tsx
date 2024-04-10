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
import Loading from "./loading"

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
    loading,
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
      {loading && (
        <>
          <Loading />
        </>
      )}
      {!loading && (
        <>
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
            {trendingData.map((movie: Movie) => (
              <>
                <Card key={movie.id} movie={movie} />
              </>
            ))}
          </div>
          <div className="flex my-4 justify-between mx-8">
            <div>
              Mostrando <span className="text-orange-500">{itemsPerPage}</span>{" "}
              de <span className="text-orange-500">{totalResults}</span> itens
            </div>
            <div className="flex items-center gap-1.5">
              <div className="mr-6">
                Página <span className="text-orange-500">{currentPage}</span> de{" "}
                <span className="text-orange-500">{totalPages}</span>
              </div>
              <IconButton onClick={goToFirstPage} disabled={currentPage === 1}>
                <ChevronsLeft className="text-orange-500" />
              </IconButton>
              <IconButton
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="text-orange-500" />
              </IconButton>
              <IconButton
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="text-orange-500" />
              </IconButton>
              <IconButton
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="text-orange-500" />
              </IconButton>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
