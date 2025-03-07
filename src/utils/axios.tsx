// utils/axios.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// import toast from "react-hot-toast";

// Create a base axios instance
const instance = axios.create({
 baseURL: import.meta.env.VITE_BASE_URL,
 headers: {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_X_API_KEY,
 },
});

// Variables to manage token refresh state
let isRefreshing = false;
let failedQueue: {
 resolve: (value: unknown) => void;
 reject: (reason?: AxiosError) => void;
 config: AxiosRequestConfig;
}[] = [];

// Process the queue of failed requests
const processQueue = (error: AxiosError | null, token: string | null) => {
 failedQueue.forEach(({ resolve, reject, config }) => {
  if (error) {
   reject(error);
  } else {
   if (config.headers && token) {
    config.headers["Authorization"] = `Bearer ${token}`;
   }
   resolve(instance(config));
  }
 });

 failedQueue = [];
};

// Function to refresh token - will be implemented later
const refreshAccessToken = async (): Promise<string> => {
 // This function will be filled by our store access
 // We'll define this later in the authStore
 throw new Error("refreshAccessToken not implemented");
};

// Request interceptor - add token to requests
instance.interceptors.request.use(
 (config) => {
  // Get token from localStorage (you can modify this as needed)
  const token = localStorage.getItem("access");

  if (token && config.headers) {
   config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
 },
 (error) => Promise.reject(error)
);

/// Response interceptor - handle token refresh on 401 errors
instance.interceptors.response.use(
 (response: AxiosResponse) => response,
 async (error: AxiosError) => {
  const originalRequest = error.config;

  if (!originalRequest) {
   return Promise.reject(error);
  }

  // Handle 401 Unauthorized errors (expired token)
  if (error.response?.status === 401 && !originalRequest.headers["_retry"]) {
   if (isRefreshing) {
    // If already refreshing, add this request to queue
    return new Promise((resolve, reject) => {
     failedQueue.push({ resolve, reject, config: originalRequest });
    });
   }

   // Mark as retrying to prevent infinite loops
   originalRequest.headers["_retry"] = true;
   isRefreshing = true;

   try {
    // Attempt to refresh the token
    const newToken = await refreshAccessToken();

    // Update original request with new token
    if (originalRequest.headers) {
     originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
    }

    // Process any queued requests with new token
    processQueue(null, newToken);

    // Retry the original request with new token
    return instance(originalRequest);
   } catch (refreshError) {
    // Token refresh failed
    processQueue(refreshError as AxiosError, null);

    // Clear auth data since refresh failed
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // Important: We're now passing along the original error
    // This allows your service functions to catch it
    return Promise.reject(error); // Return the original error, not refreshError
   } finally {
    isRefreshing = false;
   }
  }

  // Return any other errors
  return Promise.reject(error);
 }
);

export default instance;
