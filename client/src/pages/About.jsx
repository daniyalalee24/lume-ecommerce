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

      {/* Story */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
              Our Approach
            </p>

            <h2 className="mt-5 text-3xl font-light tracking-tight text-gray-900">
              Designed for everyday life.
            </h2>
          </div>

          <div className="space-y-6 leading-relaxed text-gray-600">
            <p>
              We believe good clothing does not need to shout. The pieces you
              reach for most are often the simplest ones - comfortable,
              versatile, and easy to wear.
            </p>

            <p>
              That's why LUMÉ focuses on clean silhouettes, thoughtful
              materials, and timeless design. Our goal is to create clothing
              that feels just as relevant tomorrow as it does today.
            </p>

            <p>
              Fewer distractions. Better choices. Essentials made to become part
              of your everyday life.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Timeless Design
              </p>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Pieces designed beyond short-lived trends and seasonal noise.
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                Everyday Comfort
              </p>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Clothing made to move with you through everyday moments.
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                Thoughtful Choices
              </p>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                A simpler approach to building a wardrobe you actually enjoy
                wearing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
