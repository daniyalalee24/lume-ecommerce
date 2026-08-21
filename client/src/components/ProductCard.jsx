// client side product cards UI
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product._id}`} className="group block">
      <div className="aspect-3/4 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>

            <p className="mt-1 text-xs text-gray-500">{product.category}</p>
          </div>

          <p className="whitespace-nowrap text-sm">
            Rs. {product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
