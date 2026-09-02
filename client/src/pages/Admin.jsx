import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

import AdminNavigation from "../components/AdminNavigation";

import { getProducts } from "../api/products";
import { getOrders } from "../api/orders";

function Admin() {
  const { token } = useAuth();

  useDocumentTitle("Admin Dashboard | LUMÉ");

  const [productCount, setProductCount] = useState(0);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setError("");

      const [productsData, ordersData] = await Promise.all([
        getProducts({ limit: 100 }),
        getOrders(token),
      ]);

      setProductCount(productsData.products.length);
      setOrders(ordersData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  // Show only the most recent 5 orders
  const recentOrders = orders.slice(0, 5);

  return (
    <>
      <AdminNavigation />
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {/* Header */}
        <div className="border-b border-gray-200 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
            LUMÉ Admin
          </p>

          <div className="mt-4">
            <h1 className="text-3xl font-light tracking-tight text-gray-900 md:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Overview of your store and recent customer orders.
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-sm border border-red-100 bg-red-50 p-4">
            <p className="text-center text-sm font-medium text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Summary Cards */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="border border-gray-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Products
            </p>

            <p className="mt-3 text-3xl font-light text-gray-900">
              {loading ? "—" : productCount}
            </p>

            <p className="mt-1 text-sm text-gray-500">Products in your store</p>
          </div>

          <div className="border border-gray-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Orders
            </p>

            <p className="mt-3 text-3xl font-light text-gray-900">
              {loading ? "—" : orders.length}
            </p>

            <p className="mt-1 text-sm text-gray-500">Customer orders</p>
          </div>
        </section>

        {/* Recent Orders */}
        <section className="mt-12">
          <div className="flex items-end justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Orders
              </p>

              <h2 className="mt-2 text-2xl font-light text-gray-900">
                Recent Orders
              </h2>
            </div>

            <a
              href="/admin/orders"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              View all
            </a>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-gray-500">
              Loading orders...
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-500">
              No orders yet.
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto border border-gray-200">
              <table className="w-full min-w-[650px] text-left">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Order
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Total
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">
                        #{order._id.slice(-6).toUpperCase()}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {order.user?.name || "Customer"}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        Rs. {Number(order.totalPrice || 0).toFixed(2)}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Admin;
