"use client"

import { Button } from "@/components/ui/button"
import { Movie } from "./interface"
import { Card } from "@/components/card"
import { useFetchTrending } from "@/lib/useFetchTrending"
import Loading from "./loading"
import { Pagination } from "@/components/pagination"

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
  } = useFetchTrending()

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center">
            {trendingData.map((movie: Movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
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
        </>
      )}
    </main>
  )
}
