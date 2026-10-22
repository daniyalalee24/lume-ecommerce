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

  // Combine calculations into a single pass
  const { subtotal, totalItems } = cartItems.reduce(
    (acc, item) => ({
      subtotal: acc.subtotal + item.product.price * item.quantity,
      totalItems: acc.totalItems + item.quantity,
    }),
    { subtotal: 0, totalItems: 0 },
  );

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return navigate("/login");
    if (cartItems.length === 0) return;

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
      if (!response.ok) throw new Error(data.message);

      clearCart();
      navigate(`/order-success/${data._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reusable input styling
  const inputStyles =
    "mt-2 w-full appearance-none rounded-sm border border-stone-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-stone-400 transition-all duration-200 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900";

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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
          Checkout
        </p>
        <h1 className="mt-4 text-3xl font-light text-zinc-900">
          Your cart is empty.
        </h1>
        <p className="mt-4 text-stone-500">
          Add something to your cart before checking out.
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

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-24">
      {/* Header */}
      <div className="border-b border-stone-200 pb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
            Secure Checkout
          </p>
          <h1 className="mt-2 text-3xl font-light tracking-tight text-zinc-900 md:text-4xl">
            Checkout
          </h1>
        </div>
        <p className="text-sm font-medium text-stone-500">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="mt-12 flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-start lg:gap-16">
        {/* Checkout Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-12 lg:mt-0 lg:col-span-7"
        >
          {/* Shipping Information */}
          <section>
            <h2 className="text-lg font-medium text-zinc-900 border-b border-stone-200 pb-4">
              Shipping Information
            </h2>
            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="text-xs font-bold uppercase tracking-widest text-stone-500"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Jane Doe"
                  className={inputStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="text-xs font-bold uppercase tracking-widest text-stone-500"
                >
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
                  className={inputStyles}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="city"
                    className="text-xs font-bold uppercase tracking-widest text-stone-500"
                  >
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
                    className={inputStyles}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="text-xs font-bold uppercase tracking-widest text-stone-500"
                  >
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
                    className={inputStyles}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <h2 className="text-lg font-medium text-zinc-900 border-b border-stone-200 pb-4">
              Payment Method
            </h2>
            <div className="mt-6 space-y-4">
              {[
                {
                  id: "COD",
                  title: "Cash on Delivery",
                  desc: "Pay when your order arrives.",
                },
                {
                  id: "Card",
                  title: "Card Payment",
                  desc: "Demo payment — no real payment will be processed.",
                },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`group flex cursor-pointer items-start gap-4 rounded-sm border p-5 transition-all duration-200 ${
                    formData.paymentMethod === method.id
                      ? "border-zinc-900 bg-stone-50"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-stone-300 bg-white group-hover:border-zinc-900 mt-0.5">
                    {formData.paymentMethod === method.id && (
                      <div className="h-2.5 w-2.5 rounded-full bg-zinc-900" />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={formData.paymentMethod === method.id}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">
                      {method.title}
                    </p>
                    <p className="mt-1 text-xs text-stone-500">{method.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {error && (
            <div className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center bg-zinc-900 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Processing...
              </span>
            ) : (
              `Place Order — Rs. ${subtotal.toLocaleString()}`
            )}
          </button>
        </form>

        {/* Order Summary Sidebar */}
        <aside className="rounded-sm bg-stone-50 px-6 py-8 lg:sticky lg:top-32 lg:col-span-5 lg:p-10">
          <h2 className="text-lg font-medium text-zinc-900 mb-6">
            Order Summary
          </h2>

          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={`${item.product._id}-${item.size}`}
                className="flex gap-4"
              >
                <div className="aspect-[3/4] w-16 shrink-0 overflow-hidden bg-stone-100 rounded-sm">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-zinc-900 line-clamp-1 pr-4">
                      {item.product.name}
                    </p>
                    <p className="whitespace-nowrap text-sm font-medium text-zinc-900">
                      Rs.{" "}
                      {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-stone-500">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.size && (
                      <span className="h-1 w-1 rounded-full bg-stone-300" />
                    )}
                    <span>Qty: {item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4 border-t border-stone-200 pt-6 text-sm text-stone-600">
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

          <p className="mt-6 text-xs leading-relaxed text-stone-500 text-center">
            Shipping charges and taxes are not calculated in this demo project.
          </p>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;
