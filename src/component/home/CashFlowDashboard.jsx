import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CashFlowDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Fiscal Year');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [periodOptions, setPeriodOptions] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/cashFlowData.json');
        const json = await response.json();
        const defaultPeriod = Object.keys(json)[0];
        setPeriodOptions(Object.keys(json));
        setSelectedPeriod(defaultPeriod);
        setData(json);
      } catch (err) {
        console.error('Failed to load cash flow data:', err);
      }
    };

    loadData();
  }, []);

  const currentData = data[selectedPeriod];

  if (!currentData) return null;

  const maxValue = Math.max(...currentData.chartData.map(d => Math.abs(d.value)));
  const minValue = Math.min(...currentData.chartData.map(d => d.value));

  const getYPosition = (value) => {
    if (currentData.isFlat) return 50;
    const range = maxValue - minValue;
    const normalizedValue = (value - minValue) / range;
    return 85 - (normalizedValue * 70);
  };

  const createPath = () => {
    if (currentData.chartData.length === 0) return '';
    return currentData.chartData.map((point, index) => {
      const x = 50 + (index * (900 / (currentData.chartData.length - 1)));
      const y = getYPosition(point.value);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const createAreaPath = () => {
    if (currentData.chartData.length === 0) return '';
    const linePath = createPath();
    const lastX = 50 + ((currentData.chartData.length - 1) * (900 / (currentData.chartData.length - 1)));
    return `${linePath} L ${lastX} 400 L 50 400 Z`;
  };

  return (
    <div className="bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-medium text-gray-900">Cash Flow</h1>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {selectedPeriod}
              <ChevronDown className="w-4 h-4" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                {periodOptions.map((period) => (
                  <button
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      selectedPeriod === period ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex-1">
            <svg viewBox="0 0 1000 450" className="w-full h-80">
              {[800, 600, 400, 200, 0, -200, -400].map((value, index) => (
                <g key={value}>
                  <line
                    x1="50"
                    y1={50 + index * 57}
                    x2="950"
                    y2={50 + index * 57}
                    stroke="#f3f4f6"
                    strokeWidth="1"
                  />
                  <text
                    x="20"
                    y={55 + index * 57}
                    className="text-xs fill-gray-400"
                    textAnchor="end"
                  >
                    {value === 0 ? '0' : `${Math.abs(value)}${value < 0 ? '' : ' K'}`}
                  </text>
                </g>
              ))}

              <path d={createAreaPath()} fill="rgba(59, 130, 246, 0.1)" />
              <path d={createPath()} stroke="#3b82f6" strokeWidth="2" fill="none" />

              {currentData.chartData.map((point, index) => {
                const x = 50 + (index * (900 / (currentData.chartData.length - 1)));
                const y = getYPosition(point.value);
                return <circle key={index} cx={x} cy={y} r="4" fill="#3b82f6" />;
              })}

              {currentData.chartData.map((point, index) => {
                const x = 50 + (index * (900 / (currentData.chartData.length - 1)));
                return (
                  <g key={index}>
                    <text x={x} y={425} className="text-xs fill-gray-400" textAnchor="middle">
                      {point.month}
                    </text>
                    <text x={x} y={440} className="text-xs fill-gray-400" textAnchor="middle">
                      {point.year}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="w-72 space-y-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">
                Cash as on {currentData.startDate}
              </div>
              <div className="text-xl font-semibold text-gray-900">{currentData.cashStart}</div>
            </div>

            <div>
              <div className="text-sm text-yellow-600 mb-1">Incoming</div>
              <div className="text-xl font-semibold text-gray-900">
                {currentData.incoming} <span className="text-gray-400">+</span>
              </div>
            </div>

            <div>
              <div className="text-sm text-red-500 mb-1">Outgoing</div>
              <div className="text-xl font-semibold text-gray-900">
                {currentData.outgoing} <span className="text-gray-400">-</span>
              </div>
            </div>

            <div>
              <div className="text-sm text-blue-500 mb-1">Cash as on {currentData.endDate}</div>
              <div className="text-xl font-semibold text-gray-900">
                {currentData.cashEnd} <span className="text-gray-400">=</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlowDashboard;
