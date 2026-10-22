import { NavLink, Link } from "react-router-dom";

function AdminNavigation() {
  const linkClasses = ({ isActive }) =>
    `whitespace-nowrap flex items-center border-b-2 px-1 py-4 text-sm font-medium transition-colors duration-300 ${
      isActive
        ? "border-zinc-900 text-zinc-900"
        : "border-transparent text-stone-500 hover:border-stone-300 hover:text-zinc-900"
    }`;

  return (
    <nav
      className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-md"
      aria-label="Admin dashboard navigation"
    >
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row md:items-center md:justify-between px-6">
        {/* Top Row for Mobile (Logo + Mobile Store Link) / Left Column on Desktop */}
        <div className="flex w-full items-center justify-between py-4 md:w-auto md:py-0">
          <Link
            to="/admin"
            className="flex items-center text-xl font-bold tracking-[0.2em] text-zinc-900"
          >
            LUMÉ
            <span className="ml-3 rounded-sm bg-stone-100 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-stone-500">
              ADMIN
            </span>
          </Link>

          {/* View Store - Mobile Only */}
          <Link
            to="/"
            className="flex items-center text-xs font-medium text-stone-500 transition-colors hover:text-zinc-900 md:hidden"
          >
            View Store &rarr;
          </Link>
        </div>

        {/* Navigation Tabs - Scrollable on mobile, Centered on desktop */}
        <div className="flex w-full items-center gap-8 overflow-x-auto pb-[-1px] scrollbar-hide md:w-auto md:justify-center">
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

        {/* View Store - Desktop Only */}
        <div className="hidden md:flex md:w-32 md:justify-end">
          <Link
            to="/"
            className="group flex items-center gap-2 py-4 text-sm font-medium text-stone-500 transition-colors hover:text-zinc-900"
          >
            <span>Store</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavigation;
