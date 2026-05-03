import { useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import GuestView from "./components/GuestView";
import AdminTable from "./components/AdminTable";
import destinations from "./data/destinations.json";

const Pertemuan4Latihan = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const categories = [...new Set(destinations.map((item) => item.category))];
  const cities = [...new Set(destinations.map((item) => item.city))];

  const filteredData = useMemo(() => {
    return destinations.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchCity = selectedCity ? item.city === selectedCity : true;

      return matchSearch && matchCategory && matchCity;
    });
  }, [search, selectedCategory, selectedCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
            Data Destinasi Wisata Indonesia
          </h1>
          
        </div>

        <div className="mb-8 grid gap-4 rounded-2xl bg-white p-4 shadow-md md:grid-cols-3">
          <div className="md:col-span-1">
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          <div className="md:col-span-2">
            <FilterBar
              categories={categories}
              cities={cities}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          </div>
        </div>

        <div className="space-y-10">
          <GuestView data={filteredData} />
          <AdminTable data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default Pertemuan4Latihan;