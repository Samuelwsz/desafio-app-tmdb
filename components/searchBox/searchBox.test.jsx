import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SearchBox } from "../searchBox/searchBox"

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))

test("renders SearchBox component", () => {
  render(<SearchBox />)
  const inputElement = screen.getByPlaceholderText("Pesquisar obra...")
  const buttonElement = screen.getByRole("button", { name: "Pesquisar" })
  expect(inputElement).toBeInTheDocument()
  expect(buttonElement).toBeInTheDocument()
})

test("updates search state when input value changes", () => {
  render(<SearchBox />)
  const inputElement = screen.getByPlaceholderText("Pesquisar obra...")
  fireEvent.change(inputElement, { target: { value: "test search" } })
  expect(inputElement).toHaveValue("test search")
})

test("calls handleSubmit function when form is submitted", () => {
  render(<SearchBox />)
  const inputElement = screen.getByPlaceholderText("Pesquisar obra...")
  const buttonElement = screen.getByRole("button", { name: "Pesquisar" })

  fireEvent.change(inputElement, { target: { value: "test search" } })
  fireEvent.click(buttonElement)

  // Or you can use userEvent to simulate form submission:
  userEvent.type(inputElement, "test search")
  userEvent.click(buttonElement)
})
