function ProductList({ products, loading, onEdit, onDelete }) {
  return (
    <section className="mt-12 lg:mt-20">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
            Inventory
          </p>
          <h2 className="mt-2 text-3xl font-light tracking-tight text-zinc-900">
            All Products
          </h2>
        </div>
        {!loading && products.length > 0 && (
          <p className="text-sm font-medium text-stone-500">
            {products.length} product{products.length !== 1 && "s"} total
          </p>
        )}
      </div>

      {loading ? (
        /* Skeleton Loading State */
        <div className="mt-8 overflow-hidden rounded-sm border border-stone-200 bg-white shadow-sm">
          <div className="border-b border-stone-100 bg-stone-50/50 px-6 py-4">
            <div className="h-4 w-1/3 animate-pulse rounded bg-stone-200"></div>
          </div>
          <div className="divide-y divide-stone-100">
            {[1, 2, 3, 4].map((skeleton) => (
              <div key={skeleton} className="flex items-center gap-6 px-6 py-4">
                <div className="h-16 w-12 shrink-0 animate-pulse bg-stone-100"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/2 animate-pulse rounded bg-stone-100"></div>
                  <div className="h-3 w-1/4 animate-pulse rounded bg-stone-50"></div>
                </div>
                <div className="h-4 w-20 animate-pulse rounded bg-stone-100"></div>
              </div>
            ))}
          </div>
        </div>
      ) : products.length === 0 ? (
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="mt-6 text-lg font-medium text-zinc-900">
            No products found
          </h3>
          <p className="mt-2 text-sm text-stone-500">
            Start by adding a new product to your inventory.
          </p>
        </div>
      ) : (
        /* Data Table */
        <div className="mt-8 overflow-hidden rounded-sm border border-stone-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead className="bg-stone-50/80 backdrop-blur">
                <tr className="border-b border-stone-200">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                    Product
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                    Category
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                    Price
                  </th>
                  <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-stone-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="group transition-colors duration-200 hover:bg-stone-50/60"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-5">
                        <div className="aspect-[3/4] w-12 shrink-0 overflow-hidden rounded-sm bg-stone-100 shadow-sm border border-stone-200/50">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <span className="font-medium text-zinc-900">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                      {product.category}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900">
                      Rs. {product.price.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => onEdit(product)}
                          className="rounded-sm px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-stone-500 transition-colors hover:bg-stone-200 hover:text-zinc-900"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => onDelete(product._id)}
                          className="rounded-sm px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
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
        </div>
      )}
    </section>
  );
}

export default ProductList;
