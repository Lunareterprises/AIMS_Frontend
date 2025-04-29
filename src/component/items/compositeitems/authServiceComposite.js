import axiosInstance from "../../../api/commonUtils/axiosInstance";
import { API_ENDPOINTS } from "../../../api/commonUtils/Constants";

//-------------List-----------------------


export const create_composit = async (body) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CREATE_COMPOSIT_ITEM,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};



export const get_all_composit = async (body) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.LIST_COMPOSIT_ITEM,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};
export const list_vendor = async (body) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.LIST_VENDOR,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};


export const view_composit = async (body) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.VIEW_COMPOSIT_ITEM,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};



export const edit_composit = async (body) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.EDIT_COMPOSIT_ITEM,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};



export const deleteitems = async (body) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.DELETE_ITEMS, body);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};




//----------------------------------
