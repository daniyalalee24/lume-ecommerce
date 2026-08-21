import { Link, useParams } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

function OrderSuccess() {
  const { id } = useParams();

  // title

  useDocumentTitle("Completed | LUMÉ");

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl text-center">
        {/* Success Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
          ✓
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-gray-500">
          Order Successful
        </p>

        <h1 className="mt-4 text-4xl font-light md:text-5xl">
          Thank you for your order.
        </h1>

        <p className="mx-auto mt-5 max-w-md leading-relaxed text-gray-500">
          Your order has been placed successfully. You can view its details and
          status anytime from your orders page.
        </p>

        {/* Order ID */}
        <div className="mx-auto mt-8 max-w-md border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Order ID
          </p>

          <p className="mt-2 break-all font-mono text-sm text-black">{id}</p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/shop"
            className="border border-black px-7 py-3 text-center text-sm uppercase tracking-wider transition hover:bg-black hover:text-white"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="bg-black px-7 py-3 text-center text-sm uppercase tracking-wider text-white transition hover:bg-gray-800"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;
