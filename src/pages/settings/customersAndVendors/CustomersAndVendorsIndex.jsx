import { useState } from 'react';
import CustomFieldsSettings from './CustomFieldsSettings';
import CustomerPortalSettings from './CustomerPortalSettings';
import CustomerStatementsSettings from './CustomerStatementsSettings';
import TabContainer from './TabContainer';
import GeneralSettings from './GeneralSettings';
import { ChevronDown } from 'lucide-react';

export default function CustomersAndVendorsIndex() {
  const [selectedTab, setSelectedTab] = useState('general');
  const [isAddingField, setIsAddingField] = useState(false);
  const [newField, setNewField] = useState({
    labelName: '',
    dataType: '',
    isMandatory: false,
    displayInPortal: false,
  });
  const [fields, setFields] = useState([]);

  // Shared settings state
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
          <a className="text-blue-600">
            Custom Fields Usage <span>0/135</span>
          </a>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsAddingField(true)}
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
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsAddingField(true)}
          >
            New
          </button>
        </div>
      );
    }

    if (selectedTab === 'statements') {
      return (
        <div className="flex justify-between gap-6 items-center text-sm">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsAddingField(true)}
          >
            New
          </button>
        </div>
      );
    }

    return null; // Nothing for "general"
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Customers and Vendors
        </h1>
        {renderTopRightControls()}
      </div>

      <TabContainer
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabs}
      />
      {renderTabContent()}
    </div>
  );
}
