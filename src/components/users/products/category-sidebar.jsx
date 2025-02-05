const CategorySidebar = ({ categories }) => {
  return (
    <div className="w-64 flex-shrink-0">
      <h2 className="text-xl font-semibold text-secondary mb-4">
        Kategori Produk
      </h2>
      <div className="space-y-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className="w-full flex justify-between items-center py-2 px-3 rounded-lg hover:bg-primary transition-colors text-left"
          >
            <span className="text-secondary">{category.name}</span>
            <span className="text-secondary/70 text-sm">{category.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
