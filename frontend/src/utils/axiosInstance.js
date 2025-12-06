// axiosInstance.js
import axios from "axios";
import { BASE_URL } from "./apiPaths";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  timeout: 10000, // Optional: timeout in ms
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors
    if(error.response){
        if(error.response.status === 401){
            window.location.href = "/login";
        }else if(error.response.status === 500){
            console.error("Server error. Please try again later");
        }
    }else if(error.code === "ECONNABORTED"){
        console.log("Request timeout. Please try again");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
