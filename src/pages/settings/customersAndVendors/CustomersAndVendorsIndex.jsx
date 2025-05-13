import { useState } from 'react';
import CustomFieldsSettings from './CustomFieldsSettings';
import CustomerPortalSettings from './CustomerPortalSettings';
import CustomerStatementsSettings from './CustomerStatementsSettings';
import TabContainer from './TabContainer';
import GeneralSettings from './GeneralSettings';

export default function CustomersAndVendorsIndex() {
  const [selectedTab, setSelectedTab] = useState('general');

  // Shared settings state
  const [enableVendorNumbers, setEnableVendorNumbers] = useState(false);
  const [enableCustomerNumbers, setEnableCustomerNumbers] = useState(true);
  const [enableCreditLimit, setEnableCreditLimit] = useState(true);
  const [enableMultiCurrency, setEnableMultiCurrency] = useState(false);
  const [customerType, setCustomerType] = useState('business');
  const [deleteCurrency, setDeleteCurrency] = useState(false);
  const tabs = [
    { key: 'general', label: 'General' },
    { key: 'customFields', label: 'Custom Fields' },
    { key: 'portal', label: 'Customer Portal' },
    { key: 'statements', label: 'Customer Statements' },
  ];

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
        return <CustomFieldsSettings />;
      case 'portal':
        return <CustomerPortalSettings />;
      case 'statements':
        return <CustomerStatementsSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Customers and Vendors</h1>
      <TabContainer selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} />
      {renderTabContent()}
    </div>
  );
}
