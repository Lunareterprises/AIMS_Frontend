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

export const updateCustomer = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.UPDATE_CUSTOMER,
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

export const GET_ALL_SALESPERSONS = async (data) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.SALESPERSON_LIST,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const CREATE_SALESPERSON = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CREATE_SALESPERSON,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const GET_SALESPERSON = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.GET_SALESPERON,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const UPDATE_SALESPERSON = async (data) => {
  try {
    const response = await axiosInstance.put(
      API_ENDPOINTS.EDIT_SALESPERSON,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const DELETE_SALESPERSON = async (data) => {
  try {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.DELETE_SALESPERSON,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const GET_ALL_TAXES = async (data) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.TAX_LIST, data);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const CREATE_TAX = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.CREATE_TAX, data);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const CREATE_QUOTES = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CREATE_QUOTES,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const UPDATE_QUOTES = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.EDIT_QUOTES, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const GET_ALL_PROJECTS = async (data) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.PROJECT_LIST, data);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const CREATE_PROJECT = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CREATE_PROJECT,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const GET_ALL_QUOTES = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.QUOTES_LIST, data);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const CREATE_INVOICES = async (data) => {
  try {
    console.log({ data }, "invoice data");
    const response = await axiosInstance.post(
      API_ENDPOINTS.CREATE_INVOICE,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

export const GET_ALL_INVOICES = async (data) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.INVOICE_LIST, data);
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};

// GET: List all payment modes
export const GET_PAYMENT_MODE_LIST = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.PAYMENT_MODE_LIST);
    return response.data;
  } catch (error) {
    console.error("GET Payment Mode List failed:", error);
    throw error;
  }
};

// POST: Create new payment mode
export const CREATE_PAYMENT_MODE = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CREATE_PAYMENT_MODE,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Create Payment Mode failed:", error);
    throw error;
  }
};

// POST: Edit existing payment mode
export const EDIT_PAYMENT_MODE = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.EDIT_PAYMENT_MODE,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Edit Payment Mode failed:", error);
    throw error;
  }
};

// POST: Set default payment mode
export const SET_DEFAULT_PAYMENT_MODE = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.SET_DEFAULT_PAYMENT_MODE,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Set Default Payment Mode failed:", error);
    throw error;
  }
};

// POST: Delete payment mode
export const DELETE_PAYMENT_MODE = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.DELETE_PAYMENT_MODE,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Delete Payment Mode failed:", error);
    throw error;
  }
};

export const CREATE_PAYMENT_RECEIVED = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CREATE_PAYMENT_RECEIVED,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Create Payment Mode failed:", error);
    throw error;
  }
};

export const GET_ALL_PAYMENT_RECEIVED = async (data) => {
  try {
    const response = await axiosInstance.get(
      API_ENDPOINTS.PAYMENT_RECEIVED_LIST,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Register API failed:", error);
    throw error;
  }
};
