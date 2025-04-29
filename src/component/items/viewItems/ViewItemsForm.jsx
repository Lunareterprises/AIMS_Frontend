import React, { useEffect, useState } from "react";
import Transactions from "./Transaction";
import { useLocation } from "react-router-dom";
import {
  create_unit,
  edit_items,
  list_unit,
  view_items,
} from "../../../api/services/authService";
import axios from "axios";
import Swal from "sweetalert2";
import CustomDropdownSelect from "../../customDropdown/CustomDropdownSelect";
import AddModal from "../../modalComponents/modalComponents";
const ViewItemsForm = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeTabsale, setActiveTabsale] = useState("sales");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //=============graph==================

  ///=========>>>>UNIT====<<<<<<-------------------

  const [Unitlist, setUnitlist] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const Unit = async () => {
    try {
      const response = await list_unit();
      const data = await response.list;
      const transformedManufactureOptions = data?.map((item) => ({
        value: item.un_id,
        label: item.un_name,
      }));
      setUnitlist(transformedManufactureOptions);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const [unitselect, setUnitselect] = useState(null);
  const handleChangeselectunitselect = (selected) => {
    setUnitselect(selected);
    console.log("Selected:", selected);
  };

  const Add__unit = async (item) => {
    try {
      const data = {
        unit_name: item.label,
      };

      const res = await create_unit(data);

      console.log("API raw response:", res);

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Unit Created Successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      Unit();
    } catch (err) {
      console.error("API error:", err?.response?.data || err.message);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    Unit();
  }, []);

  ///============>>>>>>>>>>>>>>>>>>>>>>>>>

  const [timeFrame, setTimeFrame] = useState("This Month");
  const [isOpen, setIsOpen] = useState(false);

  // Y-axis values
  const yAxisValues = ["5 K", "4 K", "3 K", "2 K", "1 K", "0"];

  // X-axis labels (dates)
  const xAxisLabels = [
    "01\nApr",
    "03\nApr",
    "05\nApr",
    "07\nApr",
    "09\nApr",
    "11\nApr",
    "13\nApr",
    "15\nApr",
    "17\nApr",
    "19\nApr",
    "21\nApr",
    "23\nApr",
    "25\nApr",
    "27\nApr",
    "29\nApr",
  ];

  //-------------api view-----------------------//

  const location = useLocation();
  const { item_id } = location.state || {};

  console.log("Received Item ID:", item_id);

  const [itemDetails, setItemDetails] = useState(null);
  //--------------->>>>>Image <<M<------------
  const [imageFile, setImageFile] = useState(null);
  const [deletedImage, setDeletedImage] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleImageDelete = () => {
    setImageFile(null); // Clear uploaded file if any
    setDeletedImage(true); // Flag the image for deletion
  };

  //=-----------------------------------
  const [formData, setFormData] = useState({
    i_sku: "",
    i_unit: "",
    i_created_source: "",
    i_inventory_account: "",
    i_valuation_method: "",
    i_purchase_price: "",
    i_purchase_description: "",
    i_sales_price: "",
    i_sales_account: "",
    i_sales_description: "",
    handsOnStock: "",
    committedStock: "",
    availableSale: "",
    openingStock: "",
  });
  useEffect(() => {
    if (itemDetails) {
      setFormData({
        i_sku: itemDetails.i_sku || "",

        i_unit: itemDetails.i_unit || "",
        i_created_source: itemDetails.i_created_source || "",
        i_inventory_account: itemDetails.i_inventory_account || "",
        i_valuation_method: itemDetails.i_valuation_method || "",
        i_purchase_price: itemDetails.i_purchase_price || "",
        i_purchase_description: itemDetails.i_purchase_description || "",
        i_sales_price: itemDetails.i_sales_price || "",
        i_sales_account: itemDetails.i_sales_account || "",
        i_sales_description: itemDetails.i_sales_description || "",
        handsOnStock: itemDetails.handsOnStock || "",
        committedStock: itemDetails.committedStock || "",
        availableSale: itemDetails.availableSale || "",
        openingStock: itemDetails.availableSale || "",
      });
    }
  }, [itemDetails]);

  useEffect(() => {
    if (itemDetails && Unitlist.length > 0) {
      const matchedUnit = Unitlist.find(
        (unit) => unit.value.toString() === itemDetails.i_unit.toString()
      );
      if (matchedUnit) {
        console.log("Matched Unit Name:", matchedUnit.label);
        setUnitselect(matchedUnit); // This will show the label (un_name) in the dropdown
      } else {
        console.log("No matching unit found for i_unit:", itemDetails.i_unit);
      }
    }
  }, [itemDetails, Unitlist]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const View_Items = async () => {
    try {
      const data = { item_id };
      const res = await view_items(data);
      if (res.result) {
        setItemDetails(res.list[0]); // Set the first item from list
      }
    } catch (error) {
      console.error("Failed to fetch item:", error);
    }
  };

  useEffect(() => {
    if (item_id) {
      View_Items();
    }
  }, [item_id]);

  if (!itemDetails) return <div>Loading item details...</div>;

  //------------->>>>>>>>>>>>>>Edit<<<<<<<<<<<<----------------------------------------

  const handleSubmit = async () => {
    const updateData = new FormData();

    updateData.append("item_id", itemDetails.i_id);
    updateData.append("type", itemDetails.i_type);
    updateData.append("name", itemDetails.i_name);
    updateData.append("sku", formData.i_sku);
    updateData.append("unit", unitselect?.value || "");
    updateData.append("selling_price", formData.i_sales_price);
    updateData.append("sales_account", formData.i_sales_account);
    updateData.append("sales_description", formData.i_sales_description);
    updateData.append("purchase_cost_price", formData.i_purchase_price);
    updateData.append("purchase_account", formData.i_purchase_account);
    updateData.append("purchase_description", formData.i_purchase_description);
    updateData.append("preferred_vendor", formData.i_preferred_vendor);
    updateData.append("preferred_vendor_id", formData.i_preferred_vendor_id);
    updateData.append("handsOnStock", formData.handsOnStock);
    updateData.append("track_inventory", formData.i_track_inventory);
    updateData.append("inventory_account", formData.i_inventory_account);
    updateData.append(
      "inventory_valuation_method",
      formData.i_valuation_method
    );

    updateData.append("created_source", formData.i_created_source);

    updateData.append("rate_per_unit", formData.i_rate_per_unit);
    updateData.append("returnable_item", formData.i_returnable_item);
    updateData.append("excise_product", formData.i_excise_product);
    updateData.append("dimension_unit", itemDetails.i_dimension_unit);
    let dimensionValue = itemDetails.i_dimension_value;

    if (typeof dimensionValue === "string") {
      try {
        dimensionValue = JSON.parse(dimensionValue); // Parse string to array
      } catch (error) {
        console.error("Error parsing dimension_value:", error);
      }
    }

    updateData.append("dimension_value", JSON.stringify(dimensionValue));

    updateData.append("weight_unit", itemDetails.i_weight_unit);
    updateData.append("weight_value", itemDetails.i_weight_value);
    updateData.append("manufacture_id", itemDetails.i_manufacture);
    updateData.append("brand_id", itemDetails.i_brand);
    updateData.append("upc", itemDetails.i_upc);
    updateData.append("mpn", itemDetails.i_mpn);
    updateData.append("ean", itemDetails.i_ean);
    updateData.append("isbn", itemDetails.i_isbn);
    updateData.append("tax", itemDetails.i_tax);
    updateData.append("reorder_point", itemDetails.i_reorder_point);

    // If you want to upload a new image, you should append the image file
    if (imageFile) {
      updateData.append("image", imageFile); // New image uploaded
    } else if (deletedImage) {
      updateData.append("image", null); // User deleted existing image
    }
    setLoading(true);
    try {
      const res = await edit_items(updateData);

      if (res?.result) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.message || "Item updated successfully!",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: res.message || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Edit error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update item.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full  mx-auto p-4 font-sans bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <h1 className="text-2xl capitalize font-bold">{itemDetails.i_name}</h1>

        <div className="flex items-center space-x-2">
          {/* <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button> */}
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Adjust Stock
          </button>
          <div className="relative">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center">
              More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "overview"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>

          <button
            className={`px-4 py-2 font-medium transition ${
              activeTab === "transactions"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </button>

          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "history"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <>
          {/* Content */}
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Item Details */}
            <div className="w-full md:w-7/12 pr-0 md:pr-6">
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="col-span-1 text-gray-600">Item Type</div>
                <div className="col-span-2 font-medium">
                  {itemDetails.i_type}
                </div>

                <div className="col-span-1 text-gray-600">SKU</div>
                <div className="col-span-2 font-medium">
                  <input
                    className="px-2 py-2"
                    name="i_sku"
                    value={formData.i_sku}
                    onChange={handleChange}
                    placeholder="SKU"
                  />
                </div>

                <div className="col-span-1 text-gray-600">Unit</div>
                <div className="col-span-2 font-medium">
                  {/* <input
                    className="px-2 py-2"
                    name="i_unit"
                    value={formData.i_unit}
                    onChange={handleChange}
                    placeholder="Unit"
                  /> */}

                  <div className="">
                    <CustomDropdownSelect
                      options={Unitlist}
                      className=""
                      value={unitselect}
                      onChange={handleChangeselectunitselect}
                      placeholder="Choose a Unit"
                      onAddNewClick={() => setShowModal(true)}
                      refreshOptions={Unit}
                      deleteType="Unit"
                    />
                  </div>
                </div>

                <div className="col-span-1 text-gray-600">Created Source</div>
                <div className="col-span-2 font-medium">
                  <input
                    className="px-2 py-2"
                    name="i_created_source"
                    value={formData.i_created_source}
                    onChange={handleChange}
                    placeholder="User"
                  />
                </div>

                <div className="col-span-1 text-gray-600">
                  Inventory Account
                </div>
                <div className="col-span-2 font-medium">
                  <input
                    className="px-2 py-2"
                    name="i_inventory_account"
                    value={formData.i_inventory_account}
                    onChange={handleChange}
                    placeholder="Inventory Account"
                  />
                </div>

                <div className="col-span-1 text-gray-600">
                  Inventory Valuation Method
                </div>
                <div className="col-span-2 font-medium">
                  <input
                    className="px-2 py-2"
                    name="i_valuation_method"
                    value={formData.i_valuation_method}
                    onChange={handleChange}
                    placeholder="Valuation Method"
                  />
                </div>
              </div>

              {/* Purchase Information */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Purchase Information</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 text-gray-600">Cost Price</div>
                  <div className="col-span-2 font-medium">
                    <input
                      className="px-2 py-2"
                      name="i_purchase_price"
                      value={formData.i_purchase_price}
                      onChange={handleChange}
                      placeholder="Purchase Price"
                    />
                  </div>

                  <div className="col-span-1 text-gray-600">
                    Purchase Account
                  </div>
                  <div className="col-span-2 font-medium">
                    <input
                      className="px-2 py-2"
                      name="i_purchase_account"
                      value={formData.i_purchase_account}
                      onChange={handleChange}
                      placeholder="Purchase Account"
                    />
                  </div>

                  <div className="col-span-1 text-gray-600">Description</div>
                  <div className="col-span-2 font-medium">
                    <input
                      className="px-2 py-2"
                      name="i_purchase_description"
                      value={formData.i_purchase_description}
                      onChange={handleChange}
                      placeholder="Purchase Description"
                    />
                  </div>
                </div>
              </div>

              {/* Sales Information */}
              <div>
                <h2 className="text-lg font-bold mb-4">Sales Information</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 text-gray-600">Selling Price</div>
                  <div className="col-span-2 font-medium">
                    <input
                      className="px-2 py-2"
                      name="i_sales_price"
                      value={formData.i_sales_price}
                      onChange={handleChange}
                      placeholder="Sales Price"
                    />
                  </div>

                  <div className="col-span-1 text-gray-600">Sales Account</div>
                  <div className="col-span-2 font-medium">
                    <input
                      className="px-2 py-2"
                      name="i_sales_account"
                      value={formData.i_sales_account}
                      onChange={handleChange}
                      placeholder="Sales Account"
                    />
                  </div>

                  <div className="col-span-1 text-gray-600">Description</div>
                  <div className="col-span-2 font-medium">
                    <input
                      className="px-2 py-2"
                      name="i_sales_description"
                      value={formData.i_sales_description}
                      onChange={handleChange}
                      placeholder="Sales Description"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image and Stock */}
            <div className="w-full md:w-5/12 mt-6 md:mt-0">
              <div className="border  border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center mb-8 bg-gray-50">
                <div>
                  {itemDetails.i_image && !imageFile && !deletedImage ? (
                    <div>
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/${
                          itemDetails.i_image
                        }`}
                        alt="Item"
                        className="w-100 mt-2"
                      />
                    </div>
                  ) : imageFile ? (
                    <div>
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Selected"
                        className="w-100 mt-2"
                      />
                    </div>
                  ) : null}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-2"
                  />

                  {/* Button to delete image */}
                  <button
                    type="button"
                    onClick={handleImageDelete}
                    className="mt-2 text-red-500"
                  >
                    Delete Image
                  </button>
                </div>
              </div>

              {/* Stock Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-2 gap-y-6">
                  <div>
                    <h3 className="text-gray-600 text-sm mb-1">
                      Opening Stock
                    </h3>
                    <p className="text-xl font-bold">
                      <input
                        className="px-2 py-2  w-50"
                        name="openingStock"
                        value={formData.openingStock}
                        onChange={handleChange}
                        placeholder="0"
                      />
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-600 text-sm mb-1">
                      Stock on Hand
                    </h3>
                    <p className="text-xl font-bold">
                      <input
                        className="px-2 py-2  w-50"
                        name="handsOnStock"
                        value={formData.handsOnStock}
                        onChange={handleChange}
                        placeholder="0"
                      />
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-600 text-sm mb-1">
                      Committed Stock
                    </h3>
                    <p className="text-xl font-bold">
                      <input
                        className="px-2 py-2  w-50"
                        name="committedStock"
                        value={formData.committedStock}
                        onChange={handleChange}
                        placeholder="0"
                      />
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-600 text-sm mb-1">
                      Available for Sale
                    </h3>
                    <p className="text-xl font-bold">
                      <input
                        className="px-2 py-2 w-50"
                        name="availableSale"
                        value={formData.availableSale}
                        onChange={handleChange}
                        placeholder="0"
                      />
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side Information */}
              <div className=" mt-8">
                {/* Qty Information */}

                <div className="flex-1  flex">
                  <div className="text-center  mr-6">
                    <div className="flex  items-baseline">
                      <span className="text-3xl font-bold">0</span>
                      <span className="text-gray-500 text-sm ml-2">Qty</span>
                    </div>
                    <div className="text-sm text-gray-700">To be Invoiced</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">0</span>
                      <span className="text-gray-500 text-sm ml-2">Qty</span>
                    </div>
                    <div className="text-sm text-gray-700">To be Billed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full font-sans">
            {/* Top Section with Dropdown and Tabs */}
            <div className="flex items-center justify-between mb-4">
              <div className="relative">
                <button
                  className="flex items-center text-blue-500 hover:text-blue-600 focus:outline-none"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Associated Price Lists
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-10">
                    {/* Dropdown content would go here */}
                    <div className="p-2 hover:bg-gray-100 cursor-pointer">
                      Price List Option 1
                    </div>
                    <div className="p-2 hover:bg-gray-100 cursor-pointer">
                      Price List Option 2
                    </div>
                  </div>
                )}
              </div>

              <div className="flex">
                <button
                  className={`px-4 py-2 ${
                    activeTabsale === "sales"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 border-t border-l border-b border-gray-300"
                  }`}
                  // onClick={() => setActiveTab("sales")}
                >
                  Sales
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeTabsale === "purchase"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                  // onClick={() => setActiveTab("purchase")}
                >
                  Purchase
                </button>
              </div>
            </div>

            {/* Table Header */}
            <div className="w-full bg-gray-50 border-t border-l border-r border-gray-200">
              <div className="flex text-gray-500 text-sm font-medium">
                <div className="w-1/2 p-3">NAME</div>
                <div className="w-1/4 p-3">PRICE</div>
                <div className="w-1/4 p-3">DISCOUNT</div>
              </div>
            </div>

            {/* Table Content */}
            <div className="w-full border-t border-l border-r border-b border-gray-200 p-4 text-center">
              <p className="text-gray-800">
                The sales price lists associated with this item will be
                displayed here.
                <a href="#" className="text-blue-500 hover:underline ml-1">
                  Create Price List
                </a>
              </p>
            </div>

            {/* Associate Price List Button */}
            <div className="mt-4">
              <button className="flex items-center text-blue-500 hover:text-blue-600">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Associate Price List
              </button>
            </div>

            {/* Reorder Point Section */}
            <div className="mt-6">
              <h3 className="text-gray-800 font-medium mb-2">Reorder Point</h3>
              <div className="bg-yellow-50 border border-yellow-100 p-4 rounded">
                <p className="text-gray-800">
                  You have to enable reorder notification before setting reorder
                  point for items.
                  <a href="#" className="text-blue-500 hover:underline ml-1">
                    Click here
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className=" mt-5 w-full border border-gray-200 rounded-md bg-white">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">
                Sales Order Summary (In AED)
              </h2>
              <div className="relative">
                <button
                  className="flex items-center px-3 py-1 text-blue-600 font-medium"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {timeFrame}
                  <svg
                    className="ml-1 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setTimeFrame("This Week");
                        setIsOpen(false);
                      }}
                    >
                      This Week
                    </div>
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setTimeFrame("This Month");
                        setIsOpen(false);
                      }}
                    >
                      This Month
                    </div>
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setTimeFrame("This Year");
                        setIsOpen(false);
                      }}
                    >
                      This Year
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex p-4">
              {/* Chart Area */}
              <div className="flex-grow h-64 relative">
                {/* Y-axis labels */}
                <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
                  {yAxisValues.map((value, index) => (
                    <div key={index}>{value}</div>
                  ))}
                </div>

                {/* Chart content */}
                <div className="absolute left-10 right-0 top-0 bottom-6 flex items-center justify-center">
                  <p className="text-gray-500">No data found.</p>
                </div>

                {/* X-axis labels */}
                <div className="absolute left-10 right-0 bottom-0 flex justify-between text-xs text-gray-500">
                  {xAxisLabels.map((label, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center whitespace-pre-line text-center"
                    >
                      {label.split("\n").map((part, i) => (
                        <span key={i}>{part}</span>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Chart grid lines - horizontal */}
                {[0, 1, 2, 3, 4, 5].map((_, index) => (
                  <div
                    key={index}
                    className="absolute left-10 right-0 border-t border-gray-100"
                    style={{ top: `${index * 20}%` }}
                  />
                ))}
              </div>

              {/* Sidebar - Total Sales */}
              <div className="w-64 border-l border-gray-100 pl-4 ml-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-800">
                    Total Sales
                  </h3>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded p-3">
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">DIRECT SALES</span>
                  </div>
                  <div className="text-lg font-medium">AED0.00</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "transactions" && (
        <div className="mt-4">
          <Transactions />
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 mt-5 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2 ml-5 w-100"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Update...
          </>
        ) : (
          "Save your Changes"
        )}
      </button>

      {/* Add Unit Modal */}
      <AddModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={Add__unit}
        title="Add item"
        placeholder="Enter Unit"
      />
    </div>
  );
};

export default ViewItemsForm;
