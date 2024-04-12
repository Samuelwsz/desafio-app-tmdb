import { render, screen, waitFor } from "@testing-library/react"
import axios from "axios"
import MovieId from "./[id]/page"

jest.mock("axios")

describe("MovieId component", () => {
  const mockMovieId = 123 // Mock movie ID for testing

  const mockMovieResponse = {
    data: {
      id: mockMovieId,
      title: "Mock Movie",
      overview: "This is a mock movie",
      vote_average: 8.5,
      release_date: "2022-01-01",
      popularity: 75.5,
      runtime: 120,
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Adventure" },
      ],
    },
  }

  const mockCastResponse = {
    data: {
      cast: [
        { id: 1, name: "Actor 1", character: "Character 1" },
        { id: 2, name: "Actor 2", character: "Character 2" },
      ],
    },
  }

  const mockTrailerResponse = {
    data: {
      results: [{ key: "mock-trailer-key", type: "Trailer" }],
    },
  }

  beforeEach(() => {
    axios.get.mockReset()
  })

  it("renders movie details correctly", async () => {
    axios.get.mockResolvedValueOnce(mockMovieResponse)
    axios.get.mockResolvedValueOnce(mockCastResponse)
    axios.get.mockResolvedValueOnce(mockTrailerResponse)

    render(<MovieId params={{ id: mockMovieId }} />)

    await waitFor(() => {
      expect(screen.getByTestId("movie-title")).toBeInTheDocument()
      expect(screen.getByText(/8.5/i)).toBeInTheDocument()
      expect(screen.getByText(/action/i)).toBeInTheDocument()
      expect(screen.getByText(/adventure/i)).toBeInTheDocument()
      expect(screen.getByText(/actor 1/i)).toBeInTheDocument()
      expect(screen.getByText(/actor 2/i)).toBeInTheDocument()
    })
  })

  it("renders trailer when available", async () => {
    axios.get.mockResolvedValueOnce(mockMovieResponse)
    axios.get.mockResolvedValueOnce(mockCastResponse)
    axios.get.mockResolvedValueOnce(mockTrailerResponse)

    render(<MovieId params={{ id: mockMovieId }} />)

    await waitFor(() => {
      expect(screen.getByTitle(/trailer/i)).toBeInTheDocument()
      expect(screen.getByTitle(/trailer/i)).toHaveAttribute(
        "src",
        expect.stringContaining("mock-trailer-key")
      )
    })
  })

  // You can write more tests to cover other scenarios such as handling loading state, error handling, etc.
})
