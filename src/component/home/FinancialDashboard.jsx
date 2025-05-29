import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FinancialDashboard = () => {
  const [leftDropdown, setLeftDropdown] = useState('This Fiscal Year');
  const [rightDropdown, setRightDropdown] = useState('This Fiscal Year');
  const [leftDropdownOpen, setLeftDropdownOpen] = useState(false);
  const [rightDropdownOpen, setRightDropdownOpen] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
    const [periodData, setPeriodData] = useState({});

  // Data for different periods
//   const periodData = {
//     'This Fiscal Year': {
//       chartData: [
//         { month: 'Jan', year: '2025', income: 10000, expense: 7500 },
//         { month: 'Feb', year: '2025', income: 0, expense: 0 },
//         { month: 'Mar', year: '2025', income: 0, expense: 0 },
//         { month: 'Apr', year: '2025', income: 0, expense: 0 },
//         { month: 'May', year: '2025', income: 0, expense: 0 },
//         { month: 'Jun', year: '2025', income: 0, expense: 0 },
//         { month: 'Jul', year: '2025', income: 0, expense: 0 },
//         { month: 'Aug', year: '2025', income: 0, expense: 0 },
//         { month: 'Sep', year: '2025', income: 0, expense: 0 },
//         { month: 'Oct', year: '2025', income: 0, expense: 0 },
//         { month: 'Nov', year: '2025', income: 0, expense: 0 },
//         { month: 'Dec', year: '2025', income: 0, expense: 0 }
//       ],
//       totalIncome: 'AED10,000.00',
//       totalExpenses: 'AED7,576.39',
//       showAccrualCash: true
//     },
//     'Previous Fiscal Year': {
//       chartData: [
//         { month: 'Jan', year: '2024', income: 100000, expense: 50000 },
//         { month: 'Feb', year: '2024', income: 150000, expense: 30000 },
//         { month: 'Mar', year: '2024', income: 150000, expense: 40000 },
//         { month: 'Apr', year: '2024', income: 80000, expense: 20000 },
//         { month: 'May', year: '2024', income: 200000, expense: 60000 },
//         { month: 'Jun', year: '2024', income: -500000, expense: 100000 },
//         { month: 'Jul', year: '2024', income: 140000, expense: 30000 },
//         { month: 'Aug', year: '2024', income: 200000, expense: 50000 },
//         { month: 'Sep', year: '2024', income: 100000, expense: 40000 },
//         { month: 'Oct', year: '2024', income: 120000, expense: 35000 },
//         { month: 'Nov', year: '2024', income: 300000, expense: 80000 },
//         { month: 'Dec', year: '2024', income: 250000, expense: 70000 }
//       ],
//       totalIncome: 'AED1,131,833.33',
//       totalExpenses: 'AED99,245.84',
//       showAccrualCash: true
//     }
//   };

    useEffect(()=>{
        fetch('/data/income_expense_data.json')
        .then((res)=>{
            if (!res.ok) throw new Error('Failed to fetch income and expense data');
        return res.json();
        })
        .then(setPeriodData)
        .catch(console.error);
        fetch('/data/top_expenses_data.json')
        .then((res) => {
            if (!res.ok) throw new Error('Failed to fetch top expenses data');
            return res.json();
        })
        .then(setExpenseData)
        .catch(console.error);
    },[])

//   const currentData = periodData[leftDropdown] || periodData['This Fiscal Year'];
const currentData = periodData[leftDropdown] || {};
const chartData = currentData.chartData || [];

const maxValue = chartData.length
  ? Math.max(...chartData.map(d => Math.max(Math.abs(d.income), Math.abs(d.expense))))
  : 0;

  const getBarHeight = (value, maxValue) => {
    if (maxValue === 0) return 0;
    return Math.abs(value) / maxValue * 120;
  };

//   const maxValue = Math.max(...currentData.chartData.map(d => Math.max(Math.abs(d.income), Math.abs(d.expense))));

//   const expenseData = [
//     { name: "Employee's VISA", amount: 'AED7,200.00', color: 'bg-green-500', percentage: 95 },
//     { name: 'DEWA', amount: 'AED376.16', color: 'bg-orange-500', percentage: 3 },
//     { name: 'Office & Administration Ex...', amount: 'AED147...', color: 'bg-blue-500', percentage: 1.5 },
//     { name: 'Office Supplies', amount: 'AED63.54', color: 'bg-yellow-500', percentage: 0.3 },
//     { name: 'Client Refreshments', amount: 'AED25.74', color: 'bg-purple-500', percentage: 0.2 }
//   ];

  const dropdownOptions = [
    'This Fiscal Year',
    'This Quarter', 
    'This Month',
    'Previous Fiscal Year',
    'Previous Quarter',
    'Previous Month',
    'Last 6 Months',
    'Last 12 Months'
  ];

  return (
    <div className="bg-gray-50 p-6 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        
        {/* Income and Expense Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-800">Income and Expense</h2>
            <div className="relative">
              <button 
                onClick={() => setLeftDropdownOpen(!leftDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                {leftDropdown}
                <ChevronDown className="w-4 h-4" />
              </button>
              {leftDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-48">
                  {dropdownOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setLeftDropdown(option);
                        setLeftDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                        option === leftDropdown ? 'bg-blue-500 text-white' : 'text-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Accrual/Cash Toggle - only show for fiscal year views */}
          {currentData.showAccrualCash && (
            <div className="flex justify-end gap-2 mb-6">
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm">Accrual</button>
              <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded text-sm">Cash</button>
            </div>
          )}

          {/* Chart Area */}
          <div className="relative h-48 mb-6">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
              <span>{maxValue >= 1000000 ? '500 K' : '10 K'}</span>
              <span>{maxValue >= 1000000 ? '300 K' : '8 K'}</span>
              <span>{maxValue >= 1000000 ? '200 K' : '6 K'}</span>
              <span>{maxValue >= 1000000 ? '100 K' : '4 K'}</span>
              <span>0</span>
              <span>{maxValue >= 1000000 ? '-100 K' : '2 K'}</span>
              {maxValue >= 1000000 && (
                <>
                  <span>-200 K</span>
                  <span>-300 K</span>
                  <span>-400 K</span>
                  <span>-500 K</span>
                </>
              )}
            </div>

            {/* Chart bars */}
            <div className="flex items-end justify-center h-full ml-12 mr-4">
              {chartData.map((data, index) => (
                <div key={index} className="flex-1 flex items-end justify-center relative">
                  <div className="flex items-end gap-1">
                    {/* Income bar */}
                    {data.income > 0 && (
                      <div 
                        className="bg-green-500 w-3 rounded-sm"
                        style={{ height: `${getBarHeight(data.income, maxValue)}px` }}
                      />
                    )}
                    
                    {/* Expense bar */}
                    {data.expense > 0 && (
                      <div 
                        className="bg-red-500 w-3 rounded-sm"
                        style={{ height: `${getBarHeight(data.expense, maxValue)}px` }}
                      />
                    )}

                    {/* Negative income bar */}
                    {data.income < 0 && (
                      <div 
                        className="bg-green-500 w-3 rounded-sm transform"
                        style={{ 
                          height: `${getBarHeight(data.income, maxValue)}px`,
                          transform: 'scaleY(-1)',
                          transformOrigin: 'bottom'
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Zero line */}
            <div className="absolute bottom-16 left-12 right-4 h-px bg-gray-300"></div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-center ml-12 mr-4 mb-6">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 text-center">
                <div className="text-xs text-gray-500">{data.month}</div>
                <div className="text-xs text-gray-400">{data.year}</div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-green-500 rounded-sm"></div>
              <span className="text-sm text-gray-600">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-red-500 rounded-sm"></div>
              <span className="text-sm text-gray-600">Expense</span>
            </div>
          </div>

          {/* Totals */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-green-600 text-sm font-medium">Total Income</div>
              <div className="text-xl font-semibold text-gray-800">{currentData.totalIncome || 'Loading...'}</div>
            </div>
            <div>
              <div className="text-red-600 text-sm font-medium">Total Expenses</div>
              <div className="text-xl font-semibold text-gray-800">{currentData.totalIncome || 'Loading...'}</div>
            </div>
          </div>

          <div className="text-xs text-gray-500 mt-4">
            * Income and expense values displayed are exclusive of taxes.
          </div>
        </div>

        {/* Top Expenses */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-800">Top Expenses</h2>
            <div className="relative">
              <button 
                onClick={() => setRightDropdownOpen(!rightDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                {rightDropdown}
                <ChevronDown className="w-4 h-4" />
              </button>
              {rightDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-48">
                  {dropdownOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setRightDropdown(option);
                        setRightDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                        option === rightDropdown ? 'bg-blue-500 text-white' : 'text-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="20"
                />
                {/* Green segment (95%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="20"
                  strokeDasharray="239 12"
                  strokeDashoffset="0"
                />
                {/* Orange segment (3%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="20"
                  strokeDasharray="7.5 244"
                  strokeDashoffset="-239"
                />
                {/* Blue segment (1.5%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="20"
                  strokeDasharray="3.8 248"
                  strokeDashoffset="-246.5"
                />
                {/* Yellow segment (0.3%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="20"
                  strokeDasharray="0.8 251"
                  strokeDashoffset="-250.3"
                />
                {/* Purple segment (0.2%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="20"
                  strokeDasharray="0.5 251"
                  strokeDashoffset="-251.1"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-600">TOP EXPENSES</div>
                </div>
              </div>
            </div>
          </div>

          {/* Expense List */}
          <div className="space-y-4">
            {expenseData.map((expense, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${expense.color}`}></div>
                  <span className="text-sm text-gray-600">{expense.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{expense.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;