import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  // Helper function for consistent link styling
  const navLinkStyle = ({ isActive }) =>
    `transition-colors duration-200 hover:text-black ${
      isActive ? "font-medium text-black" : "text-gray-500"
    }`;

  // Close mobile menu after clicking a link
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl font-semibold tracking-[0.2em] text-black"
          >
            LUMÉ
          </Link>

          {/* Desktop: Main Navigation */}
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

          {/* Right: Desktop User Actions & Cart */}
          <div className="flex flex-1 items-center justify-end gap-4 text-sm md:gap-5">
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

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center gap-1 font-medium text-black transition-opacity hover:opacity-70"
            >
              Cart <span className="text-gray-500">({cartCount})</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-1 flex flex-col gap-1.5 md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`block h-0.5 w-6 bg-black transition-transform duration-200 ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              ></span>

              <span
                className={`block h-0.5 w-6 bg-black transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              ></span>

              <span
                className={`block h-0.5 w-6 bg-black transition-transform duration-200 ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="flex flex-col gap-5 border-t border-gray-200 pt-5 mt-5 text-sm md:hidden">
            {/* Main Navigation */}
            <NavLink to="/" onClick={closeMenu} className={navLinkStyle}>
              Home
            </NavLink>

            <NavLink to="/about" onClick={closeMenu} className={navLinkStyle}>
              About
            </NavLink>

            <NavLink to="/shop" onClick={closeMenu} className={navLinkStyle}>
              Shop
            </NavLink>

            {/* User Navigation */}
            <div className="border-t border-gray-100 pt-5">
              {user ? (
                <div className="flex flex-col gap-5">
                  <span className="text-gray-400">Hi, {user.name}</span>

                  {user.isAdmin && (
                    <NavLink
                      to="/admin"
                      onClick={closeMenu}
                      className={navLinkStyle}
                    >
                      Admin Panel
                    </NavLink>
                  )}

                  <NavLink
                    to="/orders"
                    onClick={closeMenu}
                    className={navLinkStyle}
                  >
                    My Dashboard
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="w-fit text-left text-gray-500 transition-colors duration-200 hover:text-black"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="text-gray-500 transition-colors duration-200 hover:text-black"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
