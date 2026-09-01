import API_URL from "../config/api";

// api for fetching products
export const getProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(
    `${API_URL}/api/products${query ? `?${query}` : ""}`,
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch products");
  return data; // { products, page, totalPages, totalProducts }
};

// Admin product api's

// for creating products
export const createProduct = async (productData, token) => {
  const response = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create product");
  }

  return data;
};

// for updating products
export const updateProduct = async (id, productData, token) => {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update product");
  }

  return data;
};

// for deleting products
export const deleteProduct = async (id, token) => {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete product");
  }

  return data;
};
