import API_URL from "../config/api";

export const uploadImage = async (file, token) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }, // no Content-Type — the browser sets it with the right boundary for FormData
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to upload image");
  return data.imageUrl;
};
