import { useEffect, useState } from "react"
import { useFetchPagination } from "./usePagination"
import { Movie } from "@/app/interface"
import axios from "axios"

export const useFetchCategorys = () => {
  const {
    currentPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    setTotalPages,
    totalPages,
  } = useFetchPagination()

  const [category, setCategory] = useState<string>("28")
  const [movies, setMovies] = useState<Movie[]>([])
  const [totalResults, setTotalResults] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategory = async (categoryId: string) => {
      try {
        setLoading(true)

        const res =
          await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=5460b4c75854b99a5e30d1a559e883a9&with_genres=${categoryId}&language=pt-BR&page=${currentPage}
`)
        setMovies(res.data.results)
        setTotalPages(res.data.total_pages)
        setTotalResults(res.data.total_results)
      } catch (error) {
        console.error("Erro ao buscar filmes por categoria:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategory(category)
  }, [category, currentPage, setTotalPages])

  const handleCategoryChange = (categoryId: string) => {
    setCategory(categoryId)
    goToFirstPage()
  }

  const itemsPerPage = Math.min(currentPage * movies.length, totalResults)

  return {
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    totalPages,
    loading,
    itemsPerPage,
    handleCategoryChange,
    movies,
    totalResults,
    goToFirstPage,
    currentPage,
  }
}
