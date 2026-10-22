function ProductForm({
  formData,
  editingId,
  onChange,
  onSizeChange,
  onSubmit,
  onCancel,
  isSubmitting,
  imagePreview,
  uploadingImage,
  onImageFileChange,
}) {
  const inputStyles =
    "mt-2 w-full appearance-none rounded-sm border border-stone-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-stone-400 transition-all duration-200 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900";

  const categories = ["Men", "Women", "Accessories"];
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <section className="mt-12 lg:mt-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="border-b border-stone-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
            Inventory
          </p>
          <h2 className="mt-2 text-3xl font-light tracking-tight text-zinc-900">
            {editingId ? "Edit Product" : "Add a New Product"}
          </h2>
        </div>

        <form onSubmit={onSubmit} className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-bold uppercase tracking-widest text-stone-500"
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
              className="block text-xs font-bold uppercase tracking-widest text-stone-500"
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
              className="block text-xs font-bold uppercase tracking-widest text-stone-500"
            >
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={onChange}
                required
                className={`${inputStyles} cursor-pointer pr-10`}
              >
                <option value="" disabled className="text-stone-400">
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pt-2 px-3 text-stone-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Sizes (Custom Pill Checkboxes) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500">
              Available Sizes
            </label>
            <div className="mt-2 flex flex-wrap gap-3">
              {availableSizes.map((size) => (
                <label key={size} className="relative cursor-pointer">
                  <input
                    type="checkbox"
                    value={size}
                    checked={formData.sizes.includes(size)}
                    onChange={onSizeChange}
                    className="peer sr-only"
                  />
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-stone-300 bg-white text-sm font-medium text-stone-600 transition-all peer-checked:border-zinc-900 peer-checked:bg-zinc-900 peer-checked:text-white hover:bg-stone-50 peer-checked:hover:bg-zinc-800">
                    {size}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Custom Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500">
              Product Image
            </label>

            <div className="mt-2 flex items-center gap-6">
              <label
                htmlFor="image"
                className="group relative flex w-full max-w-sm cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed border-stone-300 bg-stone-50 py-10 transition-colors hover:border-zinc-900 hover:bg-stone-100"
              >
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={onImageFileChange}
                  className="sr-only"
                />
                <svg
                  className="mb-3 h-8 w-8 text-stone-400 transition-colors group-hover:text-zinc-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-stone-600">
                  {uploadingImage ? "Uploading..." : "Click to upload image"}
                </span>
                <span className="mt-1 text-xs text-stone-400">
                  PNG, JPG, WEBP up to 5MB
                </span>
              </label>

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative aspect-[3/4] w-32 overflow-hidden rounded-sm border border-stone-200 bg-stone-100 shadow-sm">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover object-center"
                  />
                  {uploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block text-xs font-bold uppercase tracking-widest text-stone-500"
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
              placeholder="Describe the product material, fit, and care instructions..."
              className={`${inputStyles} resize-y min-h-[120px]`}
            />
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap items-center gap-4 md:col-span-2 border-t border-stone-200 pt-8">
            <button
              type="submit"
              disabled={isSubmitting || uploadingImage}
              className="group relative inline-flex items-center justify-center bg-zinc-900 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? editingId
                  ? "Updating..."
                  : "Adding..."
                : editingId
                  ? "Update Product"
                  : "Add Product"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="border border-stone-300 px-8 py-4 text-sm font-medium uppercase tracking-widest text-stone-600 transition-colors duration-300 hover:bg-stone-50 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProductForm;
