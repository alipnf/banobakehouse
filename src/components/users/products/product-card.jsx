import { Star } from "lucide-react";
import { formatCurrency } from "../../../utils/format-currency";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg border border-secondary/10 overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-medium text-secondary">{product.name}</h3>
        <div className="flex items-center mt-1">
          <Star className="w-4 h-4 text-secondary fill-current" />
          <span className="ml-1 text-secondary">{product.rating}</span>
          <span className="ml-1 text-secondary/70">
            ({product.reviews} ulasan)
          </span>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-lg font-semibold text-secondary">
            {formatCurrency(product.price)}
          </span>
          <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90">
            Pesan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
