import React from "react";
import CommonButton from "../../CommonUI/buttons/CommonButton";
import FilterIcon from "../../icons/FilterIcon";
import { ExternalLink, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Helper component for rendering links
const LinkRenderer = ({ value, href, type = "internal", icon = null, onClick = null }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent row click
    
    if (onClick) {
      onClick(value, href);
      return;
    }
    
    if (type === "internal") {
      navigate(href);
    } else if (type === "external") {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (type === "email") {
      window.location.href = `mailto:${href}`;
    } else if (type === "phone") {
      window.location.href = `tel:${href}`;
    }
  };

  return (
    <div className="flex items-center gap-1">
      <span 
        className="text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
        onClick={handleClick}
      >
        {value}
      </span>
      {icon && <span className="text-gray-400">{icon}</span>}
    </div>
  );
};

// Text transformation functions
const textTransformers = {
  uppercase: (text) => String(text || '').toUpperCase(),
  lowercase: (text) => String(text || '').toLowerCase(),
  capitalize: (text) => String(text || '').charAt(0).toUpperCase() + String(text || '').slice(1).toLowerCase(),
  capitalizeWords: (text) => String(text || '').replace(/\b\w/g, l => l.toUpperCase()),
  truncate: (text, length = 20) => {
    const str = String(text || '');
    return str.length > length ? str.substring(0, length) + '...' : str;
  },
  currency: (value) => {
    const num = parseFloat(value || 0);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(num);
  },
  phone: (phone) => {
    const cleaned = String(phone || '').replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
    }
    return phone;
  }
};

export default function CustomerTable({
  columns = [],
  data = [],
  onRowClick = () => {},
  selectedRows = [],
  onRowSelect = () => {},
  selectAll = false,
  onSelectAll = () => {},
  rowHighlightKey = null,
  onFilterClick = () => {},
}) {

  // Function to render cell content based on column configuration
  const renderCellContent = (column, row) => {
    const value = row[column.accessor];
    
    // If column has a custom render function, use it
    if (column.render && typeof column.render === 'function') {
      return column.render(value, row);
    }
    
    // If column has a link configuration
    if (column.link) {
      const href = typeof column.link.href === 'function' 
        ? column.link.href(value, row) 
        : column.link.href || value;
        
      return (
        <LinkRenderer 
          value={value}
          href={href}
          type={column.link.type || 'internal'}
          icon={column.link.icon}
          onClick={column.link.onClick}
        />
      );
    }
    
    // If column has a transform function
    if (column.transform) {
      if (typeof column.transform === 'function') {
        return column.transform(value, row);
      } else if (typeof column.transform === 'string' && textTransformers[column.transform]) {
        return textTransformers[column.transform](value);
      }
    }
    
    // Apply CSS class-based transformation
    if (column.textTransform) {
      return (
        <span className={`${column.textTransform}`}>
          {value}
        </span>
      );
    }
    
    // Return raw value
    return value;
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="max-h-[500px] overflow-auto">
        <table className="min-w-full table-fixed text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-3 bg-gray-50">
                <CommonButton
                  label={<FilterIcon className="w-6 h-6 text-blue-500" />}
                  onClick={onFilterClick}
                  className="px-2 py-1 rounded"
                />
              </th>
              <th className="px-3 py-3 bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={onSelectAll}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded -ml-5"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap bg-gray-50"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 cursor-pointer ${
                  row.id === rowHighlightKey ? "bg-blue-50" : ""
                }`}
                onClick={(event) => {
                  // Check if click is on a link
                  const isLinkClick = event.target.closest('.text-blue-600') || 
                                    event.target.closest('[data-link="true"]');
                  if (!isLinkClick) {
                    onRowClick(row.id, event);
                  }
                }}
              >
                <td className="px-3 py-4" />
                <td className="px-3 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => onRowSelect(row.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-4 h-4 border-gray-300 rounded"
                  />

                </td>
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className="px-3 py-4 whitespace-nowrap text-xs"
                    data-link={col.link || col.render ? "true" : "false"}
                  >
                    {renderCellContent(col, row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
