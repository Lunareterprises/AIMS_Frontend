import React, { useState } from 'react';
import { ChevronRight, Clock, DollarSign, CreditCard, Building2 } from 'lucide-react';
const tabs = [
  { id: "unbilledHours", label: "Unbilled Hours" },
  { id: "unbilledExpenses", label: "Unbilled Expenses" },
];
const Projects = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0].id);

  const Tooltip = ({ text, children }) => (
    <div className="relative group cursor-pointer">
      {children}
      <span className="absolute left-1/2 bottom-full mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-black/60 px-2 py-1 text-sm text-white opacity-0 group-hover:block group-hover:opacity-100 ml-30">
        {text}
      </span>
    </div>
  );


    const renderTable = () => {
      switch (activeTab) {
        case "unbilledHours":
          return (
            <div>
              <div className="text-xl font-semibold text-gray-700">00:00</div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">No logged hours</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">No budget hours</div>
                  </div>
                </div>
              </div>
            </div>
          );
        case "unbilledExpenses":
          return (
            <div className="text-center py-8">
              <div className="text-gray-500 text-sm">There are no unbilled expenses</div>
            </div>
          );
        default:
          return null;
      }
    };



  return (
    <div className=" bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Projects Section */}
          <div className="bg-white">
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between">
                <Tooltip text="Projects that are on your watchlist are displayed here ">
                  <h2 className="text-xl font-medium text-gray-900">Projects</h2>
                </Tooltip>
              </div>

              {/* Tabs */}
              <div className="w-full max-w-5xl mx-auto mt-10 flex-grow">
                <div className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-5 py-2 text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? "border-t-2 px-16 pt-10 border-blue-500 text-blue-600"
                          : "border-b-2 px-16 pt-10 border-l-2 border-r-2 border-gray-200 text-gray-500 hover:text-blue-500"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Table content */}
                <div className="p-6 bg-white">{renderTable()}</div>
              </div>

              {/* Show All Projects Button at the Bottom */}
              <div className="mt-6">
                <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Show All Projects
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

          </div>
          
          {/* Bank and Credit Cards Section */}
          <div className="bg-white">
            <div className="p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Bank and Credit Cards</h2>
              
              {/* Account Items */}
              <div className="space-y-4">
                {/* Business Account */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 w-56">A IM BUSINESS CORP FOR CORPORATE SERVICES PROVIDERS CO. L.L.C</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold ">AED-215,926.12</div>
                  </div>
                </div>
                
                {/* Payroll Account */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">zeluna Payroll - Bank Account</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold ">AED0.00</div>
                  </div>
                </div>
              </div>
              
              {/* Summary Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Total Balance</div>
                    <div className="text-xl font-bold text-gray-900">AED-215,926.12</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Active Accounts</div>
                    <div className="text-xl font-bold text-gray-900">2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
