import React from 'react';

function LoginLeftSide() {
  return (
    <div>
      <div className="hidden md:flex md:w-2/5 bg-blue-600 text-white flex-col justify-between">
        <div className="p-8 flex flex-col h-full">
          <div className="mt-16">
            <h1 className="text-4xl font-bold mb-4">Trusted by<br />businesses and CAs</h1>
            
            {/* Testimonial Box */}
            <div className="bg-blue-700 p-6 mt-8 rounded-lg relative">
              <div className="text-6xl text-blue-500 absolute top-3 left-3">"</div>
              <p className="mt-8 mb-2">
                BizFlow Books provides world-class services at a low price. 
                We have seen a 30% increase in efficiency after moving 
                to BizFlow Books
              </p>
              
              <div className="flex items-center mt-6">
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center overflow-hidden mr-4">
                  <img src="/api/placeholder/48/48" alt="Profile" className="object-cover" />
                </div>
                <div>
                  <p className="font-bold">Abdurahman Chelathur</p>
                  <p className="text-xs">COMMERCIAL MANAGER, NUBRA GLASS PLYWOODS AND HARDWARE</p>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 text-white">
                <span className="mx-1">•</span>
                <span className="mx-1 text-gray-400">•</span>
                <span className="mx-1 text-gray-400">•</span>
              </div>
            </div>
          </div>
          
          {/* Ratings Section */}
          <div className="mt-auto pb-8">
            <p className="text-center font-medium mb-4">RATED BY THE BEST</p>
            <div className="flex justify-between">
              <div className="bg-white text-black rounded px-2 py-1 flex items-center text-sm">
                <span className="mr-1">Capterra</span>
                <span className="text-yellow-500">★★★★★</span>
                <span className="ml-1">4.4/5</span>
              </div>
              <div className="bg-white text-black rounded px-2 py-1 flex items-center text-sm">
                <span className="mr-1">G2</span>
                <span className="text-yellow-500">★★★★★</span>
                <span className="ml-1">4.4/5</span>
              </div>
              <div className="bg-white text-black rounded px-2 py-1 flex items-center text-sm">
                <span className="mr-1">Play Store</span>
                <span className="text-yellow-500">★★★★★</span>
                <span className="ml-1">4.7/5</span>
              </div>
              <div className="bg-white text-black rounded px-2 py-1 flex items-center text-sm">
                <span className="mr-1">App Store</span>
                <span className="text-yellow-500">★★★★★</span>
                <span className="ml-1">4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginLeftSide;
