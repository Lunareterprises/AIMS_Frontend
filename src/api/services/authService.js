import axiosInstance from "../commonUtils/axiosInstance";
import { API_ENDPOINTS } from "../commonUtils/Constants";

export const login = async (credentials) => {
  const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
  return response.data;
};

export const register = async (formData) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, formData);
    console.log("response---->>>???????", response);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};
export const registerWithOpt = async (formData) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.REGISTER_WITH_OTP,
      formData
    );
    console.log("response---->>>registerWithOpt", response);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const organization = async (formData) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.ORGANIZATION,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};
//-------------ITEMS-----------------------

export const GET_ALL_ITEMS = async (body) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.GET_ALL_ITEMS,
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
    const response = await axiosInstance.post(
      API_ENDPOINTS.DELETE_ITEMS,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const ADD_ITEMS = async (formDataObj) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.ADD_ITEMS,
      formDataObj
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const view_items = async (formDataObj) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.VIEW_ITEMS,
      formDataObj
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};
export const edit_items = async (formDataObj) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.EDIT_ITEMS,
      formDataObj
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};


//-------->>>>>>unit------->>>>>>
export const create_unit = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.UNIT_CREATE, data);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const list_unit = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.UNIT_LIST, data);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};
export const add_unit = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.UNIT_CREATE, data);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};
export const delete_unit = async (data) => {
  const response = await axiosInstance.post(API_ENDPOINTS.UNIT_DELETE, data);
  return response.data;
};

//-------->>>>>>MANUFACTURE------->>>>>>
export const LISTMANUFACTURE = async (data) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.MANUFACTURE_LIST,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};
export const MANUFACTURE = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.MANUFACTURE, data);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const deleteadsmanufacture = async (payload) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.DELETEMANUFACTURE, {
    data: payload,
  });
  return response.data;
};

//--------------->>>>BRAND<<<<<-------------------

export const LIST_BRAND = async (data) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.BRAND_LIST, data);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};
export const ADD_BRAND = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.CREATE_BRAND, data);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const deletebrand = async (payload) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.DELETEBRAND, {
    data: payload,
  });
  return response.data;
};

//-------->>>>>>CUSTOM_TABLE------->>>>>>
export const custom_table = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.CUSTOM_TABLE, data);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const custom_create = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.CUSTOM_CREATE, data);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};
export const custom_list = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.CUSTOM_LIST, data);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};


//----------------------------------

export const logout = () => {
  localStorage.removeItem("token");
};
