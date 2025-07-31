import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Search,
  Plus,
  X,
  Upload,
  HelpCircle,
  Settings,
  Edit,
  Loader,
} from "lucide-react";
import CommonButton from "../../../CommonUI/buttons/CommonButton";
import BillingAddressFormModal from "./BillingAddressFormModal";
import QuoteNumberPreferences from "./QuoteNumberPreferences";
import TaxPreferencesDialog from "./TaxPreferencesDialog";
import CustomerDetailsModal from "../../../sales/customers/CustomerDetailsModal";
import ManageSalespersonsModal from "../../../sales/customers/ManageSalespersonsModal";
import Swal from "sweetalert2";
import {
  CREATE_TAX,
  customer_list,
  GET_ALL_SALESPERSONS,
  GET_ALL_TAXES,
  CREATE_QUOTES,
  GET_ALL_PROJECTS,
  CREATE_PROJECT,
  GET_ALL_QUOTES,
} from "../../../../api/services/sales/createCustomer";
import ItemModal from "./ItemModal";
import CustomTaxDropdown from "../CustomTaxDropdown";
import { GET_ALL_ITEMS } from "../../../../api/services/authService";
import ProjectModal from "./ProjectModal";
import { useParams } from "react-router-dom";

// Helper function to generate initials
const generateInitial = (name) => {
  return name ? name.charAt(0).toUpperCase() : "";
};

