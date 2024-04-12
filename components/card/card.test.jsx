import React from "react"
import { render } from "@testing-library/react"
import { Card } from "../card/card"

// Mocking Next.js's Link component
jest.mock(
  "next/link",
  () =>
    ({ children }) =>
      children
)

describe("Card component", () => {
  const movie = {
    id: 1,
    backdrop_path:
      "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    poster_path:
      "https://image.tmdb.org/t/p/original/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg",
    title: "Test Movie",
    name: "Test TV Show",
    vote_average: 7.5,
    release_date: "07-04-2023",
    vote_count: 1000,
  }

  it("renders correctly with movie information", () => {
    const { getByText, getByAltText } = render(<Card movie={movie} />)

    expect(getByText(movie.title)).toBeInTheDocument()
    expect(getByText(movie.vote_average)).toBeInTheDocument()
    expect(getByText("1000")).toBeInTheDocument()
    expect(getByAltText("Image")).toBeInTheDocument()
  })

  it('renders "Imagem não disponível" if backdrop_path and poster_path are not provided', () => {
    const movieWithoutImages = {
      ...movie,
      backdrop_path: undefined,
      poster_path: undefined,
    }
    const { getByText } = render(<Card movie={movieWithoutImages} />)

    expect(getByText("Imagem não disponível")).toBeInTheDocument()
  })

  it("renders correct vote average and vote count", () => {
    const { getByText } = render(<Card movie={movie} />)

    expect(getByText("7.5")).toBeInTheDocument()
    expect(getByText("1000")).toBeInTheDocument()
  })

  it("renders title correctly for Movie", () => {
    const movieMovie = { ...movie, name: undefined }
    const { getByText } = render(<Card movie={movieMovie} />)

    expect(getByText(movie.title)).toBeInTheDocument()
  })
})
