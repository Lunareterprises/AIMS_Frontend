import { useState } from "react";
import { X, LightbulbIcon, ChevronUp, ChevronDown, HelpCircle, ToggleLeft, Terminal, Send, MessageSquare } from "lucide-react";

export default function CustomerStatementsSettings() {
  const [activeTab, setActiveTab] = useState("deluge");
  const [showScriptEditor, setShowScriptEditor] = useState(true);
  
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto bg-white  ">
      {/* First screen - Create Related List */}
      <div className="w-full p-8 text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="bg-gray-200 p-4 rounded-lg">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="relative">
                    <div className="w-32 h-24 bg-blue-100 rounded-md border border-blue-200"></div>
                    <div className="absolute -right-5 -bottom-5">
                      <div className="relative">
                        <div className="w-16 h-20">
                          <svg viewBox="0 0 100 120" className="w-full h-full">
                            <rect x="10" y="10" width="80" height="100" fill="#ffb6c1" rx="10" />
                            <circle cx="50" cy="40" r="20" fill="#ff7b8f" />
                            <path d="M30 65 Q50 85 70 65" stroke="#ff4757" fill="none" strokeWidth="3" />
                          </svg>
                        </div>
                        <div className="absolute top-1/4 right-0">
                          <div className="bg-cyan-400 rounded-full w-8 h-8 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">+</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-lg font-medium text-gray-800">
            Create custom related lists to access relevant information available from inside
            <br />or outside the application.
          </p>
        </div>
        
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
          New Related List
        </button>
      </div>
      
      {/* Second screen - Script Editor */}
      {/* {showScriptEditor && (
        <div className="w-full border-t border-gray-300">
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
            <h2 className="text-lg font-medium">New Related List - Customers</h2>
            <button className="text-gray-500">
              <X size={18} />
            </button>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Related List Name*</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Who can view this related list?</label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input type="radio" id="only-me" name="visibility" className="mr-2" checked />
                  <label htmlFor="only-me">Only Me</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="everyone" name="visibility" className="mr-2" />
                  <label htmlFor="everyone">Everyone</label>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-md border border-yellow-200 flex items-start mb-4">
              <LightbulbIcon className="text-yellow-500 mr-2 mt-0.5" size={18} />
              <span className="text-sm">Enter a script to fetch data from third party services and view them within Zoho Books.</span>
              <div className="ml-auto flex space-x-2">
                <a href="#" className="text-blue-500 text-sm">View Deluge Components Usage</a>
                <a href="#" className="text-blue-500 text-sm">Connections</a>
              </div>
            </div>
            
            <div className="border border-gray-300 rounded-md">
              <div className="flex justify-between items-center p-3 border-b border-gray-300 bg-gray-50">
                <div className="flex items-center">
                  <span className="mr-4">Deluge</span>
                  <span className="text-xs text-gray-500">by John Creator</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>Syntax Builder</span>
                  <div className="flex items-center">
                    <ToggleLeft size={18} className="text-gray-500" />
                    <span className="text-xs ml-1">Off</span>
                  </div>
                  <HelpCircle size={18} className="text-gray-500" />
                </div>
              </div>
              
              <div className="flex">
                <div className="w-24 bg-gray-100 border-r border-gray-300">
                  <div className="p-3 border-b border-gray-300">
                    <div className="text-center text-xs font-medium text-gray-500">BASIC</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">set variable</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">if</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">add comment</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">info</div>
                  </div>
                  
                  <div className="p-3 border-t border-b border-gray-300 mt-2">
                    <div className="text-center text-xs font-medium text-gray-500">CONDITION</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">if</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">else if</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">else</div>
                  </div>
                  
                  <div className="p-3 border-t border-b border-gray-300 mt-2">
                    <div className="text-center text-xs font-medium text-gray-500">NOTIFICATIONS</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">send mail</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">post to chat</div>
                  </div>
                  
                  <div className="p-3 border-t border-b border-gray-300 mt-2">
                    <div className="text-center text-xs font-medium text-gray-500">INTEGRATIONS</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">webhook</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">zoho integration</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">invoke API</div>
                  </div>
                  
                  <div className="p-3 border-t border-b border-gray-300 mt-2">
                    <div className="text-center text-xs font-medium text-gray-500">COLLECTION</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">create collection</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">insert</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">get</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">update</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">delete</div>
                  </div>
                  <div className="p-2 hover:bg-gray-200 cursor-pointer text-center">
                    <div className="text-xs">for each element</div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <pre className="p-4 text-sm font-mono h-80 overflow-y-auto">
                    <code className="text-gray-800">
                      <span className="text-gray-400">1</span> <span className="text-blue-600">/*</span>
                      <br /><span className="text-gray-400">2</span> <span className="text-blue-600">* This is a sample function. It will display the customer details.</span>
                      <br /><span className="text-gray-400">3</span> <span className="text-blue-600">*</span>
                      <br /><span className="text-gray-400">4</span> headerData = <span className="text-purple-600">List()</span>;
                      <br /><span className="text-gray-400">5</span> headerData.add(<span className="text-purple-600">Map()</span>.put(<span className="text-red-500">"key"</span>,<span className="text-red-500">"contact_name"</span>).put(<span className="text-red-500">"value"</span>,<span className="text-red-500">"Contact Name"</span>));
                      <br /><span className="text-gray-400">6</span> headerData.add(<span className="text-purple-600">Map()</span>.put(<span className="text-red-500">"key"</span>,<span className="text-red-500">"company_name"</span>).put(<span className="text-red-500">"value"</span>,<span className="text-red-500">"Company Name"</span>));
                      <br /><span className="text-gray-400">7</span> headerData.add(<span className="text-purple-600">Map()</span>.put(<span className="text-red-500">"key"</span>,<span className="text-red-500">"status"</span>).put(<span className="text-red-500">"value"</span>,<span className="text-red-500">"Status"</span>));
                      <br /><span className="text-gray-400">8</span> headerData.add(<span className="text-purple-600">Map()</span>.put(<span className="text-red-500">"key"</span>,<span className="text-red-500">"source"</span>).put(<span className="text-red-500">"value"</span>,<span className="text-red-500">"Source"</span>).put(<span className="text-red-500">"align"</span>,<span className="text-red-500">"right"</span>));
                      <br /><span className="text-gray-400">9</span> details = <span className="text-purple-600">Map()</span>;
                      <br /><span className="text-gray-400">10</span> details.put(<span className="text-red-500">"contact_name"</span>,<span className="text-purple-600">Map()</span>.put(<span className="text-red-500">"value"</span>,customer.get(<span className="text-red-500">"contact_name"</span>)).put(<span className="text-red-500">"isExternal"</span>,<span className="text-blue-600">true</span>).put(<span className="text-red-500">"link"</span>,<span className="text-red-500">"https://books.zoho.com/app/contacts/" + </span>customer.get(<span className="text-red-500">"customer_id"</span>)));
                      <br /><span className="text-gray-400">11</span> details.put(<span className="text-red-500">"company_name"</span>,<span className="text-purple-600">Map()</span>.put(<span className="text-red-500">"value"</span>,customer.get(<span className="text-red-500">"company_name"</span>)).put(<span className="text-red-500">"link"</span>,<span className="text-red-500">"https://books.zoho.com/app/contacts/" + </span>customer.get(<span className="text-red-500">"customer_id"</span>)));
                      <br /><span className="text-gray-400">12</span> details.put(<span className="text-red-500">"status"</span>,customer.get(<span className="text-red-500">"status"</span>));
                      <br /><span className="text-gray-400">13</span> details.put(<span className="text-red-500">"source"</span>,customer.get(<span className="text-red-500">"source"</span>));
                      <br /><span className="text-gray-400">14</span> listData = <span className="text-purple-600">List()</span>;
                      <br /><span className="text-gray-400">15</span> listData.add(details);
                      <br /><span className="text-gray-400">16</span> resultMap = <span className="text-purple-600">Map()</span>;
                      <br /><span className="text-gray-400">17</span> resultMap.put(<span className="text-red-500">"header_content"</span>,headerData);
                      <br /><span className="text-gray-400">18</span> resultMap.put(<span className="text-red-500">"data"</span>,listData);
                      <br /><span className="text-gray-400">19</span> return resultMap;
                      <br /><span className="text-gray-400">20</span> {"}"}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-4 border-t border-gray-300">
            <div className="flex space-x-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors">
                Save
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded border border-gray-300 transition-colors">
                Save and Execute
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded border border-gray-300 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
