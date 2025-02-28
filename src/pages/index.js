import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "@/components/SearchBar";
import PokemonCard from "@/components/PokemonCard";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const router = useRouter();
  const fetchPokemons = async () => {
    const limit = 20;

    // const API = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    try {
      setLoading(true);
      const offset = (page - 1) * limit;
      const response = await fetch(
        `/api/pokemons?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();
      console.log("data:", data);
      const pokemonsList = data.results;
      console.log("Pokemons List: ", pokemonsList);

      const pokemonDetail = [];
      for (const pokemon of pokemonsList) {
        try {
          const result = await fetch(pokemon.url);
          const data = await result.json();
          console.log("Pokemon details: ", data);
          pokemonDetail.push(data);
        } catch (error) {
          console.error(`Failed to fetch details for ${pokemon.name}:`, error);
        }
      }
      setPokemons(pokemonDetail);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [page]);
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  const handlePreClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextClick = () => {
    setPage(page + 1);
  };
  const searchPokemon = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div
      className="min-h-screen bg-gray-100 p-6"
      style={{
        backgroundImage: "url('/volcano.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center items-center">
        <Image
          className="w-1/2 md:w-1/5"
          priority={true}
          src="/pokemon.png"
          alt="Pokemon Logo"
          width={200}
          height={200}
        />
      </div>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {searchPokemon.map((pokemon) => {
          return (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              id={pokemon.id}
              onClick={() => router.push(`/${pokemon.id}`)}
            />
          );
        })}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          className="bg-blue-500 text-white px-6 py-2  rounded-lg disabled:opacity-50 "
          onClick={handlePreClick}
          disabled={page === 1}
        >
          Previous
        </button>

        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg "
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
}
