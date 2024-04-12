import { render, screen, fireEvent } from "@testing-library/react"
import { Pagination } from "../pagination/pagination"

describe("Pagination component", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <Pagination
        itemsPerPage={10}
        totalResults={100}
        currentPage={1}
        totalPages={10}
        goToFirstPage={() => {}}
        goToPreviousPage={() => {}}
        goToNextPage={() => {}}
        goToLastPage={() => {}}
      />
    )

    expect(getByTestId("previous-button")).toBeInTheDocument() // Adding testID
    expect(getByTestId("next-button")).toBeInTheDocument() // Adding testID
  })

  it("disables previous button on first page", () => {
    const { getByTestId } = render(
      <Pagination
        itemsPerPage={10}
        totalResults={100}
        currentPage={1}
        totalPages={10}
        goToFirstPage={() => {}}
        goToPreviousPage={() => {}}
        goToNextPage={() => {}}
        goToLastPage={() => {}}
      />
    )

    const previousButton = getByTestId("previous-button")
    expect(previousButton).toBeDisabled()
  })

  it("enables previous button on second page", () => {
    const { getByTestId } = render(
      <Pagination
        itemsPerPage={10}
        totalResults={100}
        currentPage={2}
        totalPages={10}
        goToFirstPage={() => {}}
        goToPreviousPage={() => {}}
        goToNextPage={() => {}}
        goToLastPage={() => {}}
      />
    )

    const previousButton = getByTestId("previous-button")
    expect(previousButton).not.toBeDisabled()
  })

  it("calls goToNextPage function when next button is clicked", () => {
    const goToNextPageMock = jest.fn()
    const { getByTestId } = render(
      <Pagination
        itemsPerPage={10}
        totalResults={100}
        currentPage={1}
        totalPages={10}
        goToFirstPage={() => {}}
        goToPreviousPage={() => {}}
        goToNextPage={goToNextPageMock}
        goToLastPage={() => {}}
      />
    )

    const nextButton = getByTestId("next-button")
    fireEvent.click(nextButton)

    expect(goToNextPageMock).toHaveBeenCalledTimes(1)
  })
})
