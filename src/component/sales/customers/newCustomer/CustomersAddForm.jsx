import React, { useState, useEffect } from 'react';
import { Phone, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OtherDetails from './OtherDetails';
import AddressTab from './AddressTab';
import ContactPersonsTab from './ContactPersonsTab';
import CustomFields from './CustomFields';
import ReportingTags from './ReportingTags';
import RemarksTab from './RemarksTab';
import CommonButton from '../../../CommonUI/buttons/CommonButton';
import { createCustomer } from '../../../../api/services/sales/createCustomer';

const CustomersAddForm = () => {
  const [activeTab, setActiveTab] = useState('Other Details');
  const [customerType, setCustomerType] = useState('Business');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    salutation: '',
    firstName: '',
    lastName: '',
    companyName: '',
    displayName: '',
    displayNameOptions: [],
    email: '',
    workPhone: '',
    mobile: '',
    customerType: 'Business',
  });

  const [otherDetailsData, setOtherDetailsData] = useState({
    taxTreatment: '',
    placeOfSupply: '',
    currency: '',
    accountReceivable: '',
    openingBalance: '',
    paymentTerms: '',
    enablePortal: false,
    portalLanguage: '',
    documents: null,
    website: '',
    department: '',
    designation: '',
    twitter: '',
    skype: '',
    facebook: '',
  });

  const tabs = ['Other Details', 'Address', 'Contact Persons'];

  useEffect(() => {
    const { salutation, firstName, lastName } = formData;
    const options = [
      `${salutation} ${firstName} ${lastName}`.trim(),
      `${firstName} ${lastName}`.trim(),
      `${lastName} ${firstName}`.trim(),
      `${firstName}`.trim(),
      `${lastName}`.trim(),
    ].filter(Boolean);

    setFormData((prev) => ({ ...prev, displayNameOptions: options }));
  }, [formData.salutation, formData.firstName, formData.lastName]);

  const validateForm = () => {
    const errors = {};
    if (!formData.displayName) errors.displayName = 'Display Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.firstName) errors.firstName = 'First Name is required';
    if (!formData.lastName) errors.lastName = 'Last Name is required';
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // ✅ Log the otherDetailsData
    console.log('Other Details Data:', otherDetailsData);

    setLoading(true);
    setError('');

    const payload = {
      cu_salutation: formData.salutation,
      cu_first_name: formData.firstName,
      cu_last_name: formData.lastName,
      cu_company_name: formData.companyName,
      cu_display_name: formData.displayName,
      cu_email: formData.email,
      cu_phone: formData.workPhone,
      cu_mobile: formData.mobile,
      cu_pan_no: '',
      cu_opening_balance: otherDetailsData.openingBalance,
      cu_website: otherDetailsData.website,
      cu_designation: otherDetailsData.designation,
      cu_department: otherDetailsData.department,
      cu_type: formData.customerType,
      cu_currency: otherDetailsData.currency,
      cu_payment_terms: otherDetailsData.paymentTerms,
      cu_portal_language: otherDetailsData.portalLanguage,
      cu_portal_access: otherDetailsData.enablePortal,
      cu_remarks: "qqq",

      cu_b_addr_attention: "attention",
      cu_b_addr_country: "country",
      cu_b_addr_address: "address",
      cu_b_addr_city: "city",
      cu_b_addr_state: "state",
      cu_b_addr_pincode: "pincode",
      cu_b_addr_phone: "phone",
      cu_b_addr_fax_number: "fax",

      cu_s_addr_attention: ".attention",
      cu_s_addr_country: ".country",
      cu_s_addr_address: ".address",
      cu_s_addr_city: ".city",
      cu_s_addr_state: ".state",
      cu_s_addr_pincode: ".pincode",
      cu_s_addr_phone: ".phone",
      cu_s_addr_fax_number: ".fax",

      contact_person: "qqq",
      cu_tax_treatment: otherDetailsData.taxTreatment,
      cu_place_supply: otherDetailsData.placeOfSupply,
      cu_tax_preference: '',
    };

    try {
      await createCustomer(payload);
      navigate('/CustomersList');
    } catch (err) {
      console.error(err);
      setError('Failed to create customer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Other Details':
        return <OtherDetails data={otherDetailsData} onChange={setOtherDetailsData} />;
      case 'Address':
        return <AddressTab />;
      case 'Contact Persons':
        return <ContactPersonsTab />;
      case 'Custom Fields':
        return <CustomFields />;
      case 'Reporting Tags':
        return <ReportingTags />;
      case 'Remarks':
        return <RemarksTab />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl flex flex-col min-h-screen">
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">New Customer</h1>

        {error && (
          <div className="text-red-600 text-sm mb-4 border border-red-300 bg-red-50 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2 w-56">
              <h2 className="block text-sm font-medium text-gray-700">Customer Type</h2>
            </div>
            <div className="flex items-center space-x-4">
              {['Business', 'Individual'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="customerType"
                    value={type}
                    checked={customerType === type}
                    onChange={(e) => {
                      setCustomerType(e.target.value);
                      setFormData({ ...formData, customerType: e.target.value });
                    }}
                    className="mr-2"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 w-56">
              <h2 className="block text-sm font-medium text-gray-700">Primary Contact</h2>
            </div>

            <div className="flex-none w-40">
              <select
                className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md"
                value={formData.salutation}
                onChange={(e) => setFormData({ ...formData, salutation: e.target.value })}
              >
                <option value="">Salutation</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Dr.">Dr.</option>
              </select>
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="First Name"
                className="flex-1 text-sm px-3 py-2 border border-gray-300 rounded-md"
              />
              {formErrors.firstName && <p className="text-red-500 text-xs mt-2">{formErrors.firstName}</p>}
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Last Name"
                className="flex-1 text-sm px-3 py-2 border border-gray-300 rounded-md"
              />
              {formErrors.lastName && <p className="text-red-500 text-xs mt-2">{formErrors.lastName}</p>}
            </div>
          </div>

          <div className="flex">
            <label className="block text-sm font-medium text-gray-700 mb-1 w-80">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full text-sm border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex">
            <label className="block text-sm font-medium text-gray-700 mb-1 w-80">Display Name*</label>
            <div className="flex flex-col w-full">
              <select
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full text-sm border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select or type to add</option>
                {formData.displayNameOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              {formErrors.displayName && <p className="text-red-500 text-xs mt-2">{formErrors.displayName}</p>}
            </div>
          </div>

          <div className="flex">
            <label className="block text-sm font-medium text-gray-700 mb-1 w-80">Email Address*</label>
            <div className="flex flex-col w-full">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-sm border border-gray-300 rounded px-3 py-2"
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-2">{formErrors.email}</p>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 w-56">
              <span className="text-gray-700 font-medium">Phone</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
                <Phone className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="tel"
                  value={formData.workPhone}
                  onChange={(e) => setFormData({ ...formData, workPhone: e.target.value })}
                  placeholder="Work Phone"
                  className="flex-1 text-sm outline-none text-gray-700"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
                <Smartphone className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="Mobile"
                  className="flex-1 text-sm outline-none text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 border-b-2 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="min-h-96">{renderTabContent()}</div>

        <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0 left-0 w-full flex justify-start space-x-3 z-10">
          <CommonButton
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            label={loading ? 'Saving...' : 'Save'}
            disabled={loading}
          />
          <CommonButton
            onClick={() => navigate('/CustomersList')}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            label="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomersAddForm;
