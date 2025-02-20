const CategorySidebar = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="w-64 flex-shrink-0 bg-light dark:bg-dark p-4 rounded-lg">
      <h2 className="text-xl font-semibold text-secondary dark:text-primary mb-4">
        Kategori Produk
      </h2>
      <div className="space-y-2">
        {/* Tombol untuk Semua Kategori */}
        <button
          className={`w-full flex justify-between items-center py-2 px-3 rounded-lg 
            hover:bg-secondary dark:hover:bg-secondary transition-colors text-left hover:text-white
            bg-light dark:bg-dark text-secondary dark:text-primary
            ${selectedCategory === null ? "bg-secondary text-white" : ""}`}
          onClick={() => onCategorySelect(null)}
        >
          <span>Semua Kategori</span>
        </button>

        {/* Tombol untuk Setiap Kategori */}
        {categories.map((category, index) => (
          <button
            key={index}
            className={`w-full flex justify-between items-center py-2 px-3 rounded-lg
            hover:bg-secondary dark:hover:bg-secondary transition-colors text-left hover:text-white
            bg-light dark:bg-dark text-secondary dark:text-primary
              ${selectedCategory === category.name ? "bg-secondary dark:bg-secondary text-white" : ""}`}
            onClick={() => onCategorySelect(category.name)} // ✅ Tambahkan event handler
          >
            <span>{category.name}</span>
            <span className="text-secondary/70 dark:text-primary/70 text-sm">
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
