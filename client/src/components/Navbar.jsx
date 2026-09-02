import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import { useLocation } from "react-router-dom"; // Import useLocation to get the current route

function Navbar() {
  const location = useLocation();

  // If the URL path starts with "/admin", do not render this navigation bar
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const [menuOpen, setMenuOpen] = useState(false);

  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const [isAccountOpen, setIsAccountOpen] = useState(false); // State for account dropdown menu

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
            <NavLink to="/faq" className={navLinkStyle}>
              FAQ
            </NavLink>
          </div>

          {/* Right: Desktop User Actions & Cart */}
          <div className="flex flex-1 items-center justify-end gap-4 text-sm md:gap-5">
            {user ? (
              <>
                {/* My Orders */}
                <NavLink to="/orders" className={navLinkStyle}>
                  My Orders
                </NavLink>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="flex items-center gap-1 font-medium text-black transition-opacity hover:opacity-70"
                >
                  Cart <span className="text-gray-500">({cartCount})</span>
                </Link>

                {/* Account Dropdown */}
                <div className="relative hidden md:block">
                  <button
                    type="button"
                    onClick={() => setIsAccountOpen((isOpen) => !isOpen)}
                    aria-expanded={isAccountOpen}
                    className="flex items-center gap-2 text-gray-500 transition-colors duration-200 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-4"
                  >
                    <span>Hi, {user.name}</span>

                    <span
                      className={`text-xs transition-transform duration-200 ${
                        isAccountOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      ↓
                    </span>
                  </button>

                  {/* Account Menu */}
                  {isAccountOpen && (
                    <div className="absolute right-0 top-full z-50 mt-4 w-48 border border-gray-200 bg-white py-2 shadow-sm">
                      {user.isAdmin && (
                        <NavLink
                          to="/admin"
                          onClick={() => setIsAccountOpen(false)}
                          className="block px-4 py-3 text-sm text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-black"
                        >
                          Admin Panel
                        </NavLink>
                      )}

                      {user.isAdmin && (
                        <div className="my-1 border-t border-gray-100" />
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setIsAccountOpen(false);
                          logout();
                        }}
                        className="block w-full px-4 py-3 text-left text-sm text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-black"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden text-gray-500 transition-colors duration-200 hover:text-black md:block"
              >
                Login
              </Link>
            )}

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

            <NavLink to="/faq" onClick={closeMenu} className={navLinkStyle}>
              FAQ
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
                    My Orders
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
