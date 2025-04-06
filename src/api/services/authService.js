
import axiosInstance from "../commonUtils/axiosInstance";
import { API_ENDPOINTS } from "../commonUtils/endpoints";

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
    // Log for devs
    console.error("Register API failed:", error);

    // Re-throw if you want to handle it in the component
    throw error;
  }
};
export const registerWithOpt = async (formData) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.REGISTER_WITH_OTP, formData);
    console.log("response---->>>???????",response);
    return response.data;
  } catch (error) {
    // Log for devs
    console.error("Register API failed:", error);

    // Re-throw if you want to handle it in the component
    throw error;
  }
};


export const logout = () => {
  localStorage.removeItem("token");
};
