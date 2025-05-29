import React from 'react'

function RemarksTab() {
  return (
    <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Remarks (For Internal Use)</label>
            <textarea 
            className="w-full h-32 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Enter any internal remarks about this customer..."
            />
        </div>
    </div>
  )
}

export default RemarksTab
