import React, { useEffect, useRef, useState } from "react";
import CustomDropdownSelect from "../../customDropdown/CustomDropdownSelect";
import AddModal from "../../modalComponents/modalComponents";
import ImageProps from "../../imageProp/imageProp";
import {
  ADD_BRAND,
  ADD_ITEMS,
  create_unit,
  GET_ALL_ITEMS,
  LIST_BRAND,
  list_unit,
  LISTMANUFACTURE,
  MANUFACTURE,
} from "../../../api/services/authService";
import Swal from "sweetalert2";
import AssociateComponents from "./AssociateComponents";
import { create_composit, list_vendor } from "./authServiceComposite";

const AddCompositeItemsForm = () => {
  const [trackInventory, setTrackInventory] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [image, setimage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [Unitlist, setUnitlist] = useState([]);
  const [showModalManufacture, setShowModalManufacture] = useState(false);
  const [ManufactureList, setManufacture] = useState([]);
  const [account, setAccount] = useState([]);
  const [showModalAccount, setShowModalAccount] = useState(false);
  const [tax, setTax] = useState([]);
  const [showModalTax, setShowModalTax] = useState(false);
  const [prdt, setprdt] = useState([]);

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

  const [salesSelected, setSalesSelected] = useState(true);
  const [purchaseSelected, setPurchaseSelected] = useState(true);
  const [errors, setErrors] = useState({});

  //--------------------------------------------------------------
  const [unitselect, setUnitselect] = useState(null);
  const handleChangeselectunitselect = (selected) => {
    setUnitselect(selected);
    console.log("Selected:", selected);
  };
  //--------------------------------------------------------------------
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChangeselect = (selected) => {
    setSelectedOption(selected);
    console.log("Selected:", selected);
  };
  //-----------------------------------------------------------
  const [Brandoption, setBrandoption] = useState(null);
  const handleChangeselectbrand = (selected) => {
    setBrandoption(selected);
    console.log("Selected:", selected);
  };
  //------------------------------------------------------------------
  const [Accountoption, setAccountoption] = useState(null);
  const handleChangeselectaccount = (selected) => {
    setAccountoption(selected);
    console.log("Selected:", selected);
  };

  //------------------------------------------------------------------
  const [selectedOptionPur, setSelectedOptionpur] = useState(null);
  const handleChangeselectpurchase = (selected) => {
    setSelectedOptionpur(selected);
    console.log("Selected:", selected);
  };

  //------------TAX------------------------
  const [selectedOptiontax, setSelectedOptiontax] = useState(null);
  const handleChangeselecttax = (selected) => {
    setSelectedOptiontax(selected);
    console.log("Selected:", selected);
  };
  //------------Vendor--------------------------------

  const [selectedOptionVendor, setSelectedOptionVendor] = useState(null);
  const handleChangeselectVendor = (selected) => {
    setSelectedOptionVendor(selected);
    console.log("Selected:", selected);
  };
  //------------------------Invento--------------------------------------------
  const [selectedOptionInvento, setSelectedOptionInvento] = useState(null);
  const handleChangeselectInvento = (selected) => {
    setSelectedOptionInvento(selected);
    console.log("Selected:", selected);
  };

  const [formData, setFormData] = useState({
    type: "Assembly Item",
    name: "",
    sku: "",
    unit: "",
    isReturnable: false,

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
    selling_price: "",
    sales_description: "",
    purchase_cost_price: "",
    purchase_description: "",
    handsOnStock: "",
    rate_per_unit: "",
    reorder_point: "",
    inventory_valuation_method: "",
    associate_items: [
      { item_id: "", quantity: "", selling_price: "", cost_price: "" },
    ],
  });

  const handleChange = (field, value) => {
    if (field === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    if (
      field === "weight" ||
      field === "selling_price" ||
      field === "purchase_cost_price"
    ) {
      if (!/^\d*\.?\d*$/.test(value)) return;
    }

    setFormData({
      ...formData,
      [field]: value,
    });

    setErrors({ ...errors, [field]: "" });
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

  const handleCheckboxChange = (field) => {
    setFormData({
      ...formData,
      [field]: !formData[field],
    });
  };

  //---------------  {/* Image Upload */}================//

 

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

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  //---------------------

  const Vendoritem = async () => {
    try {
      const response = await list_vendor();
      const data = await response.list;

      const transformedManufactureOptions = data.map((item) => ({
        value: item.ve_id,
        label: item.ve_first_name,
      }));
      setPrefferedvendor(transformedManufactureOptions);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const Manufacturers = async () => {
    try {
      const response = await LISTMANUFACTURE();
      const data = await response.data;
      const transformedManufactureOptions = data.map((item) => ({
        value: item.m_id,
        label: item.m_name,
      }));
      setManufacture(transformedManufactureOptions);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const Brand = async () => {
    try {
      const response = await LIST_BRAND();
      const data = await response.data;
      const transformedManufactureOptions = data.map((item) => ({
        value: item.b_id,
        label: item.b_name,
      }));
      setBrand(transformedManufactureOptions);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

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

  useEffect(() => {
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
    const Inventory = async () => {
      try {
        const response = await fetch("/data/Inventory.json");
        const data = await response.json();

        setInvento(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    Inventory();
    Vendoritem();
    Accountpurchase();
    Tax();
    Account();
    Brand();
    Manufacturers();
    Productlist();
    Unit();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formDataObj = new FormData();


    // Append simple fields
    formDataObj.append(
      "type",
      formData.type === "Assembly Item" ? "Assembly Item" : "Kit Items"
    );
    formDataObj.append("name", formData.name.trim());
    formDataObj.append("sku", formData.sku);
    formDataObj.append("unit_id", unitselect?.value || "");
    formDataObj.append("sales_price", formData.selling_price);
    formDataObj.append("sales_account", Accountoption?.value);
    formDataObj.append("sales_description", formData.sales_description);
    formDataObj.append("purchase_cost_price", formData.purchase_cost_price);
    formDataObj.append("purchase_account", selectedOptionPur?.value);
    formDataObj.append("purchase_description", formData.purchase_description);
    formDataObj.append(
      "preferred_vendor",
      selectedOptionVendor?.label
    );
    formDataObj.append("preferred_vendor_id", selectedOptionVendor?.value);
    formDataObj.append("handsOnStock", formData.handsOnStock);
    formDataObj.append("track_inventory", trackInventory ? 1 : 0);
    formDataObj.append("inventory_account", selectedOptionInvento?.value || "");
    formDataObj.append(
      "inventory_valuation_method",
      formData.inventory_valuation_method
    );
    formDataObj.append("rate_per_unit", formData.rate_per_unit);
    formDataObj.append("returnable_item", formData.isReturnable ? "Returnable Item" : "Non Returnable Item");

    formDataObj.append("dimension_unit", formData.dimensionUnit);
    formDataObj.append("weight_unit", formData.weightUnit);
    formDataObj.append("weight_value", Number(formData.weight));
    formDataObj.append("manufacture_id", selectedOption?.value || "");
    formDataObj.append("brand_id", Brandoption?.value || "");
    formDataObj.append("upc", formData.upc);
    formDataObj.append("mpn", formData.mpn);
    formDataObj.append("ean", formData.ean);
    formDataObj.append("isbn", formData.isbn);
    formDataObj.append("tax", selectedOptiontax?.value || "");
    formDataObj.append("reorder_point", formData.reorder_point);
    // Append associate_items array
    if (Array.isArray(formData.associate_items) && formData.associate_items.length > 0) {
      formDataObj.append("associate_items", JSON.stringify(formData.associate_items));
    }

    formDataObj.append(
      "dimension_value",
      JSON.stringify([
        formData.dimensions.length,
        formData.dimensions.width,
        formData.dimensions.height,
      ])
    );

    // Append image file(s)
    if (image && image.length > 0) {
      image.forEach((file, index) => {
        formDataObj.append("image", file); // 'image' field name should match backend
      });
    }

    setLoading(true);

    try {
      const response = await create_composit(formDataObj); // make sure ADD_ITEMS supports FormData
      if (response?.result === true) {
        Swal.fire({
          icon: "success",
          title: "success!",
          text: response.message,
          timer: 3000,
          timerProgressBar: true,
        }).then(() => {
          window.location.reload(); // Page reload after 3 seconds
        });
      } else {
        Swal.fire(
          "Failed!",
          response.message || "Something went wrong",
          "error"
        );
      }
    } catch (err) {
      console.error("❌ Error submitting item:", err);
      Swal.fire("Error!", "Failed to submit item", "error");
    } finally {
      setLoading(false); // stop loader
    }
  };

  //===============UNit Add<<<<<_-------------------- ++++++++++++++

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

  //===============Add__Brand<<<<<_-------------------- ++++++++++++++

  const Add__Brand = async (item) => {
    try {
      const data = {
        name: item.label,
      };

      const res = await ADD_BRAND(data);

      console.log("API raw response:", res);

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Brand created successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      Brand();
    } catch (err) {
      console.error("API error:", err?.response?.data || err.message);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  //----->>>>>>AddMANUFACTURE<<<---------------------------

  const AddManufactureSubmit = async (item) => {
    console.log("Item received in submit:", item);
    try {
      const data = {
        name: item.label, // or item.value
      };
      const res = await MANUFACTURE(data);
      console.log("API response:", res.data);

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Manufacturer added successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      Manufacturers();
    } catch (err) {
      console.error("API error:", err.response?.data || err.message);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center border-b p-4">
        <h2 className="  flex items-center gap-2">📦 New Composite Item</h2>

        {/* <button className="text-gray-600 hover:text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button> */}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
            {/* Left Column */}
            <div>
              {/* Name */}
              <div className="mb-2">
                <label className="block mb-2 ">
                  <span className="text-red-500 font-medium">Name*</span>
                </label>
                <input
                  type="text"
                  className={`w-full border capitalize  ${
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

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <label className="text-gray-700 mr-2">Type</label>
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
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="Assembly Item"
                      checked={formData.type === "Assembly Item"}
                      onChange={() => handleChange("type", "Assembly Item")}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Assembly Item</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="Kit Items"
                      checked={formData.type === "Kit Items"}
                      onChange={() => handleChange("type", "Kit Items")}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Kit Items</span>
                  </label>
                </div>
              </div>

              {/* SKU */}
              <div className="mb-2">
                <div className="flex items-center mb-2 ">
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
                  className="w-full border border-gray-300 rounded h-10  focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.sku}
                  onChange={(e) => handleChange("sku", e.target.value)}
                />
              </div>

              {/* Unit */}
              <div className="mb-2">
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

             
           
            
              
              {/* Dimensions */}
              <div className="mb-6">
                <label className="block mb-2 text-gray-700">Dimensions</label>
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

               {/* Right Column */}
               <div>
              <div className="mb-6">
                <ImageProps
                  accept="image,pdf,excel"
                  multiple={false}
                  maxFiles={1}
                  maxSizeMB={5}
                  maxResolution={7000}
                  onFilesSelected={(files) => {
                    setimage(files);
                    console.log("Final Files:", files);
                  }}
                />
              </div>

              {/* 
    <ImageProps accept="image" />
 <ImageProps accept="pdf ,excel, image" multiple={false} maxFiles={10} /> */}

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

              {/* Manufacturer */}
              <div className="mb-6">
                <label className="block mb-2 text-gray-700">Manufacturer</label>
                <CustomDropdownSelect
                  options={ManufactureList}
                  value={selectedOption}
                  onChange={handleChangeselect}
                  placeholder="Choose a manufacturer"
                  onAddNewClick={() => setShowModalManufacture(true)}
                  refreshOptions={Manufacturers}
                  deleteType="manufacturer"
                />
              </div>

              {/* Brand */}
              <div className="mb-6">
                <label className="block mb-2 text-gray-700">Brand</label>
                <CustomDropdownSelect
                  options={brand}
                  value={Brandoption}
                  onChange={handleChangeselectbrand}
                  placeholder="Choose a Brand"
                  onAddNewClick={() => setShowModalbrand(true)}
                  refreshOptions={Brand}
                  deleteType="brand"
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
        </div>
        <div className=" p-4 ">
        <AssociateComponents
                products={prdt}
                onChange={(updatedItems) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    associate_items: updatedItems.map(item => ({
                      item_id: item.id,
                      quantity: item.quantity,
                      selling_price: item.sellingPrice,
                      cost_price: item.costPrice,
                    })),
                  }));
                }}
              />
              </div>
        <div className=" p-4 ">
          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Sales Information Section */}
            <div className="w-full md:w-1/2 mb-6">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="salesInfo"
                  className="w-4 h-4 text-blue-600"
                  checked={salesSelected}
                  onChange={() => setSalesSelected(!salesSelected)}
                />
                <label htmlFor="salesInfo" className="ml-2 text-lg font-medium">
                  Sales Information
                </label>
              </div>

              {salesSelected && (
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
                        value={formData.selling_price}
                        onChange={(e) =>
                          handleChange("selling_price", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-red-500 mb-1">
                      Account<span className="text-red-500">*</span>
                    </label>
                    <CustomDropdownSelect
                      options={account}
                      value={Accountoption}
                      onChange={handleChangeselectaccount}
                      placeholder="Choose a Account"
                      onAddNewClick={() => setShowModalAccount(true)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-2 h-24"
                      value={formData.sales_description}
                      onChange={(e) =>
                        handleChange("sales_description", e.target.value)
                      }
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-1">
                      Tax
                    </label>
                    <div className="relative">
                      <CustomDropdownSelect
                        options={tax}
                        value={selectedOptiontax}
                        onChange={handleChangeselecttax}
                        placeholder="Choose a Tax"
                        onAddNewClick={() => setShowModalTax(true)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Purchase Information Section */}
            <div className="w-full md:w-1/2 mb-6">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="purchaseInfo"
                  className="w-4 h-4 text-blue-600"
                  checked={purchaseSelected}
                  onChange={() => setPurchaseSelected(!purchaseSelected)}
                />
                <label
                  htmlFor="purchaseInfo"
                  className="ml-2 text-lg font-medium"
                >
                  Purchase Information
                </label>
              </div>

              {purchaseSelected && (
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
                        value={formData.purchase_cost_price}
                        onChange={(e) =>
                          handleChange("purchase_cost_price", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-red-500 mb-1">
                      Account<span className="text-red-500">*</span>
                    </label>
                    <CustomDropdownSelect
                      options={accountPurchase}
                      value={selectedOptionPur}
                      onChange={handleChangeselectpurchase}
                      placeholder="Choose Account"
                      onAddNewClick={() => setShowModalaccountPurchase(true)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-2 h-24"
                      value={formData.purchase_description}
                      onChange={(e) =>
                        handleChange("purchase_description", e.target.value)
                      }
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-1">
                      Preferred Vendor
                    </label>
                    <CustomDropdownSelect
                      options={prefferedvendor}
                      value={selectedOptionVendor}
                      onChange={handleChangeselectVendor}
                      placeholder="Choose Preffered Vendor"
                      onAddNewClick={() => setShowModalPrefferedvendor(true)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Inventory Tracking Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="trackInventory"
                className="w-4 h-4 text-blue-600"
                checked={trackInventory}
                onChange={() => setTrackInventory(!trackInventory)}
              />
              <label
                htmlFor="trackInventory"
                className="ml-2 text-lg font-medium"
              >
                Track Inventory for this item
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

            <p className="text-sm text-gray-500 mb-4">
              You cannot enable/disable inventory tracking once you've created
              transactions for this item
            </p>

            {trackInventory && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <label className="block text-sm font-normal text-red-500 mb-1">
                    Inventory Account<span className="text-red-500">*</span>
                  </label>
                  <CustomDropdownSelect
                    options={Invento}
                    value={selectedOptionInvento}
                    onChange={handleChangeselectInvento}
                    placeholder="Choose a Inventory Account "
                    onAddNewClick={() => setShowModalInvento(true)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-normal text-red-500 mb-1">
                    Inventory Valuation Method
                    <span className="text-red-500">*</span>
                  </label>

                  <select
                    className="w-full border border-gray-300 rounded-md p-2 bg-white"
                    value={formData.inventory_valuation_method} // controlled value
                    onChange={(e) =>
                      handleChange("inventory_valuation_method", e.target.value)
                    } // handler
                  >
                    <option value="">Select the valuation method</option>
                    <option value="FIFO">FIFO (FIRST IN FIRST OUT)</option>
                    <option value="WAC">WAC (Weighted Average Costing)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-1">
                    Opening Stock
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={formData.handsOnStock}
                    onChange={(e) =>
                      handleChange("handsOnStock", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-1">
                    Opening Stock Rate per Unit
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={formData.rate_per_unit}
                    onChange={(e) =>
                      handleChange("rate_per_unit", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-1">
                    Reorder Point
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={formData.reorder_point}
                    onChange={(e) =>
                      handleChange("reorder_point", e.target.value)
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2 ml-5 w-100"
          disabled={loading}
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
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {/* Add Unit Modal */}
      <AddModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={Add__unit}
        title="Add item"
        placeholder="Enter Unit"
      />
      <AddModal
        isOpen={showModalManufacture}
        onClose={() => setShowModalManufacture(false)}
        onAdd={AddManufactureSubmit}
        title="Add Manufacturer"
        placeholder="Enter Manufacturer"
      />

      <AddModal
        isOpen={showModalbrand}
        onClose={() => setShowModalbrand(false)}
        onAdd={Add__Brand}
        title="Add Brand"
        placeholder="Enter Brand"
      />
    </div>
  );
};

export default AddCompositeItemsForm;