export default function QuoteForm() {
  const { id } = useParams();

  // Add loading states for fetching quote data
  const [fetchingQuoteData, setFetchingQuoteData] = useState(false);
  const [quoteDataLoaded, setQuoteDataLoaded] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const [quoteNumberConfig, setQuoteNumberConfig] = useState({
    prefix: "QT-",
    nextNumber: 1,
    digitLength: 6,
    autoGenerate: true,
    suffix: "",
    restartNumbering: false,
    selectedOption: "",
    selectedYearFormat: "",
  });

  const [formData, setFormData] = useState({
    // Customer Information
    customer_id: null,
    customerData: null,

    // Quote Basic Details
    number: "",
    reference: "",
    date: "",
    expiry_date: "",
    sales_person_id: null,
    salespersonData: null,
    project_id: "",
    projectData: null,
    supply_place: "",
    tax_treatment: "",
    subject: "",
    tax_preference: "",
    notes: "",
    terms_condition: "",
    template: "standard",

    // Financial Fields
    sub_total: 0,
    discount: 0,
    shipping_charge: 0,
    adjustment: 0,
    tcs_tds: null,
    tcs_tds_id: null,
    total: 0,

    // Items Array
    items: [
      {
        id: 1,
        item_id: null,
        description: "",
        quantity: 1.0,
        rate: 0.0,
        discount: 0,
        discount_type: "%",
        tax_id: null,
        tax: "",
        amount: 0.0,
        isEditing: true,
      },
    ],

    // Status
    status: "draft",
  });

  // UI States
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [salespersonDropdownOpen, setSalespersonDropdownOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [placeOfSupplyDropdownOpen, setPlaceOfSupplyDropdownOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTaxTooltip, setShowTaxTooltip] = useState(false);
  const [showCustomerDetailsModal, setShowCustomerDetailsModal] =
    useState(false);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("billing");
  const [configureModalOpen, setConfigureModalOpen] = useState(false);
  const [itemActionsDropdown, setItemActionsDropdown] = useState(null);
  const [showSalesPersonModal, setShowSlaesPersonModal] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // API Data States
  const [customers, setCustomers] = useState([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [customerError, setCustomerError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [salespersons, setSalespersons] = useState([]);
  const [isLoadingSalespersons, setIsLoadingSalespersons] = useState(false);
  const [salespersonError, setSalespersonError] = useState(null);
  const [salespersonSearchTerm, setSalespersonSearchTerm] = useState("");
  const [salespersonPage, setSalespersonPage] = useState(1);
  const [salespersonLimit] = useState(20);
  const [salespersonHasMore, setSalespersonHasMore] = useState(false);
  const [salespersonSearchTimeout, setSalespersonSearchTimeout] =
    useState(null);

  // Add project states
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [projectError, setProjectError] = useState(null);
  const [projectSearchTerm, setProjectSearchTerm] = useState("");
  const [projectPage, setProjectPage] = useState(1);
  const [projectLimit] = useState(20);
  const [projectHasMore, setProjectHasMore] = useState(false);
  const [projectSearchTimeout, setProjectSearchTimeout] = useState(null);

  const [taxes, setTaxes] = useState([]);
  const [isLoadingTaxes, setIsLoadingTaxes] = useState(false);
  const [taxError, setTaxError] = useState(null);
  const [taxSearchTerm, setTaxSearchTerm] = useState("");
  const [taxPage, setTaxPage] = useState(1);
  const [taxLimit] = useState(20);
  const [taxHasMore, setTaxHasMore] = useState(false);
  const [taxSearchTimeout, setTaxSearchTimeout] = useState(null);
  const [isCreatingTax, setIsCreatingTax] = useState(false);

  const [availableItems, setAvailableItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [itemsError, setItemsError] = useState(null);
  const [itemsPage, setItemsPage] = useState(1);
  const [itemsLimit] = useState(20);
  const [itemsHasMore, setItemsHasMore] = useState(false);
  const [itemsSearchTerm, setItemsSearchTerm] = useState("");
  const [itemsSearchTimeout, setItemsSearchTimeout] = useState(null);

  const [itemDropdownOpen, setItemDropdownOpen] = useState(null);
  const [itemSearchQuery, setItemSearchQuery] = useState("");

  // Quote saving states
  const [isSavingQuote, setIsSavingQuote] = useState(false);
  const [saveMode, setSaveMode] = useState("");

  const [customerDetailsData, setCustomerDetailsData] = useState(null);

  // Updated fetchQuoteData function based on your API response structure
  const fetchQuoteData = async () => {
    if (!id) return;

    setFetchingQuoteData(true);
    setFetchError("");

    try {
      // Using GET_ALL_QUOTES with quote_id parameter
      const response = await GET_ALL_QUOTES({ quote_id: id });

      console.log("API Response:", response);

      // Check if response has data - handle both direct array and wrapped array formats
      let quoteData = null;

      if (Array.isArray(response) && response.length > 0) {
        // Direct array format
        quoteData = response[0];
        console.log("Fetched quote data from direct array:", quoteData);
      } else if (
        response &&
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        // Wrapped array format
        quoteData = response.data[0];
        console.log("Fetched quote data from wrapped array:", quoteData);
      } else if (
        response &&
        response.result &&
        response.list &&
        Array.isArray(response.list) &&
        response.list.length > 0
      ) {
        // Alternative wrapped format
        quoteData = response.list[0];
        console.log("Fetched quote data from list array:", quoteData);
      }

      if (quoteData) {
        console.log("Fetched quote data:", quoteData);

        // Map the API field names to your form structure
        const updatedFormData = {
          customer_id: quoteData.q_c_id || null,
          customerData: null, // Will be populated separately if needed
          number: quoteData.q_no || "",
          reference: quoteData.q_reference || "",
          date: quoteData.q_date ? quoteData.q_date.split("T")[0] : "", // Extract date part only
          expiry_date: quoteData.q_expiry_date
            ? quoteData.q_expiry_date.split("T")[0]
            : "",
          sales_person_id: quoteData.q_sp_id || null,
          salespersonData: null, // Will be populated separately if needed
          project_id: quoteData.q_p_id || "",
          projectData: null, // Will be populated separately if needed
          supply_place: quoteData.q_place_supply || "",
          tax_treatment: quoteData.q_tax_treatment || "",
          subject: quoteData.q_subject || "",
          tax_preference: quoteData.q_tax_preference || "",
          notes: quoteData.q_notes || "",
          terms_condition: quoteData.q_terms_condition || "",
          template: quoteData.q_template || "standard",
          sub_total: parseFloat(quoteData.q_sub_total || 0),
          discount: parseFloat(quoteData.q_discount || 0),
          shipping_charge: parseFloat(quoteData.q_shipping_charges || 0),
          adjustment: parseFloat(quoteData.q_adjustment || 0),
          tcs_tds: quoteData.q_tcs_tds || null,
          tcs_tds_id: quoteData.q_tcs_tds_id || null,
          total: parseFloat(quoteData.q_total || 0),
          items:
            quoteData.items && quoteData.items.length > 0
              ? quoteData.items.map((item, index) => ({
                  id: item.qi_id || Date.now() + index,
                  item_id: item.qi_i_id || null,
                  description: item.qi_description || "",
                  quantity: parseFloat(item.qi_quantity || 1),
                  rate: parseFloat(item.qi_rate || 0),
                  discount: parseFloat(item.qi_discount || 0),
                  discount_type: item.qi_discount_type || "%",
                  tax_id: item.qi_tax_id || null,
                  tax: item.qi_tax || "",
                  amount: parseFloat(item.qi_amount || 0),
                  isEditing: false,
                }))
              : [
                  {
                    id: 1,
                    item_id: null,
                    description: "",
                    quantity: 1.0,
                    rate: 0.0,
                    discount: 0,
                    discount_type: "%",
                    tax_id: null,
                    tax: "",
                    amount: 0.0,
                    isEditing: true,
                  },
                ],
          status: quoteData.q_status || "draft",
        };

        console.log("Mapped form data:", updatedFormData);
        setFormData(updatedFormData);

        // If you need to fetch related customer data, salesperson data, or project data
        // you can make separate API calls here based on the IDs

        // Example: Fetch customer data if customer_id exists
        if (quoteData.q_c_id) {
          try {
            const customerResponse = await customer_list({
              cust_id: quoteData.q_c_id,
            });
            if (
              customerResponse &&
              customerResponse.result &&
              customerResponse.list &&
              customerResponse.list.length > 0
            ) {
              const customerData = customerResponse.list[0];
              const transformedCustomer = {
                ...customerData,
                id: customerData.cu_id,
                name:
                  customerData.cu_display_name || customerData.cu_name || "",
                company: customerData.cu_company_name || "",
                initial: generateInitial(
                  customerData.cu_display_name || customerData.cu_name || ""
                ),
                email: customerData.cu_email || "",
                phone: customerData.cu_phone || "",
              };
              handleFormDataChange("customerData", transformedCustomer);
              console.log("Customer data loaded:", transformedCustomer);
            }
          } catch (error) {
            console.error("Error fetching customer data:", error);
          }
        }

        // Example: Fetch salesperson data if sales_person_id exists
        if (quoteData.q_sp_id) {
          try {
            const salespersonResponse = await GET_ALL_SALESPERSONS({
              search: "",
              page: 1,
              limit: 100, // Get enough to find the specific salesperson
            });
            if (salespersonResponse && salespersonResponse.data) {
              const salesperson = salespersonResponse.data.find(
                (sp) => (sp.sp_id || sp.id) === quoteData.q_sp_id
              );
              if (salesperson) {
                const transformedSalesperson = {
                  id: salesperson.sp_id || salesperson.id,
                  name: salesperson.sp_name || salesperson.name || "",
                  email: salesperson.sp_email || salesperson.email || "",
                  phone: salesperson.sp_phone || salesperson.phone || "",
                  initial: generateInitial(
                    salesperson.sp_name || salesperson.name || ""
                  ),
                };
                handleFormDataChange("salespersonData", transformedSalesperson);
                console.log("Salesperson data loaded:", transformedSalesperson);
              }
            }
          } catch (error) {
            console.error("Error fetching salesperson data:", error);
          }
        }

        // Example: Fetch project data if project_id exists
        if (quoteData.q_p_id) {
          try {
            const projectResponse = await GET_ALL_PROJECTS({
              search: "",
              page: 1,
              limit: 100, // Get enough to find the specific project
            });
            if (projectResponse && projectResponse.data) {
              const project = projectResponse.data.find(
                (p) => (p.p_id || p.id) === quoteData.q_p_id
              );
              if (project) {
                const transformedProject = {
                  id: project.p_id || project.id,
                  name: project.p_name || project.name || "",
                  code: project.p_code || project.code || "",
                  description:
                    project.p_description || project.description || "",
                  status: project.p_status || project.status || "",
                  customer_id:
                    project.p_customer_id || project.customer_id || null,
                  initial: generateInitial(
                    project.p_name || project.name || ""
                  ),
                };
                handleFormDataChange("projectData", transformedProject);
                console.log("Project data loaded:", transformedProject);
              }
            }
          } catch (error) {
            console.error("Error fetching project data:", error);
          }
        }

        setQuoteDataLoaded(true);
        console.log("Quote data loaded successfully");
      } else {
        setFetchError("Failed to fetch quote data - no data found in response");
        console.error("No valid data found in response:", response);
      }
    } catch (error) {
      console.error("Error fetching quote data:", error);
      setFetchError("Failed to fetch quote data. Please try again.");
    } finally {
      setFetchingQuoteData(false);
    }
  };
  // Fetch quote data when component mounts and id exists
  useEffect(() => {
    fetchQuoteData();
  }, [id]);

  // AUTO-INCREMENT FUNCTIONS
  const generateNextQuoteNumber = () => {
    const { prefix, nextNumber, digitLength, suffix } = quoteNumberConfig;
    const paddedNumber = nextNumber.toString().padStart(digitLength, "0");
    return `${prefix}${paddedNumber}${suffix}`;
  };

  const getNextQuoteNumber = () => {
    try {
      const lastNumber = localStorage.getItem("lastQuoteNumber");
      const lastQuoteConfig = localStorage.getItem("quoteNumberConfig");

      if (lastQuoteConfig) {
        const config = JSON.parse(lastQuoteConfig);
        return config.nextNumber || (lastNumber ? parseInt(lastNumber) + 1 : 1);
      }

      return lastNumber ? parseInt(lastNumber) + 1 : 1;
    } catch (error) {
      console.error("Error getting next quote number:", error);
      return 1;
    }
  };

  const updateQuoteNumberSequence = (currentNumber) => {
    try {
      const numberMatch = currentNumber.match(/(\d+)/);
      if (numberMatch) {
        const extractedNumber = parseInt(numberMatch[0]);

        localStorage.setItem("lastQuoteNumber", extractedNumber.toString());

        const updatedConfig = {
          ...quoteNumberConfig,
          nextNumber: extractedNumber + 1,
        };

        localStorage.setItem(
          "quoteNumberConfig",
          JSON.stringify(updatedConfig)
        );
        setQuoteNumberConfig(updatedConfig);

        console.log(
          `Quote number sequence updated. Next number will be: ${
            extractedNumber + 1
          }`
        );
      }
    } catch (error) {
      console.error("Error updating quote number sequence:", error);
    }
  };

  const initializeQuoteNumber = () => {
    // Don't auto-generate quote number if we're editing an existing quote
    if (id && quoteDataLoaded) return;

    try {
      const savedConfig = localStorage.getItem("quoteNumberConfig");
      let configToUse = { ...quoteNumberConfig };

      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        configToUse = { ...quoteNumberConfig, ...parsedConfig };
        setQuoteNumberConfig(configToUse);
      }

      if (configToUse.autoGenerate && !id) {
        const nextNumber = getNextQuoteNumber();
        configToUse.nextNumber = nextNumber;

        const { prefix, digitLength, suffix } = configToUse;
        const paddedNumber = nextNumber.toString().padStart(digitLength, "0");
        const newQuoteNumber = `${prefix}${paddedNumber}${suffix}`;

        handleFormDataChange("number", newQuoteNumber);
        setQuoteNumberConfig(configToUse);
      }
    } catch (error) {
      console.error("Error initializing quote number:", error);
      if (!id) {
        handleFormDataChange("number", "QT-000001");
      }
    }
  };

  const handleQuoteNumberConfigChange = (newConfig) => {
    const updatedConfig = {
      ...quoteNumberConfig,
      ...newConfig,
    };

    setQuoteNumberConfig(updatedConfig);
    localStorage.setItem("quoteNumberConfig", JSON.stringify(updatedConfig));

    console.log("Quote number config updated:", updatedConfig);
  };

  const generateManualQuoteNumber = () => {
    const nextNumber = getNextQuoteNumber();
    const updatedConfig = {
      ...quoteNumberConfig,
      nextNumber: nextNumber,
    };

    setQuoteNumberConfig(updatedConfig);
    localStorage.setItem("quoteNumberConfig", JSON.stringify(updatedConfig));

    const newQuoteNumber = generateNextQuoteNumber();
    handleFormDataChange("number", newQuoteNumber);
  };

  const toggleAutoGeneration = (enabled) => {
    const updatedConfig = {
      ...quoteNumberConfig,
      autoGenerate: enabled,
    };

    handleQuoteNumberConfigChange(updatedConfig);

    if (enabled) {
      const nextNumber = getNextQuoteNumber();
      updatedConfig.nextNumber = nextNumber;
      setQuoteNumberConfig(updatedConfig);

      const newQuoteNumber = generateNextQuoteNumber();
      handleFormDataChange("number", newQuoteNumber);
    }
  };

  const generateNewQuoteForNext = () => {
    if (quoteNumberConfig.autoGenerate) {
      const newQuoteNumber = generateNextQuoteNumber();
      handleFormDataChange("number", newQuoteNumber);
    }
  };

  // GENERIC FORM DATA HANDLER
  const handleFormDataChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ITEMS HANDLER
  const handleItemsChange = (newItems) => {
    setFormData((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  // UPDATE SINGLE ITEM
  const updateItem = (itemId, updates) => {
    const newItems = formData.items.map((item) => {
      if (item.id === itemId) {
        const updatedItem = { ...item, ...updates };

        // Calculate amount when quantity, rate, discount, or discountType changes
        if (
          updates.hasOwnProperty("quantity") ||
          updates.hasOwnProperty("rate") ||
          updates.hasOwnProperty("discount") ||
          updates.hasOwnProperty("discount_type")
        ) {
          const quantity = parseFloat(updatedItem.quantity) || 0;
          const rate = parseFloat(updatedItem.rate) || 0;
          const discount = parseFloat(updatedItem.discount) || 0;
          const discountType = updatedItem.discount_type || "%";

          const subtotal = quantity * rate;
          let discountAmount = 0;

          if (discountType === "%") {
            discountAmount = (subtotal * discount) / 100;
          } else if (discountType === "AED") {
            discountAmount = discount;
          }

          updatedItem.amount = Math.max(0, subtotal - discountAmount);
        }

        return updatedItem;
      }
      return item;
    });

    handleItemsChange(newItems);
  };

  const updateSingleField = (itemId, field, value) => {
    updateItem(itemId, { [field]: value });
  };

  // Set default quote date and initialize quote number on mount
  useEffect(() => {
    if (!quoteDataLoaded && !id) {
      const today = new Date().toISOString().split("T")[0];
      handleFormDataChange("date", today);
      initializeQuoteNumber();
    }
  }, [quoteDataLoaded, id]);

  // Update the quote number when config changes (only for new quotes)
  useEffect(() => {
    if (quoteNumberConfig.autoGenerate && !id && !quoteDataLoaded) {
      const newQuoteNumber = generateNextQuoteNumber();
      handleFormDataChange("number", newQuoteNumber);
    }
  }, [
    quoteNumberConfig.prefix,
    quoteNumberConfig.digitLength,
    quoteNumberConfig.suffix,
    quoteNumberConfig.nextNumber,
    id,
    quoteDataLoaded,
  ]);

  // CALCULATE TOTALS
  const calculateTotals = () => {
    const subtotal = formData.items.reduce(
      (sum, item) => sum + (item.amount || 0),
      0
    );

    const taxBreakdown = formData.items.reduce((acc, item) => {
      if (
        item.tax &&
        item.amount > 0 &&
        item.tax !== "Exempt" &&
        item.tax !== "Out of Scope"
      ) {
        const taxRate = item.tax;
        if (!acc[taxRate]) {
          acc[taxRate] = 0;
        }

        const taxMatch = taxRate.match(/(\d+(?:\.\d+)?)/);
        const taxPercentage = taxMatch ? parseFloat(taxMatch[0]) : 0;
        const taxAmount = (item.amount * taxPercentage) / 100;
        acc[taxRate] += taxAmount;
      }
      return acc;
    }, {});

    const totalTax = Object.values(taxBreakdown).reduce(
      (sum, tax) => sum + tax,
      0
    );
    const grandTotal = subtotal + totalTax;

    return {
      subtotal,
      taxBreakdown,
      totalTax,
      grandTotal,
    };
  };

  // UPDATED CREATE/UPDATE QUOTE API FUNCTION
  const handleCreateQuote = async (isDraft = false) => {
    // Validation
    if (!formData.customer_id) {
      Swal.fire("Error", "Please select a customer", "error");
      return;
    }

    if (!formData.date) {
      Swal.fire("Error", "Please select a quote date", "error");
      return;
    }

    if (!formData.supply_place) {
      Swal.fire("Error", "Please select place of supply", "error");
      return;
    }

    // Check if there are valid items
    const validItems = formData.items.filter(
      (item) =>
        item.description &&
        parseFloat(item.quantity) > 0 &&
        parseFloat(item.rate) > 0
    );

    if (validItems.length === 0) {
      Swal.fire("Error", "Please add at least one valid item", "error");
      return;
    }

    setIsSavingQuote(true);
    setSaveMode(isDraft ? "draft" : "send");

    try {
      // Helper function to get tax ID from tax value
      const getTaxId = (taxValue) => {
        if (!taxValue) return null;

        // For hardcoded options
        if (taxValue === "Exempt" || taxValue === "Out of Scope") {
          return null;
        }

        // For API taxes, find the matching tax
        const matchedTax = taxes.find((tax) => tax.value === taxValue);
        return matchedTax ? matchedTax.id : null;
      };

      // Calculate totals
      const totals = calculateTotals();

      // Prepare quote data using formData
      const quoteData = {
        // Customer Information
        customer_id: formData.customer_id,

        // Quote Details
        number: formData.number,
        reference: formData.reference,
        date: formData.date,
        expiry_date: formData.expiry_date || null,
        sales_person_id: formData.sales_person_id,
        project_id: formData.project_id || null,
        supply_place: formData.supply_place,
        tax_treatment: formData.tax_treatment,
        subject: formData.subject,
        tax_preference: formData.tax_preference,
        notes: formData.notes,
        terms_condition: formData.terms_condition,
        template: formData.template,

        // Financial totals
        sub_total: parseFloat(totals.subtotal.toFixed(2)),
        discount: parseFloat(formData.discount || 0),
        shipping_charge: parseFloat(formData.shipping_charge || 0),
        adjustment: parseFloat(formData.adjustment || 0),
        tcs_tds: parseFloat(formData.tcs_tds) || null,
        tcs_tds_id: formData.tcs_tds_id || null,
        total: parseFloat(
          (
            totals.grandTotal +
            parseFloat(formData.shipping_charge || 0) +
            parseFloat(formData.adjustment || 0) +
            parseFloat(formData.tcs_tds || 0) -
            parseFloat(formData.discount || 0)
          ).toFixed(2)
        ),

        // Items
        items: validItems.map((item) => ({
          item_id: item.item_id,
          description: item.description,
          quantity: parseFloat(item.quantity),
          rate: parseFloat(item.rate),
          discount: parseFloat(item.discount || 0),
          discount_type: item.discount_type,
          tax_id: getTaxId(item.tax),
          amount: parseFloat(item.amount),
        })),

        // Status
        status: isDraft ? "draft" : "sent",
      };

      // Add quote ID for update
      if (id) {
        quoteData.quote_id = id;
      }

      console.log("Quote data being sent to API:", quoteData);

      let response;
      if (id) {
        response = await UPDATE_QUOTES(quoteData);
      } else {
        // Create new quote
        response = await CREATE_QUOTES(quoteData);
      }

      console.log({ response });

      if (response.result) {
        // Update quote number sequence after successful creation (only for new quotes)
        if (!id && quoteNumberConfig.autoGenerate) {
          updateQuoteNumberSequence(formData.number);
        }

        // Success handling
        const action = id ? "updated" : "created";
        const message = isDraft
          ? `Quote ${action} as draft successfully`
          : `Quote ${action} and sent successfully`;

        Swal.fire({
          title: "Success!",
          text: message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          if (!id && quoteNumberConfig.autoGenerate) {
            generateNewQuoteForNext();
          }
        });

        console.log(`Quote ${action} successfully:`, response);
      } else {
        Swal.fire({
          title: "Error",
          text: response.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error saving quote:", error);

      let errorMessage = `Failed to ${
        id ? "update" : "save"
      } quote. Please try again.`;

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSavingQuote(false);
      setSaveMode("");
    }
  };

  // RESET FORM FUNCTION
  const resetForm = (generateNewNumber = true) => {
    const today = new Date().toISOString().split("T")[0];

    let quoteNumber = "QT-000001";

    if (generateNewNumber && quoteNumberConfig.autoGenerate) {
      quoteNumber = generateNextQuoteNumber();
    }

    setFormData({
      // Customer Information
      customer_id: null,
      customerData: null,

      // Quote Basic Details
      number: quoteNumber,
      reference: "",
      date: today,
      expiry_date: "",
      sales_person_id: null,
      salespersonData: null,
      project_id: "",
      projectData: null,
      supply_place: "Dubai",
      tax_treatment: "Non VAT Registered",
      subject: "",
      tax_preference: "",
      notes: "Looking forward for your business.",
      terms_condition: "",
      template: "standard",

      // Financial Fields
      sub_total: 0,
      discount: 0,
      shipping_charge: 0,
      adjustment: 0,
      tcs_tds: null,
      tcs_tds_id: null,
      total: 0,

      // Items Array
      items: [
        {
          id: 1,
          item_id: null,
          description: "",
          quantity: 1.0,
          rate: 0.0,
          discount: 0,
          discount_type: "%",
          tax_id: null,
          tax: "",
          amount: 0.0,
          isEditing: true,
        },
      ],

      // Status
      status: "draft",
    });

    // Reset UI states
    setCustomerDropdownOpen(false);
    setSalespersonDropdownOpen(false);
    setProjectDropdownOpen(false);
    setShowNewProjectModal(false);
    setSearchQuery("");
    setSearchTerm("");
    setSelectedProject(null);
  };

  // Fetch Salespersons
  const fetchSalespersons = async (searchTerm = "", resetPage = false) => {
    setIsLoadingSalespersons(true);
    setSalespersonError(null);

    try {
      const currentPage = resetPage ? 1 : salespersonPage;
      const body = {
        search: searchTerm,
        page: currentPage,
        limit: salespersonLimit,
      };

      const response = await GET_ALL_SALESPERSONS(body);

      const transformedSalespersons = (
        response.data ||
        response.salespersons ||
        response.list ||
        []
      ).map((salesperson) => ({
        id: salesperson.sp_id || salesperson.id,
        name: salesperson.sp_name || salesperson.name || "",
        email: salesperson.sp_email || salesperson.email || "",
        phone: salesperson.sp_phone || salesperson.phone || "",
        initial: generateInitial(salesperson.sp_name || salesperson.name || ""),
      }));

      if (resetPage || currentPage === 1) {
        setSalespersons(transformedSalespersons);
      } else {
        setSalespersons((prev) => [...prev, ...transformedSalespersons]);
      }

      const totalCount =
        response.total_count || response.total || response.count || 0;
      const totalPages = Math.ceil(totalCount / salespersonLimit);
      setSalespersonHasMore(currentPage < totalPages);

      if (resetPage) {
        setSalespersonPage(1);
      }
    } catch (error) {
      console.error("Error fetching salespersons:", error);
      setSalespersonError("Failed to fetch salespersons");
      Swal.fire("Error", "Failed to fetch salespersons", "error");
    } finally {
      setIsLoadingSalespersons(false);
    }
  };

  // Load more salespersons
  const loadMoreSalespersons = async () => {
    if (salespersonHasMore && !isLoadingSalespersons) {
      setSalespersonPage((prev) => prev + 1);
    }
  };

  // Handle salesperson search
  const handleSalespersonsSearch = (searchTerm) => {
    setSalespersonSearchTerm(searchTerm);

    if (salespersonSearchTimeout) {
      clearTimeout(salespersonSearchTimeout);
    }

    const newTimeout = setTimeout(() => {
      setSalespersonPage(1);
      fetchSalespersons(searchTerm, true);
    }, 300);

    setSalespersonSearchTimeout(newTimeout);
  };

  // Fetch salespersons on mount
  useEffect(() => {
    fetchSalespersons("", true);
  }, []);

  // Fetch salespersons when page changes
  useEffect(() => {
    if (salespersonPage > 1) {
      fetchSalespersons(salespersonSearchTerm);
    }
  }, [salespersonPage]);

  // Cleanup salesperson search timeout
  useEffect(() => {
    return () => {
      if (salespersonSearchTimeout) {
        clearTimeout(salespersonSearchTimeout);
      }
    };
  }, [salespersonSearchTimeout]);

  // Add Project API Functions
  const fetchProjects = async (searchTerm = "", resetPage = false) => {
    setIsLoadingProjects(true);
    setProjectError(null);

    try {
      const currentPage = resetPage ? 1 : projectPage;
      const body = {
        search: searchTerm,
        page: currentPage,
        limit: projectLimit,
      };

      const response = await GET_ALL_PROJECTS(body);

      const transformedProjects = (
        response.data ||
        response.projects ||
        response.list ||
        []
      ).map((project) => ({
        id: project.p_id || project.id,
        name: project.p_name || project.name || "",
        code: project.p_code || project.code || "",
        description: project.p_description || project.description || "",
        status: project.p_status || project.status || "",
        customer_id: project.p_customer_id || project.customer_id || null,
        initial: generateInitial(project.p_name || project.name || ""),
      }));

      if (resetPage || currentPage === 1) {
        setProjects(transformedProjects);
      } else {
        setProjects((prev) => [...prev, ...transformedProjects]);
      }

      const totalCount =
        response.total_count || response.total || response.count || 0;
      const totalPages = Math.ceil(totalCount / projectLimit);
      setProjectHasMore(currentPage < totalPages);

      if (resetPage) {
        setProjectPage(1);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjectError("Failed to fetch projects");
      Swal.fire("Error", "Failed to fetch projects", "error");
    } finally {
      setIsLoadingProjects(false);
    }
  };

  // Load more projects
  const loadMoreProjects = async () => {
    if (projectHasMore && !isLoadingProjects) {
      setProjectPage((prev) => prev + 1);
    }
  };

  // Handle project search
  const handleProjectsSearch = (searchTerm) => {
    setProjectSearchTerm(searchTerm);

    if (projectSearchTimeout) {
      clearTimeout(projectSearchTimeout);
    }

    const newTimeout = setTimeout(() => {
      setProjectPage(1);
      fetchProjects(searchTerm, true);
    }, 300);

    setProjectSearchTimeout(newTimeout);
  };

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects("", true);
  }, []);

  // Fetch projects when page changes
  useEffect(() => {
    if (projectPage > 1) {
      fetchProjects(projectSearchTerm);
    }
  }, [projectPage]);

  // Cleanup project search timeout
  useEffect(() => {
    return () => {
      if (projectSearchTimeout) {
        clearTimeout(projectSearchTimeout);
      }
    };
  }, [projectSearchTimeout]);

  // Fetch Taxes
  const fetchTaxes = async (searchTerm = "", resetPage = false) => {
    setIsLoadingTaxes(true);
    setTaxError(null);

    try {
      const currentPage = resetPage ? 1 : taxPage;
      const body = {
        search: searchTerm,
        page: currentPage,
        limit: taxLimit,
      };

      const response = await GET_ALL_TAXES(body);

      const transformedTaxes = (
        response.data ||
        response.taxes ||
        response.list ||
        []
      ).map((tax) => ({
        id: tax.tax_id || tax.id,
        name: tax.tax_name || tax.name || "",
        rate: parseFloat(tax.tax_rate || tax.rate || 0),
        type: tax.tax_type || tax.type || "",
        description: tax.tax_description || tax.description || "",
        label: tax.tax_name
          ? `${tax.tax_name} [${tax.tax_rate || 0}%]`
          : `Tax ${tax.tax_rate || 0}%`,
        value: tax.tax_name
          ? `${tax.tax_name} ${tax.tax_rate || 0}%`
          : `TAX ${tax.tax_rate || 0}%`,
      }));

      if (resetPage || currentPage === 1) {
        setTaxes(transformedTaxes);
      } else {
        setTaxes((prev) => [...prev, ...transformedTaxes]);
      }

      const totalCount =
        response.total_count || response.total || response.count || 0;
      const totalPages = Math.ceil(totalCount / taxLimit);
      setTaxHasMore(currentPage < totalPages);

      if (resetPage) {
        setTaxPage(1);
      }
    } catch (error) {
      console.error("Error fetching taxes:", error);
      setTaxError("Failed to fetch taxes");
      Swal.fire("Error", "Failed to fetch taxes", "error");
    } finally {
      setIsLoadingTaxes(false);
    }
  };

  // Load more taxes
  const loadMoreTaxes = async () => {
    if (taxHasMore && !isLoadingTaxes) {
      setTaxPage((prev) => prev + 1);
    }
  };

  // Handle tax search
  const handleTaxSearch = (searchTerm) => {
    setTaxSearchTerm(searchTerm);

    if (taxSearchTimeout) {
      clearTimeout(taxSearchTimeout);
    }

    const newTimeout = setTimeout(() => {
      setTaxPage(1);
      fetchTaxes(searchTerm, true);
    }, 300);

    setTaxSearchTimeout(newTimeout);
  };

  // Fetch taxes on mount
  useEffect(() => {
    fetchTaxes("", true);
  }, []);

  // Fetch taxes when page changes
  useEffect(() => {
    if (taxPage > 1) {
      fetchTaxes(taxSearchTerm);
    }
  }, [taxPage]);

  // Cleanup tax search timeout
  useEffect(() => {
    return () => {
      if (taxSearchTimeout) {
        clearTimeout(taxSearchTimeout);
      }
    };
  }, [taxSearchTimeout]);

  // Create Tax
  const handleCreateTax = async (taxData) => {
    setIsCreatingTax(true);

    try {
      const response = await CREATE_TAX({
        tax_name: taxData.name,
        tax_rate: taxData.rate,
      });

      const newTax = {
        id: response.tax_id || Date.now(),
        name: taxData.name,
        rate: taxData.rate,
        label: taxData.label,
        value: taxData.value,
        description: response.description || "",
      };

      setTaxes((prevTaxes) => [newTax, ...prevTaxes]);
      Swal.fire("Success", "Tax created successfully", "success");
    } catch (error) {
      console.error("Error creating tax:", error);
      Swal.fire("Error", "Failed to create tax", "error");
    } finally {
      setIsCreatingTax(false);
    }
  };

  // Fetch Customers
  const fetchCustomers = async (filterLabel = "", resetPage = false) => {
    setIsLoadingCustomers(true);
    setCustomerError(null);

    try {
      const currentPage = resetPage ? 1 : page;
      const body = {
        search: searchTerm,
        page: currentPage,
        limit,
        filters: filterLabel,
      };

      const response = await customer_list(body);

      const transformedData = (response.list || []).map((customer) => ({
        ...customer,
        id: customer.cu_id,
        name:
          customer.cu_display_name || customer.cu_name || customer.name || "",
        company: customer.cu_company_name || customer.company || "",
        initial: generateInitial(
          customer.cu_display_name || customer.cu_name || customer.name || ""
        ),
        email: customer.cu_email || customer.email || "",
        phone: customer.cu_phone || customer.phone || "",
      }));

      if (resetPage || currentPage === 1) {
        setCustomers(transformedData || []);
      } else {
        setCustomers((prev) => [...prev, ...(transformedData || [])]);
      }

      setTotalPages(Math.ceil((response.total_count || 0) / limit));
      setHasMore(currentPage < Math.ceil((response.total_count || 0) / limit));

      if (resetPage) {
        setPage(1);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomerError("Failed to fetch customers");
      Swal.fire("Error", "Failed to fetch customers", "error");
    } finally {
      setIsLoadingCustomers(false);
    }
  };

  // Updated project select handler
  const handleProjectSelect = (project) => {
    handleFormDataChange("project_id", project.id);
    handleFormDataChange("projectData", project);
    setProjectDropdownOpen(false);
    setProjectSearchTerm("");
  };

  // Fetch customers on mount
  useEffect(() => {
    fetchCustomers("", true);
  }, []);

  // Fetch customers when page changes
  useEffect(() => {
    if (page > 1) {
      fetchCustomers();
    }
  }, [page]);

  // Fetch Items
  const fetchItems = async (searchTerm = "", resetPage = false) => {
    setIsLoadingItems(true);
    setItemsError(null);

    try {
      const currentPage = resetPage ? 1 : itemsPage;
      const body = {
        search: searchTerm,
        page: currentPage,
        limit: itemsLimit,
      };

      const response = await GET_ALL_ITEMS(body);

      const transformedItems = (
        response.data ||
        response.items ||
        response.list ||
        []
      ).map((item) => ({
        id: item.i_id,
        name: item.i_name,
        rate: parseFloat(item.i_sales_price || 0),
        tax: item.tax || item.tax_rate || "VAT 5%",
        description: item.i_sales_description || "",
        unit: item.i_weight_unit || item.uom || "pcs",
      }));

      if (resetPage || currentPage === 1) {
        setAvailableItems(transformedItems);
      } else {
        setAvailableItems((prev) => [...prev, ...transformedItems]);
      }

      const totalCount =
        response.total_count || response.total || response.count || 0;
      const totalPages = Math.ceil(totalCount / itemsLimit);
      setItemsHasMore(currentPage < totalPages);

      if (resetPage) {
        setItemsPage(1);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      setItemsError("Failed to fetch items");
      Swal.fire("Error", "Failed to fetch items", "error");
    } finally {
      setIsLoadingItems(false);
    }
  };

  // Load more items
  const loadMoreItems = async () => {
    if (itemsHasMore && !isLoadingItems) {
      setItemsPage((prev) => prev + 1);
    }
  };

  // Handle items search
  const handleItemsSearch = (searchTerm) => {
    setItemsSearchTerm(searchTerm);

    if (itemsSearchTimeout) {
      clearTimeout(itemsSearchTimeout);
    }

    const newTimeout = setTimeout(() => {
      setItemsPage(1);
      fetchItems(searchTerm, true);
    }, 300);

    setItemsSearchTimeout(newTimeout);
  };

  // Fetch items on mount
  useEffect(() => {
    fetchItems("", true);
  }, []);

  // Fetch items when page changes
  useEffect(() => {
    if (itemsPage > 1) {
      fetchItems(itemsSearchTerm);
    }
  }, [itemsPage]);

  // Cleanup items search timeout
  useEffect(() => {
    return () => {
      if (itemsSearchTimeout) {
        clearTimeout(itemsSearchTimeout);
      }
    };
  }, [itemsSearchTimeout]);

  // Customer selection handler
  const handleCustomerSelect = (customer) => {
    handleFormDataChange("customer_id", customer.id);
    handleFormDataChange("customerData", customer);

    // ✅ NEW: Set customer's tax treatment automatically
    // Map customer tax treatment field (adjust field name based on your API response)
    const customerTaxTreatment =
      customer.cu_tax_treatment ||
      customer.tax_treatment ||
      customer.taxTreatment ||
      "Non VAT Registered"; // Default fallback

    handleFormDataChange("tax_treatment", customerTaxTreatment);

    setCustomerDropdownOpen(false);
    setSearchQuery("");
    setSearchTerm("");
  };

  // Salesperson selection handler
  const handleSalespersonSelect = (salesperson) => {
    handleFormDataChange("sales_person_id", salesperson.id);
    handleFormDataChange("salespersonData", salesperson);
    setSalespersonDropdownOpen(false);
    setSalespersonSearchTerm("");
  };

  // Add new item row
  const addNewRow = () => {
    const newItem = {
      id: Date.now(),
      item_id: null,
      description: "",
      quantity: 1.0,
      rate: 0.0,
      discount: 0,
      discount_type: "%",
      tax_id: null,
      tax: "",
      amount: 0.0,
      isEditing: true,
    };
    handleItemsChange([...formData.items, newItem]);
  };

  // Remove item
  const removeItem = (itemId) => {
    const newItems = formData.items.filter((item) => item.id !== itemId);
    handleItemsChange(newItems);
  };

  // Select item from dropdown
  const selectItem = (itemId, selectedItem) => {
    updateItem(itemId, {
      item_id: selectedItem.id,
      description: selectedItem.name,
      rate: selectedItem.rate,
      tax: selectedItem.tax,
      isEditing: false,
    });
    setItemDropdownOpen(null);
    setItemSearchQuery("");
  };

  // Deselect item
  const deselectItem = (itemId) => {
    updateItem(itemId, {
      description: "",
      rate: 0,
      tax: "",
      isEditing: true,
      amount: 0,
    });
    setItemDropdownOpen(itemId);
    setItemSearchQuery("");
  };

  // Item action handler
  const handleItemAction = (action, item) => {
    setSelectedItemForModal(item);
    setModalType(action);
    setShowItemModal(true);
    setItemActionsDropdown(null);
  };

  // Close item modal
  const closeItemModal = () => {
    setShowItemModal(false);
    setSelectedItemForModal(null);
  };

  // Handler functions
  const handleOpenCustomerDetails = () => setShowCustomerDetailsModal(true);
  const handleCloseCustomerDetails = () => {
    setCustomerDetailsData(null);
    setShowCustomerDetailsModal(false);
  };
  const handleExternalLinkClick = (customerData) => {};
  const handleOpenSalesPerson = () => setShowSlaesPersonModal(true);
  const handleCloseSalesPerson = () => setShowSlaesPersonModal(false);
  const handleNewCustomer = () => {
    setCustomerDropdownOpen(false);
    console.log("Opening new customer form...");
  };

  // Add new project handler
  const handleNewProject = () => {
    setProjectDropdownOpen(false);
    setShowNewProjectModal(true);
  };

  // Handle project creation from modal
  const handleCreateProject = async (projectData) => {
    try {
      // Prepare project data for API
      const apiProjectData = {
        p_name: projectData.projectName,
        p_code: projectData.projectCode,
        p_description: projectData.description,
        p_customer_id: projectData.customerId,
        p_billing_method: projectData.billingMethod,
        p_total_cost: parseFloat(projectData.totalProjectCost) || 0,
        p_cost_budget: parseFloat(projectData.costBudget) || 0,
        p_revenue_budget: parseFloat(projectData.revenueBudget) || 0,
        p_add_to_watchlist: projectData.addToWatchlist,
        users: projectData.users,
        tasks: projectData.tasks,
      };

      // Call the API to create project
      const response = await CREATE_PROJECT(apiProjectData);

      if (response.result) {
        // Create project object from response
        const newProject = {
          id: response.project_id || response.data?.p_id || Date.now(),
          name: projectData.projectName,
          code: projectData.projectCode,
          description: projectData.description,
          status: "Active",
          customer_id: projectData.customerId,
          initial: projectData.projectName.charAt(0).toUpperCase(),
        };

        // Add to projects list
        setProjects((prev) => [newProject, ...prev]);

        // Select the new project
        handleProjectSelect(newProject);

        // Close modal
        setShowNewProjectModal(false);

        // Show success message
        Swal.fire({
          title: "Success!",
          text: "Project created successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        console.log("Project created:", newProject);
      } else {
        throw new Error(response.message || "Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);

      let errorMessage = "Failed to create project. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire("Error", errorMessage, "error");
    }
  };

  // Modal handlers
  const handleSaveBilling = (data) => {
    console.log("Billing address saved:", data);
  };
  const handleSaveShipping = (data) => {
    console.log("Shipping address saved:", data);
  };
  const getSaveHandler = () =>
    modalType === "billing" ? handleSaveBilling : handleSaveShipping;

  // Tax tooltip handlers
  const toggleTaxTooltip = () => {
    setShowTaxTooltip((prev) => !prev);
  };
  const closeTaxTooltip = () => {
    setShowTaxTooltip(false);
  };

  // Search handler
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchTerm(value);
    setPage(1);
  };

  // Places of supply
  const placesOfSupply = [
    { id: 1, name: "Dubai" },
    { id: 2, name: "Abu Dhabi" },
    { id: 3, name: "Sharjah" },
    { id: 4, name: "Ajman" },
  ];

  // Filter functions
  const filteredItems = availableItems?.filter((item) =>
    item?.name?.toLowerCase().includes(itemSearchQuery?.toLowerCase())
  );

  const filteredSalespersons = salespersons.filter(
    (salesperson) =>
      salesperson.name
        .toLowerCase()
        .includes(salespersonSearchTerm.toLowerCase()) ||
      salesperson.email
        .toLowerCase()
        .includes(salespersonSearchTerm.toLowerCase())
  );

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add filtered projects
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(projectSearchTerm.toLowerCase()) ||
      (project.code &&
        project.code.toLowerCase().includes(projectSearchTerm.toLowerCase())) ||
      (project.description &&
        project.description
          .toLowerCase()
          .includes(projectSearchTerm.toLowerCase()))
  );

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setCustomerDropdownOpen(false);
        setSalespersonDropdownOpen(false);
        setProjectDropdownOpen(false);
        setPlaceOfSupplyDropdownOpen(false);
      }

      if (!event.target.closest(".item-dropdown-container")) {
        setItemDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calculate current totals
  const totals = calculateTotals();

  // Show loading state while fetching quote data
  if (fetchingQuoteData) {
    return (
      <div className="bg-white min-h-screen w-full text-gray-700">
        <div className="p-6">
          <div className="flex justify-center items-center h-64">
            <div className="flex items-center space-x-3">
              <Loader className="w-6 h-6 animate-spin text-blue-500" />
              <div className="text-lg text-gray-600">Loading quote data...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen w-full text-gray-700">
      <div className="p-6 space-y-6">
        {/* Update the page title */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {id ? "Edit Quote" : "Create New Quote"}
          </h1>
        </div>

        {/* Customer Name */}
        <div className="flex items-center space-x-2 w-3/5">
          <label className="text-red-500 font-medium w-32 text-sm">
            Customer Name*
          </label>
          <div className="relative flex-1 dropdown-container">
            <div
              className="border border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white text-sm"
              onClick={() => setCustomerDropdownOpen(!customerDropdownOpen)}
            >
              <span className="text-gray-500">
                {formData.customerData?.name || "Select or add a customer"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {customerDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                {/* Search Input */}
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-8 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {isLoadingCustomers && (
                      <Loader className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin" />
                    )}
                  </div>
                </div>

                {/* Customer List */}
                <div className="max-h-60 overflow-y-auto">
                  {filteredCustomers.length > 0 ? (
                    <>
                      {filteredCustomers.map((customer) => (
                        <div
                          key={customer.id}
                          className={`flex items-center p-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                            formData.customerData?.id === customer.id
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : ""
                          }`}
                          onClick={() => handleCustomerSelect(customer)}
                        >
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold mr-3 ${
                              formData.customerData?.id === customer.id
                                ? "bg-white text-blue-500"
                                : "bg-blue-500 text-white"
                            }`}
                          >
                            {customer.initial}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`font-medium text-sm truncate ${
                                formData.customerData?.id === customer.id
                                  ? "text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              {customer.name}
                            </div>
                            <div
                              className={`text-xs truncate ${
                                formData.customerData?.id === customer.id
                                  ? "text-blue-100"
                                  : "text-gray-500"
                              }`}
                            >
                              {customer.company}
                            </div>
                          </div>
                          {formData.customerData?.id === customer.id && (
                            <div className="ml-2">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="p-4 text-center">
                      <div className="text-sm text-gray-500">
                        {searchTerm
                          ? "No customers found for your search"
                          : "No customers found"}
                      </div>
                    </div>
                  )}
                </div>

                {/* New Customer Button */}
                <div className="border-t border-gray-100 p-3">
                  <button
                    className="flex items-center w-full text-left p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors group"
                    onClick={handleNewCustomer}
                  >
                    <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">New Customer</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Currency Display */}
          {formData.customerData && (
            <div className="flex items-center justify-end mt-2">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-gray-700 font-medium text-sm">
                  {formData.customerData?.cu_currency}
                </span>
              </div>
            </div>
          )}
        </div>

        {formData.customerData && (
          <>
            {/* Address Section */}
            <div className="ml-36">
              <div className="mt-4 grid grid-cols-2 gap-6">
                {/* Billing Section */}
                <div>
                  <h4 className="text-gray-600 font-medium mb-2 text-sm">
                    BILLING ADDRESS
                  </h4>
                  <CommonButton
                    onClick={() => {
                      setModalType("billing");
                      setModalOpen(true);
                    }}
                    label="New Address"
                    className="text-blue-500 text-sm hover:text-blue-700 transition-colors"
                  />
                </div>

                {/* Shipping Section */}
                <div>
                  <h4 className="text-gray-600 font-medium mb-2 text-sm">
                    SHIPPING ADDRESS
                  </h4>
                  <CommonButton
                    onClick={() => {
                      setModalType("shipping");
                      setModalOpen(true);
                    }}
                    label="New Address"
                    className="text-blue-500 text-sm hover:text-blue-700 transition-colors"
                  />
                </div>
              </div>

              {/* Tax Treatment */}
              <div className="mt-8 relative inline-block">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 text-sm">Tax Treatment:</span>
                  <h1 className="text-gray-900 font-medium text-sm focus:outline-none">
                    {formData.tax_treatment}
                  </h1>
                  <CommonButton
                    label={<Edit className="w-4 h-4" />}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    onClick={toggleTaxTooltip}
                  />
                </div>

                {/* Tooltip on click */}
                {showTaxTooltip && (
                  <TaxPreferencesDialog onClose={closeTaxTooltip} />
                )}
              </div>
            </div>

            {/* Place of Supply */}
            <div className="flex items-center space-x-2 text-sm">
              <label className="text-red-500 font-medium w-32 text-sm">
                Place of Supply*
              </label>
              <div className="relative w-2/5 dropdown-container">
                <div
                  className="border border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white"
                  onClick={() =>
                    setPlaceOfSupplyDropdownOpen(!placeOfSupplyDropdownOpen)
                  }
                >
                  <span className="text-gray-900 font-medium">
                    {formData.supply_place || "Select place of supply"}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>

                {placeOfSupplyDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-10">
                    <div className="max-h-48 overflow-y-auto">
                      {placesOfSupply.map((place) => (
                        <div
                          key={place.id}
                          className="p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                          onClick={() => {
                            handleFormDataChange("supply_place", place.name);
                            setPlaceOfSupplyDropdownOpen(false);
                          }}
                        >
                          <div className="font-medium text-gray-900">
                            {place.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Quote Number - UPDATED WITH AUTO-INCREMENT */}
        <div className="flex items-center space-x-2 relative">
          <label className="text-red-500 font-medium w-32 text-sm">
            Quote*
          </label>
          <div className="relative w-2/5">
            <input
              type="text"
              value={formData.number}
              onChange={(e) => {
                handleFormDataChange("number", e.target.value);
                // Disable auto-generation if manually edited
                if (quoteNumberConfig.autoGenerate) {
                  handleQuoteNumberConfigChange({ autoGenerate: false });
                }
              }}
              className={`border border-gray-300 rounded px-3 py-2 w-full pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                quoteNumberConfig.autoGenerate
                  ? "bg-gray-50 text-gray-600"
                  : "bg-white text-gray-900"
              }`}
              placeholder="Quote number will be auto-generated"
              readOnly={quoteNumberConfig.autoGenerate}
            />

            <div className="flex items-center space-x-1 absolute right-1 top-1 bottom-1">
              {/* Auto-generate toggle button */}
              {!quoteNumberConfig.autoGenerate && (
                <button
                  onClick={() => toggleAutoGeneration(true)}
                  className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors font-medium"
                  title="Enable auto-generation"
                >
                  Auto
                </button>
              )}

              {/* Refresh button for auto-generated numbers */}
              {quoteNumberConfig.autoGenerate && (
                <button
                  onClick={generateManualQuoteNumber}
                  className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Generate new quote number"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              )}

              {/* Settings button */}
              <div className="group relative">
                <button
                  onClick={() => setConfigureModalOpen(true)}
                  className="px-2 py-1 text-blue-700 hover:bg-blue-50 rounded transition-colors"
                  title="Configure quote number settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <div className="absolute w-64 -top-8 right-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10">
                  Configure quote number format and auto-generation settings.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reference Number */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-900 font-medium w-32 text-sm">
            Reference#
          </label>
          <input
            type="text"
            value={formData.reference}
            onChange={(e) => handleFormDataChange("reference", e.target.value)}
            className="border text-sm border-gray-300 rounded px-3 py-2 w-2/5 focus:outline-none"
          />
        </div>

        {/* Quote Date & Expiry Date */}
        <div className="flex items-center space-x-2">
          <label className="text-red-500 font-medium w-32 text-sm">
            Quote Date*
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleFormDataChange("date", e.target.value)}
            className="border text-sm border-gray-300 rounded px-3 py-2 w-1/4 focus:outline-none"
          />
          <span className="text-gray-900 font-medium w-32 text-sm ml-20">
            Expiry Date
          </span>
          <input
            type="date"
            value={formData.expiry_date}
            onChange={(e) =>
              handleFormDataChange("expiry_date", e.target.value)
            }
            className="border text-sm border-gray-300 rounded px-3 py-2 w-1/4 focus:outline-none"
          />
        </div>

        {/* Salesperson */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-900 font-medium w-32 text-sm">
            Salesperson
          </label>
          <div className="relative w-2/5 dropdown-container">
            <div
              className="border text-sm border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white"
              onClick={() =>
                setSalespersonDropdownOpen(!salespersonDropdownOpen)
              }
            >
              <span className="text-gray-500">
                {formData.salespersonData?.name || "Select or Add Salesperson"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {salespersonDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                {/* Search Input */}
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={salespersonSearchTerm}
                      onChange={(e) => handleSalespersonsSearch(e.target.value)}
                      className="w-full pl-10 pr-8 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {isLoadingSalespersons && (
                      <Loader className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin" />
                    )}
                  </div>
                </div>

                {/* Salesperson List */}
                <div className="max-h-60 overflow-y-auto">
                  {salespersonError ? (
                    <div className="p-4 text-center">
                      <div className="text-sm text-red-500 mb-2">
                        {salespersonError}
                      </div>
                      <button
                        onClick={() => fetchSalespersons("", true)}
                        className="text-blue-500 text-sm hover:underline"
                      >
                        Retry
                      </button>
                    </div>
                  ) : filteredSalespersons.length > 0 ? (
                    <>
                      {filteredSalespersons.map((salesperson) => (
                        <div
                          key={salesperson.id}
                          className={`flex items-center p-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                            formData.salespersonData?.id === salesperson.id
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : ""
                          }`}
                          onClick={() => handleSalespersonSelect(salesperson)}
                        >
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold mr-3 ${
                              formData.salespersonData?.id === salesperson.id
                                ? "bg-white text-blue-500"
                                : "bg-blue-500 text-white"
                            }`}
                          >
                            {salesperson.initial}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`font-medium text-sm truncate ${
                                formData.salespersonData?.id === salesperson.id
                                  ? "text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              {salesperson.name}
                            </div>
                            <div
                              className={`text-xs truncate ${
                                formData.salespersonData?.id === salesperson.id
                                  ? "text-blue-100"
                                  : "text-gray-500"
                              }`}
                            >
                              {salesperson.email}
                            </div>
                          </div>
                          {formData.salespersonData?.id === salesperson.id && (
                            <div className="ml-2">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Load More Button for Pagination */}
                      {salespersonHasMore && (
                        <div className="p-3 border-t border-gray-100">
                          <button
                            onClick={loadMoreSalespersons}
                            disabled={isLoadingSalespersons}
                            className="w-full text-center text-blue-500 text-sm hover:bg-blue-50 py-2 rounded transition-colors disabled:opacity-50"
                          >
                            {isLoadingSalespersons ? "Loading..." : "Load More"}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-4 text-center">
                      <div className="text-sm text-gray-500">
                        {salespersonSearchTerm
                          ? "No salespersons found for your search"
                          : "No salespersons found"}
                      </div>
                    </div>
                  )}
                </div>

                {/* Manage Salespersons Button */}
                <div className="border-t border-gray-100 p-3">
                  <button
                    className="flex items-center w-full text-left p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors group"
                    onClick={handleOpenSalesPerson}
                  >
                    <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">
                      Manage Salespersons
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Name - UPDATED WITH DROPDOWN */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-900 font-medium w-32 text-sm">
            Project Name
          </label>
          <div className="relative w-2/5 dropdown-container">
            <div
              className="border border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between bg-white text-sm"
              onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
            >
              <span className="text-gray-500">
                {formData.projectData?.name || "Select or add a project"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {projectDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                {/* Search Input */}
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search projects"
                      value={projectSearchTerm}
                      onChange={(e) => handleProjectsSearch(e.target.value)}
                      className="w-full pl-10 pr-8 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {isLoadingProjects && (
                      <Loader className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin" />
                    )}
                  </div>
                </div>

                {/* Project List */}
                <div className="max-h-60 overflow-y-auto">
                  {projectError ? (
                    <div className="p-4 text-center">
                      <div className="text-sm text-red-500 mb-2">
                        {projectError}
                      </div>
                      <button
                        onClick={() => fetchProjects("", true)}
                        className="text-blue-500 text-sm hover:underline"
                      >
                        Retry
                      </button>
                    </div>
                  ) : filteredProjects.length > 0 ? (
                    <>
                      {filteredProjects.map((project) => (
                        <div
                          key={project.id}
                          className={`flex items-center p-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                            formData.projectData?.id === project.id
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : ""
                          }`}
                          onClick={() => handleProjectSelect(project)}
                        >
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold mr-3 ${
                              formData.projectData?.id === project.id
                                ? "bg-white text-blue-500"
                                : "bg-blue-500 text-white"
                            }`}
                          >
                            {project.initial}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`font-medium text-sm truncate ${
                                formData.projectData?.id === project.id
                                  ? "text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              {project.name}
                            </div>
                            <div
                              className={`text-xs truncate ${
                                formData.projectData?.id === project.id
                                  ? "text-blue-100"
                                  : "text-gray-500"
                              }`}
                            >
                              {project.code
                                ? `Code: ${project.code}`
                                : "No code"}
                              {project.status && ` | ${project.status}`}
                            </div>
                          </div>
                          {formData.projectData?.id === project.id && (
                            <div className="ml-2">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Load More Button for Pagination */}
                      {projectHasMore && (
                        <div className="p-3 border-t border-gray-100">
                          <button
                            onClick={loadMoreProjects}
                            disabled={isLoadingProjects}
                            className="w-full text-center text-blue-500 text-sm hover:bg-blue-50 py-2 rounded transition-colors disabled:opacity-50"
                          >
                            {isLoadingProjects ? "Loading..." : "Load More"}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-4 text-center">
                      <div className="text-sm text-gray-500">
                        {projectSearchTerm
                          ? "No projects found for your search"
                          : "No projects found"}
                      </div>
                    </div>
                  )}
                </div>

                {/* New Project Button */}
                <div className="border-t border-gray-100 p-3">
                  <button
                    className="flex items-center w-full text-left p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors group"
                    onClick={handleNewProject}
                  >
                    <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">New Project</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Project Details Display */}
          {formData.projectData && (
            <div className="flex items-center justify-end mt-2">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 font-medium text-sm">
                  {formData.projectData.status || "Active"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Subject */}
        <div className="flex items-start space-x-2 w-2/5">
          <div className="flex items-center space-x-1 w-32 text-sm">
            <label className="text-gray-900 font-medium">Subject</label>
            <div className="relative group">
              <CommonButton
                label={<HelpCircle className="w-4 h-4 text-gray-400" />}
              />
              <div className="absolute w-64 -top-16 right-0 left-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-50">
                You can enter up to 250 characters. If you do not require this
                field, you can mark it as inactive under quote preferences.
              </div>
            </div>
          </div>
          <textarea
            placeholder="Let your customer know what this Quote is for"
            value={formData.subject}
            onChange={(e) => handleFormDataChange("subject", e.target.value)}
            maxLength="250"
            className="border border-gray-300 rounded px-3 py-2 w-3/4 h-20 resize-none"
          />
        </div>

        {/* Item Table */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Item Table</h3>
            <button className="text-blue-500 text-sm hover:underline flex items-center gap-1">
              Bulk Actions
            </button>
          </div>

          <div
            className="border border-gray-300 rounded-lg"
            style={{ overflow: "visible" }}
          >
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-300">
              <div className="grid grid-cols-12 gap-2 px-4 py-3 text-xs font-medium text-gray-600 uppercase tracking-wide">
                <div className="col-span-4">ITEM DETAILS</div>
                <div className="col-span-1 text-center">QUANTITY</div>
                <div className="col-span-1 text-center">RATE</div>
                <div className="col-span-1 text-center">DISCOUNT</div>
                <div className="col-span-3 text-center">TAX</div>
                <div className="col-span-1 text-right">AMOUNT</div>
                <div className="col-span-1"></div>
              </div>
            </div>

            {/* Table Body */}
            <div className="bg-white" style={{ overflow: "visible" }}>
              {formData.items.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 items-center"
                >
                  {/* Item Details */}
                  <div className="col-span-4">
                    <div className="item-dropdown-container relative">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 relative">
                          {item.isEditing || !item.description ? (
                            <>
                              <input
                                type="text"
                                placeholder="Type or click to select an item."
                                value={
                                  itemDropdownOpen === item.id
                                    ? itemSearchQuery
                                    : item.description
                                }
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setItemSearchQuery(value);
                                  updateSingleField(
                                    item.id,
                                    "description",
                                    value
                                  );
                                  if (!itemDropdownOpen) {
                                    setItemDropdownOpen(item.id);
                                  }
                                }}
                                onFocus={() => {
                                  setItemDropdownOpen(item.id);
                                  setItemSearchQuery(item.description || "");
                                }}
                                onClick={() => {
                                  setItemDropdownOpen(item.id);
                                  setItemSearchQuery(item.description || "");
                                }}
                                className="w-full text-sm text-gray-700 bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />

                              {/* Item Dropdown */}
                              {itemDropdownOpen === item.id && (
                                <div
                                  className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl min-w-[350px]"
                                  style={{
                                    position: "absolute",
                                    zIndex: 1000,
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                  }}
                                >
                                  {filteredItems.length > 0 ? (
                                    <div className="max-h-48 overflow-y-auto">
                                      {filteredItems.map((availableItem) => (
                                        <div
                                          key={availableItem.id}
                                          className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            selectItem(item.id, availableItem);
                                          }}
                                        >
                                          <div className="font-medium text-gray-900 text-sm">
                                            {availableItem.name}
                                          </div>
                                          <div className="text-xs text-gray-500 mt-1">
                                            Rate:{" "}
                                            {availableItem.rate.toFixed(2)} |
                                            Tax: {availableItem.tax}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="p-3 text-sm text-gray-500 text-center">
                                      {itemSearchQuery
                                        ? `No items found for "${itemSearchQuery}"`
                                        : "No items found"}
                                    </div>
                                  )}
                                  <div className="p-2 border-t border-gray-100">
                                    <button
                                      className="flex items-center space-x-2 text-blue-500 text-sm w-full hover:bg-blue-50 p-2 rounded transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("Add new item clicked");
                                      }}
                                    >
                                      <Plus className="w-4 h-4" />
                                      <span>Add New Item</span>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div
                                className="cursor-pointer hover:text-blue-600 py-2 px-3 border border-green-300 rounded bg-green-50 transition-colors flex-1"
                                onClick={() => {
                                  updateSingleField(item.id, "isEditing", true);
                                  setItemDropdownOpen(item.id);
                                  setItemSearchQuery(item.description);
                                }}
                              >
                                <div className="text-sm font-medium text-gray-900 flex items-center">
                                  <span className="text-green-600 mr-2">✓</span>
                                  {item.description}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Rate: {item.rate} | Tax: {item.tax}
                                </div>
                              </div>

                              {/* Action buttons for selected items */}
                              <div className="flex items-center space-x-1 ml-2">
                                <div className="item-actions-container relative">
                                  <button
                                    onClick={() =>
                                      setItemActionsDropdown(
                                        itemActionsDropdown === item.id
                                          ? null
                                          : item.id
                                      )
                                    }
                                    className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100"
                                    title="More actions"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                  </button>

                                  {/* Actions Dropdown */}
                                  {itemActionsDropdown === item.id && (
                                    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl z-50 min-w-[120px]">
                                      <div className="py-1">
                                        <button
                                          onClick={() =>
                                            handleItemAction("edit", item)
                                          }
                                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                        >
                                          <Edit className="w-3 h-3 mr-2" />
                                          Edit Item
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleItemAction("view", item)
                                          }
                                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                        >
                                          <Search className="w-3 h-3 mr-2" />
                                          View Details
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <button
                                  className="p-1 text-gray-400 hover:text-red-500 rounded hover:bg-red-50"
                                  onClick={() => deselectItem(item.id)}
                                  title="Deselect item"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateSingleField(item.id, "quantity", e.target.value)
                      }
                      className="w-full text-center border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      step="0.01"
                      min="0"
                    />
                  </div>

                  {/* Rate */}
                  <div className="col-span-1">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        updateSingleField(item.id, "rate", e.target.value)
                      }
                      className="w-full text-center border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      step="0.01"
                      min="0"
                    />
                  </div>

                  {/* Discount */}
                  <div className="col-span-1">
                    <div className="flex items-center space-x-1">
                      <input
                        type="number"
                        value={item.discount}
                        onChange={(e) =>
                          updateSingleField(item.id, "discount", e.target.value)
                        }
                        className="w-16 text-center border border-gray-300 rounded px-1 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        max="100"
                      />
                      <select
                        value={item.discount_type || "%"}
                        onChange={(e) =>
                          updateSingleField(
                            item.id,
                            "discount_type",
                            e.target.value
                          )
                        }
                        className="w-16 border border-gray-300 rounded px-1 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="%">%</option>
                        <option value="AED">AED</option>
                      </select>
                    </div>
                  </div>

                  {/* Tax */}
                  <div className="col-span-3 items-center text-center">
                    <CustomTaxDropdown
                      value={item.tax}
                      onChange={(selectedTax) =>
                        updateSingleField(item.id, "tax", selectedTax)
                      }
                      className="w-1/2 mx-auto"
                      taxes={taxes}
                      isLoadingTaxes={isLoadingTaxes}
                      taxError={taxError}
                      onTaxSearch={handleTaxSearch}
                      onLoadMoreTaxes={loadMoreTaxes}
                      taxHasMore={taxHasMore}
                      onCreateTax={handleCreateTax}
                    />
                  </div>

                  {/* Amount */}
                  <div className="col-span-1 text-right">
                    <span className="text-sm font-medium text-gray-900">
                      {item.amount.toFixed(2)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <div className="col-span-1 text-center">
                    <button
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                      onClick={() => removeItem(item.id)}
                      title="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Row Button */}
          <div className="flex space-x-4 mt-4">
            <button
              className="flex items-center space-x-2 text-blue-500 text-sm hover:bg-blue-50 px-3 py-2 rounded border border-transparent hover:border-blue-200 transition-colors"
              onClick={addNewRow}
            >
              <Plus className="w-4 h-4" />
              <span>Add New Row</span>
            </button>
          </div>

          {/* Totals */}
          <div className="mt-8 flex justify-end">
            <div className="w-80">
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Sub Total</span>
                  <span className="text-sm font-medium">
                    {totals.subtotal.toFixed(2)}
                  </span>
                </div>

                {Object.entries(totals.taxBreakdown).map(
                  ([taxRate, amount]) => (
                    <div
                      key={taxRate}
                      className="flex justify-between items-center py-1"
                    >
                      <span className="text-sm text-gray-600">{taxRate}</span>
                      <span className="text-sm">{amount.toFixed(2)}</span>
                    </div>
                  )
                )}

                {totals.totalTax > 0 && (
                  <div className="flex justify-between items-center py-2 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Total Tax</span>
                    <span className="text-sm font-medium">
                      {totals.totalTax.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">
                      Total ( {formData.customerData?.cu_currency || "AED"} )
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {totals.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Notes */}
        <div className="mt-8">
          <label className="text-gray-900 font-medium block mb-2">
            Customer Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleFormDataChange("notes", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 h-20"
          />
        </div>

        {/* Terms & Conditions */}
        <div className="mt-6">
          <label className="text-gray-900 font-medium block mb-2">
            Terms & Conditions
          </label>
          <textarea
            placeholder="Enter the terms and conditions of your business to be displayed in your transaction"
            value={formData.terms_condition}
            onChange={(e) =>
              handleFormDataChange("terms_condition", e.target.value)
            }
            className="w-full border border-gray-300 rounded px-3 py-2 h-24"
          />
          <div className="mt-2 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Attach Files to Quote</span>
              <div className="flex items-center space-x-2 mt-1">
                <button className="flex items-center space-x-1 text-blue-500 border border-blue-500 rounded px-2 py-1 text-xs">
                  <Upload className="w-3 h-3" />
                  <span>Upload File</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                You can upload a maximum of 5 files, 10MB each
              </div>
            </div>
          </div>
        </div>

        {/* Additional Fields Note */}
        <div className="text-sm text-gray-600 mt-6">
          <span className="font-medium">Additional Fields:</span> Start adding
          custom fields for your quotes by going to Settings ⚙️ Sales ➤ Quotes
        </div>

        {/* Action Buttons - UPDATE LABELS */}
        <div className="flex space-x-4 mt-8 pt-6 border-t">
          <button
            onClick={() => handleCreateQuote(true)}
            disabled={isSavingQuote}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSavingQuote && saveMode === "draft" && (
              <Loader className="w-4 h-4 animate-spin" />
            )}
            <span>
              {isSavingQuote && saveMode === "draft"
                ? id
                  ? "Updating..."
                  : "Saving..."
                : id
                ? "Update as Draft"
                : "Save as Draft"}
            </span>
          </button>

          <button
            onClick={() => handleCreateQuote(false)}
            disabled={isSavingQuote}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSavingQuote && saveMode === "send" && (
              <Loader className="w-4 h-4 animate-spin" />
            )}
            <span>
              {isSavingQuote && saveMode === "send"
                ? id
                  ? "Updating..."
                  : "Saving..."
                : id
                ? "Update and Send"
                : "Save and Send"}
            </span>
          </button>

          <button
            onClick={resetForm}
            disabled={isSavingQuote}
            className="text-gray-500 px-4 py-2 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Fixed Customer Details Button on Right Edge */}
      {formData.customerData && !showCustomerDetailsModal && (
        <button
          onClick={() => {
            setCustomerDetailsData(formData.customerData);
            handleOpenCustomerDetails();
          }}
          className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-4 rounded-l-lg shadow-lg transition-all duration-200 hover:px-4 z-30 group"
        >
          <div className="flex items-center space-x-2">
            <div className="transform whitespace-nowrap text-sm font-medium">
              {formData.customerData.name}'s Details
            </div>
            <ChevronDown className="w-4 h-4 transform rotate-90 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      )}

      {/* Modals - UPDATED TO PASS REQUIRED PROPS */}
      <BillingAddressFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        addressType={modalType}
        onSave={getSaveHandler()}
      />

      <QuoteNumberPreferences
        isOpen={configureModalOpen}
        onClose={() => setConfigureModalOpen(false)}
        currentConfig={quoteNumberConfig}
        onConfigChange={handleQuoteNumberConfigChange}
        source="quote"
      />

      {/* Customer Details Panel */}
      {showCustomerDetailsModal && customerDetailsData && (
        <CustomerDetailsModal
          isOpen={showCustomerDetailsModal}
          onClose={handleCloseCustomerDetails}
          customerData={formData.customerData}
          onExternalLinkClick={handleExternalLinkClick}
        />
      )}

      {showSalesPersonModal && (
        <ManageSalespersonsModal
          isOpen={showSalesPersonModal}
          onClose={handleCloseSalesPerson}
          onSelectSalesperson={handleSalespersonSelect}
        />
      )}

      <ItemModal
        isOpen={showItemModal}
        onClose={closeItemModal}
        item={selectedItemForModal}
        mode={modalType}
      />

      <ProjectModal
        isOpen={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
        onSave={handleCreateProject}
        customers={customers}
        isLoadingCustomers={isLoadingCustomers}
        onCustomerSearch={(searchTerm) => {
          setSearchTerm(searchTerm);
          setPage(1);
          fetchCustomers("", true);
        }}
        onLoadMoreCustomers={() => {
          if (hasMore && !isLoadingCustomers) {
            setPage((prev) => prev + 1);
          }
        }}
        customerHasMore={hasMore}
      />
    </div>
  );
}
