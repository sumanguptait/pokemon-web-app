import "@testing-library/jest-dom";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import PokemonCard from "@/components/PokemonCard";

afterEach(cleanup);
const mockPokemon = {
  id: 1,
  name: "bulbasaur",
  sprites: {
    other: {
      dream_world: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
      },
    },
  },
};

describe("PokemonCard", () => {
  it("should render the pokemon card", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByAltText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("Get Details")).toBeInTheDocument();
  });
  it("should call onClick when 'Get Details' button is clicked", () => {
    const mockOnClick = jest.fn();
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />);

    const button = screen.getByText("Get Details");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
