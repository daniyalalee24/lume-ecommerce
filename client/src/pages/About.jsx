import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

// Extracted static data outside the component for cleaner JSX and better performance
const CORE_VALUES = [
  {
    title: "Timeless Design",
    desc: "Pieces designed beyond short-lived trends and seasonal noise.",
  },
  {
    title: "Everyday Comfort",
    desc: "Clothing made to move with you through everyday moments.",
  },
  {
    title: "Thoughtful Choices",
    desc: "A simpler approach to building a wardrobe you actually enjoy wearing.",
  },
];

function About() {
  useDocumentTitle("About | LUMÉ");

  return (
    <main className="overflow-hidden selection:bg-stone-200 selection:text-black">
      {/* Hero */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32 lg:py-40">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-stone-400">
            About LUMÉ
          </p>

          <h1 className="mt-8 text-5xl font-light leading-[1.1] tracking-tight text-zinc-900 md:text-6xl lg:text-7xl">
            Less noise.
            <br />
            <span className="font-serif italic text-stone-500">
              Better essentials.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-stone-600 md:text-lg">
            LUMÉ is built around the idea that getting dressed should feel
            simple. We focus on timeless pieces, thoughtful details, and
            everyday clothing designed to stay with you.
          </p>
        </div>
      </section>

      {/* Story + Image */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
            {/* Image container with premium aspect ratio and hover effect */}
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-stone-100 lg:order-last">
              <img
                src="/images/about_page.webp"
                alt="LUMÉ essentials, thoughtfully designed"
                className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 transition-opacity duration-1000 group-hover:opacity-0" />
            </div>

            {/* Story Text */}
            <div className="flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-stone-400">
                Our Approach
              </p>

              <h2 className="mt-6 text-3xl font-light tracking-tight text-zinc-900 md:text-4xl">
                Designed for everyday life.
              </h2>

              <div className="mt-8 space-y-6 text-base leading-relaxed text-stone-600">
                <p>
                  We believe good clothing does not need to shout. The pieces
                  you reach for most are often the simplest ones — comfortable,
                  versatile, and easy to wear.
                </p>
                <p>
                  That's why LUMÉ focuses on clean silhouettes, thoughtful
                  materials, and timeless design. Our goal is to create clothing
                  that feels just as relevant tomorrow as it does today.
                </p>
                <p className="font-medium text-zinc-900">
                  Fewer distractions. Better choices. Essentials made to become
                  part of your everyday life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-stone-200 bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-stone-400">
              What We Stand For
            </p>
            <h2 className="mt-6 text-3xl font-light tracking-tight text-zinc-900 md:text-4xl">
              Our values.
            </h2>
          </div>

          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
            {CORE_VALUES.map((value, index) => (
              <div
                key={value.title}
                className="group border-t border-stone-300 pt-8 transition-colors hover:border-zinc-900"
              >
                <p className="text-xs font-bold text-stone-400 transition-colors group-hover:text-zinc-900">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-lg font-medium text-zinc-900">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
          <h2 className="text-3xl font-light tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">
            Ready to simplify your wardrobe?
          </h2>

          <p className="mx-auto mt-6 max-w-md text-base text-stone-500">
            Explore the collection and find the essentials worth keeping.
          </p>

          <Link
            to="/shop"
            className="group relative mt-10 inline-flex items-center gap-4 bg-zinc-900 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-stone-800 hover:shadow-xl hover:shadow-stone-200"
          >
            Shop Collection
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2"
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
      </section>
    </main>
  );
}

export default About;
