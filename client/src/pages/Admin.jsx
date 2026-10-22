import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useDocumentTitle from "../hooks/useDocumentTitle";
import AdminNavigation from "../components/AdminNavigation";
import { getProducts } from "../api/products";
import { getOrders } from "../api/orders";

// Helper for polished status badges
const getStatusStyles = (status) => {
  switch (status?.toLowerCase()) {
    case "delivered":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "cancelled":
      return "bg-red-50 text-red-700 border-red-200";
    case "shipped":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "processing":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-stone-50 text-stone-700 border-stone-200";
  }
};

function Admin() {
  const { token } = useAuth();
  useDocumentTitle("Admin Dashboard | LUMÉ");

  const [productCount, setProductCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchDashboardData = async () => {
      try {
        setError("");
        const [productsData, ordersData] = await Promise.all([
          getProducts({ limit: 100 }),
          getOrders(token),
        ]);
        setProductCount(productsData.products.length);
        setOrders(ordersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <AdminNavigation />

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
            LUMÉ Admin
          </p>
          <h1 className="text-3xl font-light tracking-tight text-zinc-900 md:text-4xl">
            Dashboard
          </h1>
          <p className="text-sm text-stone-500">
            Overview of your store inventory and recent customer orders.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-8 rounded-sm border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {/* Summary Cards */}
        <section className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {[
            {
              label: "Total Products",
              value: productCount,
              desc: "Active items in inventory",
            },
            {
              label: "Total Orders",
              value: orders.length,
              desc: "All-time customer orders",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="group flex flex-col justify-between rounded-sm border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-stone-300 hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
                {stat.label}
              </p>
              {loading ? (
                <div className="mt-4 h-10 w-16 animate-pulse rounded bg-stone-100"></div>
              ) : (
                <p className="mt-3 text-4xl font-light tracking-tight text-zinc-900">
                  {stat.value}
                </p>
              )}
              <p className="mt-4 text-xs text-stone-500">{stat.desc}</p>
            </div>
          ))}
        </section>

        {/* Recent Orders Table */}
        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between border-b border-stone-200 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                Activity
              </p>
              <h2 className="mt-2 text-2xl font-light text-zinc-900">
                Recent Orders
              </h2>
            </div>
            <Link
              to="/admin/orders"
              className="group flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-zinc-900"
            >
              View all
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
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

          <div className="overflow-hidden rounded-sm border border-stone-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-stone-50/80 backdrop-blur">
                  <tr className="border-b border-stone-200 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {loading ? (
                    // Skeleton Rows
                    [...Array(3)].map((_, i) => (
                      <tr key={i}>
                        {[...Array(4)].map((_, j) => (
                          <td key={j} className="px-6 py-5">
                            <div className="h-4 w-24 animate-pulse rounded bg-stone-100"></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : recentOrders.length === 0 ? (
                    // Empty State
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-12 text-center text-stone-500"
                      >
                        No orders have been placed yet.
                      </td>
                    </tr>
                  ) : (
                    // Data Rows
                    recentOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="transition-colors hover:bg-stone-50/60"
                      >
                        <td className="px-6 py-4 font-mono font-medium text-zinc-900">
                          #{order._id.slice(-6).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 text-stone-600">
                          {order.user?.name || "Guest Customer"}
                        </td>
                        <td className="px-6 py-4 font-medium text-zinc-900">
                          Rs.{" "}
                          {Number(order.totalPrice || 0).toLocaleString(
                            undefined,
                            { minimumFractionDigits: 2 },
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-sm border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Admin;
