import axios, { AxiosInstance } from "axios";
import config from "../../config/envConfig";
const adminApi: AxiosInstance = axios.create({
  baseURL: config.BASE_URL,
});

adminApi.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("adminToken");
    if (tokenString) {
        // const token = JSON.parse(tokenString);
      config.headers.Authorization = `Bearer ${tokenString}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default adminApi;