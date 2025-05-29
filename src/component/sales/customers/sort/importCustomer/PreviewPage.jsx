import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Download,
  Info,
  AlertTriangle,
} from 'lucide-react';

export default function PreviewPage() {
  const [currentView, setCurrentView] = useState(1);
  const [customersDetailsVisible, setCustomersDetailsVisible] = useState(true);
  const [skippedDetailsVisible, setSkippedDetailsVisible] = useState(false);
  const [unmappedDetailsVisible, setUnmappedDetailsVisible] = useState(false);

  // Toggle visibility handlers
  const toggleCustomersDetails = () =>
    setCustomersDetailsVisible((prev) => !prev);
  const toggleSkippedDetails = () =>
    setSkippedDetailsVisible((prev) => !prev);
  const toggleUnmappedDetails = () =>
    setUnmappedDetailsVisible((prev) => !prev);

  return (
    <div className="max-w-4xl mx-auto bg-white">

      {/* Info Banner */}
      <div className="mx-4 my-6 bg-blue-50 rounded p-4 flex items-start">
        <Info className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
        <p className="text-gray-800">
          42 of 43 Customers in your file are ready to be imported.
        </p>
      </div>

      <div className="mx-4 mb-6">

        {/* Section 1: Customers ready to import */}
        <div className="border-b border-gray-300 rounded mb-4">
          <div className="flex justify-between items-center p-4 bg-white">
            <h2 className="font-medium">
              Customers that are ready to be imported - 42
            </h2>
            {currentView === 1 && (
              <button
                onClick={toggleCustomersDetails}
                className="text-blue-500 flex items-center font-medium"
              >
                {customersDetailsVisible ? (
                  <>
                    Hide Details <ChevronUp size={16} className="ml-1" />
                  </>
                ) : (
                  <>
                    View Details <ChevronDown size={16} className="ml-1" />
                  </>
                )}
              </button>
            )}
          </div>

          {currentView === 1 && customersDetailsVisible && (
            <div className="px-8 py-2">
              <ul className="list-disc pl-5 py-2">
                <li className="py-1">Customers to be created (42)</li>
                <li className="py-1">Customers waiting to be overwritten (0)</li>
              </ul>
            </div>
          )}
        </div>

        {/* Section 2: Skipped Records */}
        <div className="border-b border-gray-300 rounded mb-4">
          <div className="flex justify-between items-center p-4 bg-white">
            <div className="flex items-center">
              <AlertTriangle className="text-orange-500 mr-2" size={20} />
              <h2 className="font-medium">No. of Records skipped - 1</h2>
            </div>

            <div className="flex items-center">
              {currentView === 2 && (
                <button className="text-blue-500 font-medium flex items-center mr-4">
                  Download skipped rows <Download size={16} className="ml-1" />
                </button>
              )}
              <button
                onClick={toggleSkippedDetails}
                className="text-blue-500 flex items-center font-medium"
              >
                {skippedDetailsVisible ? (
                  <>
                    Hide Details <ChevronUp size={16} className="ml-1" />
                  </>
                ) : (
                  <>
                    View Details <ChevronDown size={16} className="ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>

          {skippedDetailsVisible && (
            <div className="grid grid-cols-3 gap-4 p-4">
              <div className="text-gray-800">44</div>
              <div className="text-gray-800">Other</div>
              <div className="text-gray-800">Row already exists</div>
            </div>
          )}
        </div>

        {/* Section 3: Unmapped Fields */}
        {/* Section 3: Unmapped Fields */}
        <div className="border-b border-gray-300 rounded mb-4">
            <div className="flex justify-between items-center p-4 bg-white">
                <div className="flex items-center">
                <AlertTriangle className="text-orange-500 mr-2" size={20} />
                <h2 className="font-medium">Unmapped Fields - 3</h2>
                </div>
                <button
                onClick={toggleUnmappedDetails}
                className="text-blue-500 flex items-center font-medium"
                >
                {unmappedDetailsVisible ? (
                    <>
                    Hide Details <ChevronUp size={16} className="ml-1" />
                    </>
                ) : (
                    <>
                    View Details <ChevronDown size={16} className="ml-1" />
                    </>
                )}
                </button>
            </div>

            {unmappedDetailsVisible && (
                <div className="px-4 py-3">
                <p className="text-gray-600 mb-4">
                    The following fields in your import file have not been mapped to any zeluna field.
                    The data in these fields will be ignored during the import.
                </p>
                <ul className="list-disc pl-5 py-2">
                    <li className="py-1">Column 2</li>
                    <li className="py-1">Column 3</li>
                    <li className="py-1">Column 4</li>
                </ul>
                </div>
            )}
        </div>


        {/* Info Banner for View 3 */}
        {currentView === 3 && (
          <div className="bg-blue-50 rounded p-4 flex items-start mb-4">
            <Info className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
            <p className="text-gray-800">
              Click the Previous button if you want to match the above column header(s) or click the Import
              button to continue with the import.
            </p>
          </div>
        )}
      </div>

      {/* Optional: View navigation buttons for demo */}
      {/* <div className="bg-gray-100 p-4 flex justify-center gap-4">
        {[1, 2, 3].map((view) => (
          <button
            key={view}
            onClick={() => setCurrentView(view)}
            className={`px-4 py-2 rounded ${
              currentView === view
                ? 'bg-blue-500 text-white'
                : 'bg-white border border-gray-300'
            }`}
          >
            View {view}
          </button>
        ))}
      </div> */}
    </div>
  );
}
