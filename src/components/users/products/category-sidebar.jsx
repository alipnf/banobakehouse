const CategorySidebar = ({ categories }) => {
  return (
    <div className="w-64 flex-shrink-0 bg-light dark:bg-dark p-4 rounded-lg">
      <h2 className="text-xl font-semibold text-secondary dark:text-primary mb-4">
        Kategori Produk
      </h2>
      <div className="space-y-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className="w-full flex justify-between items-center py-2 px-3 rounded-lg 
            hover:bg-primary dark:hover:bg-secondary transition-colors text-left 
            bg-light dark:bg-dark text-secondary dark:text-primary"
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
