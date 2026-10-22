import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/products";

const CATEGORIES = ["All", "Men", "Women", "Accessories"];
const PRODUCTS_PER_PAGE = 9;
const SKELETON_COUNT = 6;

function SectionEyebrow({ children }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.25em] text-stone-400 sm:tracking-widest">
      {children}
    </p>
  );
}

function SearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function ArrowIcon({ direction = "right" }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {direction === "left" ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      )}
    </svg>
  );
}

function ShopHeader() {
  return (
    <header className="border-b border-stone-200 pb-8 sm:pb-10">
      <SectionEyebrow>LUMÉ Collection</SectionEyebrow>

      <h1 className="mt-4 text-3xl font-light tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
        Shop Essentials
      </h1>

      <p className="mt-4 max-w-xl text-sm leading-7 text-stone-500 sm:text-base">
        Everyday essentials designed with simplicity, comfort, and longevity in
        mind.
      </p>
    </header>
  );
}

function ShopFilters({
  selectedCategory,
  onCategoryChange,
  searchInput,
  onSearchChange,
}) {
  return (
    <section
      aria-label="Product filters"
      className="mt-6 space-y-5 sm:mt-8 sm:space-y-6"
    >
      {/* Category filters */}
      <div
        className="flex flex-wrap gap-2 sm:gap-3"
        aria-label="Filter products by category"
      >
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onCategoryChange(category)}
              className={`min-h-10 rounded-sm border px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:px-5 sm:text-xs sm:tracking-widest ${
                isSelected
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-stone-200 bg-white text-stone-500 hover:border-zinc-900 hover:text-zinc-900"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Search input */}
      <div className="relative w-full sm:max-w-sm">
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>

        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 sm:left-4" />

        <input
          id="product-search"
          type="search"
          autoComplete="off"
          placeholder="Search products..."
          value={searchInput}
          onChange={(event) => onSearchChange(event.target.value)}
          className="min-h-11 w-full rounded-sm border border-stone-200 bg-stone-50 py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder-stone-400 transition-colors focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 sm:pl-11"
        />
      </div>
    </section>
  );
}

function ProductGridSkeleton() {
  return (
    <div
      aria-label="Loading products"
      aria-busy="true"
      className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3"
    >
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <div key={index} className="min-w-0 animate-pulse">
          <div className="aspect-[3/4] w-full bg-stone-100" />

          <div className="mt-3 h-3 w-1/3 bg-stone-100 sm:mt-5 sm:h-4" />

          <div className="mt-2 h-4 w-3/4 bg-stone-100 sm:h-5" />

          <div className="mt-2 h-3 w-1/3 bg-stone-100 sm:h-4" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center sm:py-24">
      <SearchIcon className="mb-4 h-9 w-9 text-stone-300 sm:h-10 sm:w-10" />

      <h2 className="text-lg font-medium text-zinc-900">No products found</h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-stone-500 sm:text-base">
        We couldn't find anything matching your current filters. Try another
        search or category.
      </p>

      <button
        type="button"
        onClick={onClearFilters}
        className="mt-6 min-h-10 text-sm font-medium text-zinc-900 underline underline-offset-4 transition-colors hover:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
      >
        Clear all filters
      </button>
    </div>
  );
}

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Product pages"
      className="mt-12 flex items-center justify-between gap-3 border-t border-stone-200 pt-6 sm:mt-16 sm:justify-center sm:gap-8 sm:pt-8"
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="inline-flex min-h-10 items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-900 transition-colors hover:text-stone-500 disabled:cursor-not-allowed disabled:opacity-30 sm:gap-2 sm:text-xs sm:tracking-widest"
      >
        <ArrowIcon direction="left" />
        Previous
      </button>

      <span
        aria-live="polite"
        className="whitespace-nowrap text-xs font-medium text-stone-500 sm:text-sm"
      >
        {page} of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="inline-flex min-h-10 items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-900 transition-colors hover:text-stone-500 disabled:cursor-not-allowed disabled:opacity-30 sm:gap-2 sm:text-xs sm:tracking-widest"
      >
        Next
        <ArrowIcon />
      </button>
    </nav>
  );
}

function ClosingCTA() {
  return (
    <section className="border-t border-stone-200 bg-[#FAFAFA]">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-24 lg:py-32">
        <h2 className="text-2xl font-light tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
          Questions about our essentials?
        </h2>

        <Link
          to="/faq"
          className="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-4 bg-zinc-900 px-6 py-4 text-xs font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-stone-800 hover:shadow-xl hover:shadow-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 sm:mt-10 sm:w-auto sm:px-8 sm:text-sm"
        >
          Visit FAQ
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </section>
  );
}

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

  // Debounce the search to avoid requesting products on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch products when the category, search, or page changes.
  useEffect(() => {
    let isCurrentRequest = true;

    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getProducts({
          category: selectedCategory === "All" ? "" : selectedCategory,
          search: searchTerm,
          page,
          limit: PRODUCTS_PER_PAGE,
        });

        if (!isCurrentRequest) {
          return;
        }

        setProducts(Array.isArray(data.products) ? data.products : []);

        setTotalPages(Math.max(1, Number(data.totalPages) || 1));
      } catch (err) {
        if (!isCurrentRequest) {
          return;
        }

        setProducts([]);
        setTotalPages(1);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load products. Please try again.",
        );
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isCurrentRequest = false;
    };
  }, [selectedCategory, searchTerm, page]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSearchInput("");
    setSearchTerm("");
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-20">
        <ShopHeader />

        <ShopFilters
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          searchInput={searchInput}
          onSearchChange={setSearchInput}
        />

        <section
          aria-label="Shop products"
          aria-busy={loading}
          className="mt-8 sm:mt-12"
        >
          {error ? (
            <div
              role="alert"
              className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
            >
              <p>{error}</p>

              <button
                type="button"
                onClick={() => setPage((currentPage) => currentPage)}
                className="mt-2 font-semibold underline underline-offset-4"
              >
                Retry
              </button>
            </div>
          ) : loading ? (
            <ProductGridSkeleton />
          ) : products.length === 0 ? (
            <EmptyState onClearFilters={handleClearFilters} />
          ) : (
            <>
              {/* Two columns on mobile, three on desktop. */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
                {products.map((product) => (
                  <div key={product._id} className="min-w-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </section>
      </div>

      <ClosingCTA />
    </main>
  );
}

export default Shop;
