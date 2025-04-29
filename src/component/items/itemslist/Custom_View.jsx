import React, { useEffect, useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { custom_create, custom_table } from "../../../api/services/authService";

const CustomViewBuilder = () => {
  const [criteria, setCriteria] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(["Name"]);
  const [showFieldDropdown, setShowFieldDropdown] = useState(null);
  const [selectedComparator, setSelectedComparator] = useState(null);
  const [favoriteChecked, setFavoriteChecked] = useState(false);
  const [visibilityOption, setVisibilityOption] = useState("onlyMe");
  const [availableColumns, setAvailableColumns] = useState([]);
  const [viewName, setViewName] = useState("");

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const res = await custom_table({ table: "items" });
        const tabledata = res.data;
        const displayColumns = tabledata.map(({ COLUMN_NAME }) => {
          let name = COLUMN_NAME;
          if (name.startsWith("i_")) name = name.slice(2);
          return name
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
        });
        setAvailableColumns(displayColumns);
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    };
    fetchColumns();
  }, []);

  const addCriteria = () => {
    const newCriteria = {
      id: Date.now(),
      field: "",
      comparator: "",
      value: "",
      logic: "AND",
    };
    setCriteria([...criteria, newCriteria]);
  };

  const removeCriteria = (id) => {
    setCriteria(criteria.filter((c) => c.id !== id));
  };

  const getCriteriaString = () => {
    return criteria
      .map((c, index) => {
        const field = c.field.toLowerCase().replace(/\s/g, "_");
        const logic = index > 0 ? `${c.logic} ` : "";
        return `${logic}${field}/${c.comparator}/${c.value}`;
      })
      .join(" ");
  };

  const getCriteriaPattern = () => {
    return criteria
      .map((_, index) => `${index + 1}`)
      .join(` ${criteria[1]?.logic || "AND"} `);
  };

  const getSelectedColumnsString = () => {
    return selectedColumns
      .map((col) => "i_" + col.toLowerCase().replace(/\s/g, "_"))
      .join("/");
  };

  const handleSave = async () => {
    try {
      const payload = {
        cv_name: viewName,
        cv_is_favorite: favoriteChecked ? 1 : 0,
        cv_criteria: getCriteriaString(),
        cv_criteria_pattern: getCriteriaPattern(),
        cv_selected_columns: getSelectedColumnsString(),
        cv_visibility:
          visibilityOption === "onlyMe"
            ? 1
            : visibilityOption === "selected"
            ? 2
            : 3,
        cv_table_name: "items",
      };
      await custom_create(payload);
      alert("Custom view saved successfully!");
    } catch (error) {
      console.error("Error saving custom view:", error);
    }
  };

  return (
    <div className="p-6 space-y-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Create Custom View
        </h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <label className="text-sm font-medium text-gray-700">
          View Name <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
            placeholder="Enter view name"
            value={viewName}
            onChange={(e) => setViewName(e.target.value)}
          />
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={favoriteChecked}
              onChange={() => setFavoriteChecked(!favoriteChecked)}
              className="accent-blue-600"
            />
            Mark as Favorite
          </label>
        </div>
      </div>

      {/* Criteria Section */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Define Conditions
        </h2>
        {criteria.map((criterion) => (
          <div key={criterion.id} className="flex flex-wrap gap-4 items-center">
            <div className="w-full md:w-1/3 relative">
              <div
                className="px-4 py-2 border  border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={() =>
                  setShowFieldDropdown(
                    showFieldDropdown === criterion.id ? null : criterion.id
                  )
                }
              >
                <span className="text-sm text-gray-700">
                  {criterion.field || "Select a field"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              {showFieldDropdown === criterion.id && (
                <div className="absolute mt-1 z-10 w-full bg-white border  rounded shadow-lg max-h-60 overflow-y-auto">
                  {availableColumns.map((field) => (
                    <div
                      key={field}
                      className="px-4 py-2 hover:bg-gray-100  cursor-pointer text-sm"
                      onClick={() => {
                        setCriteria((prev) =>
                          prev.map((c) =>
                            c.id === criterion.id ? { ...c, field } : c
                          )
                        );
                        setShowFieldDropdown(null);
                      }}
                    >
                      {field}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/4 relative">
              <div
                className="px-4 py-2 border  border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={() =>
                  setSelectedComparator(
                    selectedComparator === criterion.id ? null : criterion.id
                  )
                }
              >
                <span className="text-sm text-gray-700">
                  {criterion.comparator || "Select comparator"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              {selectedComparator === criterion.id && (
                <div className="absolute mt-1 z-10 w-full bg-white border  rounded shadow-lg">
                  {[
                    "equals",
                    "not equal",
                    "contains",
                    "starts with",
                    "ends with",
                  ].map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setCriteria((prev) =>
                          prev.map((c) =>
                            c.id === criterion.id
                              ? { ...c, comparator: option }
                              : c
                          )
                        );
                        setSelectedComparator(null);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Enter value"
              className="w-full md:w-1/4 px-4 py-2 border  border-gray-300 rounded-lg text-sm"
              value={criterion.value}
              onChange={(e) =>
                setCriteria((prev) =>
                  prev.map((c) =>
                    c.id === criterion.id ? { ...c, value: e.target.value } : c
                  )
                )
              }
            />

            <select
              className="w-24 px-3 py-2 border  border-gray-300 rounded-lg text-sm"
              value={criterion.logic}
              onChange={(e) =>
                setCriteria((prev) =>
                  prev.map((c) =>
                    c.id === criterion.id ? { ...c, logic: e.target.value } : c
                  )
                )
              }
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>

            <button
              onClick={() => removeCriteria(criterion.id)}
              className="text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        <button
          onClick={addCriteria}
          className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
        >
          <Plus className="w-4 h-4" /> Add Condition
        </button>
      </div>

      {/* Column Selection */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-lg font-semibold text-gray-800">Choose Columns</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="">
            <h3 className="font-medium text-gray-700 mb-2">
              Available Columns
            </h3>
            <div className="border border-gray-300 rounded p-3 space-y-2 max-h-64 overflow-y-auto">
              {availableColumns.map((column) => (
                <div
                  key={column}
                  className="cursor-pointer hover:bg-gray-100 px-3 py-2 rounded text-sm"
                  onClick={() =>
                    !selectedColumns.includes(column) &&
                    setSelectedColumns([...selectedColumns, column])
                  }
                >
                  ≡ {column}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Selected Columns</h3>
            <div className="border  border-gray-300 rounded p-3 space-y-2 max-h-64 overflow-y-auto">
              {selectedColumns.map((column) => (
                <div
                  key={column}
                  className="flex justify-between items-center text-sm hover:bg-gray-50 px-3 py-2 rounded"
                >
                  <span className="flex items-center gap-2">≡ {column}</span>
                  <button
                    onClick={() =>
                      setSelectedColumns(
                        selectedColumns.filter((c) => c !== column)
                      )
                    }
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visibility */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Visibility Preference
        </h2>
        <div className="space-y-2">
          {[
            { value: "onlyMe", label: "Only Me" },
            { value: "selected", label: "Only Selected Users & Roles" },
            { value: "everyone", label: "Everyone" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="radio"
                name="visibility"
                value={opt.value}
                checked={visibilityOption === opt.value}
                onChange={() => setVisibilityOption(opt.value)}
                className="accent-blue-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CustomViewBuilder;
