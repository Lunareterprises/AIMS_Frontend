import React, { useState, useEffect } from 'react';
import CommonButton from '../../../component/CommonUI/buttons/CommonButton';
import { useNavigate } from 'react-router-dom';

const NewCustomFieldContacts = () => {
    const navigate =useNavigate();
  const [newField, setNewField] = useState({
    labelName: '',
    dataType: '',
    isMandatory: false,
    displayInPortal: false,
    helpText: '',
    inputFormat: '',
    defaultValue: '',
    preventDuplicateValues: false,
    dataPrivacy: {
      pii: false,
      ephi: false
    },
    // For dropdown and multiselect
    options: ['', '', '', ''],
    addColorToOptions: false,
    // For auto-generate number
    prefix: '',
    startingNumber: '',
    suffix: '',
    addToExistingContacts: false,
    // For attachment
    fileTypes: {
      image: true,
      pdf: true,
      document: true,
      allFiles: true
    },
    // For URL
    hyperlinkLabel: '',
    // For External Lookup
    externalField: ''
  });

  // Track remaining fields count
  const [remainingFields, setRemainingFields] = useState(50);

  // Update remaining fields based on data type
  useEffect(() => {
    switch(newField.dataType) {
      case 'dropdown':
      case 'multi-select':
        setRemainingFields(25);
        break;
      case 'decimal':
      case 'amount':
      case 'percent':
      case 'check-box':
        setRemainingFields(20);
        break;
      case 'auto-generate-number':
        setRemainingFields(1);
        break;
      case 'attachment':
        setRemainingFields(10);
        break;
      case 'external-lookup':
        setRemainingFields(5);
        break;
      case 'text-box-multi-line':
        setRemainingFields(5);
        break;
      default:
        setRemainingFields(50);
        break;
    }
  }, [newField.dataType]);

  const handleAddField = () => {
    // Handle form submission
    console.log('Form submitted:', newField);
    // Logic to save the field would go here
  };

  const handleCancel = () => {
    // Reset form or navigate away
    console.log('Form cancelled');
  };

  // Helper function to render data type specific fields
  const renderDataTypeFields = () => {
    switch(newField.dataType) {
      case 'text':
      case 'number':
      case 'phone':
        return (
          <>
            <DataPrivacyField newField={newField} setNewField={setNewField} />
            <PreventDuplicatesField newField={newField} setNewField={setNewField} />
            <InputFormatField newField={newField} setNewField={setNewField} />
            <DefaultValueField 
              newField={newField} 
              setNewField={setNewField} 
              icon={newField.dataType === 'phone' ? '📞' : null}
            />
          </>
        );
      
      case 'email':
        return (
          <>
            <DataPrivacyField newField={newField} setNewField={setNewField} />
            <PreventDuplicatesField newField={newField} setNewField={setNewField} />
            <InputFormatField newField={newField} setNewField={setNewField} />
            <DefaultValueField 
              newField={newField} 
              setNewField={setNewField} 
              icon="✉️"
            />
          </>
        );
        
      case 'url':
        return (
          <>
            <div className="flex items-center flex-row">
              <label className="font-medium mb-1 w-52 text-sm">Hyperlink Label</label>
              <input
                type="text"
                className="border border-gray-400 text-sm rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-0"
                value={newField.hyperlinkLabel}
                onChange={(e) => setNewField({ ...newField, hyperlinkLabel: e.target.value })}
              />
            </div>
            <DataPrivacyField newField={newField} setNewField={setNewField} />
            <PreventDuplicatesField newField={newField} setNewField={setNewField} />
            <InputFormatField newField={newField} setNewField={setNewField} />
            <DefaultValueField 
              newField={newField} 
              setNewField={setNewField} 
              icon="🌐"
            />
          </>
        );
        
      case 'decimal':
      case 'amount':
      case 'percent':
        return (
          <>
            <InputFormatField newField={newField} setNewField={setNewField} />
            <DefaultValueField 
              newField={newField} 
              setNewField={setNewField} 
              suffix={newField.dataType === 'percent' ? '%' : newField.dataType === 'amount' ? 'AED' : null}
            />
          </>
        );
        
      case 'date':
        return (
          <>
            <DataPrivacyField newField={newField} setNewField={setNewField} />
            <DefaultValueField 
              newField={newField} 
              setNewField={setNewField} 
              placeholder="dd MMM yyyy"
              extraLink={<a href="#" className="text-blue-600 text-sm ml-24 block">Select Relative Date</a>}
            />
          </>
        );
        
      case 'date-time':
        return (
          <>
            <DataPrivacyField newField={newField} setNewField={setNewField} />
            <div className="flex items-center flex-row">
              <label className="font-medium mb-1 w-52">Default Value</label>
              <div className="flex gap-2 w-1/2">
                <div className="flex items-center border rounded px-3 py-2 w-2/3">
                  <span className="mr-2">📅</span>
                  <span className="text-gray-400">dd MMM yyyy</span>
                </div>
                <div className="flex items-center border rounded px-3 py-2 w-1/3">
                  <span className="mr-2">🕒</span>
                  <span className="text-gray-400">HH:MM</span>
                </div>
              </div>
            </div>
          </>
        );
        
      case 'check-box':
        return (
          <>
            <div className="flex items-center flex-row">
              <label className="font-medium mb-1 w-52 text-sm">Default Value</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newField.defaultValue === 'checked'}
                  onChange={(e) => setNewField({ ...newField, defaultValue: e.target.checked ? 'checked' : '' })}
                  className="mr-2"
                />
                <span className='text-sm'>Ticked by default</span>
              </div>
            </div>
          </>
        );
        
      case 'dropdown':
        return (
          <>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Dropdown Options:</label>
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-700">Options Count: 4</div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={newField.addColorToOptions}
                      onChange={(e) =>
                        setNewField({ ...newField, addColorToOptions: e.target.checked })
                      }
                    />
                    Add color to options
                  </label>
                  <button className="flex items-center text-blue-600 bg-blue-50 rounded-full px-2 py-1">
                    <span className="font-bold mr-1">+</span> Add Options
                  </button>
                </div>
              </div>
              <div className="border border-gray-300 rounded p-4 mb-4">
                {newField.options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className="mr-2 text-gray-500">#</span>
                    <input
                      type="checkbox"
                      className="mr-2"
                    />
                    <input
                      type="text"
                      className="border border-gray-400 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-0"
                      value={option}
                      onChange={(e) => {
                        const updatedOptions = [...newField.options];
                        updatedOptions[index] = e.target.value;
                        setNewField({ ...newField, options: updatedOptions });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <DefaultValueField 
              newField={newField} 
              setNewField={setNewField} 
              isDropdown
            />
          </>
        );
        
      case 'multi-select':
        return (
          <>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Multiselect Options:</label>
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-700">Options Count: 4</div>
                <button className="flex items-center text-blue-600 bg-blue-50 rounded-full px-2 py-1">
                  <span className="font-bold mr-1">+</span> Add Options
                </button>
              </div>
              <div className="border border-gray-300 rounded p-4 mb-4">
                {newField.options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className="mr-2 text-gray-500">#</span>
                    <input
                      type="checkbox"
                      className="mr-2"
                    />
                    <input
                      type="text"
                      className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
                      value={option}
                      onChange={(e) => {
                        const updatedOptions = [...newField.options];
                        updatedOptions[index] = e.target.value;
                        setNewField({ ...newField, options: updatedOptions });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <DefaultValueField 
              newField={newField} 
              setNewField={setNewField} 
              isDropdown
            />
          </>
        );
        
      case 'auto-generate-number':
        return (
          <>
            <div className="flex items-center flex-row">
              <label className="font-medium mb-1 w-52 text-sm">Prefix</label>
              <input
                type="text"
                className="text-sm border border-gray-400 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-0"
                value={newField.prefix}
                onChange={(e) => setNewField({ ...newField, prefix: e.target.value })}
              />
            </div>
            <div className="flex items-center flex-row">
              <label className="text-red-600 font-medium mb-1 w-52 text-sm">
                Starting Number<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="text-sm border border-gray-400 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-0"
                value={newField.startingNumber}
                onChange={(e) => setNewField({ ...newField, startingNumber: e.target.value })}
              />
            </div>
            <div className="flex items-center flex-row">
              <label className="font-medium mb-1 w-52 text-sm">Suffix</label>
              <input
                type="text"
                className="text-sm border border-gray-400 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-0"
                value={newField.suffix}
                onChange={(e) => setNewField({ ...newField, suffix: e.target.value })}
              />
            </div>
            <div className=" items-center bg-yellow-50 p-4 rounded mb-4">
                <div className='flex items-center'>
                    <label className="font-medium mb-1 w-52 text-sm">Add to existing contacts</label>
                    <input
                    type="checkbox"
                    checked={newField.addToExistingContacts}
                    onChange={(e) => 
                    setNewField({ ...newField, addToExistingContacts: e.target.checked })
                    }
                    className="mr-2"
                    />
                    <div className='text-sm'>Add this custom field to all the existing contacts and auto-generate the number in all of them.</div>
                </div>
                <div>
                    <p className="text-gray-600 text-sm mt-2">
                        <span className="mr-1">ℹ️</span> This is a one-time setup and you cannot edit this setting later.
                    </p>
                </div>
            </div>
          </>
        );
        
      case 'attachment':
        return (
          <>
            <div className="flex items-center flex-row text-sm">
              <label className="font-medium mb-1 w-52 ">File Type</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newField.fileTypes.image}
                    onChange={(e) => 
                      setNewField({ 
                        ...newField, 
                        fileTypes: { ...newField.fileTypes, image: e.target.checked } 
                      })
                    }
                    className="mr-1"
                  />
                  Image
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={newField.fileTypes.pdf}
                    onChange={(e) => 
                      setNewField({ 
                        ...newField, 
                        fileTypes: { ...newField.fileTypes, pdf: e.target.checked } 
                      })
                    }
                    className="mr-1"
                  />
                  PDF
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newField.fileTypes.document}
                    onChange={(e) => 
                      setNewField({ 
                        ...newField, 
                        fileTypes: { ...newField.fileTypes, document: e.target.checked } 
                      })
                    }
                    className="mr-1"
                  />
                  Document
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newField.fileTypes.allFiles}
                    onChange={(e) => 
                      setNewField({ 
                        ...newField, 
                        fileTypes: { ...newField.fileTypes, allFiles: e.target.checked } 
                      })
                    }
                    className="mr-1"
                  />
                  All Files
                </label>
              </div>
            </div>
            <div className="flex items-center flex-row text-sm space-x-4">
                <label className="font-medium w-52">Default Value</label>

                <div>
                    <label className="flex items-center border border-gray-300 rounded px-3 py-2 cursor-pointer">
                    <span className="mr-2">⬆️</span> Upload File
                    <input type="file" className="hidden" />
                    </label>
                    <p className="text-gray-500 text-xs mt-1">You can upload a file that is 10MB or lesser</p>
                </div>
            </div>

          </>
        );
        
      case 'external-lookup':
        return (
          <>
            <div className="flex items-center flex-row">
              <label className="text-red-600 font-medium mb-1 w-52 text-sm">
                External Field<span className="text-red-600">*</span>
              </label>
              <button className="text-sm border rounded px-3 py-2 w-1/2 text-gray-500 text-left">
                Click to select Field
              </button>
            </div>
          </>
        );
        
      case 'text-box-multi-line':
        return (
          <>
            <div className="flex items-center">
                <label className="text-red-600 font-medium mb-1 w-52 text-sm">
                {/* Module<span className="text-red-600">*</span> */}
              </label>
              <input
                type="checkbox"
                id="richTextEditor"
                checked={newField.displayRichTextEditor}
                onChange={(e) => 
                  setNewField({ ...newField, displayRichTextEditor: e.target.checked })
                }
                className="mr-2"
              />
              <label htmlFor="richTextEditor" className='text-sm '>Display rich-text editor</label>
            </div>
            <InputFormatField newField={newField} setNewField={setNewField} />
          </>
        );
        
      case 'lookup':
        return (
          <>
            <div className="flex items-center flex-row">
              <label className="text-red-600 font-medium mb-1 w-52 text-sm">
                Module<span className="text-red-600">*</span>
              </label>
              <select
                className="text-sm border border-gray-400 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-0"
                value={newField.module}
                onChange={(e) => setNewField({ ...newField, module: e.target.value })}
              >
                <option value="">Select</option>
                <option value="leads">Leads</option>
                <option value="accounts">Accounts</option>
                <option value="deals">Deals</option>
              </select>
            </div>
          </>
        );
    
      default:
        return null;
    }
  };

  return (
    <div className="p-6 rounded space-y-6 w-full ">
        <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">New Custom Field - Contacts</h2>
            <CommonButton
                label="Close X"
                className="text-blue-600"
                onClick={() => navigate("/customers-vendors?tab=customFields")}
            />
        </div>


      {/* Label Name */}
      <div className="flex items-center flex-row">
        <label className="text-red-600 text-sm font-medium mb-1 w-52">
          Label Name<span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          className="border text-sm border-gray-400 rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-0"
          value={newField.labelName}
          onChange={(e) =>
            setNewField({ ...newField, labelName: e.target.value })
          }
        />
      </div>

      {/* Data Type */}
      <div className="flex items-center flex-row">
        <label className="text-sm text-red-600 font-medium mb-1 w-52">
          Data Type<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col w-1/2">
          <select
            className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring-0 text-sm"
            value={newField.dataType}
            onChange={(e) =>
              setNewField({ ...newField, dataType: e.target.value })
            }
          >
            <option value="">Select</option>
            <option value="text">Text Box (Single Line)</option>
            <option value="text-box-multi-line">Text Box (Multi-line)</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="number">Number</option>
            <option value="decimal">Decimal</option>
            <option value="percent">Percent</option>
            <option value="amount">Amount</option>
            <option value="date">Date</option>
            <option value="date-time">Date and Time</option>
            <option value="check-box">Check Box</option>
            <option value="dropdown">Dropdown</option>
            <option value="multi-select">Multi-select</option>
            <option value="url">URL</option>
            <option value="lookup">Lookup</option>
            <option value="external-lookup">External Lookup</option>
            <option value="auto-generate-number">Auto-Generate Number</option>
            <option value="attachment">Attachment</option>
          </select>
          <div className="text-gray-600 text-xs mt-1">Remaining Fields: {remainingFields}</div>
        </div>
      </div>

      {/* Help Text */}
      <div className="flex items-center flex-row">
        <label className="text-sm font-medium mb-1 w-52">Help Text</label>
        <div className="flex flex-col w-1/2">
          <input
            type="text"
            className="text-sm border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring-0"
            value={newField.helpText}
            onChange={(e) =>
              setNewField({ ...newField, helpText: e.target.value })
            }
          />
          <div className="text-gray-600 text-xs mt-1">
            Enter some text to help users understand the purpose of this custom field.
          </div>
        </div>
      </div>

      {/* Dynamic Fields based on Data Type */}
      {renderDataTypeFields()}

      {/* Is Mandatory */}
      <div className="flex items-center flex-row gap-3">
        <label className="text-sm block font-medium mb-1 w-52">Is Mandatory</label>
        <div className="flex items-center -ml-3 space-x-4">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="isMandatory"
              value="yes"
              checked={newField.isMandatory === true}
              onChange={() =>
                setNewField({ ...newField, isMandatory: true })
              }
              className="accent-blue-600"
            />
            Yes
          </label>
          <label className=" text-sm flex items-center gap-1 ">
            <input
              type="radio"
              name="isMandatory"
              value="no"
              checked={newField.isMandatory === false}
              onChange={() =>
                setNewField({ ...newField, isMandatory: false })
              }
              className="accent-blue-600"
            />
            No
          </label>
        </div>
      </div>

      {/* Display in Portal */}
      <div className="flex items-center flex-row gap-3">
        <label className="text-sm block font-medium mb-1 w-52 ">Display in portal.</label>
        <div className="flex items-center -ml-3 space-x-4">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="displayInPortal"
              value="yes"
              checked={newField.displayInPortal === true}
              onChange={() =>
                setNewField({ ...newField, displayInPortal: true })
              }
              className="accent-blue-600"
            />
            Yes
          </label>
          <label className="text-sm flex items-center gap-1">
            <input
              type="radio"
              name="displayInPortal"
              value="no"
              checked={newField.displayInPortal === false}
              onChange={() =>
                setNewField({ ...newField, displayInPortal: false })
              }
              className="accent-blue-600"
            />
            No
          </label>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleAddField}
        >
          Save
        </button>
        <button
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Reusable field components
const DataPrivacyField = ({ newField, setNewField }) => (
  <div className="flex items-center flex-row">
    <label className="text-sm font-medium mb-1 w-52">Data Privacy</label>
    <div className="flex flex-col w-1/2">
      <div className="flex gap-3">
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={newField.dataPrivacy.pii}
            onChange={(e) =>
              setNewField({
                ...newField,
                dataPrivacy: { ...newField.dataPrivacy, pii: e.target.checked }
              })
            }
            className="mr-1 text-sm"
          />
          PII
        </label>
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={newField.dataPrivacy.ephi}
            onChange={(e) =>
              setNewField({
                ...newField,
                dataPrivacy: { ...newField.dataPrivacy, ephi: e.target.checked }
              })
            }
            className="mr-1"
          />
          ePHI
        </label>
      </div>
      <div className="text-gray-600 text-xs mt-1 ">
        Data will be stored without encryption and will be visible to all users.
      </div>
    </div>
  </div>
);

const PreventDuplicatesField = ({ newField, setNewField }) => (
  <div className="flex items-center flex-row gap-3">
    <label className="text-sm block font-medium mb-1 w-52">Prevent Duplicate Values</label>
    <div className="flex items-center -ml-3 space-x-4">
      <label className="flex items-center gap-1 text-sm">
        <input
          type="radio"
          name="preventDuplicateValues"
          value="yes"
          checked={newField.preventDuplicateValues === true}
          onChange={() =>
            setNewField({ ...newField, preventDuplicateValues: true })
          }
          className="accent-blue-600"
        />
        Yes
      </label>
      <label className="flex items-center gap-1 text-sm">
        <input
          type="radio"
          name="preventDuplicateValues"
          value="no"
          checked={newField.preventDuplicateValues === false}
          onChange={() =>
            setNewField({ ...newField, preventDuplicateValues: false })
          }
          className="accent-blue-600"
        />
        No
      </label>
    </div>
  </div>
);

const InputFormatField = ({ newField, setNewField }) => (
  <div className="flex items-center flex-row">
    <label className="text-sm font-medium mb-1 w-52">Input Format</label>
    <div className="flex items-center w-1/2 gap-2">
      <input
        type="text"
        className="text-sm border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring-0"
        value={newField.inputFormat}
        onChange={(e) =>
          setNewField({ ...newField, inputFormat: e.target.value })
        }
      />
      {/* <a href="#" className="text-blue-600 whitespace-nowrap">Use Standard Formats</a> */}
    </div>
  </div>
);

const DefaultValueField = ({ newField, setNewField, icon, suffix, placeholder, extraLink, isDropdown }) => (
  <div className="flex items-center flex-row">
    <label className="text-sm font-medium mb-1 w-52">Default Value</label>
    {isDropdown ? (
      <select
        className="text-sm border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:ring-0"
        value={newField.defaultValue}
        onChange={(e) =>
          setNewField({ ...newField, defaultValue: e.target.value })
        }
      >
        <option value="">Select</option>
        {newField.options.map((option, idx) => (
          <option key={idx} value={option}>{option || `Option ${idx+1}`}</option>
        ))}
      </select>
    ) : (
      <div className="relative w-1/2">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            {icon}
          </span>
        )}
        <input
          type="text"
          className={`text-sm border border-gray-400 rounded px-3 py-2 w-full  focus:outline-none focus:ring-0 ${icon ? 'pl-10' : ''}`}
          value={newField.defaultValue}
          onChange={(e) =>
            setNewField({ ...newField, defaultValue: e.target.value })
          }
          placeholder={placeholder}
        />
        {suffix && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    )}
    {extraLink && extraLink}
  </div>
);

export default NewCustomFieldContacts;