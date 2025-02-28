import Image from "next/image";
export default function PokemonCard({ pokemon, onClick }) {
  return (
    <div className="container mx-auto p-6">
      <ul>
        <li
          key={pokemon.id}
          className="bg-gray-300 shadow-md rounded-lg p-4 text-center hover:shadow-lg transition duration-300"
        >
          <img
            className="w-24 h-24 mx-auto"
            src={pokemon.sprites?.other.dream_world.front_default}
            alt={pokemon.name}
          />
          <h2 className="text-lg font-semibold capitalize mt-2 text-gray-800">
            {pokemon.name}
          </h2>
          <button
            className="bg-blue-500 text-white px-1 py-1 rounded hover:bg-blue-600"
            onClick={onClick}
          >
            Get Details
          </button>
        </li>
      </ul>
    </div>
  );
}
