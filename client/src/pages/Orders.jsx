// Client Dashboard
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API_URL from "../config/api";

function Orders() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/api/orders/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  const handleCancelOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}/cancel`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Update the order in the UI without refreshing the page
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order,
        ),
      );
    } catch (error) {
      setError(error.message);
    }
  };

  // Helper function for dynamic status badge colors
  const getStatusBadge = (status) => {
    const baseClasses =
      "mt-2 inline-block rounded-sm px-3 py-1 text-xs font-medium tracking-wide";
    switch (status.toLowerCase()) {
      case "delivered":
      case "shipped":
        return `${baseClasses} bg-green-50 text-green-700 border border-green-200`;
      case "cancelled":
        return `${baseClasses} bg-red-50 text-red-700 border border-red-100`;
      default: // Pending, Processing
        return `${baseClasses} bg-stone-100 text-stone-700 border border-stone-200`;
    }
  };

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-6 py-20">
        <p className="text-sm font-medium uppercase tracking-widest text-gray-400 animate-pulse">
          Loading your collection...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-5xl px-6 py-20">
        <div className="rounded-sm border border-red-100 bg-red-50 p-6 text-center">
          <p className="text-sm font-medium text-red-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      {/* Header */}
      <div className="border-b border-gray-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
          Client Dashboard
        </p>

        <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-gray-900 md:text-4xl">
              My Orders
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              View and track your previous purchases.
            </p>
          </div>

          <p className="whitespace-nowrap rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-600">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <h2 className="text-2xl font-light tracking-tight text-gray-900">
            No orders yet.
          </h2>
          <p className="mt-3 text-gray-500">
            Looks like you haven't placed an order yet. Let's fix that.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block bg-black px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 space-y-8">
          {orders.map((order) => (
            <article
              key={order._id}
              className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Order Header */}
              <div className="grid gap-6 border-b border-gray-200 bg-gray-50 p-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Order Number
                  </p>
                  <p className="mt-2 break-all font-mono text-sm text-gray-900">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Date Placed
                  </p>
                  <p className="mt-2 text-sm text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </p>
                  <span className={getStatusBadge(order.status)}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-100 px-6">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-6 py-6"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.size && `Size: ${item.size} • `}
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-sm font-medium text-gray-900">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex flex-col gap-5 border-t border-gray-200 bg-gray-50 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Payment Method
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {order.paymentMethod === "COD"
                      ? "Cash on Delivery"
                      : "Card (Demo)"}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
                  <div className="text-left sm:text-right">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Total Amount
                    </p>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      Rs. {order.totalPrice.toLocaleString()}
                    </p>
                  </div>

                  {/* Only allow cancellation before shipping */}
                  {["Pending", "Processing"].includes(order.status) && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="whitespace-nowrap rounded-sm border border-red-200 bg-white px-5 py-2.5 text-sm font-medium text-red-600 transition-colors duration-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
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
    </main>
  );
}

export default Orders;
