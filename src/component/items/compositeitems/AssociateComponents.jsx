import React, { useState } from "react";
import Select from "react-select";
import { X, Plus, MoreVertical, Image } from "lucide-react";
import Swal from "sweetalert2";

const AssociateComponents = ({ products = [], onChange }) => {
  const [items, setItems] = useState([]);
  
  const handleSelectChange = (selectedOption, index) => {
    const selectedProduct = products.find((p) => p.id === selectedOption.value);
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      id: selectedProduct.id,
      name: selectedProduct.name,
      image: selectedProduct.image,
      quantity: 1,
      sellingPrice: selectedProduct.sellingPrice,
      costPrice: selectedProduct.costPrice,
    };
    setItems(updatedItems);
    onChange?.(updatedItems);
  };

  const addNewRow = () => {
    setItems([
      ...items,
      {
        id: null,
        name: "",
        image: "",
        quantity: 1,
        sellingPrice: 0,
        costPrice: 0,
      },
    ]);
  };

  const removeItem = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
        onChange?.(updatedItems);
      }
    });
  };

  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  const totals = {
    sellingPrice: items.reduce((sum, item) => sum + (item.sellingPrice || 0), 0).toFixed(2),
    costPrice: items.reduce((sum, item) => sum + (item.costPrice || 0), 0).toFixed(2),
  };

  return (
    <div>
      <label className="block mb-4">
        <span className="text-red-500 font-medium">Associate Items</span>
        <span className="text-red-500">*</span>
      </label>

      <div className="border border-gray-200 rounded">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-4 font-medium text-gray-600">Item Details</th>
              <th className="text-right py-2 px-4 font-medium text-gray-600">Quantity</th>
              <th className="text-right py-2 px-4 font-medium text-gray-600">Selling Price</th>
              <th className="text-right py-2 px-4 font-medium text-gray-600">Cost Price</th>
              <th className="py-2 px-4 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center mr-3 bg-gray-50">
                      {item.image ? (
                        <img src={item.image} alt="Product" className="w-10 h-10 object-cover" />
                      ) : (
                        <Image className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="w-full">
                      <Select
                        options={productOptions}
                        onChange={(opt) => handleSelectChange(opt, index)}
                        value={productOptions.find((opt) => opt.value === item.id) || null}
                        placeholder="Select Product"
                      />
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 text-right">{item.quantity}</td>
                <td className="py-2 px-4 text-right">{item.sellingPrice.toFixed(2)}</td>
                <td className="py-2 px-4 text-right">{item.costPrice.toFixed(2)}</td>
                <td className="py-2 px-4 flex items-center justify-end">
                  <button className="text-gray-500 hover:text-gray-700 mr-1">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeItem(index)}
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
                  {/* <button className="flex items-center text-blue-500 hover:text-blue-700">
                    <Plus className="w-5 h-5 mr-1" />
                    <span>Add Services</span>
                  </button> */}
                </div>
              </td>
              <td className="py-3 px-4 text-right font-medium">Total (AED) :</td>
              <td className="py-3 px-4 text-right">{totals.sellingPrice}</td>
              <td className="py-3 px-4 text-right">{totals.costPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssociateComponents;
