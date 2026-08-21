import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Your Bag
        </p>

        <h1 className="mt-4 text-3xl font-light">Your cart is empty.</h1>

        <p className="mt-4 text-gray-500">
          Discover something you'll want to keep.
        </p>

        <Link
          to="/shop"
          className="mt-8 inline-block bg-black px-8 py-4 text-sm uppercase tracking-wider text-white transition hover:bg-gray-800"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      {/* Header */}
      <div className="border-b border-gray-200 pb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Your Bag
        </p>

        <div className="mt-4 flex items-end justify-between">
          <h1 className="text-4xl font-light md:text-5xl">Shopping Cart</h1>

          <p className="text-sm text-gray-500">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <div
            key={`${item.product._id}-${item.size}`}
            className="flex gap-5 py-8 sm:gap-8"
          >
            {/* Product Image */}
            <Link
              to={`/products/${item.product._id}`}
              className="h-32 w-24 shrink-0 overflow-hidden bg-gray-100 sm:h-40 sm:w-28"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </Link>

            {/* Product Details */}
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex justify-between gap-4">
                <div>
                  <Link
                    to={`/products/${item.product._id}`}
                    className="font-medium hover:underline"
                  >
                    {item.product.name}
                  </Link>

                  {item.size && (
                    <p className="mt-1 text-sm text-gray-500">
                      Size: {item.size}
                    </p>
                  )}

                  <p className="mt-2 text-sm text-gray-500">
                    Rs. {item.product.price.toLocaleString()} each
                  </p>
                </div>

                {/* Item Total */}
                <p className="whitespace-nowrap text-sm font-medium">
                  Rs. {(item.product.price * item.quantity).toLocaleString()}
                </p>
              </div>

              {/* Controls */}
              <div className="mt-auto flex items-end justify-between pt-6">
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product._id,
                        item.size,
                        item.quantity - 1,
                      )
                    }
                    className="px-4 py-2 text-lg transition hover:bg-gray-100"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span className="min-w-10 text-center text-sm">
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
                    className="px-4 py-2 text-lg transition hover:bg-gray-100"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.product._id, item.size)}
                  className="text-xs uppercase tracking-wider text-gray-500 transition hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-10 border-t border-gray-200 pt-8">
        <div className="ml-auto max-w-md">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>

          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">
            <span className="text-lg">Total</span>
            <span className="text-xl font-medium">
              Rs. {subtotal.toLocaleString()}
            </span>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-gray-500">
            Shipping and taxes are not calculated in this demo project.
          </p>

          <Link
            to="/checkout"
            className="mt-6 block bg-black px-8 py-4 text-center text-sm uppercase tracking-wider text-white transition hover:bg-gray-800"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/shop"
            className="mt-5 block text-center text-sm text-gray-500 underline hover:text-black"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Cart;
