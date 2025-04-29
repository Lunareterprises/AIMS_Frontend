import React from "react";
import Select, { components } from "react-select";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { delete_unit, deleteadsmanufacture, deletebrand } from "../../api/services/authService";

// ✅ Custom Option with Delete Button
const CustomOption = (props) => {
  const { data, innerRef, innerProps, selectProps } = props;

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Delete "${data.label}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        let res;

        if (selectProps.deleteType === "manufacturer") {
          const payload = { manufacture_id: data.value };
          res = await deleteadsmanufacture(payload);
        } else if (selectProps.deleteType === "brand") {
          const payload = { brand_id: data.value };
          res = await deletebrand(payload);
        }
        else if (selectProps.deleteType === "Unit") {
          const payload = { unit_id: data.value };
          res = await delete_unit(payload);
        }

        if (res?.result) {
          Swal.fire("Deleted!", res?.message || "Deleted successfully.", "success");
          if (typeof selectProps.refreshOptions === "function") {
            selectProps.refreshOptions();
          }
        } else {
          Swal.fire("Error", res?.message || "Failed to delete.", "error");
        }
      } catch (error) {
        Swal.fire("Error", error?.response?.data?.message || "Something went wrong.", "error");
      }
    }
  };

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex justify-between items-center px-3 py-2 hover:bg-blue-100 cursor-pointer"
    >
      <span>{data.label}</span>
      <FaTrashAlt
        className="text-red-500 hover:text-red-700 ml-3"
        onClick={handleDelete}
      />
    </div>
  );
};

// ✅ Custom MenuList with Add New
const CustomMenuList = (props) => {
  const { children, selectProps } = props;

  return (
    <components.MenuList {...props}>
      {children}
      <div
        className="text-blue-600 px-3 py-2 border-t border-gray-200 cursor-pointer hover:bg-blue-100 mt-2"
        onClick={selectProps.onAddNewClick}
      >
        ➕ Add New
      </div>
    </components.MenuList>
  );
};

// ✅ Main Dropdown Component
const CustomDropdownSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  isMulti = false,
  isSearchable = true,
  isDisabled = false,
  className = "",
  styles = {},
  onAddNewClick = () => {},
  refreshOptions = () => {},
  deleteType,
}) => {
  return (
    <Select
      components={{
        Option: (props) => (
          <CustomOption
            {...props}
            selectProps={{ ...props.selectProps, refreshOptions, deleteType }}
          />
        ),
        MenuList: (props) => (
          <CustomMenuList
            {...props}
            selectProps={{ ...props.selectProps, onAddNewClick, refreshOptions, deleteType }}
          />
        ),
      }}
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isMulti={isMulti}
      isSearchable={isSearchable}
      isDisabled={isDisabled}
      className={className}
      styles={styles}
    />
  );
};

export default CustomDropdownSelect;
