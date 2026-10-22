import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product._id}`} className="group flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Quick View Overlay (Slides up on hover) */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-white/90 p-4 opacity-0 backdrop-blur-sm transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">
            View Details
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-5 flex flex-col">
        {/* Category */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
          {product.category}
        </p>

        {/* Title and Price Row */}
        <div className="mt-1 flex items-start justify-between gap-4">
          <h3 className="text-sm font-medium text-zinc-900 line-clamp-1 transition-colors group-hover:text-stone-500">
            {product.name}
          </h3>

          <p className="whitespace-nowrap text-sm font-medium text-zinc-900">
            Rs. {product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
