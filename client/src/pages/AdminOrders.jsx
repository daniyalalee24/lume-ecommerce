import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

import OrderManagement from "../components/OrderManagement";
import AdminNavigation from "../components/AdminNavigation";

import { getOrders, updateOrderStatus } from "../api/orders";

function AdminOrders() {
  const { token } = useAuth();

  useDocumentTitle("Orders | LUMÉ Admin");

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setError("");

      const data = await getOrders(token);

      setOrders(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Update order status
  const handleOrderStatusUpdate = async (orderId, status) => {
    setError("");

    try {
      await updateOrderStatus(token, orderId, status);

      await fetchOrders();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <AdminNavigation />
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {/* Header */}
        <div className="border-b border-gray-200 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
            LUMÉ Admin
          </p>

          <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-light tracking-tight text-gray-900 md:text-4xl">
                Orders
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                View and manage customer orders.
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-600">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </span>
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

        {/* Order Management */}
        <OrderManagement
          orders={orders}
          ordersLoading={ordersLoading}
          onStatusUpdate={handleOrderStatusUpdate}
        />
      </main>
    </>
  );
}

export default AdminOrders;
