import React, { useState } from 'react';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('yearly');
  
  const pricingPlans = [
    {
      name: 'STANDARD',
      description: 'Efficiently organize your transactions, accounts, reports, and books',
      monthlyPrice: 899,
      discountedPrice: 749,
      highlighted: false
    },
    {
      name: 'PROFESSIONAL',
      description: 'Confidently take on projects, track your inventory, and handle purchases',
      monthlyPrice: 1799,
      discountedPrice: 1499,
      highlighted: true
    },
    {
      name: 'PREMIUM',
      description: 'Enhanced customization and automation to streamline business processes',
      monthlyPrice: 3599,
      discountedPrice: 2999,
      highlighted: false
    },
    {
      name: 'ELITE',
      description: 'Advanced accounting bundled with full-fledged inventory management',
      monthlyPrice: 5999,
      discountedPrice: 4999,
      highlighted: false
    },
    {
      name: 'ULTIMATE',
      description: 'Gain deeper insights with advanced business intelligence capabilities',
      monthlyPrice: 9599,
      discountedPrice: 7999,
      highlighted: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          The Perfect Balance of Features and Affordability
        </h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <img 
              src="data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23F93' cx='18' cy='18' r='18'/%3E%3Cpath fill='%23128807' d='M18 30c6.627 0 12-5.373 12-12s-5.373-12-12-12S6 11.373 6 18s5.373 12 12 12z'/%3E%3Ccircle fill='%23FFF' cx='18' cy='18' r='4'/%3E%3C/g%3E%3C/svg%3E" 
              alt="India flag" 
              className="w-6 h-6 mr-2" 
            />
            <span className="font-medium">India</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          
          <div className="flex items-center">
            <span className={`mr-2 ${billingCycle === 'monthly' ? 'font-medium' : ''}`}>Monthly</span>
            <div 
              className="w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            >
              <div className={`bg-blue-600 h-5 w-5 rounded-full shadow-md transform transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-6' : ''}`}></div>
            </div>
            <span className={`ml-2 ${billingCycle === 'yearly' ? 'font-medium' : ''}`}>
              Yearly <span className="text-sm text-gray-600 italic">(Save up to 25%)</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {pricingPlans.map((plan, index) => (
          <div 
            key={index} 
            className={`border rounded-lg overflow-hidden flex flex-col ${plan.highlighted ? 'border-2 border-black relative' : 'border-gray-200'}`}
          >
            {plan.highlighted && (
              <div className="bg-black text-white text-center py-1 text-sm font-medium">
                Most Popular
              </div>
            )}
            <div className="p-6 text-center flex-grow">
              <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
              
              <div className="mt-4">
                <div className="text-gray-400 line-through text-sm">₹{plan.monthlyPrice}</div>
                <div className="flex justify-center items-center">
                  <span className="text-2xl font-bold">₹</span>
                  <span className="text-5xl font-bold">{plan.discountedPrice}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">Price/Org/Month Billed Annually</div>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <button className="w-full py-3 border border-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Start my free trial
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <a href="#" className="text-xl font-bold underline">Explore all plans</a>
      </div>
    </div>
  );
};

export default PricingPage;
