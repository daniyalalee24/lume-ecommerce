import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  // Helper function for consistent link styling
  const navLinkStyle = ({ isActive }) =>
    `transition-colors duration-200 hover:text-black ${
      isActive ? "font-medium text-black" : "text-gray-500"
    }`;

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Left: Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold tracking-[0.2em] text-black"
        >
          LUMÉ
        </Link>

        {/* Center: Main Navigation */}
        <div className="hidden flex-1 items-center justify-center gap-8 text-sm md:flex">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>

          <NavLink to="/shop" className={navLinkStyle}>
            Shop
          </NavLink>
        </div>

        {/* Right: User Actions & Cart */}
        <div className="flex flex-1 items-center justify-end gap-5 text-sm">
          {user ? (
            <div className="hidden items-center gap-5 md:flex">
              <span className="text-gray-400">Hi, {user.name}</span>

              {user.isAdmin && (
                <NavLink to="/admin" className={navLinkStyle}>
                  Admin Panel
                </NavLink>
              )}

              <NavLink to="/orders" className={navLinkStyle}>
                My Dashboard
              </NavLink>

              <button
                onClick={logout}
                className="text-gray-500 transition-colors duration-200 hover:text-black focus:outline-none"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden text-gray-500 transition-colors duration-200 hover:text-black md:block"
            >
              Login
            </Link>
          )}

          {/* Cart is always visible, even on mobile */}
          <Link
            to="/cart"
            className="flex items-center gap-1 font-medium text-black transition-opacity hover:opacity-70"
          >
            Cart <span className="text-gray-500">({cartCount})</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
