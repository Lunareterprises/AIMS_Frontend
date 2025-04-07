import React from "react";
import Select, { components } from "react-select";

// Custom MenuList with "Add New"
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
  onAddNewClick = () => {}, // Function to open modal
}) => {
  return (
    <Select
    components={{ MenuList: (props) => <CustomMenuList {...props} selectProps={{ ...props.selectProps, onAddNewClick }} /> }}
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isMulti={isMulti}
      isSearchable={isSearchable}
      isDisabled={isDisabled}
      className={className}
      styles={styles}
      onAddNewClick={onAddNewClick} // pass it for use in MenuList
    />
  );
};

export default CustomDropdownSelect;
