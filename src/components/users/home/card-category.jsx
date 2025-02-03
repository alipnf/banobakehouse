const CardCategory = ({ category }) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-current">
          {category.title}
        </h3>
        <p className="mt-2 text-xs md:text-sm text-gray-500">
          {category.subtitle}
        </p>
      </div>
    </div>
  );
};

export default CardCategory;
