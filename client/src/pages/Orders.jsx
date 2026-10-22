import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useAuth } from "../context/AuthContext";
import API_URL from "../config/api";

// Extracted helper for cleaner component logic
const getStatusBadge = (status) => {
  const base =
    "mt-2 inline-flex rounded-sm border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider";
  switch (status?.toLowerCase()) {
    case "delivered":
      return `${base} bg-emerald-50 text-emerald-700 border-emerald-200`;
    case "shipped":
      return `${base} bg-blue-50 text-blue-700 border-blue-200`;
    case "cancelled":
      return `${base} bg-red-50 text-red-700 border-red-200`;
    case "processing":
      return `${base} bg-amber-50 text-amber-700 border-amber-200`;
    default:
      return `${base} bg-stone-50 text-stone-700 border-stone-200`;
  }
};

function Orders() {
  const { token } = useAuth();
  useDocumentTitle("Dashboard | LUMÉ");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchOrders();
  }, [token, fetchOrders]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}/cancel`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order,
        ),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-12 lg:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 border-b border-stone-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
              Client Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-light tracking-tight text-zinc-900 md:text-4xl">
              My Orders
            </h1>
            <p className="mt-2 text-sm text-stone-500">
              View and track your previous purchases.
            </p>
          </div>
          {!loading && !error && (
            <span className="rounded-sm bg-stone-200/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-600">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </span>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
            {error}
          </div>
        )}

        {/* Content States */}
        {loading ? (
          // Skeleton Loader
          <div className="space-y-8">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="h-64 w-full animate-pulse rounded-sm border border-stone-200 bg-white"
              >
                <div className="h-24 border-b border-stone-100 bg-stone-50/50"></div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 && !error ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg
              className="mb-6 h-12 w-12 text-stone-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h2 className="text-2xl font-light text-zinc-900">
              No orders yet.
            </h2>
            <p className="mt-2 text-stone-500">
              Looks like you haven't placed an order yet.
            </p>
            <Link
              to="/shop"
              className="mt-8 bg-zinc-900 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-stone-800"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          // Order List
          <div className="space-y-8">
            {orders.map((order) => (
              <article
                key={order._id}
                className="overflow-hidden rounded-sm border border-stone-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="grid grid-cols-2 gap-6 border-b border-stone-100 bg-stone-50/50 p-6 sm:grid-cols-3">
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      Order Number
                    </p>
                    <p className="mt-2 font-mono text-sm font-medium text-zinc-900">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      Date Placed
                    </p>
                    <p className="mt-2 text-sm text-zinc-900">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      Status
                    </p>
                    <span className={getStatusBadge(order.status)}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-stone-100 px-6">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-6 py-5"
                    >
                      <div>
                        <p className="font-medium text-zinc-900">{item.name}</p>
                        <p className="mt-1 flex items-center gap-2 text-xs text-stone-500">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.size && (
                            <span className="h-1 w-1 rounded-full bg-stone-300" />
                          )}
                          <span>Qty: {item.quantity}</span>
                        </p>
                      </div>
                      <p className="whitespace-nowrap text-sm font-medium text-zinc-900">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4 border-t border-stone-100 bg-stone-50/30 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      Payment Method
                    </p>
                    <p className="mt-1 text-sm font-medium text-zinc-900">
                      {order.paymentMethod === "COD"
                        ? "Cash on Delivery"
                        : "Card Payment"}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                    <div className="sm:text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                        Total Amount
                      </p>
                      <p className="mt-1 text-lg font-semibold text-zinc-900">
                        Rs. {order.totalPrice.toLocaleString()}
                      </p>
                    </div>
                    {["Pending", "Processing"].includes(order.status) && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="rounded-sm border border-red-200 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-red-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-700 focus:outline-none"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Orders;
