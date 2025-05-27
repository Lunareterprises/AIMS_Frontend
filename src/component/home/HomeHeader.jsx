

import React from 'react';
import { FileText } from 'lucide-react';

export default function HomeHeader() {
  return (
    <div className="w-full bg-gray-50 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left section with icon and company info */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
            <FileText className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <h1 className="text-lg font-medium text-gray-900">Hello, accounts</h1>
            <p className="text-sm text-gray-500">A IM Business Corp</p>
          </div>
        </div>

        {/* Right section with resources and helpline */}
        <div className="flex items-center space-x-8">
          {/* <a 
            href="#" 
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            VAT Resources
          </a> */}
          
          <div className="text-right">
            <div className="text-sm text-gray-900">
              <span className="font-medium"> Helpline:</span>
              <span className="ml-1 font-semibold">8000444 0824</span>
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              Sun - Fri • 9:00 AM - 6:00 PM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
