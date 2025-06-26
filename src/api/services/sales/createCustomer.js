import axiosInstance from "../../commonUtils/axiosInstance";
import { API_ENDPOINTS } from "../../commonUtils/Constants";

//-------->>>>>>CUSTOMER------->>>>>>

export const createCustomer = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CREATE_CUSTOMER,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API error response:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request error:", error.message);
    }
    throw error;
  }
};

export const customer_list = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CUSTOMER_LIST,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};
