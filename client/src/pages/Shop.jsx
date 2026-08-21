import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API_URL from "../config/api";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selectedCategory
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-gray-500">Loading collection...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  // UI
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <div className="border-b border-gray-200 pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          LUMÉ Collection
        </p>

        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-light md:text-5xl">The Collection</h1>

            <p className="mt-4 max-w-xl text-gray-500">
              Everyday essentials designed with simplicity, comfort, and
              longevity in mind.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        {["All", "Men", "Women", "Accessories"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`border px-4 py-2 text-sm transition ${
              selectedCategory === category
                ? "border-black bg-black text-white"
                : "border-gray-300 text-gray-600 hover:border-black hover:text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-gray-500">
            No products available in this category.
          </p>
        </div>
      ) : (
        <div className="grid gap-x-6 gap-y-12 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Shop;
