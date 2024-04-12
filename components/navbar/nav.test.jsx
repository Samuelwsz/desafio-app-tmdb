import { NavBar, links } from "@/components/navbar/navbar"
import { render, screen } from "@testing-library/react"
import { NavLink } from "../navbar/navlink"
import userEvent from "@testing-library/user-event"


test("renders logo with correct alt attribute", () => {
  render(<NavBar />)
  const logoElement = screen.getByAltText("Logo tmdb")
  expect(logoElement).toBeInTheDocument()
})

test("renders category navigation links", () => {
  render(<NavBar />)
  links.forEach((link) => {
    const categoryLink = screen.getByRole("link", { name: link.title })
    expect(categoryLink).toBeInTheDocument()
    expect(categoryLink).toHaveAttribute("href", link.path)
  })
})

const mockItem = {
  title: "Test Link",
  path: "/test",
}

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/test"),
}))

test("renders NavLink component", () => {
  render(<NavLink item={mockItem} />)
  const linkElement = screen.getByText("Test Link")
  expect(linkElement).toBeInTheDocument()
  expect(linkElement).toHaveAttribute("href", "/test")
})

test("renders NavLink component with active styles", () => {
  render(<NavLink item={mockItem} />)
  const linkElement = screen.getByText("Test Link")
  expect(linkElement).toHaveClass("bg-orange-600 text-slate-300")
})

test("navigates to correct path when clicked", () => {
  render(<NavLink item={mockItem} />)
  const linkElement = screen.getByText("Test Link")
  userEvent.click(linkElement)
  // Write your assertion here to check if navigation occurred correctly
})
