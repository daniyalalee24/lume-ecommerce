import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

function About() {
  useDocumentTitle("About | LUMÉ");

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-gray-200 bg-stone-100">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            About LUMÉ
          </p>

          <h1 className="mt-6 text-4xl font-light tracking-tight text-gray-900 md:text-6xl">
            Less noise.
            <br />
            Better essentials.
          </h1>

          <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-gray-600">
            LUMÉ is built around the idea that getting dressed should feel
            simple. We focus on timeless pieces, thoughtful details, and
            everyday clothing designed to stay with you.
          </p>
        </div>
      </section>

      {/* Story + Image */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="h-[420px] overflow-hidden bg-gray-200 shadow-sm">
            <img
              src="/images/about_page.webp"
              alt="LUMÉ essentials, thoughtfully designed"
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
              Our Approach
            </p>

            <h2 className="mt-5 text-3xl font-light tracking-tight text-gray-900">
              Designed for everyday life.
            </h2>

            <div className="mt-6 space-y-6 leading-relaxed text-gray-600">
              <p>
                We believe good clothing does not need to shout. The pieces you
                reach for most are often the simplest ones — comfortable,
                versatile, and easy to wear.
              </p>

              <p>
                That's why LUMÉ focuses on clean silhouettes, thoughtful
                materials, and timeless design. Our goal is to create clothing
                that feels just as relevant tomorrow as it does today.
              </p>

              <p>
                Fewer distractions. Better choices. Essentials made to become
                part of your everyday life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
              What We Stand For
            </p>

            <h2 className="mt-4 text-3xl font-light tracking-tight text-gray-900">
              Our values.
            </h2>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
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
            ].map((value, index) => (
              <div key={value.title} className="border-t border-gray-300 pt-6">
                <p className="text-xs font-medium text-gray-400">
                  0{index + 1}
                </p>

                <p className="mt-3 text-sm font-medium text-gray-900">
                  {value.title}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl font-light tracking-tight text-gray-900 md:text-4xl">
            Ready to simplify your wardrobe?
          </h2>

          <p className="mx-auto mt-4 max-w-md text-gray-500">
            Explore the collection and find the essentials worth keeping.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block bg-black px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-all duration-200 hover:bg-gray-800"
          >
            Shop Collection
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;
