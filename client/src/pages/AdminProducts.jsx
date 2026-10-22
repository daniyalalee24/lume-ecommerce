import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import useDocumentTitle from "../hooks/useDocumentTitle";
import AdminNavigation from "../components/AdminNavigation";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { uploadImage } from "../api/upload";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";

const INITIAL_FORM_STATE = {
  name: "",
  price: "",
  description: "",
  category: "",
  image: "",
  sizes: [],
};

function AdminProducts() {
  const { token } = useAuth();
  useDocumentTitle("Products | LUMÉ Admin");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getProducts({ limit: 100 });
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      sizes: checked
        ? [...prev.sizes, value]
        : prev.sizes.filter((size) => size !== value),
    }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setEditingId(null);
    setImageFile(null);
    setImagePreview("");
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError("");
    setIsSubmitting(true);

    try {
      let imageUrl = formData.image;
      if (imageFile) {
        setUploadingImage(true);
        imageUrl = await uploadImage(imageFile, token);
      }
      if (!imageUrl) throw new Error("Please select a product image");

      const productData = {
        ...formData,
        image: imageUrl,
        price: Number(formData.price),
      };

      if (editingId) await updateProduct(editingId, productData, token);
      else await createProduct(productData, token);

      resetForm();
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
      setUploadingImage(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      sizes: product.sizes,
    });
    setImageFile(null);
    setImagePreview(product.image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      setError("");
      await deleteProduct(id, token);
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <AdminNavigation />

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Header Section */}
        <div className="mb-10 flex flex-col gap-4 border-b border-stone-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
              LUMÉ Admin
            </p>
            <h1 className="text-3xl font-light tracking-tight text-zinc-900 md:text-4xl">
              Inventory Management
            </h1>
            <p className="text-sm text-stone-500">
              Add, edit, and manage your product collection.
            </p>
          </div>

          {!loading && (
            <div className="flex items-center">
              <span className="rounded-sm bg-stone-200/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-600">
                {products.length} Total{" "}
                {products.length === 1 ? "Product" : "Products"}
              </span>
            </div>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-8 rounded-sm border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {/* Product Form */}
        <div className="-mt-8">
          <ProductForm
            formData={formData}
            editingId={editingId}
            onChange={handleChange}
            onSizeChange={handleSizeChange}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            isSubmitting={isSubmitting}
            imagePreview={imagePreview}
            uploadingImage={uploadingImage}
            onImageFileChange={handleImageFileChange}
          />
        </div>

        {/* Product List */}
        <div className="mt-8 lg:mt-12">
          <ProductList
            products={products}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
}

export default AdminProducts;
