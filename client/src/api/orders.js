import API_URL from "../config/api";

export const getOrders = async (token) => {
  const response = await fetch(`${API_URL}/api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch orders");
  }

  return data;
};

export const updateOrderStatus = async (token, orderId, status) => {
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
    throw new Error(data.message || "Failed to update order status");
  }

  return data;
};
