import { render, fireEvent } from "@testing-library/react"
import Categorys from "./page"
import { useFetchCategorys } from "../../lib/useFetchCategorys"

// Mock do hook useFetchCategorys
jest.mock("../../lib/useFetchCategorys")

describe("Categorys Component", () => {
  // Mock dos dados necessários para o teste
  const mockCategorys = [
    { id: "28", name: "Ação" },
    { id: "12", name: "Aventura" },
    // Adicione outros mocks conforme necessário
  ]

  const mockMovies = [
    { id: 1, title: "Movie 1", poster: "poster1.jpg" },
    { id: 2, title: "Movie 2", poster: "poster2.jpg" },
    // Adicione outros mocks conforme necessário
  ]

  const mockPagination = {
    currentPage: 1,
    totalPages: 5,
    totalResults: 25,
    itemsPerPage: 5,
  }

  it("renders category buttons correctly", () => {
    // Configure o retorno do hook mockado para retornar os dados necessários para os botões de categoria
    useFetchCategorys.mockReturnValue({
      ...mockPagination,
      loading: false,
      categorys: mockCategorys,
      movies: [],
    })

    // Renderize o componente
    const { getByText } = render(<Categorys />)

    // Verifique se os botões de categoria são renderizados corretamente
    mockCategorys.forEach((category) => {
      const categoryButton = getByText(category.name)
      expect(categoryButton).toBeInTheDocument()
    })
  })

  it("renders movies correctly", () => {
    // Configure o retorno do hook mockado para retornar os dados necessários para os filmes
    useFetchCategorys.mockReturnValue({
      ...mockPagination,
      loading: false,
      categorys: [],
      movies: mockMovies,
    })

    // Renderize o componente
    const { getByText } = render(<Categorys />)

    // Verifique se os filmes são renderizados corretamente
    mockMovies.forEach((movie) => {
      const movieTitle = getByText(movie.title)
      expect(movieTitle).toBeInTheDocument()
    })
  })

  it("handles category change correctly", () => {
    // Função de mock para manipular a mudança de categoria
    const handleCategoryChangeMock = jest.fn()

    // Configure o retorno do hook mockado para retornar os dados necessários para os botões de categoria
    useFetchCategorys.mockReturnValue({
      ...mockPagination,
      loading: false,
      categorys: mockCategorys,
      movies: [],
      handleCategoryChange: handleCategoryChangeMock,
    })

    // Renderize o componente
    const { getByText } = render(<Categorys />)

    // Simule o clique em um botão de categoria
    const categoryButton = getByText(mockCategorys[0].name)
    fireEvent.click(categoryButton)

    // Verifique se a função de mudança de categoria foi chamada com o ID correto
    expect(handleCategoryChangeMock).toHaveBeenCalledWith(mockCategorys[0].id)
  })
})
