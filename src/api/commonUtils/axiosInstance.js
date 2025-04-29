import axios from "axios";

const user_token = localStorage.getItem("user_token");
const user_id = localStorage.getItem("user_id");

console.log("user_token", user_token);

const processENV = import.meta.env.VITE_BASE_URL;
console.log("processEnv===>", processENV);
const axiosInstance = axios.create({
  baseURL: processENV,
  headers: {
    u_id: user_id,
    Authorization: `Bearer ${user_token}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("request was sent", config);
    return config;
  },
  (error) => {
    console.log("error in sending  request ", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("recive the response", response);
    return response;
  },
  (error) => {
    console.log("error in reciving response", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
