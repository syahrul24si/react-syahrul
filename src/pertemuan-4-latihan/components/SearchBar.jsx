const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Cari destinasi..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-xl border border-gray-300 px-4 
      py-2 outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchBar;