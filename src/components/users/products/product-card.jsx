import { Star } from "lucide-react";
import { formatCurrency } from "../../../utils/format-currency";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg border border-secondary/10 overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 md:h-56 object-cover aspect-[4/3]"
      />
      <div className="p-4">
        <h3 className="text-lg md:text-xl font-semibold text-secondary">
          {product.name}
        </h3>

        <div className="flex items-center mt-1 text-sm md:text-base text-secondary">
          <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
          <span className="ml-1">{product.rating}</span>
          <span className="ml-1 text-secondary/70">
            ({product.reviews} ulasan)
          </span>
        </div>

        <div className="mt-2 flex justify-between items-center">
          <span className="text-base md:text-lg font-semibold text-secondary">
            {formatCurrency(product.price)}
          </span>
          <button className="px-3 py-1 md:px-4 md:py-2 bg-secondary text-white text-sm md:text-base rounded-lg hover:bg-secondary/90">
            Pesan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
