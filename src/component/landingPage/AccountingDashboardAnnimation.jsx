import React, { useEffect, useRef } from 'react';

function AccountingDashboardAnnimation() {

    
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions to match parent container
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    


    
    // Cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  return (
    <div className='bg-[#006fda] h-screen'>





 
    <div className="relative w-full  overflow-hidden ">
      {/* Animated background */}
      <canvas 
        ref={canvasRef} 
        className="absolute   z-0"
      />
      
      {/* Content */}
      <div className="relative z-10 w-full h-full grid grid-cols-12 gap-4 p-4">

      <div className="absolute flex items-center justify-center z-50">
        <img 
          src="/Images/landingPage/accountingImg.png" 
          className="w-1/2 object-contain"
        />
      </div>
        
        {/* <div className="col-span-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 h-96 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/30 mb-2 overflow-hidden flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-400/50"></div>
            </div>
            <div className="text-center text-white">
              <p className="font-medium">Brandon Phil</p>
              <p className="text-xs text-blue-100">brandp@realm.com</p>
            </div>
          </div>
        </div> */}

                {/* Left customer card */}
        <div className="col-span-2">
          
          
          {/* Audit Trail card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 h-46 ">
                <div className="text-white mb-6">Audit Trail</div>
                <div className="space-y-4 text-white text-xs">
                <div className="flex justify-between">
                    <div className="bg-blue-500/20 rounded-full px-2">V1</div>
                    <div className="text-right">
                    <p>12/05/2024</p>
                    <p className="text-blue-100">Due on receipt</p>
                    <p>$2799</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="bg-blue-500/20 rounded-full px-2">V2</div>
                </div>
                <div className="flex justify-between">
                    <div className="bg-blue-500/20 rounded-full px-2">V3</div>
                </div>
                </div>
            </div>


            <div className=" rounded-lg  flex justify-center items-center  mt-4">
            
            <img src="/Images/landingPage/vendor.png" alt="Accountant" className=" object-contain rounded mx-auto" />
          
        </div>
        </div>
        
        {/* Vendor Portal Card */}
        <div className="col-span-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 h-96">
            <div className="text-white text-center mb-8">Vendor portal</div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/30 mb-4">
              <img src='/Images/landingPage/brandon.png'/></div>
              <div className="text-center text-white">
                <p className="font-medium">Brandon Phil</p>
                <p className="text-xs text-blue-100">brandp@realm.com</p>
              </div>
            </div>
            <div className="mt-8">
              <div className="text-white text-xs space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 rounded-full bg-blue-300"></div>
                  <p>Home</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 rounded-full bg-blue-300"></div>
                  <p>Purchase Order</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 rounded-full bg-blue-300"></div>
                  <p>Invoices</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 rounded-full bg-blue-300"></div>
                  <p>Payment Received</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 rounded-full bg-blue-300"></div>
                  <p>Statement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Invoice Card */}
        <div className="col-span-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 h-96">
            <div className="flex items-center text-white mb-4">
              <div className="w-6 h-6 rounded-full bg-blue-400/50 flex items-center justify-center text-xs mr-2">Z</div>
              <p>Zylker Corp</p>
            </div>
            <div className="space-y-1 text-xs text-white">
              <div className="flex justify-between">
                <p>Inv. no: 123</p>
              </div>
              <div className="flex justify-between">
                <p>Date:</p>
                <p>10/02/2024</p>
              </div>
            </div>
            
            {/* Table */}
            <div className="mt-6">
              <div className="grid grid-cols-12 text-xs text-white mb-2">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Item name</div>
                <div className="col-span-3 text-center">QTY</div>
                <div className="col-span-3 text-right">Price</div>
              </div>
              
              <div className="grid grid-cols-12 text-xs text-white py-2 border-b border-blue-400/30">
                <div className="col-span-1">1</div>
                <div className="col-span-5">Lav Mic</div>
                <div className="col-span-3 text-center">3</div>
                <div className="col-span-3 text-right">₹499</div>
              </div>
              
              <div className="grid grid-cols-12 text-xs text-white py-2 border-b border-blue-400/30">
                <div className="col-span-1">2</div>
                <div className="col-span-5">Hue Light</div>
                <div className="col-span-3 text-center">1</div>
                <div className="col-span-3 text-right">₹499</div>
              </div>
              
              <div className="grid grid-cols-12 text-sm text-white font-medium pt-4">
                <div className="col-span-9"></div>
                <div className="col-span-3 text-right">₹1,498</div>
              </div>
            </div>
            
            {/* Timer */}
            
          </div>
        </div>
        
        {/* Center Stats */}
        <div className="col-span-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 h-96 flex flex-col justify-center text-right text-white">
            <div className="mb-2">₹20,000,000.00</div>
            <div className="mb-2">₹20,000,000.00</div>
            <div className="mb-2">₹20,000,000.00</div>
            <div className="mb-2 opacity-40">₹0.00</div>
            <div className="mb-2">₹20,000,000.00</div>
            <div className="mb-2">₹20,000,000.00</div>
          </div>
        </div>
        
        {/* Projects Card */}
        <div className="col-span-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 h-96">
            <div className="text-white mb-6">Projects</div>
            <div className="flex justify-between mb-6">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500/20 mx-auto mb-1">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l4 4M17 5l-4 4M15 19l-4-4M19 15l-4 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="font-medium text-white">₹906.12</div>
                <div className="text-xs text-blue-100">UNBILLED HOURS</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500/20 mx-auto mb-1">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 5H5v14h14v-4M19.5 9.5L9 20l-4-4 9.5-9.5M13 9l2 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="font-medium text-white">₹306.31</div>
                <div className="text-xs text-blue-100">BILLED HOURS</div>
              </div>
            </div>
            
            {/* Projects list */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-white text-xs mr-3">25%</div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-white">
                    <div>
                      <p className="font-medium">UX design</p>
                      <p className="text-blue-100">Freida</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Budget Hours</p>
                      <div className="bg-gray-300/30 h-1 w-16 mt-1">
                        <div className="bg-white h-1 w-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-white text-xs mr-3">20%</div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-white">
                    <div>
                      <p className="font-medium">Marketing</p>
                      <p className="text-blue-100">Rosa</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Budget Hours</p>
                      <div className="bg-gray-300/30 h-1 w-16 mt-1">
                        <div className="bg-white h-1 w-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-white text-xs mr-3">15%</div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-white">
                    <div>
                      <p className="font-medium">DB migration</p>
                      <p className="text-blue-100">Ananthan</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Budget Hours</p>
                      <div className="bg-gray-300/30 h-1 w-16 mt-1">
                        <div className="bg-white h-1 w-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-white text-xs mr-3">10%</div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-white">
                    <div>
                      <p className="font-medium">Web development</p>
                      <p className="text-blue-100">Hassenbrong</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Budget Hours</p>
                      <div className="bg-gray-300/30 h-1 w-16 mt-1">
                        <div className="bg-white h-1 w-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
           
          </div>
        </div>
        
        {/* Right Accountant card */}
        {/* <div className="col-span-2">
          <div className=" rounded-lg  flex justify-center items-center">
              <img src="/Images/landingPage/accountant.png" alt="Accountant" className="  object-cover rounded mx-auto" />
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 h-46 mt-4">
            <div className="text-white mb-6">Audit Trail</div>
            <div className="space-y-4 text-white text-xs">
              <div className="flex justify-between">
                <div className="bg-blue-500/20 rounded-full px-2">V1</div>
                <div className="text-right">
                  <p>12/05/2024</p>
                  <p className="text-blue-100">Due on receipt</p>
                  <p>$2799</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="bg-blue-500/20 rounded-full px-2">V2</div>
              </div>
              <div className="flex justify-between">
                <div className="bg-blue-500/20 rounded-full px-2">V3</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      
      
    </div>



    </div>
  )
}

export default AccountingDashboardAnnimation