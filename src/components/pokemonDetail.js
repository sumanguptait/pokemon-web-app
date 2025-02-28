import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import Image from "next/image";

const pokemonDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllMoves, setShowAllMoves] = useState(false);

  const fetchPokemon = async () => {
    let response = await fetch(`/api/pokemon/${id}`);
    let data = await response.json();
    console.log("Data: ", data);
    setPokemon(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchPokemon();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen ">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push("/")}
          className="text-blue-400 flex items-center px-4 py-2 border border-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition"
        >
          <GoArrowLeft className="mr-2" />
          Home
        </button>
        <h1 className="text-2xl sm:text-4xl font-bold text-blue-400">
          {pokemon.name} Details
        </h1>
        <div></div>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-full sm:w-3/5 md:w-1/3 flex justify-center">
          <Image
            src={pokemon.sprites?.other.dream_world.front_default}
            alt={pokemon.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-2/3 text-lg md:text-xl space-y-4">
          <p className="font-semibold">
            <span className="text-red-400">Name:</span> {pokemon.name}
          </p>
          <p className="font-semibold">
            <span className="text-red-400">Id:</span> # {pokemon.id}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-red-400">Types:</span>
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className="bg-gray-500 text-white px-3 py-1 rounded-lg"
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-red-400">Abilities:</p>
            {pokemon.abilities.map((ability, index) => (
              <p key={index} className="ml-4">
                {ability.ability.name}
              </p>
            ))}
          </div>
          <p className="font-semibold">
            <span className="text-red-400">Base Experience:</span>{" "}
            {pokemon.base_experience}
          </p>
          <p className="font-semibold">
            <span className="text-red-400">Height:</span> {pokemon.height}
          </p>
          <p className="font-semibold">
            <span className="text-red-400">Weight:</span> {pokemon.weight}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-red-400">Stats:</span>
            {pokemon.stats.map((stat, index) => (
              <span
                key={index}
                className="bg-gray-500 text-white px-3 py-1 rounded-lg"
              >
                {stat.stat.name}: {stat.base_stat}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mt-2">
            <span className="font-semibold text-red-400">Moves:</span>
            {pokemon.moves
              .slice(1, showAllMoves ? pokemon.moves.length : 10)
              .map((move, index) => (
                <span
                  key={index}
                  className="bg-gray-500 text-white px-3 py-1 rounded-lg"
                >
                  {move.move.name}
                </span>
              ))}
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setShowAllMoves(!showAllMoves)}
              className="text-blue-400 flex items-center px-4 py-2 border border-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition"
            >
              {showAllMoves ? "Show Less" : "Show All Moves"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default pokemonDetails;
