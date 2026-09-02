import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

import AdminNavigation from "../components/AdminNavigation";

import { uploadImage } from "../api/upload";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";

function AdminProducts() {
  const { token } = useAuth();

  useDocumentTitle("Products | LUMÉ Admin");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    sizes: [],
  });

  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image upload state
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const data = await getProducts({ limit: 100 });
      setProducts(data.products);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle size selection
  const handleSizeChange = (event) => {
    const { value, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      sizes: checked
        ? [...prevData.sizes, value]
        : prevData.sizes.filter((size) => size !== value),
    }));
  };

  // Reset product form
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
      sizes: [],
    });

    setEditingId(null);
    setImageFile(null);
    setImagePreview("");
  };

  // Handle image selection
  const handleImageFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Create or update product
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");
    setIsSubmitting(true);

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        setUploadingImage(true);

        imageUrl = await uploadImage(imageFile, token);

        setUploadingImage(false);
      }

      if (!imageUrl) {
        throw new Error("Please select a product image");
      }

      const productData = {
        ...formData,
        image: imageUrl,
        price: Number(formData.price),
      };

      if (editingId) {
        await updateProduct(editingId, productData, token);
      } else {
        await createProduct(productData, token);
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
      setUploadingImage(false);
    }
  };

  // Start editing a product
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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete a product
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    setError("");

    try {
      await deleteProduct(id, token);

      fetchProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <AdminNavigation />
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {/* Header */}
        <div className="border-b border-gray-200 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
            LUMÉ Admin
          </p>

          <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-light tracking-tight text-gray-900 md:text-4xl">
                Products
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Add, edit, and manage your product collection.
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-600">
              {products.length} {products.length === 1 ? "Product" : "Products"}
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-sm border border-red-100 bg-red-50 p-4">
            <p className="text-center text-sm font-medium text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Product Form */}
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

        {/* Product List */}
        <ProductList
          products={products}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </>
  );
}

export default AdminProducts;
