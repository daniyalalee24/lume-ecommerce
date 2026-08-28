// admin order management UI
function OrderManagement({ orders, ordersLoading, onStatusUpdate }) {
  return (
    <section className="mt-20">
      <div className="flex items-end justify-between border-b border-gray-200 pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Orders
          </p>

          <h2 className="mt-2 text-2xl font-light tracking-tight text-gray-900">
            Customer Orders
          </h2>
        </div>
      </div>

      {ordersLoading ? (
        <p className="mt-8 animate-pulse text-sm font-medium text-gray-400">
          Loading orders...
        </p>
      ) : orders.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-500">No orders have been placed yet.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {orders.map((order) => (
            <article
              key={order._id}
              className="overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm"
            >
              {/* Order Header */}
              <div className="grid gap-6 border-b border-gray-200 bg-gray-50 p-6 sm:grid-cols-2 lg:grid-cols-4">
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
                    Customer
                  </p>

                  <p className="mt-2 text-sm font-medium text-gray-900">
                    {order.user?.name || "Guest User"}
                  </p>

                  <p className="mt-1 break-all text-xs text-gray-500">
                    {order.user?.email || "No email provided"}
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
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Order Status
                  </p>

                  <select
                    value={order.status}
                    onChange={(event) =>
                      onStatusUpdate(order._id, event.target.value)
                    }
                    className="w-full cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:border-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-gray-100 px-6">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-6 py-5"
                  >
                    <div>
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

              {/* Order Footer */}
              <div className="flex flex-col gap-6 border-t border-gray-200 bg-gray-50 p-6 sm:flex-row sm:items-end sm:justify-between">
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

                <div className="sm:text-right">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Order Total
                  </p>

                  <p className="mt-1 text-lg font-medium text-gray-900">
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
