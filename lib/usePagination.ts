import { useState } from "react"

export const useFetchPagination = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

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

  return {
    goToLastPage,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    totalPages,
    currentPage,
    setTotalPages,
    setCurrentPage,
  }
}
