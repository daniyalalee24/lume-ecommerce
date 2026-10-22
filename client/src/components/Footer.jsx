import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand & Newsletter (Takes up 2 columns on large screens) */}
          <div className="sm:col-span-2 lg:col-span-2 lg:pr-12">
            <Link
              to="/"
              className="text-2xl font-bold tracking-[0.2em] text-zinc-900"
            >
              LUMÉ
            </Link>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-stone-500">
              Thoughtfully designed essentials for everyday living. Simple
              silhouettes, quality materials, and timeless style that moves with
              you.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900">
              Explore
            </h3>

            <ul className="mt-6 space-y-4">
              {["Home", "Shop", "About", "FAQ"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm text-stone-500 transition-colors duration-200 hover:text-zinc-900"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900">
              Account
            </h3>

            <ul className="mt-6 space-y-4">
              {[
                { name: "Cart", path: "/cart" },
                { name: "My Orders", path: "/orders" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-stone-500 transition-colors duration-200 hover:text-zinc-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-stone-200 pt-8 sm:flex-row">
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} LUMÉ. All rights reserved.
          </p>

          <p className="text-xs text-stone-400">
            Designed & Built by{" "}
            <a
              href="#"
              className="font-medium text-stone-500 transition-colors hover:text-zinc-900"
            >
              Daniyal Ali
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
