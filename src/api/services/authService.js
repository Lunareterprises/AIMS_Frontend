
import axiosInstance from "../commonUtils/axiosInstance";
import { API_ENDPOINTS } from "../commonUtils/Constants";

export const login = async (credentials) => {
  const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
  return response.data;
};

export const register = async (formData) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, formData);
    console.log("response---->>>???????",response);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};
export const registerWithOpt = async (formData) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.REGISTER_WITH_OTP, formData);
    console.log("response---->>>registerWithOpt",response);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const organization = async (formData) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.ORGANIZATION, formData);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};


export const logout = () => {
  localStorage.removeItem("token");
};
