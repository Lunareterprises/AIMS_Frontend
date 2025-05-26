import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

const ReceivablesDashboard = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [openingBalance, setOpeningBalance] = useState('');
  const [timePeriod, setTimePeriod] = useState('Last 6 Months');
  const [showTimePeriodDropdown, setShowTimePeriodDropdown] = useState(false);
  const [chartType, setChartType] = useState('Accrual');
  const [showChartTypeDropdown, setShowChartTypeDropdown] = useState(false);

  const timePeriodOptions = ['This Fiscal Year', 'Previous Fiscal Year', 'Last 12 Months', 'Last 6 Months'];
  const chartTypeOptions = ['Accrual', 'Cash'];

  // Chart data for different periods
  const chartData = {
    'Last 6 Months': {
      total: 'AED0.00',
      months: ['Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025'],
      values: [0, 0, 0, 0, 0, 0, 0]
    },
    'Previous Fiscal Year': {
      total: 'AED10,500.00',
      months: ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024', 'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024'],
      values: [0, 0, 0, 0, 0, 0, 10500, 0, 0, 0, 0, 0]
    }
  };

  const currentChart = chartData[timePeriod] || chartData['Last 6 Months'];
  const maxValue = Math.max(...currentChart.values) || 5000;

  const renderChart = () => {
    return (
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium text-gray-900">Income</h3>
            <span className="text-sm text-gray-500">This chart is displayed in the organization's base currency.</span>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <button
                onClick={() => setShowTimePeriodDropdown(!showTimePeriodDropdown)}
                className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50"
              >
                {timePeriod}
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {showTimePeriodDropdown && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {timePeriodOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setTimePeriod(option);
                        setShowTimePeriodDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                        option === timePeriod ? 'bg-blue-500 text-white' : 'text-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowChartTypeDropdown(!showChartTypeDropdown)}
                className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50"
              >
                {chartType}
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {showChartTypeDropdown && (
                <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {chartTypeOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setChartType(option);
                        setShowChartTypeDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                        option === chartType ? 'bg-blue-500 text-white' : 'text-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-4">
          <div className="flex items-end justify-between h-64 border-l border-b border-gray-200">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between h-full pr-2 text-xs text-gray-500">
              <span>{(maxValue * 1.2 / 1000).toFixed(0)} K</span>
              <span>{(maxValue * 1.0 / 1000).toFixed(0)} K</span>
              <span>{(maxValue * 0.8 / 1000).toFixed(0)} K</span>
              <span>{(maxValue * 0.6 / 1000).toFixed(0)} K</span>
              <span>{(maxValue * 0.4 / 1000).toFixed(0)} K</span>
              <span>{(maxValue * 0.2 / 1000).toFixed(0)} K</span>
              <span>0</span>
            </div>

            {/* Chart bars */}
            <div className="flex items-end justify-between flex-1 h-full px-4">
              {currentChart.values.map((value, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="bg-green-400 w-8 mb-2"
                    style={{
                      height: `${(value / (maxValue * 1.2)) * 100}%`,
                      minHeight: value > 0 ? '4px' : '0px'
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between mt-2 pl-12 pr-4">
            {currentChart.months.map((month, index) => (
              <span key={index} className="text-xs text-gray-500 text-center" style={{ width: '32px' }}>
                {month.split(' ')[0]}
                <br />
                <span className="text-gray-400">{month.split(' ')[1]}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 text-sm font-medium text-gray-900">
          Total Income ( {timePeriod} ) - {currentChart.total}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto min-h-screen">
      <div className=" px-3">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Receivables</h2>
        
        {/* Receivables Table */}
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">CURRENCY</h3>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">OUTSTANDING RECEIVABLES</h3>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">UNUSED CREDITS</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-200">
            <div className="text-gray-900">AED- UAE Dirham</div>
            <div className="text-gray-900">AED0.00</div>
            <div className="text-gray-900">AED0.00</div>
          </div>
          
          <button 
            onClick={() => setShowEditModal(true)}
            className="text-blue-500 hover:text-blue-600 text-sm mt-2"
          >
            Enter Opening Balance
          </button>
        </div>

        {/* Chart Section */}
        {renderChart()}
      </div>

      {/* Edit Opening Balance Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Opening Balance</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-red-500 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opening Balance
              </label>
              <input
                type="text"
                value={openingBalance}
                onChange={(e) => setOpeningBalance(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
              />
            </div>
            
            <div className="mb-6">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Tax Update:</span> The opening balance for your customers will not be included in your VAT Return if your Migration Date is on or after your first VAT return generation date. If you want the amount to be included in your VAT return, record it by creating an invoice after your VAT return generation date.
              </div>
            </div>
            
            <button
              onClick={() => {
                setShowEditModal(false);
                setOpeningBalance('');
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceivablesDashboard;