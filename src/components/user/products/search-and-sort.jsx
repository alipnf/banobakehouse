import { Search } from "lucide-react";

const SearchAndSort = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center sm:gap-5 gap-3 w-full mb-6">
      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/50 dark:text-primary/50 w-4 h-4" />
        <input
          type="text"
          placeholder="Cari kue favoritmu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-secondary/10 dark:border-primary/20 
          rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary dark:focus:ring-primary 
          bg-light dark:bg-dark text-secondary dark:text-primary placeholder-secondary/50 dark:placeholder-primary/50"
        />
      </div>

      {/* Sorting Dropdown */}
      {/* <div className="w-full sm:w-auto"> */}
      {/*   <select */}
      {/*     value={sortBy} */}
      {/*     onChange={(e) => setSortBy(e.target.value)} */}
      {/*     className="w-full sm:w-auto border border-secondary/10 dark:border-primary/20 rounded-lg px-4 py-2  */}
      {/*     focus:outline-none focus:ring-1 focus:ring-secondary dark:focus:ring-primary  */}
      {/*     bg-light dark:bg-dark text-secondary dark:text-primary" */}
      {/*   > */}
      {/*     <option value="price-low">Harga Terendah</option> */}
      {/*     <option value="price-high">Harga Tertinggi</option> */}
      {/*   </select> */}
      {/* </div> */}
    </div>
  );
};

export default SearchAndSort;
