



import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CommonButton from '../../CommonUI/buttons/CommonButton';
import * as html2pdf from 'html2pdf.js';

export default function ManualJouralsDetailedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const quoteData = location.state?.quoteData;
  console.log("quoteData===>>", quoteData);
  
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
                Back to Journal
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



      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
        {/* Published Badge */}
        <div className="absolute top-0 left-0 mt-4">
          <div className="bg-green-500 text-white px-3 py-1 text-xs font-semibold transform -rotate-45 -translate-x-3 translate-y-2">
            PUBLISHED
          </div>
        </div>
        
        {/* Header */}
        <div className="px-6 py-8 border-b border-gray-200 mt-10 flex justify-between items-end">

            {/* Notes Section */}
          <div className="mt-6">
            <div className="mb-2">
              <span className="text-gray-700 font-medium">Notes</span>
            </div>
            <div className="text-gray-700 text-sm">
              bank deposit
            </div>
          </div>


          <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
            {/* Journal Details */}
            <div className="space-y-4 text-sm text-right sm:text-left">
              <div className=" flex flex-col sm:items-end">
                <h1 className="text-3xl sm:text-4xl font-light text-gray-800 mb-2">
                  {title}
                </h1>
                <div>
                  <span className="text-gray-600 text-lg">
                    #{quoteData.journalNumber}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:items-end space-y-2">
                {/* Date */}
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-gray-600 w-24 sm:w-32 text-left sm:text-right">
                    Date:
                  </span>
                  <div className="text-right">
                    <span className="text-orange-600 font-medium">{quoteData.date}</span>
                  </div>
                </div>

                {/* Amount */}
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-gray-600 w-24 sm:w-32 text-left sm:text-right">
                    Amount:
                  </span>  
                  <div className="text-right">
                    <span className="font-medium">{quoteData.amount}</span>
                  </div>
                </div>

                {/* Reference Number */}
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-gray-600 w-24 sm:w-32 text-left sm:text-right">
                    Reference Number:
                  </span>
                  <div className="text-right">
                    <span className="font-medium">{quoteData.referenceNumber}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          
        
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="px-4 py-3 text-left font-medium">Account</th>
                <th className="px-4 py-3 text-left font-medium">Contact</th>
                <th className="px-4 py-3 text-right font-medium">Debits</th>
                <th className="px-4 py-3 text-right font-medium">Credits</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 ">
                <td className="px-4 py-3">
                  <div className="text-gray-600 text-sm font-medium mt-5 mb-5">
                    A IM BUSINESS CORP FOR CORPORATE SERVICES PROVIDERS CO. L.L.C
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    bank deposit
                  </div>
                </td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 text-right"></td>
                <td className="px-4 py-3 text-right font-medium">50,000.00</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-3">
                  <div className="text-sm">Undeposited Funds</div>
                </td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 text-right font-medium">50,000.00</td>
                <td className="px-4 py-3 text-right"></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Totals */}
        <div className="px-4 py-4 bg-gray-50">
          <div className="flex justify-end">
            <div className="w-full sm:w-96">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-700">Sub Total</span>
                <div className="flex gap-8">
                  <span className="w-20 text-right font-medium">50,000.00</span>
                  <span className="w-20 text-right font-medium">50,000.00</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-2 bg-gray-100 px-2 -mx-2 font-semibold">
                <span className="text-gray-800">Total</span>
                <div className="flex gap-8">
                  <span className="w-20 text-right">AED50,000.00</span>
                  <span className="w-20 text-right">AED50,000.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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