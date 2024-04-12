import TopRated from "./page"
import axios from "axios"

jest.mock("axios")

describe("TopRated", () => {
  test("renders correctly with mock data", async () => {
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

    await expect(TopRated()).rejects.toThrow("API call failed")
  })
})
