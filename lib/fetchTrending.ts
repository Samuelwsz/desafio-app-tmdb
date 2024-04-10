import { Movie } from "@/app/interface"
import axios from "axios"
import { useEffect, useState } from "react"

export const FetchTrending = () => {
  const [trendingType, setTrendingType] = useState("day")
  const [trendingData, setTrendingData] = useState<Movie[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true)

        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/all/${trendingType}?api_key=5460b4c75854b99a5e30d1a559e883a9&language=pt-BR&page=${currentPage}`
        )
        setTrendingData(res.data.results)
        setTotalPages(res.data.total_pages)
        setTotalResults(res.data.total_results)
      } catch (error) {
        console.error("Erro ao buscar os filmes do Top Trending:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTrending()
  }, [currentPage, trendingType])

  const handleSwitchTrending = (type: string) => {
    setTrendingType(type)
    setCurrentPage(1)
  }
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  function goToFirstPage() {
    setCurrentPage(1)
  }

  function goToLastPage() {
    setCurrentPage(totalPages)
  }

  const itemsPerPage = Math.min(currentPage * trendingData.length, totalResults)

  return {
    itemsPerPage,
    goToFirstPage,
    goToLastPage,
    goToPreviousPage,
    goToNextPage,
    handleSwitchTrending,
    trendingType,
    trendingData,
    currentPage,
    totalResults,
    totalPages,
    loading,
  }
}
