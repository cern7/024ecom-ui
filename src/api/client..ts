import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { config } from "process";

// Define base API URL
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:3000/api/v1";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // handling 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "sign_in";
    }
    return Promise.reject(error);
  }
);
export default apiClient;
