import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Plus, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FilterModal from "./FilterModal";
import CommonButton from "../../CommonUI/buttons/CommonButton";
import CustomerTable from "./CustomerTable";
import ImportCustomersModal from "./sort/importCustomer/ImportCustomersModal";
import ExportCustomersModal from "./sort/exportCustomer/ExportCustomersModal";
import SortOptionsDropdown from "./sort/SortOptionsDropdown";
import ExportCurrentView from "./sort/exportCurrentView/ExportCurrentView";
import { custom_list } from "../../../api/services/authService";
import { customer_list } from "../../../api/services/sales/createCustomer";
import { getFirstWordInCaps } from "../../../lib/utils";
import { ReusableFilterDropdown } from "./filterMenus/ReusableFilterDropdown";

const allColumns = [
  {
    accessor: "cu_id",
    key: "id",
  },
  {
    label: "Name",
    accessor: "cu_display_name",
    key: "name",
    transform: "capitalizeWords",
  },
  {
    label: "Company Name",
    accessor: "cu_company_name",
    key: "companyName",
    transform: (value) => {
      return getFirstWordInCaps(value);
    },
  },
  { label: "Email", accessor: "cu_email", key: "email" },
  { label: "Work Phone", accessor: "cu_phone", key: "workPhone" },
  { label: "Receivables (BCY)", accessor: "receivables", key: "receivables" },
  {
    label: "Unused Credits (BCY)",
    accessor: "unusedCredits",
    key: "unusedCredits",
  },
  {
    label: "Receivables (BYC)",
    accessor: "receivablesBYC",
    key: "receivablesBYC",
  },
  {
    label: "Unused Credits (BYC)",
    accessor: "unusedCreditsBYC",
    key: "unusedCreditsBYC",
  },
  { label: "Source", accessor: "source", key: "source" },
  { label: "Payment Term", accessor: "paymentTerm", key: "paymentTerm" },
  { label: "Status", accessor: "cu_status", key: "status" },
  { label: "Tax Treatment", accessor: "cu_tax_treatment", key: "taxTreatment" },
  { label: "Website", accessor: "cu_website", key: "website" },
];

