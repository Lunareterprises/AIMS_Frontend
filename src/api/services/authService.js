import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const login = async (credentials) => {
  const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
