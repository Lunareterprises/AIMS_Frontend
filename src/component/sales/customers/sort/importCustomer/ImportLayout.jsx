import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../../layout/Sidebar';
import CustomerFileImport from './CustomerFileImport';
import FieldMappingPage from './FieldMappingPage';
import PreviewPage from './PreviewPage';
import CommonButton from '../../../../CommonUI/buttons/CommonButton';
import { ChevronLeft } from 'lucide-react';

export default function ImportLayout() {
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [isMappingValid, setIsMappingValid] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (file, headers = []) => {
    setSelectedFile(file);
    setCsvHeaders(headers);
  };

  const getHeading = () => {
    switch (step) {
      case 1: return 'Customers - Select File';
      case 2: return 'Map Fields';
      case 3: return 'Preview';
      default: return '';
    }
  };

  const renderStepContent = () => {
    if (step === 1) return <CustomerFileImport onFileUpload={handleFileUpload} />;
    if (step === 2) return (
      <FieldMappingPage
        file={selectedFile}
        headers={csvHeaders}
        onValidationChange={setIsMappingValid}
      />
    );
    if (step === 3) return <PreviewPage file={selectedFile} />;
    return null;
  };

  const handleNext = () => {
    if (step === 1 && !selectedFile) return;
    if (step === 2 && !isMappingValid) return;
    if (step < 3) setStep(step + 1);
    else setSuccessModalVisible(true); // Show success modal on Import
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-white relative">
        <button className="absolute top-4 right-6 text-gray-400 hover:text-gray-500">
          <span className="text-xl">&times;</span>
        </button>

        <div className="px-6 pt-5 pb-4">
          <h2 className="text-lg font-medium text-center">{getHeading()}</h2>
        </div>

        <div className="px-6 py-4 border-b border-gray-300">
          <div className="max-w-xl mx-auto flex items-center mb-6">
            <StepIndicator step={1} label="Configure" active={step >= 1} completed={step > 1} />
            <Connector active={step >= 2} />
            <StepIndicator step={2} label="Map Fields" active={step >= 2} completed={step > 2} />
            <Connector active={step >= 3} />
            <StepIndicator step={3} label="Preview" active={step === 3} />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 pb-40">
          {renderStepContent()}
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl bg-white border-t border-gray-300 px-6 py-4 flex justify-between">
          <div className="flex space-x-2">
            {step > 1 && (
              <CommonButton
                onClick={handlePrev}
                label={
                  <span className="flex items-center">
                    <ChevronLeft size={16} className="mr-1" />
                    Previous
                  </span>
                }
                className="flex items-center px-6 py-2 border rounded text-gray-700 hover:bg-gray-50 text-sm"
              />
            )}
            <CommonButton
              onClick={handleNext}
              disabled={
                (step === 1 && !selectedFile) ||
                (step === 2 && !isMappingValid)
              }
              label={step < 3 ? 'Next' : 'Import'}
              className={`px-6 py-2 text-sm text-white rounded ${
                (step === 1 && !selectedFile) || (step === 2 && !isMappingValid)
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            />
          </div>

          <div>
            <CommonButton
              onClick={() => navigate('/customers')}
              label="Cancel"
              className="px-6 py-2 border rounded text-gray-500 mr-2 hover:bg-gray-50 text-sm"
            />
          </div>
        </div>

        {/* ✅ Success Modal */}
        {successModalVisible && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg">
              <h2 className="text-lg font-semibold text-green-600 mb-2">Import Successful</h2>
              <p className="text-gray-800 mb-4">
                42 of 43 Customers in your file have been successfully imported.
              </p>
              <div className="flex justify-end">
                <CommonButton
                    label="Go to Customers"
                    onClick={() => navigate('/CustomersList')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
                />
                  
                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepIndicator({ step, label, active, completed }) {
  return (
    <div className="flex items-center">
      <div
        className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${
          completed
            ? 'bg-green-500 text-white'
            : active
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-500'
        }`}
      >
        {completed ? '✓' : step}
      </div>
      <span className={`ml-2 text-sm ${active ? 'font-semibold text-gray-900' : 'font-medium text-gray-500'}`}>{label}</span>
    </div>
  );
}

function Connector({ active }) {
  return <div className={`flex-1 h-px ${active ? 'bg-blue-500' : 'bg-gray-200'} mx-4`} />;
}
