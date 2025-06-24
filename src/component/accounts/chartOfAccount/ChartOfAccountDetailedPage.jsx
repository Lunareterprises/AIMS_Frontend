import React, { useRef,useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import * as html2pdf from 'html2pdf.js';
import CommonButton from '../../CommonUI/buttons/CommonButton';

export default function ChartOfAccountDetailedPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const quoteData = location.state?.quoteData;
    console.log("quoteData===>>", quoteData);
    const [activeTab, setActiveTab] = useState('FCY');
    const title = location.state?.title || "Quote";
    const backToPath = location.state?.backToPath ;
    const editForm = location.state?.editForm;

  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };
  const handleDownloadPDF = () => {
    const element = printRef.current;
    const opt = {
      margin: 0.5,
      filename: `${title}_${quoteData?.quoteNumber || 'Quote'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };


  // Handle case where no data is passed (direct URL access)
  if (!quoteData) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quote Not Found</h2>
          <p className="text-gray-600 mb-4">The quote data could not be loaded.</p>
         
        </div>
      </div>
    );
  }

  return (

    <div>
      <header className="flex items-center justify-start mb-10 gap-3">
        <div>
          <CommonButton 
            label={
              <>
                <ArrowLeft size={16} className="mr-2" />
                Back to Chart of Accounts
              </>
            }
            onClick={() => navigate(backToPath)}
            className="hover:text-blue-600 text-blue-500 px-4 py-2 rounded flex items-center cursor-pointer"
          />
        </div>
        
        <CommonButton 
          label="Edit" 
          className="bg-gray-200 rounded-md px-5 py-2 text-gray-900 hover:bg-gray-300"
          onClick={()=>navigate(editForm)}
        />
        <CommonButton onClick={handleDownloadPDF}  label="PDF" className="bg-gray-200 rounded-md px-5 py-2 text-gray-900 hover:bg-gray-300"/>
        <CommonButton onClick={handlePrint} label="Print" className="bg-gray-200 rounded-md px-5 py-2 text-gray-900 hover:bg-gray-300"/>

      </header>

      

    
    <div ref={printRef} className="max-w-full">
      {/* Back Button */}
      <div className="mb-6">
        {/* <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Quotes
        </button> */}
      </div>


<div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-gray-600 text-sm font-medium mb-2">CLOSING BALANCE</h2>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
          <span className="text-4xl sm:text-5xl font-light text-blue-500">AED520.00</span>
          <span className="text-gray-500 text-sm">(Dr)</span>
        </div>
        <div className="mt-4">
          <span className="text-gray-700 text-sm italic">Description : </span>
          <span className="text-gray-700 text-sm">--</span>
        </div>
      </div>

      {/* Dotted Line Separator */}
      <div className="border-b border-dashed border-gray-300 mb-6"></div>

      {/* Recent Transactions Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 className="text-xl font-medium text-gray-800 mb-3 sm:mb-0">Recent Transactions</h3>
          
          {/* Tab Buttons */}
          <div className="flex">
            <button
              onClick={() => setActiveTab('FCY')}
              className={`px-4 py-2 text-sm font-medium border-r border-gray-300 ${
                activeTab === 'FCY'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              FCY
            </button>
            <button
              onClick={() => setActiveTab('BCY')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'BCY'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              BCY
            </button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-900">
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">DATE</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">TRANSACTION DETAILS</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">TYPE</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-gray-700">DEBIT</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-gray-700">CREDIT</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-4 px-2 text-sm text-gray-800">10 Jul 2024</td>
                <td className="py-4 px-2 text-sm text-gray-800">
                  Al Hind Printers Computer and<br />
                  Requisites Trading LLC
                </td>
                <td className="py-4 px-2 text-sm text-gray-800">Expense</td>
                <td className="py-4 px-2 text-sm text-gray-800 text-right">AED520.00</td>
                <td className="py-4 px-2 text-sm text-gray-800 text-right"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Show More Details Link */}
        {/* <div className="mt-6">
          <CommonButton label="Show more details" className="text-blue-500 hover:text-blue-600 text-sm underline" />
        </div> */}
      </div>
    </div>




      {/* Footer */}
      <div className="text-center text-sm text-gray-500 border-t pt-4">
        <span className="text-blue-600 cursor-pointer">PDF Template</span>
        <span className="mx-1">·</span>
        <span className="text-blue-600 cursor-pointer">Standard Template</span>
        <span className="mx-1">·</span>
        <span className="text-blue-600 cursor-pointer">Change</span>
      </div>
    </div>

    </div>
  );
}