import { X, Info } from "lucide-react";
import { useState } from "react";
import CommonButton from "../../../../CommonUI/buttons/CommonButton";

export default function ExportCurrentView({ isOpen, onClose }) {
  const [fileFormat, setFileFormat] = useState("csv");
  if (!isOpen) return null;
  // const handleClose = () => {
  //   setIsOpen(false);
  // };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-md shadow-lg w-full max-w-2xl">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-gray-100">
              <h2 className="text-xl font-medium text-gray-800">Export Current View</h2>
              <CommonButton label={ <X size={20} />} onClick={onClose} className="text-red-500 hover:text-red-700" />
               
             
            </div>
            
            {/* Content */}
            <div className="p-6">
              {/* Info Box */}
              <div className="bg-blue-50 p-4  rounded-md mb-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-2">
                    {/* <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center"> */}
                    <Info className="text-white bg-blue-500 rounded-full  mr-2 mt-0.5 flex-shrink-0" size={18} />
                    {/* </div> */}
                  </div>
                  <p className="text-xs text-gray-700">
                    Only the current view with its visible columns will be exported from zeluna in CSV or XLS format.
                  </p>
                </div>
              </div>
              
              {/* Decimal Format */}
              <div className="mb-5 text-sm">
                <label className="block text-red-500 mb-2">
                  Decimal Format<span className="text-red-500">*</span>
                </label>
                <div className="relative w-1/2">
                  <select className="w-full border border-gray-300 rounded px-3 py-2 appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>12345.67.89</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Export File Format */}
              <div className="mb-5 text-sm">
                <label className="block text-red-500 mb-2">
                  Export File Format<span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="fileFormat"
                      value="csv"
                      checked={fileFormat === "csv"}
                      onChange={() => setFileFormat("csv")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">CSV (Comma Separated Value)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="fileFormat"
                      value="xls"
                      checked={fileFormat === "xls"}
                      onChange={() => setFileFormat("xls")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">XLS (Microsoft Excel 1997-2004 Compatible)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="fileFormat"
                      value="xlsx"
                      checked={fileFormat === "xlsx"}
                      onChange={() => setFileFormat("xlsx")}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">XLSX (Microsoft Excel)</span>
                  </label>
                </div>
              </div>
              
              {/* Password Protection */}
              <div className="mb-5 text-sm w-1/2">
                <label className="block text-gray-700 mb-2">File Protection Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder=""
                />
              </div>
              
              {/* Note */}
              <div className="mb-5 text-sm">
                <div className="flex">
                  <span className="font-medium text-gray-700 mr-2">Note:</span>
                  <span className="text-gray-600">
                    You can export only the first 10,000 rows. If you have more rows, please initiate a backup for the data in your Zoho Books organization, and download it.{" "}
                    {/* <a href="#" className="text-blue-500 hover:underline">Backup Your Data</a> */}
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-2 mt-6">
                <CommonButton label="Export" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"/>
                  
                
                <CommonButton 
                  onClick={onClose}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  label="Cancel"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

