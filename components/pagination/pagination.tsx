import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { IconButton } from "../icon-button"
import { PaginationProps } from "@/app/interface"

export function Pagination({
  itemsPerPage,
  totalResults,
  currentPage,
  totalPages,
  goToFirstPage,
  goToPreviousPage,
  goToNextPage,
  goToLastPage,
}: PaginationProps) {
  return (
    <div className="flex my-4 justify-between mx-8">
      <div>
        Mostrando <span className="text-orange-500">{itemsPerPage}</span> de{" "}
        <span className="text-orange-500">{totalResults}</span> itens
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
          data-testid="previous-button"
        >
          <ChevronLeft className="text-orange-500" />
        </IconButton>
        <IconButton
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          data-testid="next-button"
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
  )
}
