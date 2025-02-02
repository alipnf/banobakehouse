const CardCategory = ({ category }) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-80 w-full overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-current">{category.title}</h3>
        <p className="mt-2 text-sm text-gray-500">{category.subtitle}</p>
      </div>
    </div>
  );
};

export default CardCategory;
