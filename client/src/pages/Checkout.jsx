import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import API_URL from "../config/api";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, clearCart } = useCart();
  const { token } = useAuth();

  useDocumentTitle("Checkout | LUMÉ");

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    phone: "",
    paymentMethod: "COD",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      const orderItems = cartItems.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        size: item.size,
        quantity: item.quantity,
      }));

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: orderItems,
          shippingAddress: {
            fullName: formData.fullName,
            address: formData.address,
            city: formData.city,
            phone: formData.phone,
          },
          paymentMethod: formData.paymentMethod,
          totalPrice: subtotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      clearCart();

      navigate(`/order-success/${data._id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Checkout
        </p>

        <h1 className="mt-4 text-3xl font-light">Your cart is empty.</h1>

        <p className="mt-4 text-gray-500">
          Add something to your cart before checking out.
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
    <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      {/* Header */}
      <div className="border-b border-gray-200 pb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Secure Checkout
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-light md:text-5xl">Checkout</h1>

            <p className="mt-3 text-sm text-gray-500">
              Complete your details to place your order.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Shipping Information */}
          <section>
            <div className="border-b border-gray-200 pb-5">
              <h2 className="text-xl font-medium">Shipping Information</h2>

              <p className="mt-2 text-sm text-gray-500">
                Where should we deliver your order?
              </p>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="mt-2 w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>

                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="House / Street / Area"
                  className="mt-2 w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="city" className="text-sm font-medium">
                    City
                  </label>

                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Lahore"
                    className="mt-2 w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="03XXXXXXXXX"
                    className="mt-2 w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section>
            <div className="border-b border-gray-200 pb-5">
              <h2 className="text-xl font-medium">Payment Method</h2>

              <p className="mt-2 text-sm text-gray-500">
                Choose how you would like to pay.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <label
                className={`flex cursor-pointer items-center gap-4 border p-5 transition ${
                  formData.paymentMethod === "COD"
                    ? "border-black"
                    : "border-gray-300 hover:border-gray-500"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={formData.paymentMethod === "COD"}
                  onChange={handleChange}
                />

                <div>
                  <p className="font-medium">Cash on Delivery</p>

                  <p className="mt-1 text-sm text-gray-500">
                    Pay when your order arrives.
                  </p>
                </div>
              </label>

              <label
                className={`flex cursor-pointer items-center gap-4 border p-5 transition ${
                  formData.paymentMethod === "Card"
                    ? "border-black"
                    : "border-gray-300 hover:border-gray-500"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Card"
                  checked={formData.paymentMethod === "Card"}
                  onChange={handleChange}
                />

                <div>
                  <p className="font-medium">Card</p>

                  <p className="mt-1 text-sm text-gray-500">
                    Demo payment — no real payment will be processed.
                  </p>
                </div>
              </label>
            </div>
          </section>

          {error && (
            <p className="border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black px-6 py-4 text-sm uppercase tracking-wider text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading
              ? "Placing Order..."
              : `Place Order — Rs. ${subtotal.toLocaleString()}`}
          </button>
        </form>

        {/* Order Summary */}
        <aside className="h-fit border border-gray-200 p-6 lg:sticky lg:top-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">Order Summary</h2>

            <span className="text-sm text-gray-500">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="mt-6 space-y-5">
            {cartItems.map((item) => (
              <div
                key={`${item.product._id}-${item.size}`}
                className="flex gap-4"
              >
                <div className="h-20 w-16 shrink-0 overflow-hidden bg-gray-100">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {item.product.name}
                  </p>

                  {item.size && (
                    <p className="mt-1 text-xs text-gray-500">
                      Size: {item.size}
                    </p>
                  )}

                  <p className="mt-1 text-xs text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="whitespace-nowrap text-sm">
                  Rs. {(item.product.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
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
              Shipping charges and taxes are not calculated in this demo.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;
