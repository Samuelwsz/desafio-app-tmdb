import SearchPage from "./[searchTerm]/page"
import axios from "axios"

jest.mock("axios")

describe("SearchPage", () => {
  test('renders "Sem resultados encontrados" when results are empty', async () => {
    const mockData = {
      data: {
        results: [],
      },
    }

    axios.get.mockResolvedValue(mockData)
  })

  test("renders loading component when waiting for API response", async () => {
    const mockData = {
      data: {
        results: [],
      },
    }

    axios.get.mockResolvedValue(mockData)
  })

  test("renders movie cards when API returns results", async () => {
    const mockData = {
      data: {
        results: [
          {
            id: 1,
            title: "Movie 1",
            overview: "Overview 1",
            poster_path: "path/to/poster1.jpg",
          },
          {
            id: 2,
            title: "Movie 2",
            overview: "Overview 2",
            poster_path: "path/to/poster2.jpg",
          },
          {
            id: 3,
            title: "Movie 3",
            overview: "Overview 3",
            poster_path: "path/to/poster3.jpg",
          },
        ],
      },
    }

    axios.get.mockResolvedValue(mockData)
  })

  test("handles error when API call fails", async () => {
    axios.get.mockRejectedValue(new Error("API call failed"))

    await expect(
      SearchPage({ params: { searchTerm: "error-search-term" } })
    ).rejects.toThrow("API call failed")
  })
})
