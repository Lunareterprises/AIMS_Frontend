import React, { useRef, useState } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import CommonButton from '../../../CommonUI/buttons/CommonButton';

export default function FileUploadCard() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const maxFiles = 10;

  const handleFiles = (files) => {
    let validFiles = [];

    for (const file of files) {
      if (file.size > maxFileSize) {
        alert(`"${file.name}" exceeds 10MB limit.`);
      } else {
        validFiles.push(file);
      }
    }

    const newFiles = [...uploadedFiles, ...validFiles];

    if (newFiles.length > maxFiles) {
      alert(`You can upload a maximum of ${maxFiles} files.`);
      return;
    }

    setUploadedFiles(newFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length) handleFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) handleFiles(files);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index) => {
    const newList = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newList);
  };

  return (
    <div className="lg:col-span-1">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2 w-52 mx-auto">
          Drag or Drop your Receipts
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Maximum file size allowed is 10MB. Max 10 files.
        </p>

        <input
          type="file"
          ref={fileInputRef}
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        <CommonButton
          type="button"
          onClick={triggerFileSelect}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-blue-500"
          label={
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload your Files
            </>
          }
        />

        {/* Uploaded Files Display */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6 text-left text-sm bg-gray-50  rounded p-4 max-h-52 overflow-auto">
            <h4 className="font-medium mb-2">Uploaded Files:</h4>
            <ul className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type || 'Unknown'}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove file"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
