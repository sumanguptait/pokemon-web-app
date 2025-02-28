function SearchBar({ search, setSearch }) {
  return (
    <div className="flex justify-center items-center mt-6">
      <input
        type="text"
        placeholder="Search Pokemon..."
        className="w-full md:w-1/2 p-2 rounded-md border border-gray-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
