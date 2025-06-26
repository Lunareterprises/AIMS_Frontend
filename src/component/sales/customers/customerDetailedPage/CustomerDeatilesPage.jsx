import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Tabs from "./Tabs";
import Swal from "sweetalert2";
import { customer_list } from "../../../../api/services/sales/createCustomer";
import { getFirstWordInCaps } from "../../../../lib/utils";

const CustomerDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState(null); // Changed to single customer object

  const fetchCustomer = async (id) => {
    try {
      const body = {
        cust_id: id,
      };

      const response = await customer_list(body);

      const customerData = response.list && response.list.length > 0 ? response.list[0] : null;
      
      if (customerData) {
        const transformedData = {
          ...customerData,
          id: customerData.cu_id, // Map cu_id to id
        };
        setCustomer(transformedData);
      } else {
        setCustomer(null);
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
      Swal.fire("Error", "Failed to fetch customer details", "error");
    }
  };

  // Call the function when component mounts or ID changes
  useEffect(() => {
    if (id) {
      fetchCustomer(id);
    }
  }, [id]);

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            {customer ? `${getFirstWordInCaps(customer.cu_company_name || customer.customer_name)}` : ''}
          </h1>
          <div className="flex items-center space-x-4">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => navigate("/CustomersList")}
            >
              X
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <Tabs customer={customer} />
      </div>
    </div>
  );
};

export default CustomerDetailsPage;