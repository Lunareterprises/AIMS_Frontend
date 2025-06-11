import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CommonButton from '../../CommonUI/buttons/CommonButton';

export default function QuotesDetailedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const quoteData = location.state?.quoteData;

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
      <header className="flex items-center justify-start mb-10">
  <div>
    <CommonButton 
      label={
        <>
          <ArrowLeft size={16} className="mr-2" />
          Back to Quotes
        </>
      }
      onClick={() => navigate('/quotes')}
      className="hover:text-blue-600 text-blue-500 px-4 py-2 rounded flex items-center cursor-pointer"
    />
  </div>
  
  <CommonButton 
    label="Edit" 
    className="bg-gray-200 rounded-xl px-5 py-2 text-gray-900 hover:bg-gray-300"
    onClick={()=>navigate("/QuotesForm")}
  />
</header>

      

    
    <div className="max-w-4xl mx-auto bg-gray-50  p-8 shadow-xl">
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

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-start">
          {/* Status ribbon */}
          {/* <div className={`text-white px-3 py-1 transform -rotate-45 origin-top-left mt-10 w-52 text-sm font-semibold mr-8 ${
            quoteData.status === 'Open' ? 'bg-blue-500' :
            quoteData.status === 'Accepted' ? 'bg-green-500' :
            quoteData.status === 'Sent' ? 'bg-yellow-500' :
            quoteData.status === 'Declined' ? 'bg-red-500' :
            'bg-gray-500'
          }`}>
            {quoteData.status.toUpperCase()}
            Draft
          </div> */}
          
          {/* Company Info */}
          <div className="ml-8">
            <h2 className="text-lg font-bold text-gray-800">{quoteData.companyName}</h2>
            <p className="text-sm text-gray-600">Office 316 5th Tower</p>
            <p className="text-sm text-gray-600">Dubai Silicon Oasis</p>
            <p className="text-sm text-gray-600">Dubai Dubai</p>
            <p className="text-sm text-gray-600">UAE</p>
            <p className="text-sm text-gray-600">TRN 104175163400003</p>
            <p className="text-sm text-gray-600">7702380367</p>
            <p className="text-sm text-blue-600">accounts@aim-bc.com</p>
          </div>
        </div>
        
        {/* Quote Header */}
        <div className="text-right">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">QUOTE</h1>
          <p className="text-sm text-gray-600"># {quoteData.quoteNumber}</p>
          <p className="text-sm text-gray-600">Ref: {quoteData.referenceNumber}</p>
        </div>
      </div>

      {/* Quote Details Section */}
      <div className="grid grid-cols-2 gap-8 mb-8 p-6 bg-gray-50 rounded-lg">
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Quote Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{quoteData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Expiry Date:</span>
              <span className="font-medium">{quoteData.expiryDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sales Person:</span>
              <span className="font-medium">{quoteData.salesPerson}</span>
            </div>
            {quoteData.acceptedDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">Accepted Date:</span>
                <span className="font-medium text-green-600">{quoteData.acceptedDate}</span>
              </div>
            )}
            {quoteData.declinedDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">Declined Date:</span>
                <span className="font-medium text-red-600">{quoteData.declinedDate}</span>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Amount Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Sub Total:</span>
              <span className="font-medium">{quoteData.subTotal}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-800 font-semibold">Total Amount:</span>
              <span className="font-bold text-lg">{quoteData.amount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="mb-8">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Bill To</h3>
            <p className="text-blue-600 font-medium">{quoteData.customerName}</p>
            <p className="text-gray-600">{quoteData.companyName}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Quote Date: {quoteData.date}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="text-left py-3 px-4 font-semibold">#</th>
              <th className="text-left py-3 px-4 font-semibold">Item & Description</th>
              <th className="text-center py-3 px-4 font-semibold">Qty</th>
              <th className="text-right py-3 px-4 font-semibold">Rate</th>
              <th className="text-right py-3 px-4 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-4">1</td>
              <td className="py-3 px-4">
                <div>
                  <p className="font-medium">Service Item</p>
                  <p className="text-sm text-gray-600">Professional services</p>
                </div>
              </td>
              <td className="text-center py-3 px-4">
                <div>
                  <p>1.00</p>
                  <p className="text-sm text-gray-600">Unit</p>
                </div>
              </td>
              <td className="text-right py-3 px-4">
                <div>
                  <p>{quoteData.subTotal}</p>
                  <p className="text-sm text-gray-600">5.00%</p>
                </div>
              </td>
              <td className="text-right py-3 px-4">{quoteData.amount}</td>
            </tr>
          </tbody>
        </table>

        {/* Subtotal */}
        <div className="flex justify-end mt-4">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span className="font-medium">Sub Total</span>
              <span>{quoteData.subTotal}</span>
            </div>
            <div className="flex justify-between py-2 border-t">
              <span className="font-bold">Total</span>
              <span className="font-bold">{quoteData.amount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className={`px-6 py-3 rounded-full text-white font-semibold ${
            quoteData.status === 'Open' ? 'bg-blue-500' :
            quoteData.status === 'Accepted' ? 'bg-green-500' :
            quoteData.status === 'Sent' ? 'bg-yellow-500' :
            quoteData.status === 'Declined' ? 'bg-red-500' :
            'bg-gray-500'
          }`}>
            Status: {quoteData.status}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-800 mb-2">Notes</h3>
        <p className="text-sm text-gray-600">Looking forward for your business.</p>
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