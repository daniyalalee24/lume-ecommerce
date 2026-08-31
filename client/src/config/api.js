const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://lume-server-six.vercel.app";

export default API_URL;
