import axios, { AxiosInstance} from "axios";
const adminApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4000/',
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