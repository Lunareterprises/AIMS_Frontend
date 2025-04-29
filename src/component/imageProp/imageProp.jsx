import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

const ImageProps = ({
  accept = "image", // image | pdf | excel
  multiple = true,
  maxFiles = 15,
  maxSizeMB = 5,
  maxResolution = 7000,
  onFilesSelected = () => {},
}) => {
  const fileInputRef = useRef();
  const [previews, setPreviews] = useState([]);
  const [fileList, setFileList] = useState([]);

  const fileTypes = {
    image: "image/*",
    pdf: "application/pdf",
    excel:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const previewsToShow = [];

    for (const file of files) {
      const type = file.type;

      if (accept === "image" && !type.startsWith("image/")) {
        console.warn(`${file.name} is not a valid image.`);
        continue;
      }
      if (accept === "pdf" && type !== "application/pdf") {
        console.warn(`${file.name} is not a valid PDF.`);
        continue;
      }
      if (
        accept === "excel" &&
        ![
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "text/csv",
        ].includes(type)
      ) {
        console.warn(`${file.name} is not a valid Excel file.`);
        continue;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        console.warn(`${file.name} exceeds ${maxSizeMB}MB.`);
        continue;
      }

      if (accept === "image") {
        const img = await loadImage(file);
        if (img.width > maxResolution || img.height > maxResolution) {
          console.warn(`${file.name} exceeds max resolution.`);
          continue;
        }
        previewsToShow.push(URL.createObjectURL(file));
      }

      validFiles.push(file);
    }

    const totalFiles = multiple
      ? [...fileList, ...validFiles].slice(0, maxFiles)
      : validFiles.slice(0, 1);

    setFileList(totalFiles);

    if (accept === "image") {
      const totalPreviews = multiple
        ? [...previews, ...previewsToShow].slice(0, maxFiles)
        : previewsToShow.slice(0, 1);
      setPreviews(totalPreviews);
    }

    onFilesSelected(totalFiles);
  };

  const loadImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = URL.createObjectURL(file);
    });
  };

  const handleDeleteFile = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this file?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedFiles = [...fileList];
        updatedFiles.splice(index, 1);
        setFileList(updatedFiles);

        if (accept === "image") {
          const updatedPreviews = [...previews];
          updatedPreviews.splice(index, 1);
          setPreviews(updatedPreviews);
        }

        onFilesSelected(updatedFiles);
        Swal.fire("Deleted!", "The file has been removed.", "success");
      }
    });
  };




  

  return (
    <div className="mb-6">
      <div
        className="border border-dashed border-gray-300 rounded p-6 flex flex-col items-center justify-center bg-gray-50 cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      >
        <svg
          className="h-12 w-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-gray-600 mb-2">Click to select or drag & drop</p>
        <button className="text-blue-500 hover:text-blue-700 font-medium">
          Browse Files
        </button>
        <div className="flex items-center mt-4 text-xs text-gray-500">
          <svg
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Max {maxFiles} files, {maxSizeMB}MB each.
          </span>
        </div>
      </div>

      <input
        type="file"
        accept={fileTypes[accept]}
        multiple={multiple}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Image Previews */}
      {accept === "image" && fileList.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {fileList.map((file, idx) => (
            <div key={idx} className="relative group">
              <img
                src={previews[idx]}
                alt={`Preview ${idx}`}
                className="w-full h-32 object-cover rounded shadow"
              />
              <button
                className="absolute top-1 right-1 bg-white text-red-500 p-1 rounded-full shadow hover:bg-red-100"
                onClick={() => handleDeleteFile(idx)}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Non-image file list */}
      {accept !== "image" && fileList.length > 0 && (
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          {fileList.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 border px-2 py-1 rounded bg-gray-50"
            >
              <span>
                📄 {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
              <button
              type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteFile(idx)}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageProps;
