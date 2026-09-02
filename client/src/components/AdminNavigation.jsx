import { NavLink, Link } from "react-router-dom";

function AdminNavigation() {
  const linkClasses = ({ isActive }) =>
    `whitespace-nowrap flex items-center border-b-2 py-4 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "border-stone-900 text-stone-900"
        : "border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-900"
    }`;

  return (
    <nav className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* 1. Left: Logo */}
        <Link
          to="/"
          className="flex items-center text-2xl font-semibold tracking-[0.2em] text-black"
        >
          LUMÉ
        </Link>

        {/* 2. Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/admin" end className={linkClasses}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/products" className={linkClasses}>
            Products
          </NavLink>

          <NavLink to="/admin/orders" className={linkClasses}>
            Orders
          </NavLink>
        </div>

        {/* 3. Right: View Store Link */}
        <NavLink
          to="/"
          className="flex items-center whitespace-nowrap border-b-2 border-transparent py-4 text-sm font-medium text-stone-400 transition-all duration-200 hover:text-stone-900"
        >
          View Store &rarr;
        </NavLink>
      </div>
    </nav>
  );
}

export default AdminNavigation;
