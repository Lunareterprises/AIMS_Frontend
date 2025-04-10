import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Plus,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GET_ALL_ITEMS } from "../../../api/services/authService";

export default function Itemslistform() {
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

  const fetchItems = async () => {
    try {
      const body = {
        search: searchTerm,
        page,
        limit,
        // filters,
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your delete logic here
        console.log("Item deleted with ID:", id);
        // Example: onDelete(id);
        Swal.fire("Deleted!", "The item has been deleted.", "success");
      }
    });
  };

  const handleEdit = (item) => {
    // Call your edit logic or open modal
    console.log("Edit item:", item);
    // Example: openEditModal(item);
  };

  return (
    <div className="bg-white h-screen w-full">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-gray-800">All Items</h1>
          <ChevronDown className="ml-1 h-5 w-5 text-gray-800" />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => Navi("AddItems")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus className="mr-1 h-4 w-4" /> New
          </button>
          <button className="text-gray-600 border border-gray-300 px-2 rounded-md">
            <MoreVertical className="h-5 w-5" />
          </button>
          <button className="bg-orange-400 text-white px-2 rounded-md">
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <input
          type="text"
          placeholder="Search items..."
          className="p-2 border rounded-md w-64 mb-4 ml-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-2 border rounded-md ml-4"
          value={filters.usage}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, usage: e.target.value }))
          }
        >
          <option value="">All Usage</option>
          <option value="pcs">PCS</option>
          <option value="box">Box</option>
        </select>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-y border-gray-200 bg-gray-50">
              <th className="p-2 w-10">
                <div className="flex items-center justify-center">
                  <input type="checkbox" className="w-4 h-4" />
                </div>
              </th>
              <th
                className="px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  <span className="font-semibold text-gray-600">NAME</span>
                  {sortField === "name" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">
                SKU
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">
                PURCHASE DESCRIPTION
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">
                PURCHASE RATE
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">
                DESCRIPTION
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">
                RATE
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">
                STOCK ON HAND
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">
                USAGE UNIT
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.i_id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-2">
                  <div className="flex items-center justify-center">
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded mr-2 flex items-center justify-center text-gray-400">
                    {item.i_image ? (
            <img
              src={item.i_image}
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
                <td className="px-4 py-2">{item.sku}</td>
                <td className="px-4 py-2">{item.purchaseDescription}</td>
                <td className="px-4 py-2">{item.purchaseRate}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{item.rate}</td>
                <td className="px-4 py-2">{item.stock}</td>
                <td className="px-4 py-2">{item.usage}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
