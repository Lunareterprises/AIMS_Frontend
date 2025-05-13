import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, X, Users, FileText, Award, ShoppingCart, DollarSign,
  CreditCard, Settings, Code, Share2, Bell, Zap
} from 'lucide-react';
import CommonButton from '../../component/CommonUI/buttons/CommonButton';

// Map icon strings to actual components
const iconMap = {
  Users, FileText, Award, ShoppingCart, DollarSign, CreditCard,
  Settings, Code, Share2, Bell, Zap
};

export default function SettingsIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [settingsData, setSettingsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/settings.json')
      .then(res => res.json())
      .then(data => setSettingsData(data))
      .catch(err => console.error("Failed to load settings.json", err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">All Settings</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search your settings"
                className="pl-9 pr-4 py-2 rounded-md border border-gray-200 bg-white w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <button className="text-blue-600 text-sm font-medium flex items-center">
              Close Settings <X className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {settingsData.map((section, idx) => {
            const IconComponent = iconMap[section.icon] || Users;

            return (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <IconComponent className="h-5 w-5 text-green-600 mr-2" />
                  <h2 className="font-medium text-gray-800">{section.title}</h2>
                </div>

                <ul className="space-y-3">
                  {typeof section.items[0] === 'object' && section.items[0]?.items
                    ? section.items.map((subSection, subIdx) => {
                        const SubIcon = iconMap[subSection.icon] || Users;
                        return (
                          <div key={subIdx} className="mb-4">
                            <div className="flex items-center mb-2">
                              <SubIcon className="h-4 w-4 mr-2 text-blue-600" />
                              <h3 className="text-sm font-medium text-gray-700">{subSection.title}</h3>
                            </div>
                            <ul className="space-y-2 ml-6">
                              {subSection.items.map((item, i) => (
                                <li key={i}>
                                  <CommonButton
                                    label={item.label}
                                    onClick={() => navigate(item.link || '/')}
                                    className="text-sm text-left text-gray-600 hover:text-blue-600"
                                  />
                                    
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })
                    : section.items.map((item, i) =>
                        Array.isArray(item) ? (
                          <li key={i} className="flex gap-4">
                            {item.map((subItem, j) => (
                              <CommonButton
                                label={subItem.label}
                                key={j}
                                onClick={() => navigate(subItem.link || '/')}
                                className="text-sm text-gray-600 hover:text-blue-600"
                              />
                                
                              
                            ))}
                          </li>
                        ) : (
                          <li key={i}>
                            <CommonButton
                              label={item.label}
                              onClick={() => navigate(item.link || '/')}
                              className="text-sm text-left text-gray-600 hover:text-blue-600"
                            />
                              
                            
                          </li>
                        )
                      )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
