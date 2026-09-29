import axios from "axios";

// Default to user configured environment variable or local backend
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Can attach auth token if available in future
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to normalize error messages
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "An unexpected error occurred.";

    if (error.response) {
      // Backend returned HTTP error status
      const data = error.response.data;
      if (typeof data === "string") {
        errorMessage = data;
      } else if (data && data.message) {
        errorMessage = data.message;
      } else if (data && data.error) {
        errorMessage = data.error;
      } else {
        errorMessage = `Server returned status ${error.response.status}`;
      }
    } else if (error.request) {
      // No response received from server (e.g. server is down or CORS blocked)
      errorMessage =
        `Cannot connect to CityFix backend at ${API_BASE_URL}. Ensure the Express/MongoDB server is running on http://localhost:5000.`;
    } else {
      errorMessage = error.message || "Failed to make request.";
    }

    const enhancedError = new Error(errorMessage);
    enhancedError.originalError = error;
    enhancedError.isNetworkError = !error.response;
    enhancedError.statusCode = error.response ? error.response.status : null;
    return Promise.reject(enhancedError);
  }
);

export default apiClient;
