import { Search } from "lucide-react";

const SearchAndSort = ({ searchQuery, setSearchQuery, sortBy, setSortBy }) => {
  return (
    <div className="flex justify-between items-center mb-6 gap-5">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/50 w-4 h-4" />
        <input
          type="text"
          placeholder="Cari kue favoritmu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-secondary/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary"
        />
      </div>
      <div className="flex items-center gap-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-secondary/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-secondary bg-light"
        >
          <option value="price-low">Harga Terendah</option>
          <option value="price-high">Harga Tertinggi</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndSort;
