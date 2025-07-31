import React, { useState, useEffect } from "react";
import { Phone, Smartphone } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OtherDetails from "./OtherDetails";
import AddressTab from "./AddressTab";
import ContactPersonsTab from "./ContactPersonsTab";
import CustomFields from "./CustomFields";
import ReportingTags from "./ReportingTags";
import RemarksTab from "./RemarksTab";
import CommonButton from "../../../CommonUI/buttons/CommonButton";
import {
  createCustomer,
  customer_list,
  updateCustomer,
} from "../../../../api/services/sales/createCustomer";

const CustomersAddForm = () => {
  const [activeTab, setActiveTab] = useState("Other Details");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false); // Add this flag
  
  const [contacts, setContacts] = useState([
    {
      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      workPhone: "",
      mobile: "",
      skype: "",
      designation: "",
      department: "",
      showMore: false,
    },
  ]);
  
  const initialAddress = {
    attention: "",
    country: null,
    state: null,
    address1: "",
    address2: "",
    city: "",
    zip: "",
    phone: "",
    fax: "",
  };
  
  const [billingAddress, setBillingAddress] = useState({ ...initialAddress });
  const [shippingAddress, setShippingAddress] = useState({ ...initialAddress });

  const navigate = useNavigate();
  const location = useLocation();
  const { title, customer_Type } = location.state || {};

  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    companyName: "",
    displayName: "",
    displayNameOptions: [],
    email: "",
    workPhone: "",
    mobile: "",
    customerType: "Business",
  });

  const [otherDetailsData, setOtherDetailsData] = useState({
    taxTreatment: "",
    placeOfSupply: "",
    currency: "",
    accountReceivable: "",
    openingBalance: "",
    paymentTerms: "",
    enablePortal: false,
    portalLanguage: "",
    documents: null,
    website: "",
    department: "",
    designation: "",
    twitter: "",
    skype: "",
    facebook: "",
  });

  const tabs = ["Other Details", "Address", "Contact Persons", "Remark"];

  // Function to generate display name options
  const generateDisplayNameOptions = (salutation, firstName, lastName) => {
    const options = [
      `${salutation} ${firstName} ${lastName}`.trim(),
      `${firstName} ${lastName}`.trim(),
      `${lastName} ${firstName}`.trim(),
      `${firstName}`.trim(),
      `${lastName}`.trim(),
    ].filter(Boolean);
    return options;
  };

  // Fetch customer data
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (id) {
        setFetchingData(true);
        try {
          const result = await customer_list({ cust_id: id });

          console.log("API Response:", result);

          if (result && result.result && result.list && result.list.length > 0) {
            const customerData = result.list[0]; // Access first element of array
            console.log("Customer Data:", customerData);

            // Generate display name options first
            const options = generateDisplayNameOptions(
              customerData.cu_salutation || "",
              customerData.cu_first_name || "",
              customerData.cu_last_name || ""
            );

            // Update form data with proper fallbacks
            const newFormData = {
              salutation: customerData.cu_salutation || "",
              firstName: customerData.cu_first_name || "",
              lastName: customerData.cu_last_name || "",
              companyName: customerData.cu_company_name || "",
              displayName: customerData.cu_display_name || "",
              email: customerData.cu_email || "",
              workPhone: customerData.cu_phone || "",
              mobile: customerData.cu_mobile || "",
              customerType: customerData.cu_type || "Business",
              displayNameOptions: options,
            };

            console.log("Setting formData to:", newFormData);
            setFormData(newFormData);

            // Update other details
            const newOtherDetailsData = {
              taxTreatment: customerData.cu_tax_treatment || "",
              placeOfSupply: customerData.cu_place_supply || "",
              currency: customerData.cu_currency || "",
              accountReceivable: customerData.cu_account_receivable || "",
              openingBalance: customerData.cu_opening_balance || "",
              paymentTerms: customerData.cu_payment_terms || "",
              enablePortal: customerData.cu_portal_access === "true",
              portalLanguage: customerData.cu_portal_language || "",
              documents: null,
              website: customerData.cu_website || "",
              department: customerData.cu_department || "",
              designation: customerData.cu_designation || "",
              twitter: customerData.cu_twitter || "",
              skype: customerData.cu_skype || "",
              facebook: customerData.cu_facebook || "",
            };

            console.log("Setting otherDetailsData to:", newOtherDetailsData);
            setOtherDetailsData(newOtherDetailsData);

            // Update billing address
            const newBillingAddress = {
              attention: customerData.cu_b_addr_attention || "",
              country: customerData.cu_b_addr_country
                ? {
                    label: customerData.cu_b_addr_country,
                    value: customerData.cu_b_addr_country,
                  }
                : null,
              state: customerData.cu_b_addr_state
                ? {
                    label: customerData.cu_b_addr_state,
                    value: customerData.cu_b_addr_state,
                  }
                : null,
              address1: customerData.cu_b_addr_address || "",
              address2: customerData.cu_b_addr_address2 || "",
              city: customerData.cu_b_addr_city || "",
              zip: customerData.cu_b_addr_pincode || "",
              phone: customerData.cu_b_addr_phone || "",
              fax: customerData.cu_b_addr_fax_number || "",
            };

            console.log("Setting billingAddress to:", newBillingAddress);
            setBillingAddress(newBillingAddress);

            // Update shipping address
            const newShippingAddress = {
              attention: customerData.cu_s_addr_attention || "",
              country: customerData.cu_s_addr_country
                ? {
                    label: customerData.cu_s_addr_country,
                    value: customerData.cu_s_addr_country,
                  }
                : null,
              state: customerData.cu_s_addr_state
                ? {
                    label: customerData.cu_s_addr_state,
                    value: customerData.cu_s_addr_state,
                  }
                : null,
              address1: customerData.cu_s_addr_address || "",
              address2: customerData.cu_s_addr_address2 || "",
              city: customerData.cu_s_addr_city || "",
              zip: customerData.cu_s_addr_pincode || "",
              phone: customerData.cu_s_addr_phone || "",
              fax: customerData.cu_s_addr_fax_number || "",
            };

            console.log("Setting shippingAddress to:", newShippingAddress);
            setShippingAddress(newShippingAddress);

            // Update contacts if available
            if (customerData.contacts && customerData.contacts.length > 0) {
              console.log("Setting contacts to:", customerData.contacts);
              setContacts(customerData.contacts);
            }

            setDataLoaded(true); // Mark data as loaded
          } else {
            console.error("Invalid API response structure:", result);
            setError("Failed to fetch customer data - invalid response structure");
          }
        } catch (err) {
          console.error("Error fetching customer data:", err);
          setError("Failed to fetch customer data");
        } finally {
          setFetchingData(false);
        }
      }
    };

    fetchCustomerData();
  }, [id]);

  // Update display name options only when typing (not when data is loaded)
  useEffect(() => {
    if (!dataLoaded && (formData.firstName || formData.lastName || formData.salutation)) {
      const options = generateDisplayNameOptions(
        formData.salutation,
        formData.firstName,
        formData.lastName
      );

      setFormData((prev) => ({ 
        ...prev, 
        displayNameOptions: options,
        // Auto-select first option if no display name is set
        displayName: prev.displayName || options[0] || ""
      }));
    }
  }, [formData.salutation, formData.firstName, formData.lastName, dataLoaded]);

  console.log("Current formData:", formData);
  console.log("Current otherDetailsData:", otherDetailsData);
  console.log("Current billingAddress:", billingAddress);

  const validateForm = () => {
    const errors = {};
    if (!formData.displayName) errors.displayName = "Display Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    setError("");

    try {
      const formDataPayload = new FormData();

      formDataPayload.append("cu_salutation", formData.salutation || "");
      formDataPayload.append("cu_first_name", formData.firstName || "");
      formDataPayload.append("cu_last_name", formData.lastName || "");
      formDataPayload.append("cu_company_name", formData.companyName || "");
      formDataPayload.append("cu_display_name", formData.displayName || "");
      formDataPayload.append("cu_email", formData.email || "");
      formDataPayload.append("cu_phone", formData.workPhone || "");
      formDataPayload.append("cu_mobile", formData.mobile || "");
      formDataPayload.append("cu_pan_no", "");
      formDataPayload.append("cu_opening_balance", otherDetailsData.openingBalance || "");
      formDataPayload.append("cu_website", otherDetailsData.website || "");
      formDataPayload.append("cu_designation", otherDetailsData.designation || "");
      formDataPayload.append("cu_department", otherDetailsData.department || "");
      formDataPayload.append("cu_type", formData.customerType || "Business");
      formDataPayload.append("cu_currency", otherDetailsData.currency || "");
      formDataPayload.append("cu_payment_terms", otherDetailsData.paymentTerms || "");
      formDataPayload.append("cu_portal_language", otherDetailsData.portalLanguage || "");
      formDataPayload.append("cu_portal_access", otherDetailsData.enablePortal ? "true" : "false");
      formDataPayload.append("cu_remarks", "qqq");

      if (id) {
        formDataPayload.append("cust_id", id);
      }

      if (otherDetailsData.documents) {
        formDataPayload.append("image", otherDetailsData.documents);
      } else {
        formDataPayload.append("image", "");
      }

      // Billing address
      formDataPayload.append("cu_b_addr_attention", billingAddress.attention || "");
      formDataPayload.append("cu_b_addr_country", billingAddress.country?.label || "");
      formDataPayload.append("cu_b_addr_address", billingAddress.address1 || "");
      formDataPayload.append("cu_b_addr_city", billingAddress.city || "");
      formDataPayload.append("cu_b_addr_state", billingAddress.state?.label || "");
      formDataPayload.append("cu_b_addr_pincode", billingAddress.zip || "");
      formDataPayload.append("cu_b_addr_phone", billingAddress.phone || "");
      formDataPayload.append("cu_b_addr_fax_number", billingAddress.fax || "");

      // Shipping address
      formDataPayload.append("cu_s_addr_attention", shippingAddress.attention || "");
      formDataPayload.append("cu_s_addr_country", shippingAddress.country?.label || "");
      formDataPayload.append("cu_s_addr_address", shippingAddress.address1 || "");
      formDataPayload.append("cu_s_addr_city", shippingAddress.city || "");
      formDataPayload.append("cu_s_addr_state", shippingAddress.state?.label || "");
      formDataPayload.append("cu_s_addr_pincode", shippingAddress.zip || "");
      formDataPayload.append("cu_s_addr_phone", shippingAddress.phone || "");
      formDataPayload.append("cu_s_addr_fax_number", shippingAddress.fax || "");

      // Additional details
      formDataPayload.append("contact_person", "");
      formDataPayload.append("cu_tax_treatment", otherDetailsData.taxTreatment || "");
      formDataPayload.append("cu_place_supply", otherDetailsData.placeOfSupply || "");
      formDataPayload.append("cu_tax_preference", "dfsfaa");

      let result;
      if (id) {
        result = await updateCustomer(formDataPayload);
      } else {
        result = await createCustomer(formDataPayload);
      }

      if (result && result.success) {
        navigate("/CustomersList");
      } else {
        setError(
          result?.message ||
            `Failed to ${id ? "update" : "create"} customer. Please try again.`
        );
      }
    } catch (err) {
      console.error(err);
      setError(
        `Failed to ${id ? "update" : "create"} customer. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Other Details":
        return (
          <OtherDetails
            data={otherDetailsData}
            onChange={setOtherDetailsData}
          />
        );
      case "Address":
        return (
          <AddressTab
            billing={billingAddress}
            setBilling={setBillingAddress}
            shipping={shippingAddress}
            setShipping={setShippingAddress}
          />
        );
      case "Contact Persons":
        return (
          <ContactPersonsTab contacts={contacts} setContacts={setContacts} />
        );
      case "Custom Fields":
        return <CustomFields />;
      case "Reporting Tags":
        return <ReportingTags />;
      case "Remarks":
        return <RemarksTab />;
      default:
        return null;
    }
  };

  // Show loading state while fetching data
  if (fetchingData) {
    return (
      <div className="max-w-5xl flex flex-col min-h-screen">
        <div className="p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">
              Loading customer data...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl flex flex-col min-h-screen">
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">
          {id ? `Edit Customer` : title || "Create New"}
        </h1>

        {error && (
          <div className="text-red-600 text-sm mb-4 border border-red-300 bg-red-50 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4 mb-6">
          {customer_Type === "customer" && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2 w-56">
                <h2 className="block text-sm font-medium text-gray-700">
                  Customer Type
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                {["Business", "Individual"].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="customerType"
                      value={type}
                      checked={formData.customerType === type}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          customerType: e.target.value,
                        }));
                      }}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 w-56">
              <h2 className="block text-sm font-medium text-gray-700">
                Primary Contact
              </h2>
            </div>

            <div className="flex-none w-40">
              <select
                className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md"
                value={formData.salutation}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, salutation: e.target.value }))
                }
              >
                <option value="">Salutation</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Dr.">Dr.</option>
              </select>
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, firstName: e.target.value }))
                }
                placeholder="First Name"
                className="flex-1 text-sm px-3 py-2 border border-gray-300 rounded-md"
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-xs mt-2">
                  {formErrors.firstName}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, lastName: e.target.value }))
                }
                placeholder="Last Name"
                className="flex-1 text-sm px-3 py-2 border border-gray-300 rounded-md"
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-xs mt-2">
                  {formErrors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="flex">
            <label className="block text-sm font-medium text-gray-700 mb-1 w-80">
              Company Name
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, companyName: e.target.value }))
              }
              className="w-full text-sm border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex">
            <label className="block text-sm font-medium text-gray-700 mb-1 w-80">
              Display Name*
            </label>
            <div className="flex flex-col w-full">
              <select
                value={formData.displayName}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, displayName: e.target.value }))
                }
                className="w-full text-sm border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select or type to add</option>
                {formData.displayNameOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {formErrors.displayName && (
                <p className="text-red-500 text-xs mt-2">
                  {formErrors.displayName}
                </p>
              )}
            </div>
          </div>

          <div className="flex">
            <label className="block text-sm font-medium text-gray-700 mb-1 w-80">
              Email Address*
            </label>
            <div className="flex flex-col w-full">
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, email: e.target.value }))
                }
                className="w-full text-sm border border-gray-300 rounded px-3 py-2"
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-2">{formErrors.email}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 w-56">
              <span className="text-gray-700 font-medium">Phone</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
                <Phone className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="tel"
                  value={formData.workPhone}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, workPhone: e.target.value }))
                  }
                  placeholder="Work Phone"
                  className="flex-1 text-sm outline-none text-gray-700"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
                <Smartphone className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, mobile: e.target.value }))
                  }
                  placeholder="Mobile"
                  className="flex-1 text-sm outline-none text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 font-medium text-sm ${
                  activeTab === tab
                    ? "border-blue-500 border-b-2 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="min-h-96">{renderTabContent()}</div>

        <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0 left-0 w-full flex justify-start space-x-3 z-10">
          <CommonButton
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 z-20"
            label={
              loading
                ? id
                  ? "Updating..."
                  : "Saving..."
                : id
                ? "Update"
                : "Save"
            }
            disabled={loading}
          />
          <CommonButton
            onClick={() => navigate("/CustomersList")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            label="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomersAddForm;