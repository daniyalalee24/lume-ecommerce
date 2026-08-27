import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useDocumentTitle from "../hooks/useDocumentTitle";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import OrderManagement from "../components/OrderManagement";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";

function Admin() {
  const { token } = useAuth();

  useDocumentTitle("Admin Panel | LUMÉ");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    sizes: [],
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setOrders(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // for handling size changes
  const handleSizeChange = (event) => {
    const { value, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      sizes: checked
        ? [...prevData.sizes, value]
        : prevData.sizes.filter((size) => size !== value),
    }));
  };

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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
      };

      const url = editingId
        ? `${API_URL}/api/products/${editingId}`
        : `${API_URL}/api/products`;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      setError(error.message);
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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      fetchProducts();
    } catch (error) {
      setError(error.message);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      fetchOrders();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6 py-20">
        <p className="animate-pulse text-sm font-medium uppercase tracking-widest text-gray-400">
          Loading dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      {/* Header */}
      <div className="border-b border-gray-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
          LUMÉ Admin
        </p>

        <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-gray-900 md:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage your products and customer orders.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-600">
              {products.length} {products.length === 1 ? "Product" : "Products"}
            </span>
            <span className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-600">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-8 rounded-sm border border-red-100 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-600 text-center">
            {error}
          </p>
        </div>
      )}

      {/* Product Management */}

      <ProductForm
        formData={formData}
        editingId={editingId}
        onChange={handleChange}
        onSizeChange={handleSizeChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      {/* Product List */}
      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Order Management */}
      <OrderManagement
        orders={orders}
        ordersLoading={ordersLoading}
        updateOrderStatus={updateOrderStatus}
      />
    </main>
  );
}

export default Admin;
