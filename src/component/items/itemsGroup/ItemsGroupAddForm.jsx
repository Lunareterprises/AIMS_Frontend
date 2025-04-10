import { useEffect, useState } from "react";
import {
  X,
  Info,
  ChevronDown,
  ChevronUp,
  Plus,
  AlertCircle,
} from "lucide-react";
import ImageProps from "../../imageProp/imageProp";
import CustomDropdownSelect from "../../customDropdown/CustomDropdownSelect";
import AddModal from "../../modalComponents/modalComponents";

export default function ItemsGroupAddForm() {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("goods");
  const [isExcise, setIsExcise] = useState(false);
  const [isReturnable, setIsReturnable] = useState(true);
  const [taxType, setTaxType] = useState("taxable");
  const [itemType, setItemType] = useState("inventory");
  const [Unitlist, setUnitlist] = useState([]);

  const [includeOpeningStock, setIncludeOpeningStock] = useState(false);
  const [options, setOptions] = useState([
    { id: 1, value: "red", color: "bg-red-500" },
    { id: 2, value: "white", color: "bg-gray-100" },
    { id: 3, value: "yellow", color: "bg-yellow-400" },
  ]);
  const [items, setItems] = useState([
    {
      id: 1,
      name: "cake-red",
      sku: "",
      costPrice: "",
      sellingPrice: "",
      upc: "0",
      ean: "",
      isbn: "",
      reorderPoint: "",
    },
    {
      id: 2,
      name: "cake-white",
      sku: "",
      costPrice: "",
      sellingPrice: "",
      upc: "0",
      ean: "",
      isbn: "",
      reorderPoint: "",
    },
    {
      id: 3,
      name: "cake-yellow",
      sku: "",
      costPrice: "",
      sellingPrice: "",
      upc: "0",
      ean: "",
      isbn: "",
      reorderPoint: "",
    },
  ]);

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleRemoveOption = (value) => {
    setOptions(options.filter((option) => option.value !== value));
    // Also remove related items
    setItems(items.filter((item) => !item.name.includes(value)));
  };

  //---------------
  const fetchCategories = async () => {
    try {
      const response = await fetch("/data/Units.json");
      const data = await response.json();
      setUnitlist(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChangeselect = (selected) => {
    setSelectedOption(selected);
    console.log("Selected:", selected);
  };

  const AddhandleSubmit = (e) => {
    console.log("Received item:", item);
  };

  return (
    <div className="bg-white rounded-lg shadow w-full ">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-medium text-lg">New Item Group</h2>
        <button className="text-gray-500">
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <div className="space-y-4">
          <div>
            <div className="mb-2">
              <span className="text-sm font-medium">Type</span>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  className="w-4 h-4 text-blue-600"
                  checked={type === "goods"}
                  onChange={() => setType("goods")}
                />
                <span className="ml-2 text-sm">Goods</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="w-4 h-4 text-blue-600"
                  checked={type === "service"}
                  onChange={() => setType("service")}
                />
                <span className="ml-2 text-sm">Service</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Item Group Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              defaultValue="cake"
            />
            <div className="flex items-center mt-1">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600"
                checked={isExcise}
                onChange={() => setIsExcise(!isExcise)}
              />
              <span className="ml-2 text-sm">It is an excise product</span>
              <Info size={16} className="ml-1 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Description
            </label>
            <textarea
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              defaultValue="desc"
            />
          </div>

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600"
              checked={isReturnable}
              onChange={() => setIsReturnable(!isReturnable)}
            />
            <span className="ml-2 text-sm">Returnable Item</span>
            <Info size={16} className="ml-1 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Unit
                <Info size={16} className="inline-block ml-1 text-gray-400" />
              </label>

              <CustomDropdownSelect
                options={Unitlist}
                value={selectedOption}
                onChange={handleChangeselect}
                placeholder="Choose a unit "
                //   onAddNewClick={() => setShowModalAccount(true)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Tax</label>
              <div className="relative">
                <select className="w-full p-2 border rounded appearance-none pr-8 bg-white">
                  <option>Standard Rate (5%)</option>
                </select>
                <div className="absolute right-8 top-3">
                  <X size={16} className="text-gray-400" />
                </div>
                <ChevronDown
                  size={16}
                  className="absolute right-2 top-3 text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Manufacturer
              </label>
              <div className="relative">
                <select className="w-full p-2 border rounded appearance-none pr-8 bg-white">
                  <option>Rakhi</option>
                </select>
                <div className="absolute right-8 top-3">
                  <X size={16} className="text-gray-400" />
                </div>
                <ChevronDown
                  size={16}
                  className="absolute right-2 top-3 text-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Brand</label>
              <div className="relative">
                <select className="w-full p-2 border rounded appearance-none pr-8 bg-white">
                  <option>Iphone</option>
                </select>
                <div className="absolute right-8 top-3">
                  <X size={16} className="text-gray-400" />
                </div>
                <ChevronDown
                  size={16}
                  className="absolute right-2 top-3 text-gray-400"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-1">
              <span className="text-sm font-medium">
                Tax Preference<span className="text-red-500">*</span>
              </span>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  className="w-4 h-4 text-blue-600"
                  checked={taxType === "taxable"}
                  onChange={() => setTaxType("taxable")}
                />
                <span className="ml-2 text-sm">Taxable</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="w-4 h-4 text-blue-600"
                  checked={taxType === "exempt"}
                  onChange={() => setTaxType("exempt")}
                />
                <span className="ml-2 text-sm">Exempt</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Inventory Valuation Method
            </label>
            <div className="relative">
              <select className="w-full p-2 border rounded appearance-none pr-8 bg-white">
                <option>FIFO (First In First Out)</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-2 top-3 text-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* <div className="bg-gray-50 p-6 rounded flex flex-col items-center justify-center h-40">
            <div className="text-gray-400 mb-2">
              <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div className="text-sm text-center text-gray-500">
              Drag image(s) here or<br />
              <span className="text-blue-500">Browse images</span>
            </div>
            <div className="text-xs text-center text-gray-400 mt-2">
              <AlertCircle size={12} className="inline mr-1" />
              You can add up to 15 images, each not exceeding 5 MB in size and 7000 x 7000 pixels resolution.
            </div>
          </div> */}

          <ImageProps />

          <div>
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium">Multiple Items?</span>
              <span className="text-red-500">*</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600"
                defaultChecked={true}
              />
              <span className="ml-2 text-sm">
                Create Attributes and Options
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Attribute<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select className="w-full p-2 border rounded appearance-none pr-8 bg-white">
                  <option>red</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-2 top-3 text-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Options<span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap border rounded p-1 gap-1">
                {options.map((option) => (
                  <span
                    key={option.id}
                    className="inline-flex items-center bg-gray-100 rounded px-2 py-1 text-xs"
                  >
                    {option.value === "red" && (
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                    )}
                    {option.value === "white" && (
                      <span className="w-2 h-2 bg-gray-200 rounded-full mr-1"></span>
                    )}
                    {option.value === "yellow" && (
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></span>
                    )}
                    {option.value}
                    <X
                      size={12}
                      className="ml-1 cursor-pointer"
                      onClick={() => handleRemoveOption(option.value)}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="relative">
              <select className="w-full p-2 border rounded appearance-none pr-8 bg-white">
                <option>eg: color</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-2 top-3 text-gray-400"
              />
            </div>
          </div>

          <div>
            <button className="flex items-center text-blue-500 text-sm">
              <Plus size={16} className="mr-1" />
              Add more attributes
            </button>
          </div>

          <div>
            <div className="mb-2">
              <span className="text-sm font-medium">
                Select your Item Type:
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  className="w-4 h-4 text-blue-600"
                  checked={itemType === "inventory"}
                  onChange={() => setItemType("inventory")}
                />
                <span className="ml-2 text-sm">Inventory</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="w-4 h-4 text-blue-600"
                  checked={itemType === "non-inventory"}
                  onChange={() => setItemType("non-inventory")}
                />
                <span className="ml-2 text-sm">Non-Inventory</span>
              </label>
              <div className="flex items-center ml-auto">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600"
                  checked={includeOpeningStock}
                  onChange={() => setIncludeOpeningStock(!includeOpeningStock)}
                />
                <span className="ml-2 text-sm">Include Opening Stock</span>
                <Info size={16} className="ml-1 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Name<span className="text-red-500">*</span>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
                <Info size={14} className="inline ml-1 text-gray-400" />
                <div className="text-blue-500 text-xs font-normal mt-1">
                  Generate SKU
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost Price (AED)<span className="text-red-500">*</span>
                <div className="text-blue-500 text-xs font-normal mt-1">
                  PER UNIT
                  <br />
                  COPY TO ALL
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Selling Price (AED)<span className="text-red-500">*</span>
                <div className="text-blue-500 text-xs font-normal mt-1">
                  PER UNIT
                  <br />
                  COPY TO ALL
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                UPC
                <Info size={14} className="inline ml-1 text-gray-400" />
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                EAN
                <Info size={14} className="inline ml-1 text-gray-400" />
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ISBN
                <Info size={14} className="inline ml-1 text-gray-400" />
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reorder Point
                <div className="text-blue-500 text-xs font-normal mt-1">
                  COPY TO ALL
                </div>
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={item.name}
                    readOnly
                  />
                </td>
                <td className="px-4 py-2">
                  <input type="text" className="w-full p-1 border rounded" />
                </td>
                <td className="px-4 py-2">
                  <input type="text" className="w-full p-1 border rounded" />
                </td>
                <td className="px-4 py-2">
                  <input type="text" className="w-full p-1 border rounded" />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value="0"
                  />
                </td>
                <td className="px-4 py-2">
                  <input type="text" className="w-full p-1 border rounded" />
                </td>
                <td className="px-4 py-2">
                  <input type="text" className="w-full p-1 border rounded" />
                </td>
                <td className="px-4 py-2">
                  <input type="text" className="w-full p-1 border rounded" />
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex items-center">
                    <button className="text-gray-400 hover:text-gray-600">
                      <ChevronUp size={16} />
                    </button>
                    <button
                      className="ml-2 text-red-500"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4">
        <button className="flex items-center text-blue-500 text-sm">
          <ChevronDown size={16} className="mr-1" />
          Configure Accounts
          <Info size={16} className="ml-1 text-gray-400" />
        </button>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Sales Account
            </label>
            <div className="relative">
              <select className="w-full p-2 border rounded appearance-none pr-8 bg-white">
                <option>Sales</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-2 top-3 text-gray-400"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Purchase Account
            </label>
            <div className="relative">
              <select className="w-full p-2 border rounded appearance-none pr-8 bg-white">
                <option>Cost of Goods Sold</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-2 top-3 text-gray-400"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Inventory Account
            </label>
            <div className="relative">
              <select className="w-full p-2 border rounded appearance-none pr-8 bg-white">
                <option>Inventory Asset</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-2 top-3 text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 p-4 border-t">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Save
        </button>
        <button className="px-4 py-2 text-gray-600 rounded">Cancel</button>
      </div>

      {/* //------------ */}

      {/* Add Unit Modal */}
      <AddModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={AddhandleSubmit}
        title="Add item"
        placeholder="Enter Unit"
      />
    </div>
  );
}
