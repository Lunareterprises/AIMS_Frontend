import React, { useEffect, useRef, useState } from "react";
import Select, { components } from "react-select";
import AddComponent from "../../modalComponents/modalComponents";
import CustomDropdownSelect from "../../customDropdown/CustomDropdownSelect";
import AddModal from "../../modalComponents/modalComponents";
import ImageProps from "../../imageProp/imageProp";
import {
  ChevronRight,
  Info,
  ChevronDown,
  MoreVertical,
  X,
  Plus,
  Image,
} from "lucide-react";
import AssociateComponents from "./AssociateComponents";

const AddCompositeItemsForm = () => {
  const [trackInventory, setTrackInventory] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [Unitlist, setUnitlist] = useState([]);
  const [showModalManufacture, setShowModalManufacture] = useState(false);
  const [Manufacture, setManufacture] = useState([]);
  const [account, setAccount] = useState([]);
  const [showModalAccount, setShowModalAccount] = useState(false);
  const [tax, setTax] = useState([]);
  const [showModalTax, setShowModalTax] = useState(false);

  const [accountPurchase, setAccountPurchase] = useState([]);
  const [showModalaccountPurchase, setShowModalaccountPurchase] =
    useState(false);

  const [brand, setBrand] = useState([]);
  const [showModalbrand, setShowModalbrand] = useState(false);

  const [prefferedvendor, setPrefferedvendor] = useState([]);

  const [showModalprefferedvendor, setShowModalPrefferedvendor] =
    useState(false);

  const [Invento, setInvento] = useState([]);
  const [showModalInvento, setShowModalInvento] = useState(false);

  const [prdt, setprdt] = useState([]);
  const [showModalprdt, setShowModalprdt] = useState(false);

  const [salesSelected, setSalesSelected] = useState(true);
  const [purchaseSelected, setPurchaseSelected] = useState(true);
  const [errors, setErrors] = useState({});

  const [selectedOption, setSelectedOption] = useState(null);

  //------------------------------------------------------------------------------
  const [returnableItem, setReturnableItem] = useState(true);
  const [items, setItems] = useState([
    {
      id: 1,
      image: null,
      name: "Click to select an item",
      quantity: 1,
      sellingPrice: 0.0,
      costPrice: 0.0,
    },
  ]);

  const addNewRow = () => {
    setItems([
      ...items,
      {
        id: items.length + 1,
        image: null,
        name: "Click to select an item",
        quantity: 1,
        sellingPrice: 0.0,
        costPrice: 0.0,
      },
    ]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateTotals = () => {
    return {
      sellingPrice: items
        .reduce((sum, item) => sum + item.sellingPrice, 0)
        .toFixed(2),
      costPrice: items
        .reduce((sum, item) => sum + item.costPrice, 0)
        .toFixed(2),
    };
  };

  const totals = calculateTotals();

  const handleChangeselect = (selected) => {
    setSelectedOption(selected);
    console.log("Selected:", selected);
  };

  const [formData, setFormData] = useState({
    type: "goods",
    name: "",
    sku: "",
    unit: "",
    isReturnable: false,
    isExciseProduct: false,
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    dimensionUnit: "cm",
    weight: "",
    weightUnit: "kg",
    manufacturer: "",
    brand: "",
    upc: "",
    mpn: "",
    ean: "",
    isbn: "",
  });

  const handleChange = (field, value) => {
    if (field === "name") {
      // Allow only letters and spaces during typing
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    setFormData({
      ...formData,
      [field]: value,
    });

    setErrors({ ...errors, [field]: "" });
  };

  const handleDimensionChange = (field, value) => {
    setFormData({
      ...formData,
      dimensions: {
        ...formData.dimensions,
        [field]: value,
      },
    });
  };

  const handleCheckboxChange = (field) => {
    setFormData({
      ...formData,
      [field]: !formData[field],
    });
  };

  //---------------  {/* Image Upload */}================//

  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const validImages = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        console.warn(`${file.name} is not an image.`);
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        console.warn(`${file.name} exceeds 5MB.`);
        continue;
      }

      const image = await loadImage(file);
      if (image.width > 7000 || image.height > 7000) {
        console.warn(`${file.name} exceeds max resolution (7000x7000).`);
        continue;
      }

      validImages.push(file);
    }

    console.log("✅ Valid images:", validImages);
  };

  const loadImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = URL.createObjectURL(file);
    });
  };

  //----------validation ===============//

  const validate = () => {
    let tempErrors = {};

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      tempErrors.name = "Name can only contain letters and spaces.";
    }

    if (!formData.unit) tempErrors.unit = "Unit is required.";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  //---------------------

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/data/Units.json");
        const data = await response.json();
        setUnitlist(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const Manufacturers = async () => {
      try {
        const response = await fetch("/data/Manufacture.json");
        const data = await response.json();
        setManufacture(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const Brand = async () => {
      try {
        const response = await fetch("/data/Brand.json");
        const data = await response.json();
        setBrand(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const Account = async () => {
      try {
        const response = await fetch("/data/Account.json");
        const data = await response.json();
        setAccount(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const Tax = async () => {
      try {
        const response = await fetch("/data/Tax.json");
        const data = await response.json();
        setTax(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const Accountpurchase = async () => {
      try {
        const response = await fetch("/data/AccountPurchase.json");
        const data = await response.json();
        setAccountPurchase(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const Inventopurchase = async () => {
      try {
        const response = await fetch("/data/Inventory.json");
        const data = await response.json();
        setInvento(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const Productlist = async () => {
      try {
        const response = await fetch("/data/itemslist.json");
        const data = await response.json();
        setprdt(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    Productlist();
    Inventopurchase();
    Accountpurchase();
    Tax();
    Account();
    Brand();
    Manufacturers();

    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submitting:", {
        ...formData,
        unit: formData.unit?.value,
      });
      // proceed with API call or further logic
    }
  };

  //===============ADD Unit ++++++++++++++

  const AddhandleSubmit = (e) => {
    console.log("Received item:", item);
  };

  // Custom menu with "Add Unit" at the end
  const MenuList = (props) => {
    return (
      <components.MenuList {...props}>
        {props.children}
        <div className="px-3 py-2 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-blue-500 hover:underline text-sm w-full text-left"
          >
            + Add Unit
          </button>
        </div>
      </components.MenuList>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center border-b p-4">
        <h1 className="text-xl font-medium text-gray-800">
          Add Composite Product
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
            {/* Left Column */}
            <div>
              {/* Name */}
              <div className="mb-6">
                <label className="block mb-2">
                  <span className="text-red-500 font-medium">Name*</span>
                </label>
                <input
                  type="text"
                  className={`w-full border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* SKU */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <label className="text-gray-700 mr-2">SKU</label>
                  <div className="relative group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.sku}
                  onChange={(e) => handleChange("sku", e.target.value)}
                />
              </div>

              {/* Unit */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <label className="text-red-500 font-medium mr-2">Unit*</label>
                  <div className="relative group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="">
                  <Select
                    options={Unitlist}
                    value={formData.unit}
                    onChange={(selected) => handleChange("unit", selected)}
                    placeholder="Select or type to add"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    components={{ MenuList }}
                  />
                  {errors.unit && (
                    <p className="text-red-500 text-sm mt-1">{errors.unit}</p>
                  )}
                </div>
              </div>

              {/* Checkbox Options */}
              <div className="mb-6 space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="returnable"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={formData.isReturnable}
                    onChange={() => handleCheckboxChange("isReturnable")}
                  />
                  <label htmlFor="returnable" className="ml-2 text-gray-700">
                    Returnable Item
                  </label>
                  <div className="relative group ml-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mt-8">
                <ImageProps
                  accept="image,pdf,excel"
                  multiple={true}
                  maxFiles={1}
                  maxSizeMB={5}
                  maxResolution={7000}
                  onFilesSelected={(files) =>
                    console.log("Final Files:", files)
                  }
                />

                {/* 
    <ImageProps accept="image" />
 <ImageProps accept="pdf ,excel, image" multiple={false} maxFiles={10} /> */}
              </div>
            </div>
          </div>
          {/* Associate Items section */}
          {/* <div>
            <label className="block mb-4">
              <span className="text-red-500 font-medium">Associate Items</span>
              <span className="text-red-500">*</span>
            </label>

            <div className="border border-gray-200 rounded">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-4 font-medium text-gray-600">
                      Item Details
                    </th>
                    <th className="text-right py-2 px-4 font-medium text-gray-600">
                      Quantity
                    </th>
                    <th className="text-right py-2 px-4 font-medium text-gray-600">
                      Selling Price
                    </th>
                    <th className="text-right py-2 px-4 font-medium text-gray-600">
                      Cost Price
                    </th>
                    <th className="py-2 px-4 w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="py-2 px-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center mr-3 bg-gray-50">
                            <Image className="w-6 h-6 text-gray-400" />
                          </div>
                          <span className="text-gray-500">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-right">{item.quantity}</td>
                      <td className="py-2 px-4 text-right">
                        {item.sellingPrice.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 text-right">
                        {item.costPrice.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 flex items-center justify-end">
                        <button className="text-gray-500 hover:text-gray-700 mr-1">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="2" className="py-3 px-4">
                      <div className="flex items-center space-x-4">
                        <button
                          className="flex items-center text-blue-500 hover:text-blue-700"
                          onClick={addNewRow}
                        >
                          <Plus className="w-5 h-5 mr-1" />
                          <span>Add New Row</span>
                        </button>
                        <button className="flex items-center text-blue-500 hover:text-blue-700">
                          <Plus className="w-5 h-5 mr-1" />
                          <span>Add Services</span>
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      Total (Rs.) :
                    </td>
                    <td className="py-3 px-4 text-right">
                      {totals.sellingPrice}
                    </td>
                    <td className="py-3 px-4 text-right">{totals.costPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}
          <AssociateComponents
            products={prdt}
            onChange={(data) => console.log("Updated Items", data)}
          />
          
          <div className=" p-4 ">
            <div className="flex flex-col md:flex-row md:space-x-8">
              {/* Sales Information Section */}
              <div className="w-full md:w-1/2 mb-6">
                <div className="flex items-center mb-4">
                  <label htmlFor="salesInfo" className=" text-lg font-medium">
                    Sales Information
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-normal text-red-500 mb-1">
                      Selling Price<span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <div className="w-16 border border-gray-300 rounded-l-md flex items-center justify-center bg-gray-50">
                        AED
                      </div>
                      <input
                        type="text"
                        className="flex-grow border border-gray-300 rounded-r-md p-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-red-500 mb-1">
                      Account<span className="text-red-500">*</span>
                    </label>
                    <CustomDropdownSelect
                      options={account}
                      value={selectedOption}
                      onChange={handleChangeselect}
                      placeholder="Choose a Account"
                      onAddNewClick={() => setShowModalAccount(true)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea className="w-full border border-gray-300 rounded-md p-2 h-24"></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-1">
                      Tax
                    </label>
                    <div className="relative">
                      <CustomDropdownSelect
                        options={tax}
                        value={selectedOption}
                        onChange={handleChangeselect}
                        placeholder="Choose a Tax"
                        onAddNewClick={() => setShowModalTax(true)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Information Section */}
              <div className="w-full md:w-1/2 mb-6">
                <div className="flex items-center mb-4">
                  <label
                    htmlFor="purchaseInfo"
                    className=" text-lg font-medium"
                  >
                    Purchase Information
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-normal text-red-500 mb-1">
                      Cost Price<span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <div className="w-16 border border-gray-300 rounded-l-md flex items-center justify-center bg-gray-50">
                        AED
                      </div>
                      <input
                        type="text"
                        className="flex-grow border border-gray-300 rounded-r-md p-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-red-500 mb-1">
                      Account<span className="text-red-500">*</span>
                    </label>
                    <CustomDropdownSelect
                      options={accountPurchase}
                      value={selectedOption}
                      onChange={handleChangeselect}
                      placeholder="Choose Account"
                      onAddNewClick={() => setShowModalaccountPurchase(true)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea className="w-full border border-gray-300 rounded-md p-2 h-24"></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-1">
                      Preferred Vendor
                    </label>
                    <CustomDropdownSelect
                      options={Manufacture}
                      value={selectedOption}
                      onChange={handleChangeselect}
                      placeholder="Choose Preffered Vendor"
                      onAddNewClick={() => setShowModalPrefferedvendor(true)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className=" p-4 ">
              <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="w-full md:w-1/2 mb-6">
                  {/* Dimensions */}
                  <div className="mb-6">
                    <label className="block mb-2 text-gray-700">
                      Dimensions
                    </label>
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="flex">
                          <input
                            type="text"
                            placeholder="Length"
                            className="w-full border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.dimensions.length}
                            onChange={(e) =>
                              handleDimensionChange("length", e.target.value)
                            }
                          />

                          <input
                            type="text"
                            placeholder="Width"
                            className="w-full border-y border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.dimensions.width}
                            onChange={(e) =>
                              handleDimensionChange("width", e.target.value)
                            }
                          />

                          <input
                            type="text"
                            placeholder="Height"
                            className="w-full border border-gray-300 rounded-r-none px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.dimensions.height}
                            onChange={(e) =>
                              handleDimensionChange("height", e.target.value)
                            }
                          />
                          <div className="relative">
                            <select
                              className="h-full border border-gray-300 rounded-r px-2 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={formData.dimensionUnit}
                              onChange={(e) =>
                                handleChange("dimensionUnit", e.target.value)
                              }
                            >
                              <option value="cm">cm</option>
                              <option value="in">in</option>
                              <option value="mm">mm</option>
                            </select>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          (Length X Width X Height)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Manufacturer */}
                  <div className="mb-6">
                    <label className="block mb-2 text-gray-700">
                      Manufacturer
                    </label>
                    <CustomDropdownSelect
                      options={Manufacture}
                      value={selectedOption}
                      onChange={handleChangeselect}
                      placeholder="Choose a manufacturer"
                      onAddNewClick={() => setShowModalManufacture(true)}
                    />
                  </div>

                  {/* UPC */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <label className="text-gray-700 mr-2">UPC</label>
                      <div className="relative group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.upc}
                      onChange={(e) => handleChange("upc", e.target.value)}
                    />
                  </div>

                  {/* EAN */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <label className="text-gray-700 mr-2">EAN</label>
                      <div className="relative group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.ean}
                      onChange={(e) => handleChange("ean", e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2 mb-6">
                  {/* Weight */}
                  <div className="mb-6">
                    <label className="block mb-2 text-gray-700">Weight</label>
                    <div className="flex">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.weight}
                        onChange={(e) => handleChange("weight", e.target.value)}
                      />
                      <div className="relative">
                        <select
                          className=" h-full border border-gray-300 rounded-r px-2 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.weightUnit}
                          onChange={(e) =>
                            handleChange("weightUnit", e.target.value)
                          }
                        >
                          <option value="kg">kg</option>
                          <option value="g">g</option>
                          <option value="lb">lb</option>
                          <option value="oz">oz</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Brand */}
                  <div className="mb-6">
                    <label className="block mb-2 text-gray-700">Brand</label>
                    <CustomDropdownSelect
                      options={brand}
                      value={selectedOption}
                      onChange={handleChangeselect}
                      placeholder="Choose a Brand"
                      onAddNewClick={() => setShowModalbrand(true)}
                    />
                  </div>

                  {/* MPN */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <label className="text-gray-700 mr-2">MPN</label>
                      <div className="relative group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.mpn}
                      onChange={(e) => handleChange("mpn", e.target.value)}
                    />
                  </div>

                  {/* ISBN */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <label className="text-gray-700 mr-2">ISBN</label>
                      <div className="relative group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.isbn}
                      onChange={(e) => handleChange("isbn", e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* Inventory Tracking Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center mb-4">
                  <label
                    htmlFor="trackInventory"
                    className=" text-lg font-medium"
                  >
                    Additional Information
                  </label>
                  <div className="ml-2 text-gray-500">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <label className="block text-sm font-normal text-red-500 mb-1">
                      Inventory Account<span className="text-red-500">*</span>
                    </label>
                    <CustomDropdownSelect
                      options={Invento}
                      value={selectedOption}
                      onChange={handleChangeselect}
                      placeholder="Choose a Inventory Account "
                      onAddNewClick={() => setShowModalInvento(true)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-red-500 mb-1">
                      Inventory Valuation Method
                      <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full border border-gray-300 rounded-md p-2 bg-white">
                      <option>Select the valuation method</option>

                      <option value="FIFO">FIFO (FIRST IN FIRST OUT)</option>

                      <option value="WAC">
                        WAC(Weighted Average Costing )
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-1">
                      Opening Stock
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-1">
                      Opening Stock Rate per Unit
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-1">
                      Reorder Point
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-3 w-1/5 ml-12  p-4  *:rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {/* Add Unit Modal */}
      <AddModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={AddhandleSubmit}
        title="Add item"
        placeholder="Enter Unit"
      />
      <AddModal
        isOpen={showModalManufacture}
        onClose={() => setShowModalManufacture(false)}
        onAdd={AddhandleSubmit}
        title="Add Manufacturer"
        placeholder="Enter Manufacturer"
      />

      <AddModal
        isOpen={showModalbrand}
        onClose={() => setShowModalbrand(false)}
        onAdd={AddhandleSubmit}
        title="Add Brand"
        placeholder="Enter Brand"
      />
    </div>
  );
};

export default AddCompositeItemsForm;
