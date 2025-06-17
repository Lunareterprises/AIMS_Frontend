import { useState } from 'react';
import { Edit2, Trash2, Save, X } from 'lucide-react';

export default function PaymentTable({ paymentData = [] }) {

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Payment For</h1>
      </div>

      <div className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Invoice Number</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Invoice Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Invoice Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Payment Amount</th>
              </tr>
            </thead>
            <tbody className=" divide-gray-200">
                <td className="px-6 py-4 text-left text-sm font-semibold text-blue-700">{paymentData.invoiceNumber}</td>
                <td className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{paymentData.date}</td>
                <td className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{paymentData.amount}</td>
                <td className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{paymentData.unusedAmount}</td>
            </tbody>
          </table>
        </div>
      </div>

      
    </div>
  );
}