export default function CustomersList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showExportCurrentView, setShowExportCurrentView] = useState(false);
  const [loadingfilter, setLoadingfilter] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRefd = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [itemsfilter, setCustomersfilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ usage: "" });
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Can make this dynamic
  const [totalPages, setTotalPages] = useState(1);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importOption, setImportOption] = useState("customers");
  const [activeFilter, setActiveFilter] = useState("All Customers");
  const [searchTermfilter, setSearchTermfilter] = useState("");
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState({
    id: "all",
    label: "All Customers",
  });

  const handleMenuSelect = (label) => {
    if (label === "Import Customers") {
      setShowImportModal(true);
    } else if (label === "Export Customers") {
      setShowExportModal(true);
    } else if (label === "Export Current View") {
      setShowExportCurrentView(true);
    } else if (label === "Preferences") {
      navigate("/customers-vendors");
    }
  };

  const [filterFields, setFilterFields] = useState({
    name: true,
    companyName: true,
    email: true,
    workPhone: true,
    receivables: true,
    unusedCredits: true,
    receivablesBYC: false,
    unusedCreditsBYC: false,
    source: false,
    paymentTerm: false,
    status: false,
    taxTreatment: false,
    website: false,
  });

  const visibleColumns = allColumns.filter((col) => filterFields[col.key]);

  // Dynamic customer filters with counts calculated from actual data
  const customerDefaultFilters = [
    { id: "all", label: "All Customers", count: allCustomers?.length },
    {
      id: "active",
      label: "Active Customers",
      count: allCustomers?.filter(
        (c) => c.cu_status?.toLowerCase() === "active"
      ).length,
    },
    {
      id: "inactive",
      label: "Inactive Customers",
      count: allCustomers?.filter(
        (c) => c.cu_status?.toLowerCase() === "inactive"
      ).length,
    },
    {
      id: "crm",
      label: "CRM Customers",
      count: allCustomers?.filter((c) =>
        c.source?.toLowerCase().includes("crm")
      ).length,
    },
    {
      id: "duplicate",
      label: "Duplicate Customers",
      count: allCustomers?.filter((c) => c.isDuplicate === true).length,
    },
    {
      id: "portal-enabled",
      label: "Customer Portal Enabled",
      count: allCustomers?.filter((c) => c.portalEnabled === true).length,
    },
    {
      id: "portal-disabled",
      label: "Customer Portal Disabled",
      count: allCustomers?.filter((c) => c.portalEnabled === false).length,
    },
    {
      id: "overdue",
      label: "Overdue Customers",
      count: allCustomers?.filter(
        (c) => c.receivables > 0 && c.isOverdue === true
      ).length,
    },
    {
      id: "unpaid",
      label: "Unpaid Customers",
      count: allCustomers?.filter((c) => c.receivables > 0).length,
    },
  ];

  const customerCustomFilters = [
    {
      id: "sample-custom",
      label: "Sample custom view",
      count: 5,
      hasDropdown: true,
    },
    { id: "my-vip-customers", label: "My VIP Customers", count: 10 },
  ];

  const handleRowClick = (id) => {
    navigate(`/CustomerDetailedPage/${id}`);
  };

  const handleNewCustomerView = () => {
    console.log("Creating new customer custom view");
    // Add your new custom view logic here
  };

  const handleCustomerFilterSelect = (filter) => {
    setSelectedCustomerFilter(filter);
    console.log("Customer filter selected:", filter);

    // Apply filtering logic based on filter ID
    let filteredCustomers = [];

    switch (filter.id) {
      case "all":
        filteredCustomers = allCustomers;
        break;
      case "active":
        filteredCustomers = allCustomers.filter(
          (c) => c.cu_status?.toLowerCase() === "active"
        );
        break;
      case "inactive":
        filteredCustomers = allCustomers.filter(
          (c) => c.cu_status?.toLowerCase() === "inactive"
        );
        break;
      case "crm":
        filteredCustomers = allCustomers.filter((c) =>
          c.source?.toLowerCase().includes("crm")
        );
        break;
      case "duplicate":
        filteredCustomers = allCustomers.filter((c) => c.isDuplicate === true);
        break;
      case "portal-enabled":
        filteredCustomers = allCustomers.filter(
          (c) => c.portalEnabled === true
        );
        break;
      case "portal-disabled":
        filteredCustomers = allCustomers.filter(
          (c) => c.portalEnabled === false
        );
        break;
      case "overdue":
        filteredCustomers = allCustomers.filter(
          (c) => c.receivables > 0 && c.isOverdue === true
        );
        break;
      case "unpaid":
        filteredCustomers = allCustomers.filter((c) => c.receivables > 0);
        break;
      default:
        filteredCustomers = allCustomers;
    }

    setCustomers(filteredCustomers);
  };

  const handleDeleteSelected = () => {
    // Optional: Confirm before deleting
    if (
      window.confirm("Are you sure you want to delete the selected records?")
    ) {
      const filtered = customers?.filter(
        (customer) => !selectedRows.includes(customer.id)
      );
      setCustomers(filtered);

      // Also update allCustomers to keep counts accurate
      const filteredAll = allCustomers.filter(
        (customer) => !selectedRows.includes(customer.id)
      );
      setAllCustomers(filteredAll);

      setSelectedRows([]); // Clear selection after deletion
      setSelectAll(false);
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(!selectAll ? customers.map((c) => c.id) : []);
  };

  const fetchData = async () => {
    setLoadingfilter(true);
    try {
      const body = { table: "customer" };
      const response = await custom_list(body);
      const customItems = response.data || [];

      const formattedCustomItems =
        customItems &&
        customItems.map((item) => ({
          id: `custom_${item.id}`,
          label: item.label || item.cv_name || "Unnamed",
          starred: item.cv_is_favorite || 0,
          isCustom: true,
        }));

      const combinedItems = [...staticMenuItems, ...formattedCustomItems];
      setCustomersfilter(combinedItems);
    } catch (err) {
      console.error("Error fetching filters:", err);
    } finally {
      setLoadingfilter(false);
    }
  };

  // Open dropdown and fetch data
  useEffect(() => {
    if (isOpen) fetchData();
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOutside = (e) => {
    if (dropdownRefd.current && !dropdownRefd.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchItems = async (label) => {
    try {
      const body = {
        search: searchTerm,
        page,
        limit: 1000, // Fetch all customers for accurate counting
        filters: label,
      };
      const response = await customer_list(body);

      const transformedData = (response.list || []).map((customer) => ({
        ...customer,
        id: customer.cu_id, // Map cu_id to id
      }));

      // Store all customers for counting purposes
      setAllCustomers(transformedData || []);

      // Apply current filter if any
      if (selectedCustomerFilter.id === "all") {
        setCustomers(transformedData || []);
      } else {
        handleCustomerFilterSelect(selectedCustomerFilter);
      }

      setTotalPages(response.total_count || 1);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch items", "error");
    }
  };

  const fetchItemscustom = async (label) => {
    try {
      const body = {
        search: searchTerm,
        page,
        limit: 1000, // Fetch all customers for accurate counting
        filters: label,
      };
      const response = await customer_list(body);
      const transformedData = (response.list || []).map((customer) => ({
        ...customer,
        id: customer.cu_id, // Map cu_id to id
      }));

      // Store all customers for counting purposes
      setAllCustomers(transformedData || []);
      setCustomers(transformedData || []);
      setTotalPages(response.total_count || 1);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch items", "error");
    }
  };

  useEffect(() => {
    fetchItems();
    fetchItemscustom();
  }, [searchTerm, filters, page]);

  return (
    <div>
      {/* Header section */}
      <div className=" w-full bg-white  ">
        <div className="flex items-center w-full justify-between p-4 border-b ">
          <ReusableFilterDropdown
            selectedFilter={selectedCustomerFilter}
            onFilterSelect={handleCustomerFilterSelect}
            dropdownTitle="All Customers"
            defaultFilters={customerDefaultFilters}
            customFilters={customerCustomFilters}
            onNewCustomView={handleNewCustomerView}
            showSearch={true}
            showNewCustomView={true}
            showStarIcons={true}
            dropdownWidth="w-80"
            showDefaultFilters={false}
          />
          <div className="flex items-center gap-2">
            {selectedRows.length > 0 && (
              <div className="flex justify-end p-4">
                <CommonButton
                  label="Delete Selected"
                  onClick={handleDeleteSelected}
                  className="bg-gray-300 hover:bg-gray-200 text-red-600 px-4 py-2 rounded"
                />
              </div>
            )}
            <CommonButton
              label={
                <div className="flex items-center">
                  <Plus size={20} className="mr-1" /> New
                </div>
              }
              onClick={() =>
                navigate("/CustomersAdd_Details", {
                  state: {
                    title: "Add New Customer",
                    customer_Type: "customer",
                  },
                })
              }
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            />

            <SortOptionsDropdown onMenuSelect={handleMenuSelect} />

            <ImportCustomersModal
              isOpen={showImportModal}
              onClose={() => setShowImportModal(false)}
              selectedOption={importOption}
              setSelectedOption={setImportOption}
            />

            {showExportModal && (
              <ExportCustomersModal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                defaultModule="Customers"
              />
            )}

            {showExportCurrentView && (
              <ExportCurrentView
                isOpen={showExportCurrentView}
                onClose={() => setShowExportCurrentView(false)}
              />
            )}

            <CommonButton
              label={<HelpCircle size={20} />}
              className="p-2 text-white bg-orange-500 hover:bg-orange-600 rounded"
            />
          </div>
        </div>
      </div>
      {/* table */}
      <div className="w-full overflow-x-auto">
        <div className="w-full">
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              {" "}
              {/* optional: set a min-width */}
              <CustomerTable
                columns={visibleColumns}
                data={customers}
                onRowClick={handleRowClick}
                selectedRows={selectedRows}
                onRowSelect={handleRowSelect}
                selectAll={selectAll}
                onSelectAll={handleSelectAll}
                rowHighlightKey={selectedCustomerId}
                onFilterClick={() => setIsFilterModalOpen(true)}
              />
            </div>
          </div>
        </div>
        {isFilterModalOpen && (
          <FilterModal
            filterFields={filterFields}
            setFilterFields={setFilterFields}
            onClose={() => setIsFilterModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
