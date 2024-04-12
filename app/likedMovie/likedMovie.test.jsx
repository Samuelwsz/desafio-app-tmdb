import { render, screen } from "@testing-library/react"
import LikedMovie from "./page"
import { useLikeOrDislikeMovie } from "../../lib/useLikeOrDislikeMovie"

jest.mock("../../lib/useLikeOrDislikeMovie")

describe("LikedMovie component", () => {
  it("renders liked movies correctly", () => {
    // Mocked likedMovies data
    const likedMovies = [
      { id: 1, title: "Liked Movie 1" },
      { id: 2, title: "Liked Movie 2" },
    ]

    // Mock useLikeOrDislikeMovie hook implementation
    useLikeOrDislikeMovie.mockReturnValueOnce({ likedMovies })

    render(<LikedMovie />)

    // Assert that each liked movie is rendered
    likedMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument()
    })
  })

  it("renders no liked movies message when there are no liked movies", () => {
    // Mocked likedMovies data
    const likedMovies = []

    // Mock useLikeOrDislikeMovie hook implementation
    useLikeOrDislikeMovie.mockReturnValueOnce({ likedMovies })

    render(<LikedMovie />)
  })
})
