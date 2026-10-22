import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { getProducts } from "../api/products";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85";

const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85";

const FAQ_DATA = [
  {
    question: "How can I track my order?",
    answer:
      "You can view your order details and current order status from your account's orders page. We'll also send you email updates at every step.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Orders can be cancelled while they are still eligible for cancellation. Once an order has been processed or shipped, cancellation may no longer be available.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We currently offer Cash on Delivery and a secure demo card payment option for your convenience.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery times can vary depending on your location and order processing. Standard delivery typically takes 3–5 business days. Your order status will be updated as it moves through the delivery process.",
  },
];

function SectionEyebrow({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400 sm:tracking-[0.3em]">
      {children}
    </p>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FAFAFA]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-stone-200/50 blur-3xl sm:h-96 sm:w-96"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-2 md:gap-10 lg:gap-16 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-stone-500 sm:gap-4 sm:tracking-[0.4em]">
            <span className="h-px w-7 shrink-0 bg-stone-300 sm:w-8" />
            New Collection
          </div>

          <h1 className="mt-6 text-5xl font-light leading-[1.08] tracking-tight text-zinc-900 sm:mt-8 sm:text-6xl lg:text-7xl">
            Essential
            <br />
            <span className="font-serif italic text-stone-500">Form.</span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-7 text-stone-600 sm:mt-6 sm:text-base sm:leading-relaxed lg:text-lg">
            Thoughtfully designed pieces for everyday living. Simple
            silhouettes, quality materials, and timeless style that moves with
            you.
          </p>

          <div className="mt-8 sm:mt-10">
            <Link
              to="/shop"
              className="group inline-flex w-full items-center justify-center gap-4 bg-zinc-900 px-6 py-4 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-stone-800 hover:shadow-xl hover:shadow-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 sm:w-fit sm:px-8"
            >
              Shop Collection
              <svg
                aria-hidden="true"
                className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="relative min-w-0 md:order-none">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-bl-[64px] rounded-tr-[64px] bg-stone-200 shadow-xl sm:rounded-bl-[90px] sm:rounded-tr-[90px] lg:aspect-square">
            <img
              src={HERO_IMAGE}
              alt="Contemporary fashion and everyday style"
              width="1200"
              height="1200"
              fetchPriority="high"
              onError={(event) => {
                const image = event.currentTarget;

                if (image.dataset.fallbackAttempted) {
                  image.style.visibility = "hidden";
                  return;
                }

                image.dataset.fallbackAttempted = "true";
                image.src = FALLBACK_HERO_IMAGE;
              }}
              className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts({ products }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex items-end justify-between gap-4 border-b border-stone-100 pb-6">
          <div>
            <SectionEyebrow>The Edit</SectionEyebrow>

            <h2 className="mt-3 text-2xl font-light tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
              Featured Pieces
            </h2>
          </div>

          <Link
            to="/shop"
            className="group hidden shrink-0 flex-col items-center text-sm font-medium text-zinc-900 transition-colors hover:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 sm:flex"
          >
            View All
            <span className="mt-1 h-px w-full origin-left bg-zinc-900 transition-transform duration-300 group-hover:scale-x-0" />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-12 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-stone-500">
            Our featured pieces are currently unavailable. Please visit the shop
            to explore our collection.
          </p>
        )}

        <Link
          to="/shop"
          className="mt-10 block w-full border border-zinc-900 px-5 py-4 text-center text-sm font-medium uppercase tracking-widest text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 sm:hidden"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="bg-stone-50">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20 lg:px-8 lg:py-24">
        <div className="text-center">
          <SectionEyebrow>Assistance</SectionEyebrow>

          <h2 className="mt-4 text-2xl font-light tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 divide-y divide-stone-200 border-t border-stone-200 sm:mt-16">
          {FAQ_DATA.map((faq) => (
            <details key={faq.question} className="group py-5 sm:py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-zinc-900 transition-colors hover:text-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900">
                <span className="text-base font-medium sm:text-lg">
                  {faq.question}
                </span>

                <svg
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <p className="mt-4 pr-2 text-sm leading-7 text-stone-600 sm:pr-8 sm:text-base sm:leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandStatement() {
  return (
    <section className="bg-zinc-900 text-white">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24 lg:px-8 lg:py-32">
        <SectionEyebrow>Our Philosophy</SectionEyebrow>

        <h2 className="mt-7 text-3xl font-light leading-snug tracking-tight sm:mt-8 sm:text-4xl md:text-5xl lg:text-6xl">
          Less noise.
          <br className="sm:hidden" /> Better essentials.
          <br />
          <span className="font-serif italic text-stone-400">
            Clothing designed to stay.
          </span>
        </h2>
      </div>
    </section>
  );
}

function Home() {
  const [products, setProducts] = useState([]);

  useDocumentTitle("Home | LUMÉ");

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const data = await getProducts({ limit: 3 });

        if (isMounted) {
          setProducts(data.products ?? []);
        }
      } catch (error) {
        console.error("Failed to fetch homepage products:", error);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="overflow-hidden selection:bg-stone-200 selection:text-black">
      <Hero />
      <FeaturedProducts products={products} />
      <FAQ />
      <BrandStatement />
    </main>
  );
}

export default Home;
