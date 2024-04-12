"use client"

import { Movie } from "./interface"
import { Card } from "@/components/card/card"
import { useFetchTrending } from "@/lib/useFetchTrending"
import Loading from "./loading"
import { Pagination } from "@/components/pagination/pagination"

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
      <div className="flex justify-between w-[80%] sm:w-[70%] md:w-[50%] bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden p-1 m-auto transition ease-in duration-500 gap-2">
        <button
          className={`flex-1 rounded-full py-1 px-3 focus:outline-none transition ease-in-out duration-500  ${
            trendingType === "day"
              ? "bg-orange-500 text-white"
              : "bg-slate-300 dark:bg-slate-600/70  dark:text-slate-300"
          }`}
          onClick={() => handleSwitchTrending("day")}
        >
          Principais tendências do Dia
        </button>
        <button
          className={`flex-1 rounded-full py-1 px-3 focus:outline-none transition ease-in-out duration-300 ${
            trendingType === "week"
              ? "bg-orange-500 text-white"
              : "bg-slate-300  dark:bg-slate-600/70  dark:text-slate-300"
          }`}
          onClick={() => handleSwitchTrending("week")}
        >
          Principais tendências da Semana
        </button>
      </div>

      {loading && (
        <>
          <Loading  />
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
