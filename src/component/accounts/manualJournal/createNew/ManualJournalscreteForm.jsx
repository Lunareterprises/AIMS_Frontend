import { useState } from 'react';
import { Upload, Plus, Info, Trash2, Settings } from 'lucide-react';
import CommonButton from '../../../CommonUI/buttons/CommonButton';
import QuoteNumberPreferences from '../../../sales/quotes/createNew/QuoteNumberPreferences';

const ManualJournalscreteForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    journalId: '',
    reference: '',
    notes: '',
    cashBased: false,
    currency: 'AED- UAE Dirham',
  });

  const [errors, setErrors] = useState({});
  const [attachments, setAttachments] = useState([]);
  const [modalType, setModalType] = useState('billing');
  const [rows, setRows] = useState([
    { id: 1, account: '', description: '', contact: '', debits: '', credits: '' },
    { id: 2, account: '', description: '', contact: '', debits: '', credits: '' },
  ]);
    const [configureModalOpen, setConfigureModalOpen] = useState(false);
      const handleSaveBilling = (data) => {
    console.log('Billing address saved:', data);
    // call billing API here
  };
      const getSaveHandler = () =>
    modalType === 'billing' ? handleSaveBilling : handleSaveShipping;
  const validateForm = () => {
    const newErrors = {};
    if (!formData.date.trim()) newErrors.date = 'Date is required';
    if (!formData.journalId.trim()) newErrors.journalId = 'Journal ID is required';
    if (!formData.notes.trim()) newErrors.notes = 'Notes are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData, rows, attachments);
      alert('Form submitted successfully!');
    }
  };

  const addNewRow = () => {
    const newRow = {
      id: rows.length + 1,
      account: '',
      description: '',
      contact: '',
      debits: '',
      credits: '',
    };
    setRows([...rows, newRow]);
  };

  const removeRow = (id) => {
    if (rows.length > 2) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const updateRow = (id, field, value) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 px-4 sm:px-4 relative">
      <div className="max-w-full mx-auto bg-white rounded-lg text-sm">
        <h1 className="text-lg font-semibold mb-10 pt-6">New Journal</h1>
        <div className="">
          <div className="flex flex-col w-full md:w-1/2 gap-6 mb-6">
            <div className="flex items-center gap-3 ">
              <label className="w-32 font-medium text-red-500">
                Date<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="w-full">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date && <p className="text-sm text-red-600 mt-1">{errors.date}</p>}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="w-32 font-medium text-red-500">
                Journal<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="w-full relative">
                <input
                  type="text"
                  value={formData.journalId}
                  onChange={(e) => setFormData({ ...formData, journalId: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                    errors.journalId ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <div className=" group">
                    <CommonButton label={<Settings className='text-blue-700 w-5' />} onClick={() => { setConfigureModalOpen(true);  }} className="absolute right-1 top-1 bottom-1 px-2" />
                    <div className="absolute w-1/2 -top-8 right-0 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10">
                        Click here to enable or disable auto-generation of Journal numbers.
                    </div>
                </div> 
                <QuoteNumberPreferences
                    isOpen={configureModalOpen}
                    onClose={() => setConfigureModalOpen(false)}
                    onSave={getSaveHandler()}
                    source="journal"
                />                
                {errors.journalId && <p className="text-sm text-red-600 mt-1">{errors.journalId}</p>}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="w-32 font-medium text-gray-700">Reference#</label>
              <input
                type="text"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="w-32 font-medium text-gray-700">Journal Type</label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.cashBased}
                  onChange={(e) => setFormData({ ...formData, cashBased: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Cash based journal</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="w-32 font-medium text-red-500 mt-2">
                Notes<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="w-full">
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none resize-none ${
                    errors.notes ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.notes && <p className="text-sm text-red-600 mt-1">{errors.notes}</p>}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="w-32 font-medium text-gray-700">Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="AED- UAE Dirham">AED- UAE Dirham</option>
                <option value="USD- US Dollar">USD- US Dollar</option>
                <option value="EUR- Euro">EUR- Euro</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-sm text-left">Account</th>
                  <th className="px-3 py-2 text-sm text-left">Description</th>
                  <th className="px-3 py-2 text-sm text-left">Contact (AED)</th>
                  <th className="px-3 py-2 text-sm text-left">Debits</th>
                  <th className="px-3 py-2 text-sm text-left">Credits</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="">
                    <td className="px-3 py-2">
                      <select
                        value={row.account}
                        onChange={(e) => updateRow(row.id, 'account', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                      >
                        <option value="">Select</option>
                        <option value="Cash">Cash</option>
                        <option value="Revenue">Revenue</option>
                        <option value="Expenses">Expenses</option>
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={row.description}
                        onChange={(e) => updateRow(row.id, 'description', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <select
                        value={row.contact}
                        onChange={(e) => updateRow(row.id, 'contact', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                      >
                        <option value="">Select</option>
                        <option value="Customer A">Customer A</option>
                        <option value="Supplier B">Supplier B</option>
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={row.debits}
                        onChange={(e) => updateRow(row.id, 'debits', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={row.credits}
                        onChange={(e) => updateRow(row.id, 'credits', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <button onClick={() => removeRow(row.id)} className="text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={addNewRow}
              className="mt-3 text-blue-600 hover:underline text-sm flex items-center"
            >
              <Plus className="mr-1 w-4 h-4" />
              Add New Row
            </button>
          </div>

            
                {/* Attachments Section */}
            <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
            <div className="border-2 border-dashed border-gray-300 rounded p-4 w-1/2">
                <input
                type="file"
                id="file-upload"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files);
                    const updatedAttachments = [...attachments];

                    let hasError = false;
                    const newErrors = {};

                    selectedFiles.forEach((file) => {
                    if (file.size > 10 * 1024 * 1024) {
                        hasError = true;
                        newErrors.attachments = 'Each file must be less than 10MB.';
                    } else if (updatedAttachments.length < 5) {
                        updatedAttachments.push(file);
                    } else {
                        hasError = true;
                        newErrors.attachments = 'Maximum 5 files allowed.';
                    }
                    });

                    if (!hasError) {
                    setErrors((prev) => ({ ...prev, attachments: null }));
                    setAttachments(updatedAttachments);
                    } else {
                    setErrors((prev) => ({ ...prev, attachments: newErrors.attachments }));
                    }

                    // Reset input value to allow re-upload of same file if needed
                    e.target.value = null;
                }}
                />

                <label
                htmlFor="file-upload"
                className="flex items-center text-blue-600 text-sm w-1/2 cursor-pointer"
                >
                <Upload className="w-4 h-4 mr-2" />
                Upload File
                </label>

                <p className="text-xs text-gray-500 mt-1">Max. 5 files, 10MB each</p>

                {errors.attachments && (
                <p className="text-sm text-red-500 mt-1">{errors.attachments}</p>
                )}

                {attachments.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-gray-700">
                    {attachments.map((file, idx) => (
                    <li
                        key={idx}
                        className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded"
                    >
                        <span className="truncate">{file.name}</span>
                        <button
                        onClick={() =>
                            setAttachments((prev) =>
                            prev.filter((_, index) => index !== idx)
                            )
                        }
                        className="text-red-500 hover:text-red-700 ml-2"
                        title="Remove"
                        >
                        <Trash2 className="w-4 h-4" />
                        </button>
                    </li>
                    ))}
                </ul>
                )}
                
            </div>
            
            </div>



        </div>

        
      </div>

      <div className="fixed bottom-0 left-62 right-0 z-50 bg-white border-t px-4 py-3 flex justify-end space-x-4 shadow">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save and Publish
        </button>
        <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
          Save as Draft
        </button>
        <button className="px-6 py-2 border text-gray-700 border-gray-300 rounded hover:bg-gray-100">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ManualJournalscreteForm;
