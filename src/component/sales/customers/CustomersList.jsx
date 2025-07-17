import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  ChevronDown,
  Plus,
  MoreVertical,
  HelpCircle,
  ChevronUp,
  Search,
  Star,
} from "lucide-react";
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
    id: "active",
    label: "Active Accounts",
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

  const customerDefaultFilters = [
    { id: 'all', label: 'All Customers', count: 150 },
    { id: 'active', label: 'Active Customers', count: 120 },
    { id: 'crm', label: 'CRM Customers', count: 45 },
    { id: 'duplicate', label: 'Duplicate Customers', count: 8 },
    { id: 'inactive', label: 'Inactive Customers', count: 30 },
    { id: 'portal-enabled', label: 'Customer Portal Enabled', count: 25 },
    { id: 'portal-disabled', label: 'Customer Portal Disabled', count: 95 },
    { id: 'overdue', label: 'Overdue Customers', count: 12 },
    { id: 'unpaid', label: 'Unpaid Customers', count: 18 }
  ];

  const customerCustomFilters = [
    { id: 'sample-custom', label: 'Sample custom view', count: 5, hasDropdown: true },
    { id: 'my-vip-customers', label: 'My VIP Customers', count: 10 }
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
    console.log('Customer filter selected:', filter);
    // Add your customer filtering logic here
  };

  const handleDeleteSelected = () => {
    // Optional: Confirm before deleting
    if (
      window.confirm("Are you sure you want to delete the selected records?")
    ) {
      const filtered = customers.filter(
        (customer) => !selectedRows.includes(customer.id)
      );
      setCustomers(filtered);
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

  // Toggle star status
  const toggleStar = (id) => {
    setCustomersfilter((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, starred: !item.starred } : item
      )
    );
  };
  //------------------

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemClick = (label, id) => {
    setActiveFilter(label);
    fetchItems(id);
    setIsOpen(false);
  };

  const filteredItems = itemsfilter
    .filter((item) =>
      item.label.toLowerCase().includes(searchTermfilter.toLowerCase())
    )
    .sort((a, b) => (b.starred ? 1 : 0) - (a.starred ? 1 : 0)); // starred items first

  //---------------------

  const handleClickOutside = (e) => {
    if (dropdownRefd.current && !dropdownRefd.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (label) => {
    console.log("Selected:", label);

    if (label === "Import Items") {
      setShowCsvConverter(true);
    }
    setOpen(false); // Close the dropdown when an item is selected
  };

  const closeCsvConverter = () => {
    setShowCsvConverter(false); // Close the CSV converter
  };

  const fetchItems = async (label) => {
    try {
      const body = {
        search: searchTerm,
        page,
        limit,
        filters: label,
      };
      const response = await customer_list(body);

      const transformedData = (response.list || []).map((customer) => ({
        ...customer,
        id: customer.cu_id, // Map cu_id to id
      }));

      setCustomers(transformedData || []);
      setTotalPages(response.total_count || 1);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch items", "error");
    }
  };

  //------------------------------

  const fetchItemscustom = async (label) => {
    try {
      const body = {
        search: searchTerm,
        page,
        limit,
        filters: label,
      };
      const response = await customer_list(body);
      const transformedData = (response.list || []).map((customer) => ({
        ...customer,
        id: customer.cu_id, // Map cu_id to id
      }));
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
