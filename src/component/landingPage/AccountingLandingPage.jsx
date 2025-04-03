import React from 'react';

const AccountingLandingPage = () => {
  return (
    <div className="min-h-screen bg-[#006fda] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
      {/* Badge */}
      <div className="bg-black/40 text-yellow-400 rounded-full px-4 py-2 mb-8 flex gap-3 items-center ">

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
            <path d="M24 2L31.2 16.6L47 19.2L35.5 30.4L38.4 46.2L24 38.8L9.6 46.2L12.5 30.4L1 19.2L16.8 16.6L24 2Z" 
                fill="#FFD700" stroke="#E0B000" stroke-width="1" />
            <path d="M18 24L22 28L30 20" 
                stroke="#040805" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        </svg>

        <span className="font-medium text-gray-300 text-sm md:text-base whitespace-nowrap">GST compliant accounting software</span>
      </div>
      
      {/* Main Heading */}
      <div className="text-center max-w-4xl">   
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
          <span className="text-yellow-400">Comprehensive</span>
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
          accounting platform for
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
          growing businesses
        </h1>
        
        {/* Subheading */}
        <p className="text-white text-lg sm:text-xl mb-10 max-w-3xl mx-auto">
          Manage end-to-end accounting—from banking & e-invoicing to 
          inventory & payroll with the best accounting software in India.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-md transition duration-300 shadow-lg">
            Start free trial
          </button>
          <button className="bg-transparent hover:bg-blue-700 text-white font-bold py-3 px-8 border-2 border-white rounded-md transition duration-300">
            Request a demo
          </button>
        </div>
      </div>
      
      
    </div>
  );
};

export default AccountingLandingPage;