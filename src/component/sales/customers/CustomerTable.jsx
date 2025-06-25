import React from 'react';
import CommonButton from '../../CommonUI/buttons/CommonButton';
// import { FiFilter } from 'react-icons/fi';

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
  return (
    <div className="w-full overflow-x-auto">
      <div className="max-h-[500px] overflow-auto">
        <table className="min-w-full table-fixed text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-3 bg-gray-50">
                <CommonButton
                  // label={<FiFilter size={18} />}
                  label={
                    <img src='/Images/commonIcons/filter.svg' className='w-6 h-6'/>
                  }
                  onClick={onFilterClick}
                  className="text-sm text-blue-500 px-2 py-1 rounded"
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
              {columns.map(col => (
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
                className={`hover:bg-blue-50 cursor-pointer ${row.id === rowHighlightKey ? 'bg-blue-50' : ''}`}
                onClick={() => onRowClick(row.id)}
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
                {columns.map(col => (
                  <td key={col.accessor} className="px-3 py-4 whitespace-nowrap text-xs">
                    {row[col.accessor]}
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


