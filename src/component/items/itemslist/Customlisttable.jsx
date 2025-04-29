import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Plus,
  Star,
  Search,
  Upload,
  Download,
  ChevronRight,
  Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  custom_list,
  deleteitems,
  GET_ALL_ITEMS,
} from "../../../api/services/authService";

export default function Customlisttable() {
  const Navi = useNavigate();
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  //-----------List============

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ usage: "" });
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Can make this dynamic
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [searchTerm, filters, page]);

  const fetchItems = async (label) => {
    try {
      const body = {
        search: searchTerm,
        page,
        limit,
        filters: label,
      };
      const response = await GET_ALL_ITEMS(body);
      setItems(response.list || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch items", "error");
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  //------------->>>>>--deletee-<<<<---------
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedIds(items.map((item) => item.id)); // select all
    } else {
      setSelectedIds([]); // deselect all
    }
  };

  const handleDelete = async (ids) => {
    const result = await Swal.fire({
      title: "Confirm Deletion",
      text: `You’re about to delete ${
        Array.isArray(ids) ? ids.length : 1
      } item(s). This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      const payload = { items: Array.isArray(ids) ? ids : [ids] };
      console.log("Deleting items:", payload);

      try {
        const res = await deleteitems(payload); // your API call
        console.log("API raw response:", res);

        const results = res?.result;

        if (!results || !Array.isArray(results)) {
          throw new Error("Invalid API response structure");
        }

        // Log each item response individually
        results.forEach((item) => {
          console.log(
            `Item ID ${item.item_id}: ${item.message}, Success: ${item.result}`
          );
        });

        // Prepare message summary for SweetAlert
        const messages = results
          .map((item) => `Item ID ${item.item_id}: ${item.message}`)
          .join("\n");

        const allSuccess = results.every((item) => item.result === true);

        Swal.fire({
          title: allSuccess ? "Deleted!" : "Partial Success",
          text: messages,
          icon: allSuccess ? "success" : "warning",
        });
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "Something went wrong while deleting item(s).",
          icon: "error",
        });
      }
    }
  };

  const handleEdit = (itemId) => {
    Navi("/detail_product", { state: { item_id: itemId } });
  };

  ///-----------filter Search--------------//
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Active Items");
  const [searchTermfilter, setSearchTermfilter] = useState("");
  const [itemsfilter, setItemsfilter] = useState([]);
  const [loadingfilter, setLoadingfilter] = useState(false);
  const dropdownRef = useRef(null);
  const staticMenuItems = [
    { id: "all", label: "All", starred: false },
    { id: "active", label: "Active", starred: false },
    { id: "inactive", label: "Inactive", starred: false },
    { id: "sales", label: "Sales", starred: false },
    { id: "purchases", label: "Purchases", starred: true },
    { id: "services", label: "Services", starred: false },
    { id: "inventory", label: "Inventory Items", starred: false },
    { id: "non_inventory", label: "Non-inventory Items", starred: false },
    { id: "returnable", label: "Returnable", starred: false },
    { id: "non_returnable", label: "Non Returnable", starred: false },
    { id: "ungrouped", label: "Ungrouped", starred: false },
  ];

  const fetchData = async () => {
    setLoadingfilter(true);
    try {
      const body = { table: "items" };
      const response = await custom_list(body);
      const customItems = response.data || [];

      const formattedCustomItems = customItems.map((item) => ({
        id: `custom_${item.id}`,
        label: item.label || item.cv_name || "Unnamed",
        starred: item.cv_is_favorite || 0,
        isCustom: true,
      }));

      const combinedItems = [...staticMenuItems, ...formattedCustomItems];
      setItemsfilter(combinedItems);
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
    setItemsfilter((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, starred: !item.starred } : item
      )
    );
  };
  //------------------

  useEffect(() => {
    fetchData();
  }, []);

  //-------------------

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

  const [open, setOpen] = useState(false);
  const dropdownRefd = useRef(null);

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
    setOpen(false);
  };

  const menuItemsd = [
    {
      icon: <Download className="w-5 h-5 text-gray-500 mr-3" />,
      label: "Import Items",
    },
    {
      icon: <Upload className="w-5 h-5 text-gray-500 mr-3" />,
      label: "Export Items",
    },
    {
      icon: <Upload className="w-5 h-5 text-gray-500 mr-3" />,
      label: "Export Current View",
    },
    // {
    //   icon: <Settings className="w-5 h-5 text-gray-500 mr-3" />,
    //   label: "Preferences",
    // },
    // {
    //   icon: <RefreshCw className="w-5 h-5 text-gray-500 mr-3" />,
    //   label: "Refresh List",
    // },
    // {
    //   icon: <RotateCcw className="w-5 h-5 text-gray-500 mr-3" />,
    //   label: "Reset Column Width",
    // },
  ];

  return (
    <div className="bg-white h-screen w-full">
      <div className="flex justify-between items-center ">
        <div className="relative w-64" ref={dropdownRef}>
          {/* Dropdown Header */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex justify-between items-center w-full px-4 py-2 text-left bg-white border border-gray-200 rounded-md shadow-sm text-gray-800 font-medium"
          >
            <span>{activeFilter}</span>
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              {/* Search Input */}
              <div className="p-2 border-b">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search"
                    value={searchTermfilter}
                    onChange={(e) => setSearchTermfilter(e.target.value)}
                  />
                  <Search
                    className="absolute left-2 top-2.5 text-gray-400"
                    size={16}
                  />
                </div>
              </div>

              {/* Menu Items */}
              <div className="max-h-64 overflow-y-auto">
                {loadingfilter ? (
                  <div className="py-3 text-center text-gray-500">
                    Loading...
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex justify-between items-center px-4 py-3 hover:bg-gray-100 cursor-pointer ${
                        item.label === "Purchases"
                          ? "bg-blue-500 text-white"
                          : ""
                      }`}
                      onClick={() => handleItemClick(item.label, item.id)}
                    >
                      <span>{item.label}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(item.id);
                        }}
                        className={`focus:outline-none ${
                          item.label === "Purchases"
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      >
                        <Star
                          size={16}
                          fill={item.starred ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Custom View Button */}
              <div className="px-4 py-2 border-t border-gray-200">
                <a href="/CustomViewBuilder">
                  <button className="flex items-center text-blue-500 hover:text-blue-600 font-medium">
                    <Plus size={18} className="mr-1" />
                    <span>New Custom View</span>
                  </button>
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => Navi("AddItems")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus className="mr-1 h-4 w-4" /> New
          </button>
          <div className="relative inline-block text-left" ref={dropdownRefd}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="text-gray-600 border border-gray-300 px-4 py-2 rounded-md"
            >
              <MoreVertical className="h-5 w-5" />
            </button>

            {open && (
              <div className="absolute right-0 top-14 w-64 bg-white shadow-lg rounded border border-gray-200 z-50">
                <div className="p-2">
                  <div className="flex items-center justify-between px-3 py-2 bg-blue-500 text-white rounded mb-1">
                    <span className="font-medium">Sort by</span>
                    <ChevronRight className="w-5 h-5" />
                  </div>

                  {menuItemsd.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelect(item.label)}
                      className="flex items-center px-3 py-2 hover:bg-blue-500 rounded cursor-pointer transition-colors"
                    >
                      {item.icon}
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* <button className="bg-orange-400 text-white px-2 rounded-md">
            <HelpCircle className="h-5 w-5" />
          </button> */}
        </div>
      </div>

      <div className="w-full overflow-x-auto mt-4">
        <input
          type="text"
          placeholder="Search items..."
          className="p-1 border border-gray-400 rounded-md w-64 mb-4 "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          {selectedIds.length > 0 && (
            <div className="p-3">
              <button
                onClick={() => handleDelete(selectedIds)}
                className="bg-red-500 flex  text-white px-3 py-1 rounded text-sm m"
              >
                Delete Selected ({selectedIds.length})
                <span className="ml-3 mt-0.9">
                  <Trash size={16} />
                </span>
              </button>
            </div>
          )}

          <table className="min-w-full text-xs text-left text-gray-700">
            <thead className=" bg-gray-100 border-b border-gray-300">
              <tr className="text-center">
                <th className="px-2 py-1 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th
                  className="px-2   py-1  text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    <span>NAME</span>
                  </div>
                </th>
                <th className="px-2 py-1  text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  SKU
                </th>
                <th className="px-2 py-1 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Purchase Rate
                </th>
                <th className="px-2 py-1 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Purchase Description
                </th>
                <th className="px-2 py-1 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Sale Rate
                </th>
                <th className="px-2 py-1 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Sale Description
                </th>
                <th className="px-2 py-1 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Stock on Hand
                </th>
                <th className="px-2 py-1 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.i_id}
                  className="border-b text-center border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-2 py-1 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedIds.includes(item.i_id)}
                      onChange={() => handleCheckboxChange(item.i_id)}
                    />
                  </td>
                  <td className="px-2 py-1">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded mr-2 flex items-center justify-center text-gray-400">
                        {item.i_image ? (
                          <img
                            src={`${import.meta.env.VITE_BASE_URL}/${
                              item.i_image
                            }`}
                            alt={item.i_name}
                            className="w-8 h-8 rounded object-cover"
                          />
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-blue-500">{item.i_name}</span>
                    </div>
                  </td>
                  <td className="px-2 py-1">{item.i_sku}</td>
                  <td className="px-2 py-1">{item.i_purchase_price}</td>
                  <td className="px-2 py-1">{item.i_purchase_description}</td>
                  <td className="px-2 py-1">{item.i_sales_price}</td>
                  <td className="px-2 py-1">{item.i_sales_description}</td>
                  <td className="px-2 py-1">{item.handsOnStock}</td>
                  <td className="px-2 py-1 flex gap-2 text-center">
                    <button
                      className="text-blue-500 hover:underline text-center text-xs cursor-pointer"
                      onClick={() => handleEdit(item.i_id)}
                    >
                      Edit
                    </button>
                    {/* <button
                      className="text-red-500 hover:underline text-xs"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
