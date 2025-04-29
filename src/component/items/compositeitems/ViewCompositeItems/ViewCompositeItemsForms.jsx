import { Image, Info, RotateCcw, View } from "lucide-react";
import React, { useEffect, useState } from "react";
import ChartSaleSummary from "../../itemsComponents/ChartSaleSummary";
import { useLocation } from "react-router-dom";
import { edit_composit, view_composit } from "../authServiceComposite";
import {
  create_unit,
  GET_ALL_ITEMS,
  list_unit,
} from "../../../../api/services/authService";
import Swal from "sweetalert2";
import CustomDropdownSelect from "../../../customDropdown/CustomDropdownSelect";
import AddModal from "../../../modalComponents/modalComponents";
import AssociateComponents from "../AssociateComponents";
import EditAssociateComponents from "../EditassociateComponents";
// import Transactions from "./Transaction";
const items = [
  {
    id: 1,
    name: "toy",
    sku: "5",
    accountingStock: 4.0,
    physicalStock: 4.0,
    quantity: 1,
  },
  {
    id: 2,
    name: "choclate",
    sku: "4",
    accountingStock: 2.0,
    physicalStock: 2.0,
    quantity: 1,
  },
];
const ViewCompositeItemsForms = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [activeTabsale, setActiveTabsale] = useState("sales");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [prdt, setprdt] = useState([]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  //=============graph==================

  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue",
        data: [120, 190, 300, 250, 180, 220, 160],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [3000, 4500, 4000, 5200, 6100, 4800],
        backgroundColor: "rgba(34, 197, 94, 0.7)",
      },
    ],
  };

  //=====>>>>Product

  const Productlist = async () => {
    try {
      const response = await GET_ALL_ITEMS();
      const data = await response.list;
      const transformedManufactureOptions = data?.map((item) => ({
        id: item.i_id,
        name: item.i_name,
        image: item.i_image || "", // fallback to empty if null
        sellingPrice: item.i_sales_price || 0,
        costPrice: item.i_purchase_price || 0,
      }));

      setprdt(transformedManufactureOptions);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

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
    Productlist();
  }, []);

  //----------->>>Edit Api<<<---------------------//
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
    setImageFile(null);
    setDeletedImage(true);
  };

  //=-----------------------------------
  const [formData, setFormData] = useState({
    ci_name: "",
    ci_returnable_item: "",
    i_unit: "",
    ci_created_source: "",
    ci_inventory_account: "",
    ci_inventory_account: "",
    ci_purchase_price: "",
    ci_purchase_description: "",
    ci_sales_price: "",
    ci_sales_account: "",
    ci_sales_description: "",
    handsOnStock: "",
    committedStock: "",
    availableSale: "",
    openingStock: "",
    ci_brand_id: "",
    ci_upc: "",
    ci_mpn: "",
    ci_ean: "",
    ci_isbn: "",
    ci_dimension_value: {
      length: "",
      width: "",
      height: ""
    },
    dimensionUnit: "",

    associate_items: [],
  });
  useEffect(() => {
    if (itemDetails) {
      let dimensions = { length: "", width: "", height: "" };
      if (itemDetails.ci_dimension_value) {
        try {
          const parsed = JSON.parse(itemDetails.ci_dimension_value);
          dimensions = {
            length: parsed[0] || "",
            width: parsed[1] || "",
            height: parsed[2] || "",
          };
        } catch (err) {
          console.error("Failed to parse dimensions", err);
        }
      }
      setFormData({
        ci_name: itemDetails.ci_name || "",
        ci_returnable_item: itemDetails.itemDetails || "",
        i_unit: itemDetails.i_unit || "",
        ci_created_source: itemDetails.ci_created_source || "",
        ci_inventory_account: itemDetails.ci_inventory_account || "",
        ci_inventory_account: itemDetails.ci_inventory_account || "",
        ci_purchase_price: itemDetails.ci_purchase_price || "",
        ci_purchase_description: itemDetails.ci_purchase_description || "",
        ci_sales_price: itemDetails.ci_sales_price || "",
        ci_sales_account: itemDetails.ci_sales_account || "",
        ci_sales_description: itemDetails.ci_sales_description || "",
        handsOnStock: itemDetails.handsOnStock || "",
        committedStock: itemDetails.committedStock || "",
        availableSale: itemDetails.availableSale || "",
        openingStock: itemDetails.availableSale || "",
        ci_brand_id: itemDetails.ci_brand_id || "",
        ci_upc: itemDetails.ci_upc || "",
        ci_mpn: itemDetails.ci_mpn || "",
        ci_ean: itemDetails.ci_ean || "",
        ci_isbn: itemDetails.ci_isbn || "",
        dimensions,
        dimensionUnit: itemDetails.ci_dimension_unit || "cm",
      });
    }
  }, [itemDetails]);

  useEffect(() => {
    if (itemDetails && Unitlist.length > 0) {
      const matchedUnit = Unitlist.find(
        (unit) => unit.value.toString() === itemDetails.ci_unit.toString()
      );
      if (matchedUnit) {
        console.log("Matched Unit Name:", matchedUnit.label);
        setUnitselect(matchedUnit); // This will show the label (un_name) in the dropdown
      } else {
        console.log("No matching unit found for i_unit:", itemDetails.ci_unit);
      }
    }
  }, [itemDetails, Unitlist]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDimensionChange = (field, value) => {
    if (["length", "width", "height"].includes(field)) {
      // Allow only numbers and optional single decimal point
      if (!/^\d*\.?\d*$/.test(value)) return;
    }

    setFormData({
      ...formData,
      dimensions: {
        ...formData.dimensions,
        [field]: value,
      },
    });
  };

  const View_Items = async () => {
    try {
      const data = { composite_item_id: item_id };
      const res = await view_composit(data);
      if (res.result) {
        setItemDetails(res.data[0]); // Set the first item from list
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

  // if (!itemDetails) return <div>Loading item details...</div>;

  //------------->>>>>>>>>>>>>>Edit<<<<<<<<<<<<----------------------------------------

  const handleSubmit = async () => {
    const updateData = new FormData();

    updateData.append("composite_item_id", itemDetails.ci_id || "");
    updateData.append("type", itemDetails.ci_type || "");
    updateData.append("name", itemDetails.ci_name || "");
    updateData.append("sku", formData.ci_sku || "");
    updateData.append("unit_id", unitselect?.value || "");
    updateData.append("sales_price", formData.ci_sales_price || "");
    updateData.append("brand_id", formData.ci_brand_id || "");
    updateData.append("sales_account", formData.ci_sales_account || "");
    updateData.append("sales_description", formData.ci_sales_description || "");
    updateData.append("purchase_cost_price", formData.ci_purchase_price || "");
    updateData.append("purchase_account", formData.ci_purchase_account || "");
    updateData.append(
      "purchase_description",
      formData.ci_purchase_description || ""
    );
    updateData.append("preferred_vendor", formData.ci_preferred_vendor || "");
    updateData.append(
      "preferred_vendor_id",
      formData.ci_preferred_vendor_id || ""
    );
    updateData.append("handsOnStock", formData.handsOnStock || "");
    updateData.append("track_inventory", formData.ci_track_inventory || "");
    updateData.append("inventory_account", formData.ci_inventory_account || "");
    updateData.append(
      "inventory_valuation_method",
      formData.ci_inventory_account || ""
    );

    updateData.append("created_source", formData.ci_created_source || "");

    updateData.append("rate_per_unit", formData.ci_rate_per_unit || "");
    updateData.append("returnable_item", formData.ci_returnable_item || "");
    updateData.append("excise_product", formData.ci_excise_product || "");
    updateData.append("dimension_unit", itemDetails.ci_dimension_unit || "");
    let dimensionValue = itemDetails.ci_dimension_value;

    if (typeof dimensionValue === "string") {
      try {
        dimensionValue = JSON.parse(dimensionValue); // Parse string to array
      } catch (error) {
        console.error("Error parsing dimension_value:", error);
      }
    }

    updateData.append("dimension_value", JSON.stringify(dimensionValue));

    updateData.append("weight_unit", itemDetails.ci_weight_unit);
    updateData.append("weight_value", itemDetails.ci_weight_value);
    updateData.append("manufacture_id", itemDetails.ci_manufacture_id || 1);
    updateData.append("brand_id", itemDetails.ci_brand);
    updateData.append("upc", itemDetails.ci_upc);
    updateData.append("mpn", itemDetails.ci_mpn);
    updateData.append("ean", itemDetails.ci_ean);
    updateData.append("isbn", itemDetails.ci_isbn);
    updateData.append("tax", itemDetails.ci_tax);
    updateData.append("reorder_point", itemDetails.ci_reorder_point);

    if (formData.items && formData.items.length > 0) {
      updateData.append("associate_items", JSON.stringify(formData.items));
    } else {
      updateData.append("associate_items", JSON.stringify([])); // Send empty array if no items
    }

   
    updateData.append("ci_dimension_unit", formData.dimensionUnit)

    updateData.append(
      "dimension_value",
      JSON.stringify([
        formData.dimensions.length,
        formData.dimensions.width,
        formData.dimensions.height,
      ])
    );

    // If you want to upload a new image, you should append the image file
    if (imageFile) {
      updateData.append("image", imageFile); // New image uploaded
    } else if (deletedImage) {
      updateData.append("image", null); // User deleted existing image
    }

    setLoading(true);
    try {
      const res = await edit_composit(updateData);

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
    <div className="w-full mx-auto p-4 font-sans bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold">{formData.ci_name}</h1>
          <p className="flex items-center mt-2 text-gray-600">
            <RotateCcw className="w-4 h-4 mr-2 text-blue-500" />

            {formData.ci_returnable_item}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className={`p-2 rounded-lg border border-gray-300 hover:bg-gray-100 ${
              isEditing ? "bg-red-500" : ""
            }`}
            onClick={toggleEdit}
          >
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
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Create Bundle
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
                <div className="col-span-2 font-medium">{formData.ci_type}</div>

                <div className="col-span-1 text-gray-600">SKU</div>
                <div className="col-span-2 font-medium">{formData.ci_sku}</div>

                <div className="col-span-1 text-gray-600">Unit</div>
                <div className="col-span-2 font-medium">
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
                    name="ci_created_source"
                    value={formData.ci_created_source}
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
                    name="ci_inventory_account"
                    value={formData.ci_inventory_account}
                    onChange={handleChange}
                    placeholder="Nil"
                  />
                </div>

                <div className="col-span-1 text-gray-600">
                  Inventory Valuation Method
                </div>
                <div className="col-span-2 font-medium">
                  <input
                    className="px-2 py-2"
                    name="ci_valuation_method"
                    value={formData.ci_valuation_method}
                    onChange={handleChange}
                    placeholder="Nil"
                  />
                </div>

                {isEditing && (
                  <div className="grid grid-cols-2 gap-4">
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
                    <div className="text-gray-600">UPC</div>
                    <div className="font-medium">
                      <input
                        className="px-2 py-2"
                        name="ci_upc"
                        value={formData.ci_upc}
                        onChange={handleChange}
                        placeholder="Nil"
                      />
                    </div>

                    <div className="text-gray-600">MPN</div>
                    <div className="font-medium">
                      <input
                        className="px-2 py-2"
                        name="ci_mpn"
                        value={formData.ci_mpn}
                        onChange={handleChange}
                        placeholder="Nil"
                      />
                    </div>

                    <div className="text-gray-600">EAN</div>
                    <div className="font-medium">
                      <input
                        className="px-2 py-2"
                        name="ci_ean"
                        value={formData.ci_ean}
                        onChange={handleChange}
                        placeholder="Nil"
                      />
                    </div>

                    <div className="text-gray-600">ISBN</div>
                    <div className="font-medium">
                      <input
                        className="px-2 py-2"
                        name="ci_upc"
                        value={formData.ci_upc}
                        onChange={handleChange}
                        placeholder="Nil"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase Information */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Purchase Information</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 text-gray-600">Cost Price</div>
                  <div className="col-span-2 font-medium">
                    <input
                      className="px-2 py-2"
                      name="ci_purchase_price"
                      value={formData.ci_purchase_price}
                      onChange={handleChange}
                      placeholder="Nil"
                    />
                  </div>

                  <div className="col-span-1 text-gray-600">
                    Purchase Account
                  </div>
                  <div className="col-span-2 font-medium">
                    <input
                      className="px-2 py-2"
                      name="ci_purchase_account"
                      value={formData.ci_purchase_account}
                      onChange={handleChange}
                      placeholder="Nil"
                    />
                  </div>

                  <div className="col-span-1 text-gray-600">Description</div>
                  <div className="col-span-2 font-medium">
                    <input
                      className="px-2 py-2"
                      name="ci_purchase_description"
                      value={formData.ci_purchase_description}
                      onChange={handleChange}
                      placeholder="Nil"
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
                      name="cci_sales_price"
                      value={formData.ci_sales_price}
                      onChange={handleChange}
                      placeholder="Nil"
                    />
                  </div>

                  <div className="col-span-1 text-gray-600">Sales Account</div>
                  <div className="col-span-2 font-medium">
                    <input
                      className="px-2 py-2"
                      name="ci_sales_account"
                      value={formData.ci_sales_account}
                      onChange={handleChange}
                      placeholder="Nil"
                    />
                  </div>

                  <div className="col-span-1 text-gray-600">Description</div>
                  <div className="col-span-2 font-medium">
                    <input
                      className="px-2 py-2"
                      name="ci_sales_description"
                      value={formData.ci_sales_description}
                      onChange={handleChange}
                      placeholder="Nil"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image and Stock */}
            <div className="w-full md:w-5/12 mt-6 md:mt-0">
              <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center mb-8 bg-gray-50">
                <div className="w-16 h-16 text-gray-400 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-center mb-1">
                  Drag image(s) here or
                </p>
                <button className="text-blue-500 hover:underline">
                  Browse images
                </button>
              </div>

              {/* Stock Information */}

              <div className="bg-gray-50 p-6 max-w-md rounded-lg">
                {/* Opening Stock */}
                <div className="mb-5">
                  <p className="text-sm font-medium">
                    <span>Opening Stock : </span>
                    <span>{formData.openingStock}</span>
                  </p>
                </div>

                {/* Accounting Stock */}
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <h3 className="text-base font-bold">Accounting Stock</h3>
                    <Info className="ml-1 h-4 w-4 text-gray-500" />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between pb-1">
                      <span>Stock on Hand</span>
                      <span>: 5.00</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span>Committed Stock</span>
                      <span>: 0.00</span>
                    </div>
                    <div className="flex justify-between border-t border-dotted border-gray-300 pt-1">
                      <span>Available for Sale</span>
                      <span>: 5.00</span>
                    </div>
                  </div>
                </div>

                {/* Physical Stock */}
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <h3 className="text-base font-bold">Physical Stock</h3>
                    <Info className="ml-1 h-4 w-4 text-gray-500" />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between pb-1">
                      <span>Stock on Hand</span>
                      <span>: 5.00</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span>Committed Stock</span>
                      <span>: 0.00</span>
                    </div>
                    <div className="flex justify-between border-t border-dotted border-gray-300 pt-1">
                      <span>Available for Sale</span>
                      <span>: 5.00</span>
                    </div>
                  </div>
                </div>

                {/* Status Cards */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="bg-white p-3 rounded shadow-sm">
                      <div className="text-2xl font-normal">0</div>
                      <div className="text-xs text-gray-500">Qty</div>
                      <div className="text-xs mt-1">To be Shipped</div>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm">
                      <div className="text-2xl font-normal">0</div>
                      <div className="text-xs text-gray-500">Qty</div>
                      <div className="text-xs mt-1">To be Received</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-3 rounded shadow-sm">
                      <div className="text-2xl font-normal">0</div>
                      <div className="text-xs text-gray-500">Qty</div>
                      <div className="text-xs mt-1">To be Invoiced</div>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm">
                      <div className="text-2xl font-normal">0</div>
                      <div className="text-xs text-gray-500">Qty</div>
                      <div className="text-xs mt-1">To be Billed</div>
                    </div>
                  </div>
                </div>

                {/* Reorder Point */}
                <div className="mt-6">
                  <p className="text-sm">
                    <span>Reorder point</span>
                  </p>
                  <p className="text-xl font-medium">
                    {formData.ci_reorder_point}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full font-sans mt-5">
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
                  onClick={() => setActiveTab("sales")}
                >
                  Sales
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeTabsale === "purchase"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                  onClick={() => setActiveTab("purchase")}
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

          <div className="w-full mb-5">
            {itemDetails && (
              <EditAssociateComponents
                products={prdt}
                defaultItems={itemDetails.items || []}
                onChange={(updatedItems) => {
                  if (updatedItems && updatedItems.length > 0) {
                    setFormData((prev) => ({
                      ...prev,
                      items: updatedItems.map((item) => ({
                        ic_item_id: item.id,
                        ic_quantity: item.quantity,
                        ic_sales_price: item.sellingPrice,
                        ic_cost_price: item.costPrice,
                      })),
                    }));
                  }
                }}
              />
            )}
          </div>

          <div className="">
            <ChartSaleSummary
              title="Sales Order Summary (In INR)"
              weeklyData={weeklyData}
              monthlyData={monthlyData}
            />
          </div>
        </>
      )}

      {activeTab === "transactions" && (
        <div className="mt-4">{/* <Transactions /> */}</div>
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

export default ViewCompositeItemsForms;
