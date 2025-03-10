import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import PokemonDetail from "@/components/pokemonDetail";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "1" },
    push: jest.fn(),
  }),
}));

const mockPokemonData = {
  name: "bulbasaur",
  id: 1,
  base_experience: 64,
  height: 7,
  weight: 69,
  sprites: {
    other: {
      dream_world: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
      },
    },
  },
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
  abilities: [
    { ability: { name: "overgrow" } },
    // { ability: { name: "chlorophyll" } },
  ],
  stats: [
    { stat: { name: "hp" }, base_stat: 45 },
    // { stat: { name: "attack" }, base_stat: 49 },
  ],
  moves: [{ move: { name: "vine whip" } }],
};

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url === "/api/pokemon/1") {
      return Promise.resolve({
        json: () => Promise.resolve(mockPokemonData),
      });
    }
    return Promise.reject(new Error("API Error"));
  });
});
afterEach(() => {
  jest.clearAllMocks();
});

describe("PokemonDetail Component", () => {
  it("renders loading spinner initially", () => {
    render(<PokemonDetail />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
  it("fetches and displays Pokemon details", async () => {
    render(<PokemonDetail />);

    await waitFor(() => {
      expect(screen.getByText(/# 1/i)).toBeInTheDocument();
      expect(screen.getByText(/overgrow/i)).toBeInTheDocument();
      expect(screen.getByText(/hp: 45/i)).toBeInTheDocument();
      expect(screen.getByText(/grass/i)).toBeInTheDocument();
      expect(screen.getByAltText(/bulbasaur/i)).toBeInTheDocument();
    });
  });
});
