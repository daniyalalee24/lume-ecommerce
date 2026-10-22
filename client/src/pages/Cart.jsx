import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

function Cart() {
  useDocumentTitle("My Cart | LUMÉ");
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Combine calculations into a single pass for cleaner code and better performance
  const { subtotal, totalItems } = cartItems.reduce(
    (acc, item) => ({
      subtotal: acc.subtotal + item.product.price * item.quantity,
      totalItems: acc.totalItems + item.quantity,
    }),
    { subtotal: 0, totalItems: 0 },
  );

  // Empty State
  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
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
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
          Your Bag
        </p>
        <h1 className="mt-4 text-3xl font-light text-zinc-900">
          Your cart is empty.
        </h1>
        <p className="mt-4 text-stone-500">
          Discover something you'll want to keep.
        </p>
        <Link
          to="/shop"
          className="mt-8 bg-zinc-900 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-stone-800"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  // Populated Cart State
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-24">
      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-16">
        {/* Left Column: Cart Items */}
        <section className="lg:col-span-7">
          <div className="border-b border-stone-200 pb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Your Bag
              </p>
              <h1 className="mt-2 text-3xl font-light tracking-tight text-zinc-900 md:text-4xl">
                Shopping Cart
              </h1>
            </div>
            <p className="text-sm font-medium text-stone-500">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>

          <div className="divide-y divide-stone-200">
            {cartItems.map((item) => (
              <div
                key={`${item.product._id}-${item.size}`}
                className="flex gap-6 py-8"
              >
                {/* Image */}
                <Link
                  to={`/products/${item.product._id}`}
                  className="aspect-[3/4] w-24 shrink-0 overflow-hidden bg-stone-100 sm:w-32"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover object-center transition duration-500 hover:scale-105"
                  />
                </Link>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex flex-col justify-between sm:flex-row sm:gap-4">
                    <div>
                      <Link
                        to={`/products/${item.product._id}`}
                        className="font-medium text-zinc-900 transition-colors hover:text-stone-500"
                      >
                        {item.product.name}
                      </Link>
                      {item.size && (
                        <p className="mt-1 text-sm text-stone-500">
                          Size: {item.size}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-stone-500">
                        Rs. {item.product.price.toLocaleString()} each
                      </p>
                    </div>
                    <p className="mt-2 text-sm font-medium text-zinc-900 sm:mt-0">
                      Rs.{" "}
                      {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="mt-4 flex items-end justify-between sm:mt-auto">
                    <div className="flex items-center border border-stone-300 bg-white">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.size,
                            item.quantity - 1,
                          )
                        }
                        className="px-3 py-1.5 text-stone-500 transition-colors hover:bg-stone-50 hover:text-zinc-900"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-zinc-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.size,
                            item.quantity + 1,
                          )
                        }
                        className="px-3 py-1.5 text-stone-500 transition-colors hover:bg-stone-50 hover:text-zinc-900"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(item.product._id, item.size)
                      }
                      className="text-xs font-bold uppercase tracking-widest text-stone-400 transition-colors hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Order Summary (Sticky on Desktop) */}
        <section className="mt-16 rounded-sm bg-stone-50 px-6 py-8 lg:sticky lg:top-32 lg:col-span-5 lg:mt-0 lg:p-10">
          <h2 className="text-lg font-medium text-zinc-900">Order Summary</h2>

          <div className="mt-6 space-y-4 text-sm text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-zinc-900">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-4">
              <span className="text-base font-medium text-zinc-900">Total</span>
              <span className="text-xl font-medium text-zinc-900">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-stone-500">
            Shipping and taxes are calculated at checkout. (Not calculated in
            this demo project).
          </p>

          <Link
            to="/checkout"
            className="mt-8 flex w-full items-center justify-center bg-zinc-900 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-stone-800"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/shop"
            className="mt-4 flex w-full items-center justify-center py-4 text-sm font-medium text-stone-500 transition-colors hover:text-zinc-900"
          >
            Continue Shopping
          </Link>
        </section>
      </div>
    </main>
  );
}

export default Cart;
