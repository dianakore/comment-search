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

  it("shows an error message if search text is too short", async () => {
    render(<SearchCommentsComponent />);

    const input = screen.getByPlaceholderText("Search comments...");
    const button = screen.getByRole("button", { name: "Search" });

    fireEvent.change(input, { target: { value: "qui" } }); // inserted < 4 characters
    fireEvent.click(button); // click on search button
    expect(await screen.findByText("Please enter at least 4 characters to perform the search")).toBeInTheDocument();
  });
});
