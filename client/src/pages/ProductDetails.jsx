import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useCart } from "../context/CartContext";
import API_URL from "../config/api";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  useDocumentTitle("Product | LUMÉ");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Premium Skeleton Loader
  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="aspect-[3/4] w-full animate-pulse rounded-sm bg-stone-100"></div>
          <div className="space-y-6 py-6 lg:py-10">
            <div className="h-4 w-24 animate-pulse rounded bg-stone-100"></div>
            <div className="h-10 w-3/4 animate-pulse rounded bg-stone-100"></div>
            <div className="mt-8 h-32 w-full animate-pulse rounded bg-stone-50"></div>
          </div>
        </div>
      </main>
    );
  }

  // Error / Empty State
  if (!product) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-light text-zinc-900">
          Product not found.
        </h1>
        <p className="mt-4 text-stone-500">
          The item you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/shop"
          className="mt-8 bg-zinc-900 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-stone-800"
        >
          Back to Shop
        </Link>
      </main>
    );
  }

  const hasSizes = product.sizes?.length > 0;
  const needsSize = hasSizes && !selectedSize;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-24">
        {/* Sticky Image Container */}
        <div className="aspect-[3/4] w-full overflow-hidden rounded-sm bg-stone-100 lg:sticky lg:top-32">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Product Details */}
        <div className="mt-10 lg:mt-0 lg:py-10">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
            {product.category}
          </p>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <h1 className="text-3xl font-light tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
              {product.name}
            </h1>
            <p className="text-xl font-medium text-zinc-900 sm:text-2xl sm:whitespace-nowrap">
              Rs. {product.price.toLocaleString()}
            </p>
          </div>

          <p className="mt-8 text-base leading-relaxed text-stone-600">
            {product.description}
          </p>

          {/* Sizes */}
          {hasSizes && (
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-900">Select Size</p>
                <button className="text-xs text-stone-500 underline hover:text-zinc-900">
                  Size Guide
                </button>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex items-center justify-center rounded-sm border py-3 text-sm font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-stone-200 text-zinc-900 hover:border-zinc-900 bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Row */}
          <div className="mt-10 flex flex-col gap-5 sm:flex-row">
            {/* Quantity Selector */}
            <div className="flex h-14 w-full items-center justify-between border border-stone-300 bg-white px-4 sm:w-32 sm:shrink-0">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-stone-400 transition-colors hover:text-zinc-900"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="text-sm font-medium text-zinc-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-stone-400 transition-colors hover:text-zinc-900"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Smart Add to Cart Button */}
            <button
              onClick={() =>
                !needsSize && addToCart(product, selectedSize, quantity)
              }
              disabled={needsSize}
              className={`flex h-14 flex-1 items-center justify-center text-sm font-medium uppercase tracking-widest transition-all duration-300 ${
                needsSize
                  ? "cursor-not-allowed bg-stone-100 text-stone-400"
                  : "bg-zinc-900 text-white hover:bg-stone-800 hover:shadow-lg hover:shadow-stone-200"
              }`}
            >
              {needsSize
                ? "Select a Size"
                : `Add to Cart — Rs. ${(product.price * quantity).toLocaleString()}`}
            </button>
          </div>

          {/* Shipping Perks (E-commerce Best Practice) */}
          <div className="mt-12 border-t border-stone-200 pt-8">
            <ul className="space-y-4 text-sm text-stone-500">
              <li className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-stone-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                Free shipping on orders over Rs. 10,000
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-stone-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Easy 14-day returns and exchanges
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
