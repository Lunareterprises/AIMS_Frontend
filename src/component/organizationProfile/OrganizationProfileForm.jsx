import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

const timeZoneOptionsStatic = [
  { value: "Asia/Kolkata", label: "(GMT +5:30) India Standard Time (Asia/Kolkata)" },
  { value: "America/New_York", label: "(GMT -5:00) Eastern Time (US & Canada)" },
  { value: "Europe/London", label: "(GMT 0:00) Greenwich Mean Time (GMT)" },
];

const getCurrencyName = (code) => {
  const map = {
    INR: "Indian Rupee",
    USD: "US Dollar",
    GBP: "British Pound",
    AED: "Dubai Dirham",
    EUR: "Euro",
  };
  return map[code] || code;
};

const OrganizationProfileForm = () => {
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [timeZoneOptions] = useState(timeZoneOptionsStatic);
  const [countryStateMap, setCountryStateMap] = useState({});

  const [formData, setFormData] = useState({
    organizationName: "Rahil company",
    industry: "",
    location: "",
    state: "",
    currency: "",
    language: "English",
    timeZone: "",
    isGstRegistered: false,
    taxType: "",
    taxNumber: "",
    taxBasis: "",
    filingFrequency: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("organizationProfile");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(parsed);
    }

    const fetchCountriesAndStates = async () => {
      try {
        const res = await axios.get("https://countriesnow.space/api/v0.1/countries/states");
        if (res.data?.data) {
          const countries = res.data.data.map((country) => ({
            value: country.name,
            label: country.name,
          }));
          const stateMap = {};
          res.data.data.forEach((country) => {
            stateMap[country.name] = country.states.map((state) => ({
              value: state.name,
              label: state.name,
            }));
          });

          setCountryOptions(countries);
          setCountryStateMap(stateMap);

          // Autofill user location
          const locRes = await axios.get("https://ipapi.co/json/");
          const { country_name, currency, timezone, region } = locRes.data;

          setFormData((prev) => ({
            ...prev,
            location: country_name,
            currency: currency ? `${currency} - ${getCurrencyName(currency)}` : prev.currency,
            timeZone: timezone || prev.timeZone,
            state: region || prev.state,
          }));

          if (stateMap[country_name]) {
            setStateOptions(stateMap[country_name]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch country/state data:", error);
      }
    };

    fetchCountriesAndStates();
  }, []);


  const toggleAddressFields = () => {
    setShowAddressFields((prev) => !prev);
  };

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };

    if (field === "location") {
      updated.state = "";
      setStateOptions(countryStateMap[value] || []);
    }

    setFormData(updated);
    localStorage.setItem("organizationProfile", JSON.stringify(updated));
  };

  const toggleGst = () => {
    setFormData((prev) => ({
      ...prev,
      isGstRegistered: !prev.isGstRegistered,
    }));
  };

  const industryOptions = [
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
  ];

  const currencyOptions = [
    { value: "AED - Dubai Dirham", label: "AED - Dubai Dirham" },
    { value: "INR - Indian Rupee", label: "INR - Indian Rupee" },
    { value: "USD - US Dollar", label: "USD - US Dollar" },
    { value: "GBP - British Pound", label: "GBP - British Pound" },
    { value: "EUR - Euro", label: "EUR - Euro" },
  ];

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
  ];
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col ">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/Images/AuthicationImage/avatar.jpg" alt="Logo" className="h-8" />
          <div>
            <p className="text-sm text-gray-600">
              Bizflow Books is your end-to-end
            </p>
            <p className="text-sm text-gray-600">online accounting software.</p>
          </div>
        </div>
        <div className="text-sm text-gray-700 flex items-center">
          Welcome{" "}
          <span className="font-semibold ml-1">jyothimayi.lunarenterprise</span>
        </div>
      </div>

      {/* Main Content */}
      <div className=" bg-white flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <h2 className="text-xl font-medium text-center text-gray-800">
          Set up your organization profile
        </h2>
        <div className="h-0.5 w-12 bg-blue-500 mx-auto my-4"></div>

        {/* Organization Details */}
        <div className="mt-8">
          <h3 className="text-xs uppercase text-gray-500 font-medium tracking-wider mb-6">
            ORGANIZATIONAL DETAILS
          </h3>

          <div className="mb-6">
            <label className="block mb-2 text-sm">
              Organization Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.organizationName}
              onChange={(e) => handleChange("organizationName", e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm">Industry</label>
            <Select
              options={industryOptions}
              value={
                industryOptions.find(
                  (opt) => opt.value === formData.industry
                ) || null
              }
              onChange={(selected) => handleChange("industry", selected.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 text-sm">
                Organization Location<span className="text-red-500">*</span>
              </label>
              <Select
          options={countryOptions}
          value={countryOptions.find((opt) => opt.value === formData.location)}
          onChange={(selected) =>
            handleChange("location", selected ? selected.value : "")
          }
          placeholder="Select a country"
        />

            </div>

            <div>
              <label className="block mb-2 text-sm">
                State/Union Territory<span className="text-red-500">*</span>
              </label>
              <Select
          options={stateOptions}
          value={stateOptions.find((opt) => opt.value === formData.state)}
          onChange={(selected) =>
            handleChange("state", selected ? selected.value : "")
          }
          placeholder="Select a state"
          isDisabled={!formData.location}
        />
            </div>
          </div>

       
        </div>


        <div className="mb-8">
  <button
    type="button"
    onClick={toggleAddressFields}
    className="flex items-center text-blue-600 font-medium text-sm"
  >
    <span className="text-lg mr-1 font-bold text-blue-500">+</span>{" "}
    {showAddressFields ? "Hide Address" : "Add Organization Address"}
  </button>

  {showAddressFields && (
    <div className="mt-4 space-y-4">
      <div>
        <label className="block mb-1 text-sm">Address</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded p-2"
          value={formData.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Street</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded p-2"
          value={formData.street || ""}
          onChange={(e) => handleChange("street", e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Pincode</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded p-2"
          value={formData.pincode || ""}
          onChange={(e) => handleChange("pincode", e.target.value)}
        />
      </div>
    </div>
  )}
</div>


        {/* Regional Settings */}
        <div className="mb-8">
          <h3 className="text-xs uppercase text-gray-500 font-medium tracking-wider mb-6">
            REGIONAL SETTINGS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 text-sm">
                Currency<span className="text-red-500">*</span>
              </label>
              <Select
                options={currencyOptions}
                value={currencyOptions.find(
                  (opt) => opt.value === formData.currency
                )}
                onChange={(selected) =>
                  handleChange("currency", selected.value)
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">
                Language<span className="text-red-500">*</span>
              </label>
              <Select
                options={languageOptions}
                value={languageOptions.find(
                  (opt) => opt.value === formData.language
                )}
                onChange={(selected) =>
                  handleChange("language", selected.value)
                }
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm">
              Time Zone<span className="text-red-500">*</span>
            </label>
            <Select
          options={timeZoneOptions}
          value={timeZoneOptions.find((opt) => opt.value === formData.timeZone)}
          onChange={(selected) =>
            handleChange("timeZone", selected ? selected.value : "")
          }
          placeholder="Select a timezone"
        />
          </div>
        </div>

        {/* GST Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm">
            Is this business registered for GST/VAT?
          </div>
          <div className="flex items-center">
            <span
              className={`mr-2 text-sm ${
                formData.isGstRegistered
                  ? "text-gray-500"
                  : "text-gray-800 font-medium"
              }`}
            >
              No
            </span>
            <button
              onClick={toggleGst}
              className={`relative inline-flex items-center h-5 rounded-full w-10 transition-colors focus:outline-none ${
                formData.isGstRegistered ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  formData.isGstRegistered ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
        {formData.isGstRegistered && (
          <div className="mb-8 border-t pt-6">
            <h3 className="text-xs uppercase text-gray-500 font-medium tracking-wider mb-4">
              TAX INFORMATION
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tax Type */}
              <div>
                <label className="block mb-2 text-sm">
                  Tax Type<span className="text-red-500">*</span>
                </label>
                <Select
                  options={[
                    { value: "GST", label: "GST (Goods and Services Tax)" },
                    { value: "VAT", label: "VAT (Value Added Tax)" },
                  ]}
                  value={
                    formData.taxType
                      ? { value: formData.taxType, label: formData.taxType }
                      : null
                  }
                  onChange={(selected) =>
                    handleChange("taxType", selected.value)
                  }
                />
              </div>

              {/* GSTIN / VAT Number */}
              <div>
                <label className="block mb-2 text-sm">
                  GSTIN / VAT Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.taxNumber || ""}
                  onChange={(e) => handleChange("taxNumber", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="bg-gray-50 p-4 border border-gray-200 rounded mb-8">
          <div className="font-medium text-sm mb-2">Note:</div>
          <ul className="list-disc pl-5 space-y-3 text-sm text-gray-600">
            <li>
              You can update some of these preferences from Settings anytime.
            </li>
            <li>
              The language selected here applies to key features even if changed
              later.
            </li>
          </ul>

          <div className="ml-5 mt-3 flex flex-wrap gap-6">
            {[
              "Chart of Accounts",
              "Email Templates",
              "Template Customizations",
              "Payment Modes",
            ].map((text, i) => (
              <div key={i} className="flex items-center text-sm text-gray-700">
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Get Started
          </button>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfileForm;
