import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SearchCommentsComponent from "../components/SearchCommentsComponent";

describe("SearchCommentsComponent", () => {
  it("renders input field and search button", () => {
    render(<SearchCommentsComponent />);
    
    expect(screen.getByPlaceholderText("Search comments...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    render(<SearchCommentsComponent />);
    const input = screen.getByPlaceholderText("Search comments...");

    fireEvent.change(input, { target: { value: "tenet" } });
    expect(input).toHaveValue("tenet");
  });
});
