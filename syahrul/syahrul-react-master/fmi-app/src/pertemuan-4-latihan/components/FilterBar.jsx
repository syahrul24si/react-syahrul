const FilterBar = ({
  categories,
  cities,
  selectedCategory,
  setSelectedCategory,
  selectedCity,
  setSelectedCity,
}) => {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="rounded-xl border border-gray-300 px-4 py-2"
      >
        <option value="">Semua Kategori</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="rounded-xl border border-gray-300 px-4 py-2"
      >
        <option value="">Semua Kota</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;