// for admin page UI for adding a product
function ProductForm({
  formData,
  editingId,
  onChange,
  onSizeChange,
  onSubmit,
  onCancel,
}) {
  const inputStyles =
    "mt-2 w-full appearance-none rounded-sm border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 ease-in-out hover:border-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm";

  const categories = ["Men", "Women", "Accessories"];
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  return (
    <section className="mt-12">
      <div className="border-b border-gray-200 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Products
        </p>

        <h2 className="mt-2 text-2xl font-light tracking-tight text-gray-900">
          {editingId ? "Edit Product" : "Add a New Product"}
        </h2>
      </div>

      <form onSubmit={onSubmit} className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>

          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            placeholder="e.g. Oversized Cotton Shirt"
            className={inputStyles}
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price (PKR)
          </label>

          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={onChange}
            required
            min="0"
            placeholder="3500"
            className={inputStyles}
          />
        </div>

        {/* Category */}

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={onChange}
            required
            className={inputStyles}
          >
            <option value="">Select a category</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Available Sizes
          </label>

          <div className="mt-3 flex flex-wrap gap-3">
            {availableSizes.map((size) => (
              <label
                key={size}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  value={size}
                  checked={formData.sizes.includes(size)}
                  onChange={onSizeChange}
                />

                <span className="text-sm">{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>

          <input
            id="image"
            name="image"
            value={formData.image}
            onChange={onChange}
            required
            placeholder="https://..."
            className={inputStyles}
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={onChange}
            required
            rows="4"
            placeholder="Describe the product..."
            className={`${inputStyles} resize-none`}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4 md:col-span-2">
          <button
            type="submit"
            className="bg-black px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={onCancel}
              className="border border-gray-300 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-gray-700 transition-colors duration-200 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
