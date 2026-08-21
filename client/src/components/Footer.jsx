import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-xl font-light tracking-[0.2em] text-gray-900"
            >
              LUMÉ
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-500">
              Thoughtfully designed essentials for everyday living. Simple
              silhouettes, quality materials, timeless style.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-gray-600">
              <Link to="/" className="transition-colors hover:text-black">
                Home
              </Link>

              <Link to="/shop" className="transition-colors hover:text-black">
                Shop
              </Link>

              <Link to="/about" className="transition-colors hover:text-black">
                About
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Account
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-gray-600">
              <Link to="/cart" className="transition-colors hover:text-black">
                Cart
              </Link>

              <Link to="/orders" className="transition-colors hover:text-black">
                My Orders
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-gray-200 pt-6 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LUMÉ. All rights reserved.</p>

          <p>
            Designed & Built by{" "}
            <span className="font-medium text-gray-600">Daniyal Ali</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
