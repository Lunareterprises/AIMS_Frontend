import axios from "axios";

const processENV = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: processENV,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Optionally attach token
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.message) {
      // Optional: Show success toast
      // toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    switch (status) {
      case 400:
        alert("Bad Request: " + message);
        break;
      case 401:
        alert("Unauthorized. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // optional
        break;
      case 403:
        alert("Access denied.");
        break;
      case 404:
        alert("Resource not found.");
        break;
      case 500:
        alert("Server error. Please try again later.");
        break;
      default:
        alert("Something went wrong: " + message);
        break;
    }

    console.error("API Error:", {
      status,
      message,
      url: error.config?.url,
      method: error.config?.method,
    });

    return Promise.reject(error);
  }
);

export default axiosInstance;
