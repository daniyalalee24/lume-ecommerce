import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import useDocumentTitle from "../hooks/useDocumentTitle";
import AdminNavigation from "../components/AdminNavigation";
import OrderManagement from "../components/OrderManagement";
import { getOrders, updateOrderStatus } from "../api/orders";

function AdminOrders() {
  const { token } = useAuth();
  useDocumentTitle("Orders | LUMÉ Admin");

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      setError("");
      const data = await getOrders(token);
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setOrdersLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchOrders();
  }, [token, fetchOrders]);

  const handleOrderStatusUpdate = async (orderId, status) => {
    try {
      setError("");
      await updateOrderStatus(token, orderId, status);
      await fetchOrders(); // Refresh the list after successful update
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <AdminNavigation />

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Header Section */}
        <div className="mb-10 flex flex-col gap-4 border-b border-stone-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
              LUMÉ Admin
            </p>
            <h1 className="text-3xl font-light tracking-tight text-zinc-900 md:text-4xl">
              Order Management
            </h1>
            <p className="text-sm text-stone-500">
              View, track, and update customer order statuses.
            </p>
          </div>

          {/* Dynamic Order Count Badge */}
          {!ordersLoading && (
            <div className="flex items-center">
              <span className="rounded-sm bg-stone-200/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-600">
                {orders.length} Total {orders.length === 1 ? "Order" : "Orders"}
              </span>
            </div>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-8 rounded-sm border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {/* Orders UI (Using the previously polished OrderManagement component) */}
        <div className="-mt-8 lg:-mt-12">
          <OrderManagement
            orders={orders}
            ordersLoading={ordersLoading}
            onStatusUpdate={handleOrderStatusUpdate}
          />
        </div>
      </main>
    </div>
  );
}

export default AdminOrders;
