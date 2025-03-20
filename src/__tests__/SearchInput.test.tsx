import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchInput from "../components/SearchInput";

describe("SearchInput Component", () => {
  it("renders input and button", () => {
    render(<SearchInput query="" setQuery={() => {}} fetchComments={() => {}} />);
    expect(screen.getByPlaceholderText("Search comments...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("calls setQuery on input change", () => {
    const mockSetQuery = vi.fn();
    render(<SearchInput query="" setQuery={mockSetQuery} fetchComments={() => {}} />);
    
    const input = screen.getByPlaceholderText("Search comments...");
    fireEvent.change(input, { target: { value: "tenet" } });

    expect(mockSetQuery).toHaveBeenCalledWith("tenet");
  });

  it("calls fetchComments when button is clicked", () => {
    const mockFetchComments = vi.fn();
    render(<SearchInput query="React" setQuery={() => {}} fetchComments={mockFetchComments} />);
    
    const button = screen.getByRole("button", { name: "Search" });
    fireEvent.click(button);

    expect(mockFetchComments).toHaveBeenCalledTimes(1);
  });
});
