import { useEffect, useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/products";
import { Link } from "react-router-dom";
import FAQ from "./faq";

function Shop() {
  useDocumentTitle("Shop | LUMÉ");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce: wait 400ms after typing stops before actually searching
  useEffect(() => {
    const timer = setTimeout(() => setSearchTerm(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Reset to page 1 whenever the filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts({
          category: selectedCategory,
          search: searchTerm,
          page,
          limit: 9,
        });
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, searchTerm, page]);

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="border-b border-gray-200 pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          LUMÉ Collection
        </p>
        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-light md:text-5xl">Our Collection</h1>
            <p className="mt-4 max-w-xl text-gray-500">
              Everyday essentials designed with simplicity, comfort, and
              longevity in mind.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
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

        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full max-w-xs border border-gray-300 px-4 py-2 text-sm"
        />
      </div>

      {loading ? (
        <p className="py-20 text-center text-gray-500">Loading collection...</p>
      ) : products.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-gray-500">No products match your search.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-x-6 gap-y-12 py-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="border border-gray-300 px-4 py-2 text-sm disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-gray-500">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="border border-gray-300 px-4 py-2 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Closing CTA */}

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl font-light tracking-tight text-gray-900 md:text-4xl">
            Got questions? We’ve got answers in our FAQ.
          </h2>

          <Link
            to="/faq"
            className="mt-8 inline-block bg-black px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-all duration-200 hover:bg-gray-800"
          >
            Visit FAQ
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Shop;
