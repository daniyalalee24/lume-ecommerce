import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API_URL from "../config/api";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);

        const data = await response.json();

        if (response.ok) {
          setProducts(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="bg-stone-100">
        <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
              New Collection
            </p>

            <h1 className="mt-6 text-5xl font-light leading-tight tracking-tight md:text-7xl">
              Essential
              <br />
              Form.
            </h1>

            <p className="mt-6 max-w-md text-gray-600 leading-relaxed">
              Thoughtfully designed pieces for everyday living. Simple
              silhouettes, quality materials, timeless style.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-block bg-black px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-all duration-200 hover:bg-gray-800"
            >
              Shop Collection
            </Link>
          </div>

          <div className="h-[500px] overflow-hidden bg-gray-200 shadow-sm">
            <img
              // Updated minimalist fashion image that pairs beautifully with stone-100
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80"
              alt="LUMÉ essential fashion collection"
              className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              The Edit
            </p>

            <h2 className="mt-3 text-3xl font-light tracking-tight">
              Featured Pieces
            </h2>
          </div>

          <Link
            to="/shop"
            className="hidden text-sm font-medium text-black underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-black sm:block"
          >
            View All
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <Link
          to="/shop"
          className="mt-8 block text-center text-sm font-medium text-black underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-black sm:hidden"
        >
          View All
        </Link>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
            FAQ
          </p>

          <h2 className="mt-4 text-3xl font-light tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-12 divide-y divide-gray-200 border-y border-gray-200">
          <div className="py-6">
            <h3 className="font-medium text-gray-900">
              How can I track my order?
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              You can view your order details and current order status from your
              account's orders page.
            </p>
          </div>

          <div className="py-6">
            <h3 className="font-medium text-gray-900">
              Can I cancel my order?
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Orders can be cancelled while they are still eligible for
              cancellation. Once an order has been processed or shipped,
              cancellation may no longer be available.
            </p>
          </div>

          <div className="py-6">
            <h3 className="font-medium text-gray-900">
              What payment methods do you accept?
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              We currently offer Cash on Delivery and a demo card payment
              option.
            </p>
          </div>

          <div className="py-6">
            <h3 className="font-medium text-gray-900">
              How long does delivery take?
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Delivery times can vary depending on your location and order
              processing. Your order status will be updated as it moves through
              the delivery process.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="border-y border-gray-200">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
            Our Philosophy
          </p>

          <h2 className="mt-6 text-3xl font-light tracking-tight leading-relaxed text-gray-900 md:text-4xl">
            Less noise. Better essentials.
            <br />
            Clothing designed to stay.
          </h2>
        </div>
      </section>
    </main>
  );
}

export default Home;
