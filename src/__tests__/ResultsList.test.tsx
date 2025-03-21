import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ResultsList from "../components/ResultsList";
import { DataComment } from "../types/DataComment";

const mockResults: DataComment[] = [
  { id: 1, postId: 1, name: "Alice", email: "alice@test.com", body: "Commento 1" },
  { id: 2, postId: 1, name: "Bob", email: "bob@test.com", body: "Commento 2" },
  { id: 3, postId: 1, name: "Charlie", email: "charlie@test.com", body: "Commento 3" },
  { id: 4, postId: 1, name: "David", email: "david@test.com", body: "Commento 4" },
  { id: 5, postId: 1, name: "Eve", email: "eve@test.com", body: "Commento 5" },
];

describe("ResultsList Component", () => {
  it("renders paginated results", () => {
    render(<ResultsList results={mockResults} currentPage={1} setCurrentPage={() => {}} resultsPerPage={3} />);
    
    expect(screen.getByText("Commento 1")).toBeInTheDocument();
    expect(screen.getByText("Commento 2")).toBeInTheDocument();
    expect(screen.getByText("Commento 3")).toBeInTheDocument();
    expect(screen.queryByText("Commento 4")).not.toBeInTheDocument(); // it has to be in the next page
  });

  it("calls setCurrentPage when next button is clicked", () => {
    const setCurrentPageMock = vi.fn();
    render(<ResultsList results={mockResults} currentPage={1} setCurrentPage={setCurrentPageMock} resultsPerPage={3} />);

    const nextButton = screen.getByText("Next ➡");
    fireEvent.click(nextButton);

    expect(setCurrentPageMock).toHaveBeenCalledWith(2);
  });

  it("calls setCurrentPage when previous button is clicked", () => {
    const setCurrentPageMock = vi.fn();
    render(<ResultsList results={mockResults} currentPage={2} setCurrentPage={setCurrentPageMock} resultsPerPage={3} />);

    const prevButton = screen.getByText("⬅ Back");
    fireEvent.click(prevButton);

    expect(setCurrentPageMock).toHaveBeenCalledWith(1);
  });
});
