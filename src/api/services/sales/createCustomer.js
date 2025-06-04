import axiosInstance from "../../commonUtils/axiosInstance";
import { API_ENDPOINTS } from "../../commonUtils/Constants"


export const createCustomer = async(data) =>{
    console.log('====================================');
    console.log("data==>>",data);
    console.log('====================================');
    const response = await axiosInstance.post(API_ENDPOINTS.CREATE_CUSTOMER, data);
    return response.data;
}