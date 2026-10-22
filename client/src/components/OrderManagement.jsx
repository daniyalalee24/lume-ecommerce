function OrderManagement({ orders, ordersLoading, onStatusUpdate }) {
  // Helper to style the status dropdown based on its value
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "Cancelled":
        return "text-red-700 bg-red-50 border-red-200";
      case "Shipped":
        return "text-blue-700 bg-blue-50 border-blue-200";
      case "Processing":
        return "text-amber-700 bg-amber-50 border-amber-200";
      default:
        return "text-zinc-700 bg-stone-50 border-stone-200"; // Pending
    }
  };

  return (
    <section className="mt-12 lg:mt-20">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
            Overview
          </p>
          <h2 className="mt-2 text-3xl font-light tracking-tight text-zinc-900">
            Customer Orders
          </h2>
        </div>
        {!ordersLoading && orders.length > 0 && (
          <p className="text-sm font-medium text-stone-500">
            Showing {orders.length} order{orders.length !== 1 && "s"}
          </p>
        )}
      </div>

      {ordersLoading ? (
        /* Skeleton Loading State */
        <div className="mt-8 space-y-6">
          {[1, 2, 3].map((skeleton) => (
            <div
              key={skeleton}
              className="animate-pulse rounded-sm border border-stone-200 bg-white"
            >
              <div className="h-32 border-b border-stone-100 bg-stone-50/50"></div>
              <div className="h-24"></div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        /* Empty State */
        <div className="mt-16 flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-50 text-stone-300">
            <svg
              className="h-10 w-10"
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
          </div>
          <h3 className="mt-6 text-lg font-medium text-zinc-900">
            No orders yet
          </h3>
          <p className="mt-2 text-sm text-stone-500">
            When customers place orders, they will appear here.
          </p>
        </div>
      ) : (
        /* Orders List */
        <div className="mt-8 space-y-8">
          {orders.map((order) => (
            <article
              key={order._id}
              className="overflow-hidden rounded-sm border border-stone-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              {/* Order Metadata (Header) */}
              <div className="grid grid-cols-2 gap-6 border-b border-stone-100 bg-stone-50/50 p-6 lg:grid-cols-4 lg:gap-8">
                <div className="col-span-2 lg:col-span-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    Order Number
                  </p>
                  <p className="mt-2 font-mono text-sm font-medium text-zinc-900">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    Customer
                  </p>
                  <p className="mt-2 text-sm font-medium text-zinc-900 line-clamp-1">
                    {order.user?.name || "Guest User"}
                  </p>
                  <p className="mt-0.5 text-xs text-stone-500 line-clamp-1">
                    {order.user?.email || "No email provided"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    Date Placed
                  </p>
                  <p className="mt-2 text-sm font-medium text-zinc-900">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    Status
                  </p>
                  <div className="relative">
                    <select
                      value={order.status}
                      onChange={(event) =>
                        onStatusUpdate(order._id, event.target.value)
                      }
                      className={`w-full appearance-none rounded-sm border py-2 pl-3 pr-10 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1 cursor-pointer ${getStatusColor(order.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    {/* Custom Dropdown Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-current opacity-60">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-stone-100 px-6">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-5"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-900">
                        {item.name}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-stone-500">
                        {item.size && (
                          <>
                            <span>Size: {item.size}</span>
                            <span className="h-1 w-1 rounded-full bg-stone-300"></span>
                          </>
                        )}
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-zinc-900 sm:text-right">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex flex-col gap-4 border-t border-stone-100 bg-stone-50/30 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    Payment Method
                  </p>
                  <p className="mt-1 text-sm font-medium text-zinc-900 flex items-center gap-2">
                    {order.paymentMethod === "COD" ? (
                      <>
                        <svg
                          className="h-4 w-4 text-stone-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Cash on Delivery
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-4 w-4 text-stone-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        Card Payment
                      </>
                    )}
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    Total Amount
                  </p>
                  <p className="mt-1 text-lg font-semibold text-zinc-900">
                    Rs. {order.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default OrderManagement;
