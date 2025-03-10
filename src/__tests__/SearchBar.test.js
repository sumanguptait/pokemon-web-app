import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/components/SearchBar";

describe("SearchBar", () => {
  it("render searchBar", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search Pokemon...");
    expect(input).toBeInTheDocument();
  });
  it("should call onChange when input changes", () => {
    const mockOnChange = jest.fn();
    render(<SearchBar setSearch={mockOnChange} />);
    const input = screen.getByPlaceholderText("Search Pokemon...");
    fireEvent.change(input, { target: { value: "bulbasaur" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
