import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Shop", to: "/shop" },
  { label: "FAQ", to: "/faq" },
];

const desktopLink = ({ isActive }) =>
  `relative py-2 text-sm transition-colors ${
    isActive ? "text-zinc-900" : "text-stone-500 hover:text-zinc-900"
  }`;

const mobileLink = ({ isActive }) =>
  `border-b border-stone-100 py-4 text-lg ${
    isActive ? "text-zinc-900" : "text-stone-500"
  }`;

function Navbar() {
  const location = useLocation();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setAccountOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  if (location.pathname.startsWith("/admin")) return null;

  const closeMenus = () => {
    setMenuOpen(false);
    setAccountOpen(false);
  };

  const handleLogout = () => {
    closeMenus();
    logout();
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="relative border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:h-[76px] sm:px-6 lg:px-8">
          <Link
            to="/"
            onClick={closeMenus}
            className="shrink-0 text-xl font-bold tracking-[0.16em] text-zinc-900 sm:text-2xl sm:tracking-[0.2em]"
          >
            LUMÉ
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={desktopLink}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            {/* Desktop account */}
            <div className="relative hidden md:block">
              {user ? (
                <>
                  <button
                    type="button"
                    onClick={() => setAccountOpen((open) => !open)}
                    aria-expanded={accountOpen}
                    className="flex max-w-40 items-center gap-2 text-sm text-stone-600 hover:text-zinc-900"
                  >
                    <span className="truncate">Hi, {user.name}</span>
                    <span aria-hidden="true">{accountOpen ? "⌃" : "⌄"}</span>
                  </button>

                  {accountOpen && (
                    <div className="absolute right-0 top-full z-50 mt-3 w-48 border border-stone-200 bg-white py-2 shadow-lg">
                      {user.isAdmin && (
                        <Link
                          to="/admin"
                          onClick={closeMenus}
                          className="block px-4 py-3 text-sm hover:bg-stone-50"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        to="/orders"
                        onClick={closeMenus}
                        className="block px-4 py-3 text-sm hover:bg-stone-50"
                      >
                        My Orders
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-stone-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-sm text-stone-600 hover:text-zinc-900"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              onClick={closeMenus}
              aria-label={`Shopping cart, ${cartCount} items`}
              className="relative flex h-10 w-10 items-center justify-center text-stone-700 hover:text-zinc-900"
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>

              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span
                className={`h-px w-5 bg-zinc-900 transition-transform ${
                  menuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-zinc-900 transition-opacity ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-zinc-900 transition-transform ${
                  menuOpen ? "-translate-y-[9px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu: solid, full-height panel below the header */}
        <div
          id="mobile-menu"
          aria-hidden={!menuOpen}
          className={`absolute inset-x-0 top-full z-50 h-[calc(100dvh-68px)] overflow-y-auto overscroll-contain border-t border-stone-100 bg-white px-5 pb-8 pt-5 md:hidden sm:h-[calc(100dvh-76px)] sm:px-8 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="mx-auto flex min-h-full max-w-lg flex-col">
            <div className="flex flex-col">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeMenus}
                  className={mobileLink}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-auto border-t border-stone-200 pt-6">
              {user ? (
                <>
                  <p className="mb-3 break-words text-xs font-semibold uppercase tracking-widest text-stone-400">
                    Account — {user.name}
                  </p>

                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={closeMenus}
                      className="block py-3 text-stone-600"
                    >
                      Admin Panel
                    </Link>
                  )}

                  <Link
                    to="/orders"
                    onClick={closeMenus}
                    className="block py-3 text-stone-600"
                  >
                    My Orders
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block py-3 text-stone-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenus}
                  className="block w-full bg-zinc-900 px-6 py-4 text-center text-sm font-medium uppercase tracking-widest text-white hover:bg-stone-800"
                >
                  Log In or Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
