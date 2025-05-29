import { useState, useEffect, useRef } from 'react';
import CustomFieldsSettings from './CustomFieldsSettings';
import CustomerPortalSettings from './CustomerPortalSettings';
import CustomerStatementsSettings from './CustomerStatementsSettings';
import TabContainer from './TabContainer';
import GeneralSettings from './GeneralSettings';
import { ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonButton from '../../../component/CommonUI/buttons/CommonButton';
import NewCustomButtonModal from './NewCustomButtonModal';

export default function CustomersAndVendorsIndex() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNewCustomButtonModal, setShowNewCustomButtonModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const dropdownItems = [
    {
      title: "CUSTOMER",
      items: [
        { label: "New Custom Button", onClick: () => { setShowNewCustomButtonModal(true); setIsOpen(false); } },
        { label: "New Custom Link", onClick: () => { navigate("/New-Custom-LinkForm") }},
      ],
    },
    {
      title: "VENDOR",
      items: [
        { label: "New Custom Button", onClick: () => { console.log("Vendor Button"); setIsOpen(false); } },
        { label: "New Custom Link", onClick: () => { console.log("Vendor Link"); setIsOpen(false); } },
      ],
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [selectedTab, setSelectedTab] = useState('general');
  const [isAddingField, setIsAddingField] = useState(false);
  const [newField, setNewField] = useState({
    labelName: '',
    dataType: '',
    isMandatory: false,
    displayInPortal: false,
  });
  const [fields, setFields] = useState([]);
  const [enableVendorNumbers, setEnableVendorNumbers] = useState(false);
  const [enableCustomerNumbers, setEnableCustomerNumbers] = useState(true);
  const [enableCreditLimit, setEnableCreditLimit] = useState(true);
  const [enableMultiCurrency, setEnableMultiCurrency] = useState(false);
  const [customerType, setCustomerType] = useState('business');
  const [deleteCurrency, setDeleteCurrency] = useState(false);

  const tabs = [
    { key: 'general', label: 'General' },
    { key: 'customFields', label: 'Field Customization' },
    { key: 'portal', label: 'Custom Button' },
    { key: 'statements', label: 'Related List' },
  ];

  const handleAddField = () => {
    if (newField.labelName && newField.dataType) {
      setFields([
        ...fields,
        {
          ...newField,
          status: 'Active',
        },
      ]);
      setNewField({
        labelName: '',
        dataType: '',
        isMandatory: false,
        displayInPortal: false,
      });
      setIsAddingField(false);
    }
  };

  const handleCancel = () => {
    setIsAddingField(false);
    setNewField({
      labelName: '',
      dataType: '',
      isMandatory: false,
      displayInPortal: false,
    });
  };

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tabFromUrl = params.get("tab");

  useEffect(() => {
    if (tabFromUrl) {
      setSelectedTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'general':
        return (
          <GeneralSettings
            enableVendorNumbers={enableVendorNumbers}
            setEnableVendorNumbers={setEnableVendorNumbers}
            enableCustomerNumbers={enableCustomerNumbers}
            setEnableCustomerNumbers={setEnableCustomerNumbers}
            enableCreditLimit={enableCreditLimit}
            setEnableCreditLimit={setEnableCreditLimit}
            enableMultiCurrency={enableMultiCurrency}
            setEnableMultiCurrency={setEnableMultiCurrency}
            customerType={customerType}
            setCustomerType={setCustomerType}
            deleteCurrency={deleteCurrency}
            setDeleteCurrency={setDeleteCurrency}
          />
        );
      case 'customFields':
        return (
          <CustomFieldsSettings
            isAddingField={isAddingField}
            setIsAddingField={setIsAddingField}
            newField={newField}
            setNewField={setNewField}
            handleAddField={handleAddField}
            handleCancel={handleCancel}
          />
        );
      case 'portal':
        return <CustomerPortalSettings />;
      case 'statements':
        return <CustomerStatementsSettings />;
      default:
        return null;
    }
  };

  const renderTopRightControls = () => {
    if (selectedTab === 'customFields') {
      return (
        <div className="flex justify-between gap-6 items-center text-sm">
          <a className="text-blue-600">Custom Fields Usage <span>0/135</span></a>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => navigate("/New-Custom-Field-Contacts")}
          >
            Add Custom Field
          </button>
        </div>
      );
    }

    if (selectedTab === 'portal') {
      return (
        <div className="flex justify-between gap-6 items-center text-sm">
          <a className="text-blue-600">View Logs</a>
          <div className="relative" ref={dropdownRef}>
            <CommonButton
              label={
                <span className="flex items-center">
                  <span className="mr-1 font-medium">+ New</span>
                  <ChevronDown className="w-4 h-4" />
                </span>
              }
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setIsOpen(prev => !prev)}
            />
            {isOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded shadow-lg z-10 border border-gray-200">
                {dropdownItems.map((section, index) => (
                  <div key={index}>
                    <div className="px-4 py-2 text-sm text-gray-500 font-medium border-b border-gray-100">
                      {section.title}
                    </div>
                    {section.items.map((item, i) => (
                      <button
                        key={i}
                        className="w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                        onClick={() => {
                          item.onClick();
                          setIsOpen(false);
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (selectedTab === 'statements') {
      return (
        <div className="flex justify-between gap-6 items-center text-sm">
          <CommonButton
            label="New"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsAddingField(true)}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Customers and Vendors</h1>
        {renderTopRightControls()}
      </div>

      <TabContainer
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabs}
      />
      {renderTabContent()}

      {showNewCustomButtonModal && (
        <NewCustomButtonModal onClose={() => setShowNewCustomButtonModal(false)} />
      )}
    </div>
  );
}
