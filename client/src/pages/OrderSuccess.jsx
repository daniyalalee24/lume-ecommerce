import { Link, useParams } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

function OrderSuccess() {
  const { id } = useParams();
  useDocumentTitle("Completed | LUMÉ");

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#FAFAFA] px-6 py-16">
      <div className="w-full max-w-xl text-center">
        {/* Elegant Success Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50">
          <svg
            className="h-8 w-8 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-stone-400">
          Order Successful
        </p>

        <h1 className="mt-4 text-4xl font-light tracking-tight text-zinc-900 md:text-5xl">
          Thank you for your order.
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-stone-500">
          Your order has been placed successfully. You can view its details and
          status anytime from your orders page.
        </p>

        {/* Refined Order ID Box */}
        <div className="mx-auto mt-10 max-w-sm rounded-sm border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
            Order Reference
          </p>
          <p className="mt-2 break-all font-mono text-sm font-medium text-zinc-900">
            #{id?.toUpperCase()}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/orders"
            className="group flex items-center justify-center bg-zinc-900 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-stone-800"
          >
            View My Orders
          </Link>
          <Link
            to="/shop"
            className="flex items-center justify-center border border-stone-300 bg-white px-8 py-4 text-sm font-medium uppercase tracking-widest text-stone-600 transition-colors hover:bg-stone-50 hover:text-zinc-900"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;
