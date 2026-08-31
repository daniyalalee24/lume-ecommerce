// admin panel product lists for management
// admin panel product lists for management
function ProductList({ products, loading, onEdit, onDelete }) {
  return (
    <section className="mt-16">
      <div className="flex items-end justify-between border-b border-gray-200 pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Inventory
          </p>

          <h2 className="mt-2 text-2xl font-light tracking-tight text-gray-900">
            All Products
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="mt-6 flex min-h-48 items-center justify-center rounded-sm border border-gray-200">
          <p className="animate-pulse text-sm font-medium uppercase tracking-widest text-gray-400">
            Loading products...
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="mt-6 flex min-h-48 items-center justify-center rounded-sm border border-gray-200">
          <p className="text-sm text-gray-500">No products found.</p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-sm border border-gray-200">
          <table className="w-full min-w-700px border-collapse bg-white text-left">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="transition-colors hover:bg-gray-50/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-12 shrink-0 overflow-hidden bg-gray-100 shadow-sm">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <span className="font-medium text-gray-900">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Rs. {product.price.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => onEdit(product)}
                        className="text-sm font-medium text-gray-500 transition-colors hover:text-black"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(product._id)}
                        className="text-sm font-medium text-red-500 transition-colors hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ProductList;
