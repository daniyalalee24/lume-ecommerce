import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useCart } from "../context/CartContext";
import API_URL from "../config/api";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // title

  useDocumentTitle("Product | LUMÉ");

  useEffect(() => {
    fetch(`${API_URL}/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-gray-500">Loading product...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-red-600">Product not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        {/* Image */}
        <div className="aspect-3/4 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="md:py-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            {product.category}
          </p>

          <div className="mt-4 flex items-start justify-between gap-6">
            <h1 className="text-3xl font-light md:text-5xl">{product.name}</h1>

            <p className="whitespace-nowrap text-lg">
              Rs. {product.price.toLocaleString()}
            </p>
          </div>

          <p className="mt-8 max-w-lg leading-7 text-gray-600">
            {product.description}
          </p>

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mt-10">
              <p className="mb-4 text-sm font-medium">Select Size</p>

              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-12 border px-4 py-3 text-sm transition ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-10">
            <p className="text-sm font-medium">Quantity</p>

            <div className="mt-4 flex w-fit items-center border border-gray-300">
              <button
                onClick={() =>
                  setQuantity((currentQuantity) =>
                    Math.max(1, currentQuantity - 1),
                  )
                }
                className="px-5 py-3 text-lg hover:bg-gray-100"
              >
                −
              </button>

              <span className="min-w-12 text-center text-sm">{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((currentQuantity) => currentQuantity + 1)
                }
                className="px-5 py-3 text-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={() => {
              if (product.sizes?.length > 0 && !selectedSize) {
                alert("Please select a size");
                return;
              }

              addToCart(product, selectedSize, quantity);
              // alert("Added to cart!");
            }}
            className="mt-10 w-full bg-black px-8 py-4 text-sm uppercase tracking-wider text-white transition hover:bg-gray-800"
          >
            Add to Cart — Rs. {(product.price * quantity).toLocaleString()}
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
