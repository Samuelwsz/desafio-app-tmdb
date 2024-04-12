import { render, fireEvent } from "@testing-library/react"
import Home from "./page"

test("renders buttons correctly", () => {
  const { getByText } = render(<Home />)
  const dayButton = getByText(/Principais tendências do Dia/i)
  const weekButton = getByText(/Principais tendências da Semana/i)
  expect(dayButton).toBeInTheDocument()
  expect(weekButton).toBeInTheDocument()
})

test("handles button clicks correctly", () => {
  const { getByText } = render(<Home />)
  const dayButton = getByText(/Principais tendências do Dia/i)
  fireEvent.click(dayButton)
  // Write further assertions based on expected behavior
})
