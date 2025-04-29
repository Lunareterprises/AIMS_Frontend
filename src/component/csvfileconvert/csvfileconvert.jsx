import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';  // Import axios for the API call

const CsvToJsonConverter = ({ onClose }) => {
  const [jsonData, setJsonData] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
    if (file) {
      parseCSV(file);
    }
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        console.log('Parsed CSV Result:', result);
        setJsonData(result.data); // Set JSON data
      },
      header: true, // Use the first row as headers (keys for the JSON)
    });
  };

  const handleUpload = async () => {
    if (!jsonData) return;

    setIsLoading(true);
    try {
      // Format the JSON dynamically before uploading (you can modify this structure as needed)
      const formattedData = jsonData.map(item => ({
        ...item,  // Customize this mapping if necessary
      }));

      const response = await axios.post('your-backend-api-endpoint', {
        data: formattedData,
      });
      console.log('Upload Success:', response);
      onClose();  // Close the modal on successful upload
    } catch (err) {
      console.error('Upload Error:', err);
      setError('Error uploading data');
    } finally {
      setIsLoading(false);
    }
  };

  // Render CSV data as a table
  const renderTable = () => {
    if (!jsonData || jsonData.length === 0) return null;

    const headers = Object.keys(jsonData[0]);

    return (
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {headers.map((header) => (
              <th key={header} className="border px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jsonData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {headers.map((header) => (
                <td key={header} className="border px-4 py-2">{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-semibold mb-4">CSV to JSON Converter</h3>
        
        {/* File Input */}
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-4"
        />

        {/* Render Table */}
        <div className="mb-4">
          {renderTable() || <p>No data parsed yet. Please upload a CSV file.</p>}
        </div>

        {/* Upload Button */}
        <div className="flex justify-between">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleUpload}
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Upload'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 mt-2">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CsvToJsonConverter;
